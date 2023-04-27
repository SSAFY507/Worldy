from pyowm import OWM

API_key = 'e3e3fac54ada85280f858e626598f203'
owm = OWM(API_key)
mgr = owm.weather_manager()


# 나라/도시 정보
nations = {"한국" : ['Seoul', '서울'], "중국" : ['Beijing', '베이징'], "일본" : ['Tokyo', '도쿄'], "인도" : ['New Delhi', '뉴델리'],
        "영국" : ['London', '런던'], "프랑스" : ['Paris', '파리'], "이탈리아" : ['Roma', '로마'], "스페인" : ['Madrid', '마드리드'],
        "미국" : ['Washington D.C.', '워싱턴 D.C.'], "이집트" : ['Cairo', '카이로']}

def crawling_weather(nation, nation_id):
    print(nations[nation][1])
    obs = mgr.weather_at_place(nations[nation][0])

    wt = obs.weather.status
    if wt == "Clear":
        print("맑음")
        wt = "맑음"
    elif wt == "Clouds":
        print("구름")
        wt = "구름"
    elif wt == "Haze":
        print("흐림")
        wt = "흐림"
    elif wt == "Wind":
        print("바람")
        wt = "바람"
    elif wt == "Rain":
        print("비")
        wt = "비"
    elif wt == "Snow":
        print("눈")
        wt = "눈"
    elif wt == "mist":
        print("안개")
        wt = "안개"
    elif wt == "Thunderstorm":
        print("뇌우")
        wt = "뇌우"
    elif wt == "Drizzle":
        print("이슬비")
        wt = "이슬비"
    elif wt == "Smoke":
        print("스모그")
        wt = "스모그"
    elif wt == "Dust":
        print("안개")
        wt = "안개"
    elif wt == "Fog":
        print("안개")
        wt = "안개"
    elif wt == "Sand":
        print("안개")
        wt = "안개"
    elif wt == "Ash":
        print("안개")
        wt = "안개"
    elif wt == "Squall":
        print("스콜")
        wt = "스콜"
    elif wt == "Tornado":
        print("토네이도")
        wt = "토네이도"

    print(int(obs.weather.temp['temp']-273))

    print("---------------------------------")
