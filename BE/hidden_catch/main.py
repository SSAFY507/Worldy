from typing import Union
import create_img
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

@app.get("/hidden_catch/{nation_id}")
def get_img(nation_id: str):
    img_num = s3.get_img(nations_code[nation_id])

    # 틀린 그림 이미지 만들기 및 임시 저장
    answerPoints = create_img.get_next_quiz("./img/original.jpg")

    # 틀린 그림 S3에 올리기 및 업데이트
    s3.upload_img(nations_code[nation_id], img_num)

    original_url = "https://worldy-soft.s3.ap-northeast-2.amazonaws.com/hidden_catch/" + nations_code[nation_id] + "/" + str(img_num) + ".jpg"
    diff_url = "https://worldy-soft.s3.ap-northeast-2.amazonaws.com/hidden_catch/" + nations_code[nation_id] + "/different/" + str(img_num) + ".jpg"

    return {"original_url" : original_url, "diff_url" : diff_url, "answerPoints" : answerPoints, "img_num" : img_num}


