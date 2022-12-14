import * as echarts from "echarts/core";
import { init, EChartsOption, LinearGradientObject } from "echarts";



// 3D
// 生成扇形的曲面参数方程，用于 series-surface.parametricEquation internalDiameterRatio为0
export function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
  // 计算
  let midRatio = (startRatio + endRatio) / 2;

  let startRadian = startRatio * Math.PI * 2;
  let endRadian = endRatio * Math.PI * 2;
  let midRadian = midRatio * Math.PI * 2;

  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
      isSelected = false;
  }

  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== 'undefined' ? k : 1 / 3;

  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
  let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  let hoverRate = isHovered ? 1.05 : 1;

  // 返回曲面参数方程
  return {

      u: {
          min: -Math.PI,
          max: Math.PI * 3,
          step: Math.PI / 32
      },

      v: {
          min: 0,
          max: Math.PI * 2,
          step: Math.PI / 20
      },

      x: function(u, v) {
          if (u < startRadian) {
              return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          if (u > endRadian) {
              return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
      },

      y: function(u, v) {
          if (u < startRadian) {
              return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          if (u > endRadian) {
              return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
      },

      z: function(u, v) {
          if (u < -Math.PI * 0.5) {
              return Math.sin(u);
          }
          if (u > Math.PI * 2.5) {
              return Math.sin(u) * h * .1;
          }
          return Math.sin(v) > 0 ? 1 * h * .1 : -1;
      }
  };
}
// 生成模拟 3D 饼图的配置项
// internalDiameterRatio 内部环度占比
export function getPie3D(pieData:Array<any>, internalDiameterRatio) {
  let series = [];
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  let legendData = [];
  let k = typeof internalDiameterRatio !== 'undefined' ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3;

  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i++) {

      sumValue += pieData[i].value;

      let seriesItem = {
          name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
          type: 'surface',
          parametric: true,
          wireframe: {
              show: false
          },
          pieData: pieData[i],
          shading: 'lambert',
          pieStatus: {
              selected: false,
              hovered: false,
              k: k
          },
          center: ['40%', '50%']
      };

      if (typeof pieData[i].itemStyle != 'undefined') {

          let itemStyle = {};

          typeof pieData[i].itemStyle.color != 'undefined' ? itemStyle.color = pieData[i].itemStyle.color : null;
          typeof pieData[i].itemStyle.opacity != 'undefined' ? itemStyle.opacity = pieData[i].itemStyle.opacity : null;

          seriesItem.itemStyle = itemStyle;
      }
      series.push(seriesItem);
  }

  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  for (let i = 0; i < series.length; i++) {
      endValue = startValue + series[i].pieData.value;

      series[i].pieData.startRatio = startValue / sumValue;
      series[i].pieData.endRatio = endValue / sumValue;
      series[i].parametricEquation = getParametricEquation(series[i].pieData.startRatio, series[i].pieData.endRatio, false, false, k, 150); // 150是圆柱体的厚度

      startValue = endValue;

      legendData.push(series[i].name);
  }
  // 添加一个平台的series 增加标注
  series.push({
    name: 'pie2d',
    type: 'pie',
    label: {
      opacity: 1,
      fontSize: 13,
      lineHeight: 20,
      borderWidth: 0,
      borderColor: 'transparent',
      textBorderColor:'transparent',
      // position:'right',
      formatter: '{c|{c}\n}{b|{b}}',
      rich:{
        c: {
          // color: '#5b90fa',
          fontSize: 18
        },
        b: {
          color: '#fff',
          fontSize: 12
        }
      }
    },
    labelLine: {
      length: 30,
      length2:30
    },
    startAngle: 30, //起始角度，支持范围[0, 360]。
    clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
    radius: ['0', '60%'],
    center: ['50%', '50%'],
    data: pieData,
    itemStyle: {
        opacity: 0,
    },
  });
  // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
  series.push({
      name: 'mouseoutSeries',
      type: 'surface',
      parametric: true,
      wireframe: {
          show: false
      },
      itemStyle: {
          opacity: 0
      },
      parametricEquation: {
          u: {
              min: 0,
              max: Math.PI * 2,
              step: Math.PI / 20
          },
          v: {
              min: 0,
              max: Math.PI,
              step: Math.PI / 20
          },
          x: function(u, v) {
              return Math.sin(v) * Math.sin(u) + Math.sin(u);
          },
          y: function(u, v) {
              return Math.sin(v) * Math.cos(u) + Math.cos(u);
          },
          z: function(u, v) {
              return Math.cos(v) > 0 ? 0.1 : -0.1;
          }
      }
  });

    const total = 160
    const unit = '件'
    const smallTitle = '待处理'
  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  let option = {
      //animation: false,
      color: ['#00fafe', '#5b90fa'],
      legend: {
        show: false,
          data: legendData
      },
      title: {
        text: '{a|' + total + '}{b|' + unit + '}\n{c|' + smallTitle + '}',
        x: 'center',
        y: '42%',
        textStyle: {
          rich: {
              a: {
                  fontSize: 25,
                  color: '#fff',
                  fontWeight:'600',
              },
              b: {
                  fontSize: 16,
                  color: '#fff',
                  padding: [0, 0, 2, 0]
              },
              c: {
                  fontSize: 12,
                  color: '#ff6060',
                  padding: [5, 0]
              }
          }
        }
      },
      tooltip: {
        formatter: params => {
          if (params.seriesName !== 'mouseoutSeries' && params.componentSubType === 'pie') {
            const dataValue = params.data.value
            return `${params.seriesName}<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>${dataValue}`;
          }
        }
      },
      labelLine: {
        show: true,
        lineStyle: {
            color: '#7BC0CB'
        }
    },
    label: {
        show: true,
        color: 'inherit',
        position: 'outside',
        rich: {
            b: {
                color: '#7BC0CB',
                fontSize: 12,
                lineHeight: 20
            },
            c: {
                fontSize: 16,
            },
        },
        formatter: '{b|{b} \n}{c|{c}}',

    },
      xAxis3D: {
          min: -1,
          max: 1
      },
      yAxis3D: {
          min: -1,
          max: 1
      },
      zAxis3D: {
          min: -1,
          max: 1
      },
      grid3D: {
          show: false,

          top:'top',
          left: 'left',

          boxHeight: 2,
          boxDepth: 100,
          // viewControl: {//3d效果可以放大、旋转等，请自己去查看官方配置
          //     alpha: 40,
          //     // beta: 40,
          //     rotateSensitivity: 0,
          //     zoomSensitivity: 0,
          //     panSensitivity: 0,
          //     autoRotate: false
          // },
          viewControl: {
            distance: 150, // 立体圆的大小
            projection: 'perspective',
            alpha: 45, // 视角绕 x 轴，即上下旋转的角度
            beta: 0,
            zoomSensitivity: 0, // 缩放
            rotateSensitivity: 0,
            panSensitivity: 0,
            autoRotate: false,
            animation:false
          },
          //后处理特效可以为画面添加高光、景深、环境光遮蔽（SSAO）、调色等效果。可以让整个画面更富有质感。
          //配置这项会出现锯齿，请自己去查看官方配置有办法解决
          // postEffect: {
          //     enable: true,
          //     bloom: {
          //         enable: true,
          //         bloomIntensity: 0.1
          //     },
          //     SSAO: {
          //         enable: true,
          //         quality: 'medium',
          //         radius: 2
          //     }
          // }
      },
      series: series
  };
  return option;
}
// 传入数据生成 option
