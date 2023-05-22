import pymysql
import requests
from bs4 import BeautifulSoup
import config

nations = {"대한민국" : 9, "중국" : 7, "일본" : 8, "인도" : 4, "영국" : 19, "프랑스" : 18, "이탈리아" : 14, "스페인" : 12, "미국" : 39, "이집트" : 27}

UPDATE_NEWS = "update news set nation_id = %s, news_title = %s, news_summary = %s, news_img = %s, news_url = %s where news_id = %s"

INSERT_NEWS = "insert into news (nation_id, news_title, news_summary, news_img, news_url, news_id) values (%s, %s, %s, %s, %s, %s)"


#----------------------- news crawling -----------------------

def find_news(nation):
    conn = pymysql.connect(host=config.MYSQL_URL,
                       user=config.MYSQL_USER,
                       password=config.MYSQL_PASSWORD,
                       db=config.MYSQL_DB,
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
            send_img = "None"

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
