import requests

url = 'http://apis.data.go.kr/6410000/buslocationservice/getBusLocationList'
params ={'serviceKey' : 'VjUEXiL92IwsBXZqkE86F5mTFht4+ut/rxwUxQNWyc5AGu/f5M5LTOZkvxfBfQzWTaRF9fItvRe96V6ZVXgJEQ==', 'routeId' : '234000316' }

response = requests.get(url, params=params)
print(response.text)