import boto3
from dotenv import load_dotenv
from botocore.client import Config
from PIL import Image
import pymysql
import config
import random


# S3 설정
s3 = boto3.resource(
        's3',
        aws_access_key_id=config.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=config.AWS_SECRET_ACCESS_KEY,
        config=Config(signature_version='s3v4')
    )


# DB 접속 정보
conn = pymysql.connect(host=config.MYSQL_URL,
                    user=config.MYSQL_USER,
                    password=config.MYSQL_PASSWORD,
                    db=config.MYSQL_DB,
                    charset='utf8')


# S3에서 가져온 이미지를 틀린 그림을 만들기 위해 임시로 저장하기
def get_img(nation_code):
    img_num = random.randrange(1,6)
    bucket = s3.Bucket(config.BUCKET_NAME)
    object = bucket.Object("hidden_catch/" +nation_code+ "/" + img_num + ".jpg")
    response = object.get()
    file_stream = response['Body']
    img = Image.open(file_stream)
    img = img.convert("RGB")
    img.save('original.jpg')

    return img_num


# S3에 사진 저장하기
def upload_img():
    file_path = "./1.jpg"
    data = open(file_path, 'rb')
    save_data = "hidden_catch/it/" + "1.jpg"

    s3.Bucket(config.BUCKET_NAME).put_object(
            Key=save_data, Body=data, ContentType='image/jpg')
    print(file_path, " : S3 저장완료")
