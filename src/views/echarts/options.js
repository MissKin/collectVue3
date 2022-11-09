import * as echarts from "echarts";
// 远点echart
export const circlePoint = () => {
    var yAxisData = []
    for(let i = 0; i< 23;i++){
    
    const time = `${i.toString().padStart(2,0)}:00`
      yAxisData.push(time)
    }
    const option = {
        color: ["#315C94", "#497FB6", "#6F8FCF", "#7AA0BB", "#9FBEDD", "#BCD4E1"],
        backgroundColor: "#211b6a",
        textStyle: {
          color: "#fff",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              type: "dashed",
              width: 2,
              color: "#4B941A",
            },
            animation: true,
          },
        },
        grid: {
          show: false,
        },
        yAxis: {
         
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#555"],
            },
          },
          axisLine: {
            show: false,
          },
        },
        xAxis: {
            data:["00:00","02:00","04:00","06:00","08:00","10:00","12:00","14:00","16:00","18:00","20:00","22:00"],
          axisLine: {
            show: true,
            lineStyle: {
              color: "#555",
            },
          },
        },
        series: [
          {
            name: "a",
            type: "scatter",
            symbol: "circle", //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
            symbolSize: function (data) {
              return data[1]
            },
            label: {
              emphasis: {
                show: true,
                formatter: function (param) {
                  return param.data[1];
                },
                position: "top",
              },
            },
            itemStyle: {
              normal: {
                color: function(params){
                    const {seriesIndex, dataIndex, data, value} = params
                    console.log(value)
                    const colors = ['rgba(10,178,182,0.8)', 'rgba(201,191,9,0.8)', 'rgba(200,112,26,0.8)']
                    if(value[1] > 80) {
                        return colors[2]
                    } else if(value[1]> 40){
                        return colors[1]
                    } else {
                        return colors[0]
                    }
                    
                },
              },
            },
            data: [
              ["00:00",  90],
              ["02:00",  10],
              ["04:00",  14],
              ["06:00",  10],
              ["08:00",  50],
              ["10:00",  70],
              ["12:00",  70],
              ["14:00",  80],
              ["16:00",  30],
              ["18:00",  80],
              ["20:00",  45],
              ["22:00",  7]
      
            ],
          },
          
        ],
      };
      return option
}
// 立体圆形柱状图
export const cylinderOption = () => {
  let data1 =  [52.2,80.2,45,66,50]
  let xData =  ['类别一', '类别二', '类别三', '类别四', '类别五']
  let option = {
    backgroundColor: "#211b6a",
    toolbox: {
      show: false,
      right: '0',
      feature: {
        mark: { show: true },
        restore: { show: false },
        saveAsImage: {
          show: true,
          pixelRatio: 1,
          title: '保存为图片',
          type: 'png',
          lang: ['点击保存']
        }
      }
    },
    tooltip: {
      trigger: 'item',
      transitionDuration: 0,
      formatter: (params) => {
        return params.name + ' : ' + params.value + '件'
      }
    },
    grid: {
      left: '10%',
      top: '25%',
      right: '10%',
      bottom: '20%',
    },
    legend: {
      show: false,
      icon: 'circle',
      orient: 'horizontal',
      top: '90.5%',
      right: 'center',
      itemWidth: 16.5,
      itemHeight: 6,
      // itemGap: 30,
      textStyle: {
        // color: '#FFFFFF'
        color: '#C9C8CD',
        fontSize: 14
      }
    },
    xAxis: [{
      data: xData,
      axisLabel: {
        textStyle: {
          color: '#fff',
          fontSize: 12
        },
        // margin: 30, //刻度标签与轴线之间的距离。
      },

      axisLine: {
        show: true, //不显示x轴
        lineStyle: {
          color: '#fff'
        }
      },
      axisTick: {
        show: false //不显示刻度
      },
      boundaryGap: true,
      splitLine: {
        show: false,
        width: 0.08,
        lineStyle: {
          type: "solid",
          color: "#03202E"
        }
      }
    }],
    yAxis: [{
      name: "事件数量(件)",
      nameTextStyle: {
        color: '#fff',
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#fff',
          type: 'dashed'
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#fff"
        }
      },
      axisLabel: {
        textStyle: {
          color: '#fff',
          fontSize: 12
        },
      }
    }],
    series: [
      {//柱底圆片
        name: "",
        type: "pictorialBar",
        symbolSize: [20, 15],//调整截面形状
        symbolOffset: [0, 10],
        z: 12,
        itemStyle: {
          "normal": {
            label: {
              show: true, //开启显示
              position: 'top', //在上方显示
              textStyle: { //数值样式
                color: '#fff',
                fontSize: 12
              }
            },
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "#02D6EA"
            },
            {
              offset: 1,
              color: "#02D6EA"
            }
            ], false)
          }
        },
        data: data1
      },

      //柱体
      {
        name: '',
        type: 'bar',
        barWidth: 20,
        barGap: '0%',
        itemStyle: {
          "normal": {
            "color": {
              "x": 0,
              "y": 0,
              "x2": 0,
              "y2": 1,
              "type": "linear",
              "global": false,
              "colorStops": [{//第一节下面
                "offset": 0,
                "color": "#057DFE"
              }, {
                "offset": 1,
                "color": "#02D7EA"
              }]
            }
          }
        },

        data: data1
      },

      //柱顶圆片
      {
        name: "",
        type: "pictorialBar",
        symbolSize: [20, 10],//调整截面形状
        symbolOffset: [0, -8],
        z: 12,
        symbolPosition: "end",
        "itemStyle": {
          "normal": {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
              [{
                offset: 0,
                color: "#50A7FF"
              },
              {
                offset: 1,
                color: "#02D6EA"
              }
              ],
              false
            ),
          }
        },
        data: data1
      }
    ]
  }
  return option
}

//  多条柱状图
export const barsOption = () => {
  const option = {
    backgroundColor:"#211b6a",
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            backgroundColor: 'rgba(9, 24, 48, 0.5)',
            borderColor: 'rgba(75, 253, 238, 0.4)',
            textStyle: {
                color: '#CFE3FC',
            },
            borderWidth: 1,
        },
        grid: {
            top: '15%',
            right: '5%',
            left: "10%",
            bottom: '12%'
        },
        xAxis: [{
            name: "",
            type: 'category',
            data: ["00:00","02:00","04:00","06:00","08:00","10:00","12:00","14:00","16:00","18:00","20:00","22:00"],
            axisLine: {
                lineStyle: {
                    color: '#FFFFFF'
                }
            },
            axisLabel: {
                margin: 10,
                color: '#e2e9ff',
                textStyle: {
                    fontSize: 12
                },
            },
            axisTick: {
                show: false
            }
        }],
        yAxis: [{
            name: "空气质量分数(分)",
            axisLabel: {
                show: true,
                formatter: '{value}',
                color: '#e2e9ff',
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#FFFFFF'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.12)'
                }
            }
        }],
        series: [{
            type: 'bar',
            data: [75,76,79,65,64,61,59,57,56,45,44,40],
            barWidth: 5,
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(11,243,242,0.8)' // 0% 处的颜色
                    }, {
                        offset: 0.5,
                        color: 'rgba(255,240,0,0.8)' // 100% 处的颜色
                    },{
                        offset: 1,
                        color: 'rgba(255,96,96,0.8)' // 100% 处的颜色
                    }], false),
                  //   shadowColor: 'rgba(0,160,221,1)',
                  //   shadowBlur: 4,
                }
            },
            label: {
                normal: {
                    show: false,
                    lineHeight: 10,
                    formatter: '{c}',
                    position: 'top',
                    textStyle: {
                        color: '#00D6F9',
                        fontSize: 12
                    }
  
                }
            }
        }]
    };
    return option
}