import requests
import pprint

from os import name
import xml.etree.ElementTree as et
import pandas as pd
import bs4
from lxml import html
from urllib.parse import urlencode, quote_plus, unquote
#  15


def getBusArrival1(serviceKey, stationId, routeId, staOrder):
    url = 'http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalItem'
    params ={'serviceKey' : serviceKey, 'stationId' :  stationId, 'routeId' : routeId, 'staOrder' : staOrder}

    response = requests.get(url, params=params)

    return response.text


def getBusArrival2(serviceKey, stationId):
    url = 'http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList'
    params = {'serviceKey': serviceKey, 'stationId': stationId}

    response = requests.get(url, params=params)
    return response.text

myKey1 = 'VjUEXiL92IwsBXZqkE86F5mTFht4+ut/rxwUxQNWyc5AGu/f5M5LTOZkvxfBfQzWTaRF9fItvRe96V6ZVXgJEQ=='
myKey2 = 'VjUEXiL92IwsBXZqkE86F5mTFht4%2But%2FrxwUxQNWyc5AGu%2Ff5M5LTOZkvxfBfQzWTaRF9fItvRe96V6ZVXgJEQ%3D%3D'
# print(getBusArrival1(myKey1, '228001059', '234000316', '65'))
print(getBusArrival2(myKey1, '228001059'))

