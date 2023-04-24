from typing import Union
from fastapi import FastAPI
import news_naver
import sched
from apscheduler.schedulers.background import BackgroundScheduler
 
sched = BackgroundScheduler(timezone='Asia/Seoul')

app = FastAPI()

nations = ["한국", "미국", "중국", "일본", "사우디아라비아", "인도", "싱가포르", "태국", "필리핀", "캐나다", "멕시코", "아르헨티나", "브라질",
           "페루", "칠레", "호주", "이집트", "남아공", "리비아", "가나", "모르코", "소말리아", "영국", "프랑스", "독일", "스위스", "이탈리아",
           "스페인", "헝가리", "터키"]




#----------------------- 뉴스 크롤링 -----------------------


@sched.scheduled_job('cron', hour='12', minute='30', id='test_2')
def crawling():
    news_naver.find_news(nations)








#----------------------- FAST API -----------------------


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


