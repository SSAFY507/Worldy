from pyowm import OWM
import pymysql
import config

# API
API_key = config.OWM_API_KEY
owm = OWM(API_key)
mgr = owm.weather_manager()


# weather insert sql
INSERT_WEATHER = "insert into weather (weather_name, temp, nation_id) values (%s, %s, %s)"

# weather update sql
UPDATE_WEATHER = "update weather set weather_name = %s, temp = %s where nation_id = %s"

# 나라/도시 정보
nations = {"대한민국" : ['Seoul', '서울'], "중국" : ['Beijing', '베이징'], "일본" : ['Tokyo', '도쿄'], "인도" : ['New Delhi', '뉴델리'],
        "영국" : ['London', '런던'], "프랑스" : ['Paris', '파리'], "이탈리아" : ['Roma', '로마'], "스페인" : ['Madrid', '마드리드'],
        "미국" : ['Washington D.C.', '워싱턴 D.C.'], "이집트" : ['Cairo', '카이로']}

# 날씨 정보
weather_list = {"Clear": "맑음", "Clouds": "구름", "Haze": "흐림", "Wind": "바람", "Rain": "비", "Snow": "눈", "Mist": "안개",
                "Thunderstorm": "뇌우", "Drizzle": "이슬비", "Smoke": "스모그", "Dust": "안개", "Fog": "안개", "Sand": "안개", "Ash": "안개",
                "Squall": "스콜", "Tornado": "토네이도"}


def crawling_weather(nation, nation_id):
    print(nations[nation][1])
    obs = mgr.weather_at_place(nations[nation][0])

    # DB 접속 정보
    conn = pymysql.connect(host=config.MYSQL_URL,
                       user=config.MYSQL_USER,
                       password=config.MYSQL_PASSWORD,
                       db=config.MYSQL_DB,
                       charset='utf8')
    
    cur = conn.cursor()

    wt = obs.weather.status
    wt_name = weather_list[wt]
    wt_temp = int(obs.weather.temp['temp']-273)
    print(wt_name)
    print(wt_temp)
    print("---------------------------------")

    cur.execute(INSERT_WEATHER, (wt_name, str(wt_temp), str(nation_id)))
    # cur.execute(UPDATE_WEATHER, (wt_name, str(wt_temp), str(nation_id)))

# crawling_weather("한국", 1)