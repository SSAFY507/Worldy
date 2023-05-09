from typing import Union
import tensorflow as tf
import cv2
import inpaint
import s3

from fastapi import FastAPI

app = FastAPI()

# uvicorn main:app --reload


# 나라 정보
nations = {"대한민국" : 9, "중국" : 7, "일본" : 8, "인도" : 4, "영국" : 19, "프랑스" : 18, "이탈리아" : 14, "스페인" : 12, "미국" : 39, "이집트" : 27}

# 나라 코드
nations_code = {"9" : "kr", "7" : "cn", "8" : "jp", "4" : "in", "19" : "gb", "18" : "fr", "14" : "it", "12" : "es", "39" : "us", "27" : "eg"}


#----------------------- FAST API -----------------------


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/model/{nation_id}/{img_num}")
def get_model(nation_id: str, img_num : str):
    original_url = s3.get_img(nations_code[nation_id], img_num, "original")
    mask_url = s3.get_img(nations_code[nation_id], img_num, "mask")

    img = cv2.imread(original_url, cv2.IMREAD_COLOR)
    mask = cv2.imread(mask_url, cv2.IMREAD_COLOR)

    inpaint.inpaint_by_model(img, mask)

    result = s3.upload_img(nations_code[nation_id], img_num)

    return result
