from pyowm import OWM
import config

API_key = config.OWM_API_KEY
owm = OWM(API_key)
mgr = owm.weather_manager()


# 나라/도시 정보
nations = {"한국" : ['Seoul', '서울'], "중국" : ['Beijing', '베이징'], "일본" : ['Tokyo', '도쿄'], "인도" : ['New Delhi', '뉴델리'],
        "영국" : ['London', '런던'], "프랑스" : ['Paris', '파리'], "이탈리아" : ['Roma', '로마'], "스페인" : ['Madrid', '마드리드'],
        "미국" : ['Washington D.C.', '워싱턴 D.C.'], "이집트" : ['Cairo', '카이로']}

weather_list = {"Clear": "맑음", "Clouds": "구름", "Haze": "흐림", "Wind": "바람", "Rain": "비", "Snow": "눈", "mist": "안개",
                "Thunderstorm": "뇌우", "Drizzle": "이슬비", "Smoke": "스모그", "Dust": "안개", "Fog": "안개", "Sand": "안개", "Ash": "안개",
                "Squall": "스콜", "Tornado": "토네이도"}

def crawling_weather(nation, nation_id):
    print(nations[nation][1])
    obs = mgr.weather_at_place(nations[nation][0])

    wt = obs.weather.status
    print(weather_list[wt])

    print(int(obs.weather.temp['temp']-273))

    print("---------------------------------")

# crawling_weather("한국", 1)