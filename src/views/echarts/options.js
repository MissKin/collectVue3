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

// 象形柱形图
export const pictorialBar = () => {
  const option = {
    backgroundColor: 'rgba(12,17,47)',
    tooltip: {
      confine: true,
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      backgroundColor: 'rgba(3, 16, 42, 0.85)',
      borderColor: 'rgba(114, 190, 253, 0.6)',
      borderWidth: 1,
      padding: 12,
    },
    grid: {
      left: '8%',
      top: '15%',
      bottom: '15%',
      right: '8%',
    },
    xAxis: {
      data: ['需要解决问题', '历史遗留问题', '桃谷绘里香', '重大项目问题'],
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.45)',
          width: 1, // 这里是为了突出显示加上的
        },
      },
      axisLabel: {
        color: '#ffffff',
        fontSize: 12,
        fontFamily: 'Bebas',
      },
    },
    yAxis: [{
      name: '问题数量(个)',
      type: 'value',
      min: 0,
      minInterval: 1,
      nameTextStyle: {
        fontSize: 12,
        color: '#ffffff',
        padding: [0, 24, 4, 0],
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(186, 231, 255, 0.09)',
          type: 'solid',
        },
      },
      splitArea: { show: false },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: 12,
        color: '#ffffff',
        fontFamily: 'Bebas',
      },
    }, {
      name: '完成率(%)',
      type: 'value',
      min: 0,
      max: 100,
      nameTextStyle: {
        fontSize: 12,
        color: '#ffffff',
        padding: [0, 0, 4, 24],
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(186, 231, 255, 0.09)',
          type: 'solid',
        },
      },
      splitArea: { show: false },
      axisLabel: {
        color: '#ffffff',
        fontSize: 12,
        fontFamily: 'Bebas',
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    }],
    dataZoom: [],
    series: [{
      type: 'pictorialBar',
      barCategoryGap: '20px',
      symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
      label: {
        show: false,
      },
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(2, 209, 250, 1)',
          }, {
            offset: 1,
            color: 'rgba(0, 164, 255, 0.11)',
          }]),
        },
        emphasis: {
          opacity: 1,
        },
      },
      data: [4675, 2375, 5319, 2275],
      z: 10,
    },
    {
      type: 'line',
      smooth: false,
      yAxisIndex: 1,
      data: [31, 80, 71, 85],
      symbolSize: 8,
      itemStyle: {
        normal: {
          color: '#fd8c18',
        },
      },
    }],
  };

  return option
}

export const lineOption = ({ seriesData = [], xData = [] }) => {
  const option = {
    backgroundColor: 'transparent',
    grid: {
      left: '10%',
      right: 0,
      top: '15%',
      bottom: '15%',
    },
    xAxis: {
      data: xData,
      position: 'bottom',
      type: 'category',
      axisLine: {
        show: true,
        lineStyle: {
          type: 'solid',
          color: 'gray',
          opacity: 1,
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
        rotate: 0,
        fontSize: 12,
        color: '#fff',
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#ECF1F6', '#ECF1F6'],
          width: 0,
          type: 'dashed',
        },
      },
      gridIndex: 0,
    },
    legend: {
      show: false,
      top: '4%',
      itemHeight: 9,
      itemWidth: 9,
      textStyle: {
        color: '#A1D5FF',
        fontSize: 12,
      },
      // data: [{
      //   name: '累计增速',
      //   // 强制设置图形为圆。
      //   icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAqklEQVQ4jWNk+L9lCQMDgxEDdcA5Fqhh2VQycCoTlQyCgxFoIAsBeRkGBoZUBgYGYyj/LAMDw2wGBoYn5BgoC4o1BgYGHiQxWwYGBkNoqniMTRM+L6egGQYDPFA5rACfgcZ45EzIMZAsgM/As3jkzpDjwrkMDAxfsIh/gcqRbOAjaGweZmBg+AbFh6Fij3BpIpQOQUmjnoAaol1IFhihhcM5aJ6lHDAwnAMAagkZ1p1ZuI4AAAAASUVORK5CYII=',
      //   // 设置文本为红色
      //   textStyle: {
      //     color: 'white'
      //   }
      // }],
      itemGap: 12, // 设置间距
    },
    tooltip: {
      trigger: 'axis',
      textStyle: { fontSize: '12' },
      formatter: (params) => {
        const rander = params
          .map(
            (item) =>
              `<div>${item.seriesName}: ${
                item.seriesType !== 'line' ? item.value : item.value + '%'
              }</div>`,
          )
          .join('');
        return `
              <div>${params[0].axisValue}</div>
              ${rander}
          `;
      },
    },
    yAxis: [
      {
        name: '(辆)',
        nameTextStyle: {
          align: 'left',
          color: '#fff',
          padding: [0, 0, 0, -35],
          fontSize: 12,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          rotate: 0,
          fontSize: 12,
          color: '#fff',
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255,255,255,0.3)',
          },
        },
      },
    ],
    series: [
      {
        name: '车流量',
        type: 'line',
        label: {
          show: false,
        },
        data: seriesData,
        lineStyle: {
          width: 3,
          color: '#ff6060', // 线条颜色
          borderColor: '#ff6060',
        },
        symbol: 'none',
        // symbolSize: '20',
        areaStyle: {
          // 区域填充样式
          // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: '#ff6060',
              },
              // {
              //   offset: 0.8,
              //   color: '#073a45'
              // },
              {
                offset: 1,
                color: '#081b34',
              },
            ],
            false,
          ),
        },
      },
    ],
  };
  return option;
};
