import json

from flask import Flask, render_template, jsonify
from API import API

app = Flask(__name__, static_url_path='/static')


@app.route('/main', methods=['GET', 'POST'])
def main():
    return render_template('index.html')


@app.route('/main/WeatherState', methods=['GET', 'POST'])
def WeatherState_ajax():
    a = API()
    data = a.getWeatherState()
    return jsonify(result1="success", result2=data)


@app.route('/main/WeatherForecast', methods=['GET', 'POST'])
def WeatherForecast_ajax():
    a = API()
    data = a.getWeatherForecast()

    return jsonify(data)


@app.route('/main/FineDust', methods=['GET', 'POST'])
def FineDust_ajax():
    a = API()
    data = a.getFineDust()

    return jsonify(data)


@app.route('/main/Covid19', methods=['GET', 'POST'])
def Covid19_ajax():
    a = API()
    data = a.getCovid19_Info()

    return jsonify(data)


@app.route('/')
def index():
    return render_template('test.html')


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
