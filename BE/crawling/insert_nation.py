import pymysql
import config

conn = pymysql.connect(host=config.MYSQL_URL,
                    user=config.MYSQL_USER,
                    password=config.MYSQL_PASSWORD,
                    db=config.MYSQL_DB,
                    charset='utf8')

nations = {"한국" : 1, "중국" : 2, "일본" : 3, "인도" : 4, "영국" : 5, "프랑스" : 6, "이탈리아" : 7, "스페인" : 8, "미국" : 9, "이집트" : 10}

INSERT_NATION = "insert into nation (nation_id, nation_name) values (%s, %s)"

cur = conn.cursor()
for nation in nations:
    cur.execute(INSERT_NATION, (str(nations[nation]), nation))
    conn.commit()
    print(nation, ": ", nations[nation], " => 입력 완료")
    
conn.close()
