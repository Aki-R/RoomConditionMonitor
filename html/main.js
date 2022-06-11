//script to show graphs
var URL_JSON = './wfirex_sensor.json'

const ctx = document.getElementById('Temperature').getContext('2d');
const TemperatureChart = new Chart(ctx, {type: 'line'});
const ctx2 = document.getElementById('Humidity').getContext('2d');
const HumidityChart = new Chart(ctx2, {type: 'line'});
const ctx3 = document.getElementById('Pressure').getContext('2d');
const PressureChart = new Chart(ctx3, {type: 'line'});

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

    TemperatureChart.data = {
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
    };
    TemperatureChart.options = {
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
                max: moment(),
                time: {
                    unit: 'day',
                    displayFormats: {
                        day: 'Do ddd',
                        hour: 'HH:00',
                        week: 'MMM Do'
                    },
                },
            }
        }
    };
    TemperatureChart.update();

    HumidityChart.data = {
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
    };
    HumidityChart.options = {
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
                max: moment(),
                time: {
                    unit: 'day',
                    displayFormats: {
                        day: 'Do ddd',
                        hour: 'HH:00',
                        week: 'MMM Do'
                    },
                },
            }
        }
    };
    HumidityChart.update();
});

$.ajax({
    // 通信先ファイル名
    type: "GET",
    url: "./backend.php",
    dataType: 'json'
}).done(function(data){
    var  DateArray = [];
    var  PressureArray = [];
    for(var i=0; i<data.length; i++){
        DateArray[i] = data[i].date;
        PressureArray[i] = data[i].atom_pressure;
    }
    PressureChart.data = {
        labels: DateArray,
        datasets: [
            {
                label: 'Pressure hPa',
                data: PressureArray,
                borderColor: "rgba(0,255,0,1)",
                backgroundColor: "rgba(0,0,0,0)",
                yAxisID: "yAxis_Tmp"
            },
        ],
    };
    PressureChart.options = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            yAxis_Tmp: {
                position: "left",
                //max: 40,
                //suggestedMin: 0,
                title: {
                    display: true,
                    text: 'Pressure hPa',
                }
            },
            x: {
                type: 'time',
                title: {
                    display: true,
                    text: "Time",
                },
                min: moment(DateArray[data.length]).subtract(7,'d'),
                max: moment(),
                time: {
                    unit: 'day',
                    displayFormats: {
                        day: 'Do ddd',
                        hour: 'HH:00',
                        week: 'MMM Do'
                    },
                },
            }
        }
    };
    PressureChart.update();
}).fail(function(data){
    console.log("通信失敗");
    console.log(data);
});


function time_range_change(){
    if(document.getElementById('time_range')){
        selected_time_range = document.getElementById('time_range').value;
        if(selected_time_range == 'week'){
            time_range_day = 7;
            TemperatureChart.options.scales.x.time.unit = 'day'
            HumidityChart.options.scales.x.time.unit = 'day'
            PressureChart.options.scales.x.time.unit = 'day'
        }else if(selected_time_range == 'day'){
            time_range_day = 1;
            TemperatureChart.options.scales.x.time.unit = 'hour'
            HumidityChart.options.scales.x.time.unit = 'hour'
            PressureChart.options.scales.x.time.unit = 'hour'
        }else if(selected_time_range == 'one_month'){
            time_range_day = 31;
            TemperatureChart.options.scales.x.time.unit = 'week'
            HumidityChart.options.scales.x.time.unit = 'week'
            PressureChart.options.scales.x.time.unit = 'week'
        }else if(selected_time_range == 'three_month'){
            time_range_day = 93;
            TemperatureChart.options.scales.x.time.unit = 'week'
            HumidityChart.options.scales.x.time.unit = 'week'
            PressureChart.options.scales.x.time.unit = 'week'
        }
    }
    TemperatureChart.options.scales.x.min = moment().subtract(time_range_day,'d');
    TemperatureChart.update();
    HumidityChart.options.scales.x.min = moment().subtract(time_range_day,'d');
    HumidityChart.update();
    PressureChart.options.scales.x.min = moment().subtract(time_range_day,'d');
    PressureChart.update();
}

