from typing import Union
import create_img

from fastapi import FastAPI

app = FastAPI()






#----------------------- FAST API -----------------------


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/get_img/{nation_id}")
def get_img(nation_id: int):
    image, answerPoints, t = create_img.get_next_quiz("./1.png")

    return {"original_url" : "", "diff_url" : ""}


