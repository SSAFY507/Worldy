import requests
from bs4 import BeautifulSoup

def find_exchange_rate(nations, nation):
    address = 'https://finance.naver.com'
    addition = '/marketindex/?tabSel=exchange#tab_section'

    res = requests.get(address + addition)
    soup = BeautifulSoup(res.content, 'html.parser')

    frame = soup.find('iframe', id="frame_ex1")
    frameaddr = address+frame['src'] #frame내의 연결된 주소 확인 

    res1 = requests.get(frameaddr) # frame내의 연결된 주소를 읽어오기 
    frame_soup = BeautifulSoup(res1.content, 'html.parser')
    items = frame_soup.select('body > div > table > tbody > tr')

    rate_list = {}
    for item in items:
        name = item.select('td')[0].text.replace("\n","")
        name = name.replace("\t", "")
        name = name.split(" ")
        info = item.select('td')[1].text
        # print(name + "\t" + item.select('td')[1].text)

        if name[0] == "유럽연합":
            rate_list["프랑스"] = info
            rate_list["이탈리아"] = info
            rate_list["스페인"] = info

        if name[0] in nations:
            rate_list[name[0]] = info

    print(rate_list)
    return {nation : rate_list[nation]}