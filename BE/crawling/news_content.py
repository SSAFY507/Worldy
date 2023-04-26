import urllib.request
from selenium import webdriver
from selenium.webdriver.common.by import By
import datetime
import news_quiz

# requests-html 라이브러리: 
# requests-html은 Python 라이브러리로, HTML과 JavaScript를 처리할 수 있습니다.
# 이 라이브러리를 사용하여 JavaScript가 포함된 웹 페이지를 다운로드하고,
# BeautifulSoup을 사용하여 HTML에서 정보를 추출할 수 있습니다.

nations = {"한국":1, "미국":2, "중국":3, "일본":4, "사우디아라비아":5, "인도":6, "싱가포르":7, "태국":8, "필리핀":9, "캐나다":10, "멕시코":11, "아르헨티나":12,
            "브라질":13, "페루":14, "칠레":15, "호주":16, "이집트":17, "남아공":18, "리비아":19, "가나":20, "모르코":21, "소말리아":22, "영국":23, "프랑스":24,
            "독일":25, "스위스":26, "이탈리아":27, "스페인":28, "헝가리":29, "터키":30}

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
    # data = element.text
    # element = driver.find_elements('.cts_atclst ul li a strong')

    driver.find_element(By.LINK_TEXT, element_url[2].text).click()

    content_element = driver.find_element(By.CLASS_NAME, 'scroller01')
    content_elements = content_element.find_elements(By.TAG_NAME, 'p')

    content = ""
    size = len(content_elements)
    for i in range(size-2):
        if i == 0:
            continue
        content = content+content_elements[i].text
    
    driver.quit()
    
    print()
    print(content)
    print()

    quiz = news_quiz.chatgpt_quiz(content)
    print(quiz)

    # for i in element_url:
    #     print(i)
    #     time.sleep(2)
    #     print(i.text)
    #     driver.find_element(By.LINK_TEXT, i.text).click()
    #     time.sleep(2)
    #     driver.back()


find_new_content("아르헨티나")
