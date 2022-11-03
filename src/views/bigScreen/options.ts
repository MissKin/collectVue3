export const pieOption = (data:any) => {
  const option = {
    backgroundColor: "transparent",
    color: ["#EAEA26", "#906BF9", "#FE5656", "#01E17E", "#3DD1F9", "#FFAD05"],
    // title: {
    //     text: '网络/安全设备',
    //     left: '60',
    //     top: 0,
    //     textAlign: 'center',
    //     textStyle: {
    //         color: '#fff',
    //         fontSize: 14,
    //         fontWeight: 0
    //     }
    // },
    grid: {
      left: -100,
      top: 50,
      bottom: 10,
      right: 10,
      containLabel: true,
    },
    tooltip: {
      trigger: "item",
      formatter: "{b} : {c} ({d}%)",
    },
    polar: {},
    angleAxis: {
      interval: 1,
      type: "category",
      data: [],
      z: 10,
      axisLine: {
        show: false,
        lineStyle: {
          color: "#0B4A6B",
          width: 1,
          type: "solid",
        },
      },
      axisLabel: {
        interval: 0,
        show: false,
        color: "#0B4A6B",
        margin: 8,
        fontSize: 16,
      },
    },
    radiusAxis: {
      min: 40,
      max: 120,
      interval: 20,
      axisLine: {
        show: false,
        lineStyle: {
          color: "#0B3E5E",
          width: 1,
          type: "solid",
        },
      },
      axisLabel: {
        formatter: "{value} %",
        show: false,
        padding: [0, 0, 20, 0],
        color: "#0B3E5E",
        fontSize: 16,
      },
      splitLine: {
          show:false,
        lineStyle: {
          color: "#0B3E5E",
          width: 2,
          type: "solid",
        },
      },
      axisTick: {
        show:false
      }
    },
    calculable: true,
    series: [
      {
        type: "pie",
        radius: ["5%", "8%"],
        hoverAnimation: false,
        labelLine: {
          normal: {
            show: false,
            length: 30,
            length2: 55,
          },
          emphasis: {
            show: false,
          },
        },
        data: [
          {
            name: "",
            value: 0,
            itemStyle: {
              normal: {
                color: "#0B4A6B",
              },
            },
          },
        ],
      },
      {
        type: "pie",
        radius: ["80%", "82%"],
        hoverAnimation: false,
        labelLine: {
          normal: {
            show: false,
            length: 30,
            length2: 55,
          },
          emphasis: {
            show: false,
          },
        },
        name: "",
        data: [
          {
            name: "",
            value: 0,
            itemStyle: {
              normal: {
                color: "#0B4A6B",
              },
            },
          },
        ],
      },
      {
        stack: "a",
        type: "pie",
        radius: ["20%", "70%"],
        roseType: "area",
        zlevel: 10,
        label: {
          normal: {
            show: false,
            formatter: "{c}",
            textStyle: {
              fontSize: 12,
            },
            position: "outside",
          },
          emphasis: {
            show: true,
          },
        },
        labelLine: {
          normal: {
            show: false,
            length: 20,
            length2: 55,
          },
          emphasis: {
            show: false,
          },
        },
        data: data
      },
    ],
  };
  return option  
}