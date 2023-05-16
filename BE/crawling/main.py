from typing import Union
from fastapi import FastAPI
import news_naver
import news_content
import weather_api
import exchange_rate
import sched
from apscheduler.schedulers.background import BackgroundScheduler

# uvicorn main:app --reload

sched = BackgroundScheduler(timezone='Asia/Seoul')

app = FastAPI()

nations = {"대한민국" : 9, "중국" : 7, "일본" : 8, "인도" : 4, "영국" : 19, "프랑스" : 18, "이탈리아" : 14, "스페인" : 12, "미국" : 39, "이집트" : 27}



#----------------------- news crawling -----------------------


@sched.scheduled_job('cron', hour='14', minute='0', id='news_crawling')
def crawling_naver():
    for nation in nations.keys():
        news_naver.find_news(nation)


#----------------------- news quiz -----------------------


@sched.scheduled_job('cron', hour='15', minute='0', id='news_quiz')
def news_quiz():
    for nation in nations.keys():
        news_content.find_new_content(nation, nations[nation])


#----------------------- weather crawling -----------------------


@sched.scheduled_job('cron', hour='2, 6, 10, 14, 18, 22', minute='0', id='weather_crawling')
def weather_crawling():
    for nation in nations.keys():
        weather_api.crawling_weather(nation, nations[nation])


#----------------------- sched start -----------------------


def start_image_scheduler():
    sched.start()

start_image_scheduler()


#----------------------- FAST API -----------------------


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/crawling/exchange_rate/{nation_name}")
def crawling_exchange_rate(nation_name : str):
    return exchange_rate.find_exchange_rate(nations.keys(), nation_name)