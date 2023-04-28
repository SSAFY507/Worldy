import urllib.request
from selenium import webdriver
from selenium.webdriver.common.by import By
import datetime
import news_quiz
import pymysql
import config
from time import sleep

# QUIZ SQL
INSERT_QUIZ = "insert into quiz (nation_id, publisher_type, category, level, content, answer, hint, hint_type) values (%s, %s, %s, %s, %s, %s, %s, %s)"

DELETE_QUIZ = "delete from quiz where nation_id = %s and publisher_type = 'gpt'"


def find_new_content(nation, nation_id):

    # 드라이버 설정, EC2는 Chrome으로
    driver = webdriver.Edge('./msedgedriver.exe')

    # DB 접속 정보
    conn = pymysql.connect(host=config.MYSQL_URL,
                       user=config.MYSQL_USER,
                       password=config.MYSQL_PASSWORD,
                       db=config.MYSQL_DB,
                       charset='utf8')
    
    now = datetime.datetime.now()
    day_cnt = -7
    last = datetime.datetime.now() + datetime.timedelta(days=day_cnt)

    last = last.strftime("%Y%m%d")
    today = now.strftime("%Y%m%d")

    encText = urllib.parse.quote(nation)
    url = "https://www.yna.co.kr/search/index?query=" + encText + "&sort=weight" + "&from=" + last + "&to=" + today + "&period=1w"
    driver.implicitly_wait(3)
    driver.get(url)
   

    element = driver.find_element(By.CLASS_NAME, 'cts_atclst')
    element_url = element.find_elements(By.TAG_NAME, 'li')
    text_url_list = []

    # 뉴스 url 가져오기
    for eu in element_url:
        text_url_list.append(eu.text)

    # DB 열기
    cur = conn.cursor()
    # 기존 gpt Quiz 삭제
    cur.execute(DELETE_QUIZ, (str(nation_id)))

    for i in range(len(text_url_list)):
        driver.implicitly_wait(3)
        if i >= 3:
            break

        driver.find_element(By.LINK_TEXT, text_url_list[i]).click()

        content_element = driver.find_element(By.CLASS_NAME, 'scroller01')
        content_elements = content_element.find_elements(By.TAG_NAME, 'p')
        print(len(content_elements))

        content = ""
        size = len(content_elements)
        if size > 7:
            for i in range(size-3):
                if i == 0:
                    continue
                content = content+content_elements[i].text
        
        if size > 7:
            print()
            print(content)
            print()

            try:
                quiz = news_quiz.chatgpt_quiz(content, nation_id)
                print(quiz)
                
                news_link = "\n\n\n 출처 : " + driver.current_url
                cur.execute(INSERT_QUIZ, (str(nation_id), "gpt", "aff", "3", quiz["quiz"] + news_link, quiz["answer"], quiz["hint"], "1"))

                conn.commit() 
            except Exception as e:
                print('예외가 발생했습니다. => ', e)
        
        driver.back()
        sleep(40)

    # DB 닫기
    conn.close()
    # 브라우저 닫기
    driver.quit()

# find_new_content("한국", 1)
