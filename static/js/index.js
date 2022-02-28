let today = new Date();
let time = [today.getFullYear(), today.getMonth() + 1, today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds()];
currentWeather(time);
weatherForecast(time);
covid19(time);

time24_dic = {12: 12, 13: 1, 14: 2, 15: 3, 16: 4, 17: 5, 18: 6, 19: 7, 20: 8, 21: 9, 22: 10, 23: 11, 0: 12};

// ------------------------------------- 스케쥴러(함수) ------------------------------------------
function printTime(time){
    month = time[1].toString();
    date = time[2].toString();
    hour = time[3].toString();
    min = time[4].toString();
    for (var i=0; i<time.length; i++){
        if (time[i].toString().length === 1){
            time[i] = '0'+time[i];
        }
    }
    $(".hour").html(time[3] + ":");
    $(".min").html(time[4]);
    $(".year").html(time[0] + "년");
    $(".month").html(time[1] + "월");
    $(".day").html(time[2] + "일");
}

function getTime(){
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let hour = today.getHours();
    let min = today.getMinutes();
    let second = today.getSeconds();
    return [year, month, date, hour, min, second]
}

setInterval(function(){
    let currentTime = getTime();
    printTime(currentTime);
    if (currentTime[4] === 30){
        if (currentTime[5] >= 1 && currentTime[5] <= 2){
            console.log("날씨관련 잘 실행 중");
            currentWeather(currentTime);
            weatherForecast(currentTime);
        }
    }
    if (currentTime[3] == 9){
        if (currentTime[4] === 10){
            if (currentTime[5] == 1 || currentTime[5] == 2){
                console.log("covid 잘 실행 중");
                covid19(currentTime);
            }
        }
    }
    if (currentTime[3] >= 7 && currentTime[3] <= 12) {
        if (currentTime[5] === 15 || currentTime[5] === 30 || currentTime[5] === 45 || currentTime[5] == 0) {
            dodam();
            daeji();
        }
    }else{
        dodam_out();
        daeji_out();
    }
}, 1000);

function currentWeather(time){
    $.ajax({
        type: "GET",
        url: "main/WeatherState",
        dataType: "json",
        success: function(data){
            console.log("currentWeather" + time[5]);
            let elem = "";
            let state = "";
            let weatherList = data['result2'];
            if (time[3] > 7 && time[3] < 17){
                if (weatherList[0][1] === '맑음'){
                    state = "NB01.png"
                }else if (weatherList[0][1] === '비'){
                    state = "NB08.png"
                }else if (weatherList[0][1] === '비/눈'){
                    state = "NB12.png"
                }else if (weatherList[0][1] === '눈'){
                    state = "NB11.png"
                }else if (weatherList[0][1] === '빗방울'){
                    state = "NB20.png"
                }else if (weatherList[0][1] === '빗방울눈날림'){
                    state = "NB23.png"
                }else if (weatherList[0][1] === '눈날림'){
                    state = "NB21.png"
                }
            }else{
                if (weatherList[0][1] === '맑음'){
                    state = "NB01_N.png"
                }else if (weatherList[0][1] === '비'){
                    state = "NB08.png"
                }else if (weatherList[0][1] === '비/눈'){
                    state = "NB12.png"
                }else if (weatherList[0][1] === '눈'){
                    state = "NB11.png"
                }else if (weatherList[0][1] === '빗방울'){
                    state = "NB20.png"
                }else if (weatherList[0][1] === '빗방울눈날림'){
                    state = "NB23.png"
                }else if (weatherList[0][1] === '눈날림'){
                    state = "NB21.png"
                }
            }
            
            elem += "<div class='top'>";
            elem += "<p name='temperture' class='temp'>" + weatherList[3][1] + "℃" + "</p>";
            elem += "<img src='/static/img/weatherIcon/" + state + "' class='temp_icon'/>";
            elem += "</div>";
            elem += "<div class='bottom'>";
            elem += "<p name='humidity' class='humi'>" + weatherList[1][1] + "%" + "</p>";
            elem += "</div>";
            elem += "<div class='bottom'>";
            elem += "<p name='wind_speed' class='windspeed'>" + weatherList[5][1] + "m/s" + "</p>";
            elem += "</div>";
            elem += "<div class='bottom'>";
            elem += "<p name='rainfall' class='rain'>" + weatherList[2][1] + "mm" + "</p>";
            elem += "</div>";
            $("div.currentWeather").html(elem);
        },
        error: function(xhr){
            console.log("error\n" + xhr);
            if (time[4] >= 40 && time[4] <= 59){
                currentWeather(time);
            }
        }
    });
}

function weatherForecast(time){
    $.ajax({
        type: "GET",
        url: "main/WeatherForecast",
        dataType: "json",
        success: function(data){
            console.log("currentForecast" + time[5]);
            var timename_arr = []
            for(var key in data){
                timename_arr.push(key);
            }
            let elem = "";
            for (var i=1; i<6; i++){
                let state = "";
                if (time[3] > 7 && time[3] < 17){
                    if (data[timename_arr[i]][0][1] === '맑음' && data[timename_arr[i]][2][1] === '맑음'){
                        state = "NB01.png"
                    }else if (data[timename_arr[i]][0][1] === '맑음' && data[timename_arr[i]][2][1] === '구름많음'){
                        state = "NB03.png"
                    }else if (data[timename_arr[i]][0][1] === '맑음' && data[timename_arr[i]][2][1] === '흐림'){
                        state = "NB04.png"
                    }else if (data[timename_arr[i]][0][1] === '비'){
                        state = "NB08.png"
                    }else if (data[timename_arr[i]][0][1] === '비/눈'){
                        state = "NB12.png"
                    }else if (data[timename_arr[i]][0][1] === '눈'){
                        state = "NB11.png"
                    }else if (data[timename_arr[i]][0][1] === '빗방울'){
                        state = "NB20.png"
                    }else if (data[timename_arr[i]][0][1] === '빗방울눈날림'){
                        state = "NB23.png"
                    }else if (data[timename_arr[i]][0][1] === '눈날림'){
                        state = "NB21.png"
                    }
                }else{
                    if (data[timename_arr[i]][0][1] === '맑음' && data[timename_arr[i]][2][1] === '맑음'){
                        state = "NB01_N.png"
                    }else if (data[timename_arr[i]][0][1] === '맑음' && data[timename_arr[i]][2][1] === '구름많음'){
                        state = "NB03_N.png"
                    }else if (data[timename_arr[i]][0][1] === '맑음' && data[timename_arr[i]][2][1] === '흐림'){
                        state = "NB04.png"
                    }else if (data[timename_arr[i]][0][1] === '비'){
                        state = "NB08.png"
                    }else if (data[timename_arr[i]][0][1] === '비/눈'){
                        state = "NB12.png"
                    }else if (data[timename_arr[i]][0][1] === '눈'){
                        state = "NB11.png"
                    }else if (data[timename_arr[i]][0][1] === '빗방울'){
                        state = "NB20.png"
                    }else if (data[timename_arr[i]][0][1] === '빗방울눈날림'){
                        state = "NB23.png"
                    }else if (data[timename_arr[i]][0][1] === '눈날림'){
                        state = "NB21.png"
                    }
                }
                
                let timename = "timename0"+String((i-1)+1);
                let temp = "temp0"+String((i-1)+1);
                let humi = "humi0"+String((i-1)+1);
                let forcast = "forcast0"+String((i-1)+1);
                let timename_int = parseInt(timename_arr[i].substring(0, 2));
                let timename_string = '';
                if(timename_int >= 1 && timename_int <= 11) {
                    timename_string = "오전 " + String(timename_int) + "시"
                }else if(timename_int === 0) {
                    timename_string = "오전 " + String(time24_dic[timename_int]) + "시"
                }else{
                    timename_string = "오후 " + String(time24_dic[timename_int]) + "시"
                }
                $("#"+timename).html(timename_string);
                $("#"+temp).html(data[timename_arr[i]][3][1] + "℃");
                $("#"+humi).html(data[timename_arr[i]][4][1] + "%");
                $("#"+forcast).html("<img src='/static/img/weatherIcon/" + state + "'>");
            }
        },
        error: function(xhr){
            console.log('error\n' + xhr);
            if (time[4] >= 40 && time[4] <= 59){
                weatherForecast(time);
            }
        }
    });
}

function covid19(time){
    $.ajax({
        type: "GET",
        url: "main/Covid19",
        dataType: "json",
        success: function(data){
            let stdDay = data['합계'][5][1];
            let elem = "";
            elem += "<tr>";
            elem += "<td class='area'>합계</td>";
            elem += "<td class='covid_num'>" + parseInt(data['합계'][0][1]).toLocaleString('ko-KR') + "</td>";
            elem += "<td class='covid_num'>" + parseInt(data['합계'][1][1]).toLocaleString('ko-KR') + "</td>";
            elem += "<td class='covid_num'>" + parseInt(data['합계'][2][1]).toLocaleString('ko-KR') + "</td>";
            elem += "<td class='covid_num'>" + parseInt(data['합계'][3][1]).toLocaleString('ko-KR') + "</td>";
            elem += "<td class='covid_num'>" + data['합계'][4][1][0] + data['합계'][4][1][1] + "." + data['합계'][4][1][3] + "%" + "</td></tr>";
            elem += "<td class='area'>서울</td>";
            elem += "<td class='covid_num'>" + parseInt(data['서울'][0][1]).toLocaleString('ko-KR') + "</td>";
            elem += "<td class='covid_num'>" + parseInt(data['서울'][1][1]).toLocaleString('ko-KR') + "</td>";
            elem += "<td class='covid_num'>" + parseInt(data['서울'][2][1]).toLocaleString('ko-KR') + "</td>";
            elem += "<td class='covid_num'>" + parseInt(data['서울'][3][1]).toLocaleString('ko-KR') + "</td>";
            elem += "<td class='covid_num'>" + data['서울'][4][1][0] + data['서울'][4][1][1] + "." + data['서울'][4][1][3] + "%" + "</td></tr>";
            elem += "<td class='area'>경기</td>";
            elem += "<td class='covid_num'>" + parseInt(data['경기'][0][1]).toLocaleString('ko-KR') + "</td>";
            elem += "<td class='covid_num'>" + parseInt(data['경기'][1][1]).toLocaleString('ko-KR') + "</td>";
            elem += "<td class='covid_num'>" + parseInt(data['경기'][2][1]).toLocaleString('ko-KR') + "</td>";
            elem += "<td class='covid_num'>" + parseInt(data['경기'][3][1]).toLocaleString('ko-KR') + "</td>";
            elem += "<td class='covid_num'>" + data['경기'][4][1][0] + data['경기'][4][1][1] + "." + data['경기'][4][1][3] + "%" + "</td></tr>";
            elem += "<td class='area'>대전</td>";
            elem += "<td class='covid_num'>" + parseInt(data['대전'][0][1]).toLocaleString('ko-KR') + "</td>";
            elem += "<td class='covid_num'>" + parseInt(data['대전'][1][1]).toLocaleString('ko-KR') + "</td>";
            elem += "<td class='covid_num'>" + parseInt(data['대전'][2][1]).toLocaleString('ko-KR') + "</td>";
            elem += "<td class='covid_num'>" + parseInt(data['대전'][3][1]).toLocaleString('ko-KR') + "</td>";
            elem += "<td class='covid_num'>" + data['대전'][4][1][0] + data['대전'][4][1][1] + "." + data['대전'][4][1][3] + "%" + "</td></tr>";
            $(".covid_table>tbody").html(elem);
            $(".stdDay").html(stdDay);
        },
        error: function(xhr){
            console.log('error\n' + xhr);
            if (time[3] === 9) {
                covid19(time);
            }
        }
    });
}
// {'9000-1': (None, None, None, None), '60': ('19', '16', '61', '65'), '22': ('5', '4', None, None), '57': ('17', '16', '39', '39'), '59': ('3', '2', None, None)}
// 정거장 수, 시간
// $("#"+timename).html(timename_string);
function dodam(){
    $.ajax({
        type: "GET",
        url: "main/Dodam",
        dataType: "json",
        success: function(data){
            var bus_num = []
            for(var key in data){
                bus_num.push(key);
            }
            for (var i=0; i<bus_num.length; i++) {
                let car_name = 'car_name' + (i+1)
                let arrivalTime1 = 'arrivalTime' + (i+1) + '1'
                let arrivalTime2 = 'arrivalTime' + (i+1) + '2'
                let arrivalStation1 = 'arrivalStation' + (i+1) + '1'
                let arrivalStation2 = 'arrivalStation' + (i+1) + '2'

                $("#"+car_name).html(bus_num[i])
                if (data[bus_num[i]][1] != null) $("#"+arrivalTime1).html('약 ' + data[bus_num[i]][1] + '분');
                else $("#"+arrivalTime1).html('-');
                if (data[bus_num[i]][0] != null) $("#"+arrivalStation1).html(data[bus_num[i]][0] + '번째 전');
                else $("#"+arrivalStation1).html('-');
                if (data[bus_num[i]][3] != null) $("#"+arrivalTime2).html('약 ' + data[bus_num[i]][3] + '분');
                else $("#"+arrivalTime2).html('-');
                if (data[bus_num[i]][2]) $("#"+arrivalStation2).html(data[bus_num[i]][2] + '번째 전');
                else $("#"+arrivalStation2).html('-');
            }
        },
        error: function(xhr){
            console.log('error\n' + xhr);
        }
    });
}

function daeji(){
    $.ajax({
        type: "GET",
        url: "main/Daeji",
        dataType: "json",
        success: function(data){
            var bus_num = []
            for(var key in data){
                bus_num.push(key);
            }
            for (var i=0; i<bus_num.length; i++) {
                let car_name = 'car_name' + (i+6)
                let arrivalTime1 = 'arrivalTime' + (i+6) + '1'
                let arrivalTime2 = 'arrivalTime' + (i+6) + '2'
                let arrivalStation1 = 'arrivalStation' + (i+6) + '1'
                let arrivalStation2 = 'arrivalStation' + (i+6) + '2'

                $("#"+car_name).html(bus_num[i])
                if (data[bus_num[i]][1] != null) $("#"+arrivalTime1).html('약 ' + data[bus_num[i]][1] + '분');
                else $("#"+arrivalTime1).html('-');
                if (data[bus_num[i]][0] != null) $("#"+arrivalStation1).html(data[bus_num[i]][0] + '번째 전');
                else $("#"+arrivalStation1).html('-');
                if (data[bus_num[i]][3] != null) $("#"+arrivalTime2).html('약 ' + data[bus_num[i]][3] + '분');
                else $("#"+arrivalTime2).html('-');
                if (data[bus_num[i]][2]) $("#"+arrivalStation2).html(data[bus_num[i]][2] + '번째 전');
                else $("#"+arrivalStation2).html('-');
            }
        },
        error: function(xhr){
            console.log('error\n' + xhr);
        }
    });
}

function dodam_out(){
    var bus_num = ['22', '57', '59', '60', '9000-1'];
    for (var i=0; i<bus_num.length; i++) {
        let car_name = 'car_name' + (i+1)
        let arrivalTime1 = 'arrivalTime' + (i+1) + '1'
        let arrivalTime2 = 'arrivalTime' + (i+1) + '2'
        let arrivalStation1 = 'arrivalStation' + (i+1) + '1'
        let arrivalStation2 = 'arrivalStation' + (i+1) + '2'

        $("#"+car_name).html(bus_num[i])
        $("#"+arrivalTime1).html('-');
        $("#"+arrivalStation1).html('-');
        $("#"+arrivalTime2).html('-');
        $("#"+arrivalStation2).html('-');
    }
}

function daeji_out(){
    var bus_num = ['25', '29-1'];
    for (var i=0; i<bus_num.length; i++) {
        let car_name = 'car_name' + (i+6)
        let arrivalTime1 = 'arrivalTime' + (i+6) + '1'
        let arrivalTime2 = 'arrivalTime' + (i+6) + '2'
        let arrivalStation1 = 'arrivalStation' + (i+6) + '1'
        let arrivalStation2 = 'arrivalStation' + (i+6) + '2'

        $("#"+car_name).html(bus_num[i])
        $("#"+arrivalTime1).html('-');
        $("#"+arrivalStation1).html('-');
        $("#"+arrivalTime2).html('-');
        $("#"+arrivalStation2).html('-');
    }
}

document.addEventListener('DOMContentLoaded', function(){
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: "prev",
            center: "title",
            right: "next"
        },
        initialView: 'dayGridMonth',
        googleCalendarApiKey: 'AIzaSyAzs-ZvfaqbhHuJt176h23xzXZUMLO5AZc',
        eventSources: [
            {
                googleCalendarId: 'ko.south_korea#holiday@group.v.calendar.google.com',
                className: '법정공휴일',
                color: 'rgb(238, 128, 238, 0.2)'
            },
            {
                googleCalendarId: 'c_01kgbbbv8n63grsaeaqrn5gl08@group.calendar.google.com',
                className: '공유일정',
                color: 'rgb(238, 128, 238, 0.2)'
            }
        ]
    });
    calendar.render();
});