import requests

def getBusStopNum(serviceKey, stopName):
    url = 'http://apis.data.go.kr/4050000/busstop/getBusstop'
    params = {'serviceKey' : serviceKey, 'pageNo' : '1', 'numOfRows' : '5', 'stop_nm' : stopName, 'gu' : '수지', 'stty_emd_nm' : '죽전' }

    response = requests.get(url, params=params)
    for l in response.json()['items']:
        if '29272' == l['stop_no']:
            return l['stop_id']

myKey = 'VjUEXiL92IwsBXZqkE86F5mTFht4+ut/rxwUxQNWyc5AGu/f5M5LTOZkvxfBfQzWTaRF9fItvRe96V6ZVXgJEQ=='
print(getBusStopNum(myKey, '도담마을아이파크.죽전휴먼'))