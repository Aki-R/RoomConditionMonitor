//script to show graphs
var URL_JSON = 'http://133.18.232.25/roomcondition/wfirex_sensor.json'

$.getJSON(URL_JSON + '?timestamp=${new Date().getTime()}', (jasondata) => {
    // JSONデータを受信した後に実行する処理
    // Array for data
    var  DatetimeArray = [];
    var  TemperatureArray = [];
    var  HumidityArray = [];

    //JSONファイルを変換
    for(var i=0; i<jasondata.length; i++){
        DatetimeArray[i] = moment(jasondata[i].DateTime).subtract(9,'h');
        TemperatureArray[i] = jasondata[i].Temperature;
        HumidityArray[i] = jasondata[i].Humidity;
    }

    const ctx = document.getElementById('Temperature').getContext('2d');
    const TemperatureChart = new Chart(ctx, {
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
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                yAxis_Tmp: {
                    position: "left",
                    //max: 40,
                    //suggestedMin: 0,
                    title: {
                        display: true,
                        text: 'Temperature ℃',
                    }
                },
                x: {
                    type: 'time',
                    title: {
                        display: true,
                        text: "Time",
                    },
                    min: moment(DatetimeArray[jasondata.length]).subtract(7,'d'),
                    time: {
                        unit: 'day',
                        displayFormats: {
                            hour: 'Do'
                        },
                    },
                }
            }
        }
    });
    const ctx2 = document.getElementById('Humidity').getContext('2d');
    const HumidityChart = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: DatetimeArray,
            datasets: [
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
                yAxis_Hum: {
                    position: "left",
                    //max: 100,
                    //min: 0,
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
                    min: moment(DatetimeArray[jasondata.length]).subtract(7,'d'),
                    time: {
                        unit: 'day',
                        displayFormats: {
                            hour: 'Do'
                        },
                    },
                }
            }
        }
    });
});