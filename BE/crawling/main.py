from typing import Union
from fastapi import FastAPI
import news_naver
import news_content
import weather_api
import sched
from apscheduler.schedulers.background import BackgroundScheduler

# uvicorn main:app --reload

sched = BackgroundScheduler(timezone='Asia/Seoul')

app = FastAPI()

nations = {"한국" : 1, "중국" : 2, "일본" : 3, "인도" : 4, "영국" : 5, "프랑스" : 6, "이탈리아" : 7, "스페인" : 8, "미국" : 9, "이집트" : 10}



#----------------------- news crawling -----------------------


@sched.scheduled_job('cron', hour='8', minute='0', id='news_crawling')
def crawling_naver():
    for nation in nations.keys():
        news_naver.find_news(nation)


#----------------------- news quiz -----------------------


@sched.scheduled_job('cron', hour='9', minute='0', id='news_quiz')
def news_quiz():
    for nation in nations.keys():
        news_content.find_new_content(nation, nations[nation])


#----------------------- weather crawling -----------------------


@sched.scheduled_job('cron', hour='7', minute='0', id='wweather_crawling')
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


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


