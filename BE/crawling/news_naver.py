import pymysql
import requests
from bs4 import BeautifulSoup

# conn = pymysql.connect(host='localhost',
#                        user='root',
#                        password='a710&soez&mtc',
#                        db='test_world',
#                        charset='utf8')

# cur = conn.cursor()

nations = ["한국", "미국", "중국", "일본", "사우디아라비아", "인도", "싱가포르", "태국", "필리핀", "캐나다", "멕시코", "아르헨티나", "브라질",
           "페루", "칠레", "호주", "이집트", "남아공", "리비아", "가나", "모르코", "소말리아", "영국", "프랑스", "독일", "스위스", "이탈리아",
           "스페인", "헝가리", "터키"]

def find_news(nation):
    url = "https://search.naver.com/search.naver?where=news&query=" + nation

    raw = requests.get(url)
    html = BeautifulSoup(raw.text, "html.parser")
    news_send = html.select('div.group_news ul > li > div.api_ani_send')

    cnt = 0
    print(nation)
    for send in news_send:
        cnt += 1

        try:
            send_img = send.select_one("a.dsc_thumb").find("img").get("data-lazysrc")
        except:
            send_img = None

        send_title = send.select_one("a.news_tit").text
        send_txt = send.select_one("a.api_txt_lines.dsc_txt_wrap").text
        send_url = send.select_one("a.news_tit").get("href")

       
        print(cnt, send_img)
        print(cnt, send_title)
        print(cnt, send_txt)
        print(send_url)
        print()


for nation in nations:
    find_news(nation)

