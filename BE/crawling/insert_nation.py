import pymysql
import config

conn = pymysql.connect(host=config.MYSQL_URL,
                    user=config.MYSQL_USER,
                    password=config.MYSQL_PASSWORD,
                    db=config.MYSQL_DB,
                    charset='utf8')

nations = {"대한민국" : 9, "중국" : 7, "일본" : 8, "인도" : 4, "영국" : 19, "프랑스" : 18, "이탈리아" : 14, "스페인" : 12, "미국" : 39, "이집트" : 27}

INSERT_NATION = "insert into nation (nation_id, nation_name) values (%s, %s)"

cur = conn.cursor()
for nation in nations:
    cur.execute(INSERT_NATION, (str(nations[nation]), nation))
    conn.commit()
    print(nation, ": ", nations[nation], " => 입력 완료")
    
conn.close()
