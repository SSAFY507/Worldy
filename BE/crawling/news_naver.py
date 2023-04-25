import pymysql
import requests
from bs4 import BeautifulSoup

nations = {"한국":1, "미국":2, "중국":3, "일본":4, "사우디아라비아":5, "인도":6, "싱가포르":7, "태국":8, "필리핀":9, "캐나다":10, "멕시코":11, "아르헨티나":12,
            "브라질":13, "페루":14, "칠레":15, "호주":16, "이집트":17, "남아공":18, "리비아":19, "가나":20, "모르코":21, "소말리아":22, "영국":23, "프랑스":24,
            "독일":25, "스위스":26, "이탈리아":27, "스페인":28, "헝가리":29, "터키":30}

UPDATE_NEWS = "update news set nation_id = %s, news_title = %s, news_summary = %s, news_img = %s, news_url = %s where news_id = %s"

INSERT_NEWS = "insert into news (nation_id, news_title, news_summary, news_img, news_url, news_id) values (%s, %s, %s, %s, %s, %s)"


#----------------------- news crawling -----------------------

def find_news(nation):
    conn = pymysql.connect(host='host',
                       user='root',
                       password='password',
                       db='db',
                       charset='utf8')
    
    cur = conn.cursor()

    url = "https://search.naver.com/search.naver?where=news&query=" + nation

    raw = requests.get(url)
    html = BeautifulSoup(raw.text, "html.parser")
    news_send = html.select('div.group_news ul > li > div.api_ani_send')

    cnt = (nations[nation] - 1) * 10
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

        cur.execute(INSERT_NEWS, (str(nations[nation]), send_title, send_txt, send_img, send_url, str(cnt)))
        print(cnt, send_img, ": 입력 완료")
        print(cnt, send_title, ": 입력 완료")
        print(cnt, send_txt, ": 입력 완료")
        print(send_url, ": 입력 완료")
        print()

    conn.commit()
    conn.close()
