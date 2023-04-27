import urllib.request
from selenium import webdriver
from selenium.webdriver.common.by import By
import datetime
import news_quiz

# requests-html 라이브러리: 
# requests-html은 Python 라이브러리로, HTML과 JavaScript를 처리할 수 있습니다.
# 이 라이브러리를 사용하여 JavaScript가 포함된 웹 페이지를 다운로드하고,
# BeautifulSoup을 사용하여 HTML에서 정보를 추출할 수 있습니다.

# nations = ["한국", "미국", "중국", "일본", "사우디아라비아", "인도", "싱가포르", "태국", "필리핀", "캐나다", "멕시코", "아르헨티나", "브라질",
#            "페루", "칠레", "호주", "이집트", "남아공", "리비아", "가나", "모르코", "소말리아", "영국", "프랑스", "독일", "스위스", "이탈리아",
#            "스페인", "헝가리", "터키"]

# 한국 중국 일본 인도 이탈리아 영국 프랑스 이집트 미국
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

    # data = element.text
    # element = driver.find_elements('.cts_atclst ul li a strong')

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

    # for i in element_url:
    #     print(i)
    #     time.sleep(2)
    #     print(i.text)
    #     driver.find_element(By.LINK_TEXT, i.text).click()
    #     time.sleep(2)
    #     driver.back()


find_new_content("미국")
