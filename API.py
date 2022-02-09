import json
import requests
import datetime
import math
import xmltodict


class API:
    def __init__(self):
        with open('package.json', 'r') as f:
            self.json_data = json.load(f)

        self.stationId = self.getBusStopNum()
        self.precipitation_type = {0: '맑음', 1: '비', 2: '비/눈', 3: '눈', 5: '빗방울', 6: '빗방울눈날림', 7: '눈날림'}
        # print(self.json_data['key']['getBusArrival'])

    def getBusArrival_I_PARK(self, stationId, routeId, staOrder):
        url = 'http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalItem'
        params = {'serviceKey': self.json_data['key']['getBusArrival'],
                  'stationId': stationId, 'routeId': routeId, 'staOrder': staOrder}

        response = requests.get(url, params=params)
        return response.text

    def getBusStopNum(self):
        url = 'http://apis.data.go.kr/4050000/busstop/getBusstop'
        params = {'serviceKey': self.json_data['key']['getBusStopNum'], 'pageNo': '1', 'numOfRows': '5',
                  'stop_nm': '도담마을아이파크.죽전휴먼', 'gu': '수지', 'stty_emd_nm': '죽전'}

        response = requests.get(url, params=params)
        for l in response.json()['items']:
            if '29272' == l['stop_no']:
                return l['stop_id']

    def getFineDust(self):
        url = 'http://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureSidoLIst'
        params = {
            'serviceKey': self.json_data['key']['getFineDust'],
            'returnType': 'json', 'numOfRows': '100', 'pageNo': '1', 'sidoName': '경기', 'searchCondition': 'HOUR'}

        response = requests.get(url, params=params)
        for l in response.json()['response']['body']['items']:
            if l['cityName'] == '용인시':
                return l['dataTime'], l['o3Value'], l['pm10Value'], l['pm25Value']

    def getWeatherState(self):
        currentTime = str(datetime.datetime.now())
        dateList = currentTime[:10].split('-')
        base_date = dateList[0] + dateList[1] + dateList[2]
        base_time = currentTime[11:13] + '00'
        wind_direction = {0: '북풍', 1: '북동풍', 2: '북동풍', 3: '동북동풍', 4: '동풍', 5: '동남동풍', 6: '남동풍', 7: '남동풍',
                          8: '남풍', 9: '남서풍', 10: '남서풍', 11: '서남서풍', 12: '서풍', 13: '서북서풍', 14: '북서풍',
                          15: '북서풍', 16: '북풍'}

        total = []

        url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'
        params = {
            'serviceKey': self.json_data['key']['getWeatherState'],
            'pageNo': '1', 'numOfRows': '1000', 'dataType': 'JSON', 'base_date': base_date, 'base_time': '0000',
            'nx': '62', 'ny': '122'}

        response = requests.get(url, params=params).json()
        # print(response)
        for l in response['response']['body']['items']['item']:
            category = l['category']
            if category == 'T1H':  # 기온
                total.append(('기온', l['obsrValue']))
            elif category == 'RN1':  # 강수량
                total.append(('강수량', l['obsrValue']))
            elif category == 'REH':  # 습도
                total.append(('습도', l['obsrValue']))
            elif category == 'PTY':  # 강수형태
                total.append(('강수형태', self.precipitation_type[int(l['obsrValue'])]))
            elif category == 'VEC':  # 풍향
                total.append(('풍향', wind_direction[math.trunc((int(l['obsrValue']) + 22.5 * 0.5) / 22.5)]))
            elif category == 'WSD':  # 풍속
                total.append(('풍속', l['obsrValue']))

        return total

    def getWeatherForecast(self):
        currentTime = str(datetime.datetime.now())
        dateList = currentTime[:10].split('-')
        base_date = dateList[0] + dateList[1] + dateList[2]
        base_time = currentTime[11:13] + '00'
        total = {}
        totalplus = {}
        skyStatus_code = {1: '맑음', 3: '구름많음', 4: '흐림'}

        url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst'
        params = {
            'serviceKey': self.json_data['key']['getWeatherState'],
            'pageNo': '1', 'numOfRows': '1000', 'dataType': 'JSON', 'base_date': base_date, 'base_time': '0000',
            'nx': '62', 'ny': '122'}

        response = requests.get(url, params=params).json()
        for l in response['response']['body']['items']['item']:
            if l['fcstTime'] not in total:
                total[l['fcstTime']] = [(l['category'], l['fcstValue'])]
            else:
                total[l['fcstTime']].append((l['category'], l['fcstValue']))

        for d in total.keys():
            for l in total[d]:
                if l[0] == 'PTY':
                    totalplus[d] = [('강수형태', self.precipitation_type[int(l[1])])]
                elif l[0] == 'T1H':
                    totalplus[d].append(('기온', l[1]))
                elif l[0] == 'RN1':
                    totalplus[d].append(('강수량', l[1]))
                elif l[0] == 'SKY':
                    totalplus[d].append(('하늘상태', skyStatus_code[int(l[1])]))
                elif l[0] == 'REH':
                    totalplus[d].append(('습도', l[1]))

        return totalplus

    def getCovid19_Info(self):
        url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson'
        params = {'serviceKey': self.json_data['key']['getCovid19'], 'pageNo': '1', 'numOfRows': '10'}
        total = {}

        response = requests.get(url, params=params)
        xml_data = response.text
        json_string = json.dumps(xmltodict.parse(xml_data), ensure_ascii=False)
        json_dict = json.loads(json_string)

        for l in json_dict['response']['body']['items']['item']:
            for i in l:
                if i == 'deathCnt':
                    total[l['gubun']] = [('사망자 수', l[i])]
                elif i == 'defCnt':
                    total[l['gubun']].append(('총 확진자 수', l[i]))
                elif i == 'incDec':
                    total[l['gubun']].append(('확진자 수', l[i]))
                elif i == 'isolClearCnt':
                    total[l['gubun']].append(('격리 해제 수', l[i]))
                elif i == 'localOccCnt':
                    total[l['gubun']].append(('지역 감염', l[i]))
                elif i == 'overFlowCnt':
                    total[l['gubun']].append(('해외유입', l[i]))
                elif i == 'qurRate':
                    total[l['gubun']].append(('10만명당 발생률', l[i]))
                elif i == 'stdDay':
                    total[l['gubun']].append(('기준일', l[i]))

        return total


if __name__ == '__main__':
    a = API()
    # print(a.getBusArrival_I_PARK('228001059', '234000316', '65'))
    # print(a.getBusStopNum())
    # print(a.getFineDust())
    # print(a.getWeatherState())
    print(a.getWeatherForecast())
    # print(a.getCovid19_Info())