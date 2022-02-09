$.ajax({
type: "GET",
url: "main/WeatherState",
dataType: "json",
success: function(data){
    let elem = "";
    let weatherList = data['result2']
    elem += "<div>";
    elem += "<p name='temperture' class='temp'>" + weatherList[3][1] + "℃" + "</p>";
    elem += "</div>";
    elem += "<div>";
    elem += "<p name='humidity' class='humi'>" + weatherList[1][0] + " " + weatherList[1][1] + "</p>";
    elem += "</div>";
    elem += "<div>";
    elem += "<p name='rainfall' class='rain'>" + weatherList[2][0] + " " + weatherList[2][1] + "</p>";
    elem += "</div>";
    elem += "<div>";
    elem += "<p name='wind_speed' class='windspeed'>" + weatherList[5][1] + "m/s" + "</p>";
    elem += "</div>";
    $("div.currentWeather").append(elem);
},
error: function(xhr){
    console.log('error');
}
});

$.ajax({
    type: "GET",
    url: "main/Covid19",
    dataType: "json",
    success: function(data){
        let elem = "";
    }
})

let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let date = today.getDate();
let hour = today.getHours();
let min = today.getMinutes();
let second = today.getSeconds();