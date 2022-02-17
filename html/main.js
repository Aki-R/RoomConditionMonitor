//script to show graphs
var URL_JSON = 'http://xxxxxx/roomcondition/wfirex_sensor.json'

$.getJSON(URL_JSON + '?timestamp=${new Date().getTime()}', (jasondata) => {
    // JSONデータを受信した後に実行する処理
    // Array for data
    var  DatetimeArray = [];
    var  TemperatureArray = [];
    var  HumidityArray = [];

    //JSONファイルを変換
    for(var i=0; i<jasondata.length; i++){
        DatetimeArray[i] = jasondata[i].DateTime;
        TemperatureArray[i] = jasondata[i].Temperature;
        HumidityArray[i] = jasondata[i].Humidity;
    }

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: DatetimeArray,
            datasets: [
                {
                    label: 'Temperature ℃',
                    data: TemperatureArray,
                    borderColor: "rgba(255,0,0,1)",
                    backgroundColor: "rgba(0,0,0,0)",
                    yAxisID: "yAxis_Tmp"
                },
                {
                    label: 'Humidity %',
                    data: HumidityArray,
                    borderColor: "rgba(0,0,255,1)",
                    backgroundColor: "rgba(0,0,0,0)",
                    yAxisID: "yAxis_Hum"
                }
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                yAxis_Tmp: {
                    position: "left",
                    max: 40,
                    suggestedMin: 0,
                    title: {
                        display: true,
                        text: 'Temperature ℃',
                    }
                },
                yAxis_Hum: {
                    position: "right",
                    max: 100,
                    min: 0,
                    title: {
                        display: true,
                        text: "Humidity %",
                    }
                },
                x: {
                    type: 'time',
                    title: {
                        display: true,
                        text: "Time",
                    },
                    time: {
                        unit: 'hour',
                        displayFormats: {
                            hour: 'Do, HH時'
                        },
                    },
                }
            }
        }
    });
});