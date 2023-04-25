import pymysql

conn = pymysql.connect(host='host',
                       user='root',
                       password='password',
                       db='db',
                       charset='utf8')

nations = {"한국":1, "미국":2, "중국":3, "일본":4, "사우디아라비아":5, "인도":6, "싱가포르":7, "태국":8, "필리핀":9, "캐나다":10, "멕시코":11, "아르헨티나":12,
            "브라질":13, "페루":14, "칠레":15, "호주":16, "이집트":17, "남아공":18, "리비아":19, "가나":20, "모르코":21, "소말리아":22, "영국":23, "프랑스":24,
            "독일":25, "스위스":26, "이탈리아":27, "스페인":28, "헝가리":29, "터키":30}

INSERT_NATION = "insert into nation (nation_id, nation_name) values (%s, %s)"

cur = conn.cursor()
for nation in nations:
    cur.execute(INSERT_NATION, (str(nations[nation]), nation))
    conn.commit()
    print(nation, ": ", nations[nation], " => 입력 완료")
    
conn.close()
