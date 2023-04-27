import urllib.request
from selenium import webdriver
from selenium.webdriver.common.by import By
import datetime
import news_quiz


nations = ["한국", "미국", "중국", "일본", "인도", "이집트", "영국", "프랑스", "이탈리아", "스페인"]

driver = webdriver.Edge('./msedgedriver.exe')

def find_new_content(nation):
    now = datetime.datetime.now()
    day_cnt = -7
    last = datetime.datetime.now() + datetime.timedelta(days=day_cnt)

    last = last.strftime("%Y%m%d")
    today = now.strftime("%Y%m%d")

    encText = urllib.parse.quote(nation)
    url = "https://www.yna.co.kr/search/index?query=" + encText +"&sort=weight" + "&from="+ last +"&to=" + today + "&period=1w"
    driver.implicitly_wait(3)
    driver.get(url)
   

    element = driver.find_element(By.CLASS_NAME, 'cts_atclst')
    element_url = element.find_elements(By.TAG_NAME, 'li')
    text_url_list = []

    for eu in element_url:
        text_url_list.append(eu.text)

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
            for i in range(size-2):
                if i == 0:
                    continue
                content = content+content_elements[i].text
        
        if size > 7:
            print()
            print(content)
            print()

            quiz = news_quiz.chatgpt_quiz(content)
            print(quiz)
        
        driver.back()
        
    driver.quit()

find_new_content("미국")
