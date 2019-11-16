<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <div>
      <p>
        If ViewUI is successfully added to this project, you'll see an
        <code v-text="'<Button>'"></code>
        below
      </p>
      <Button type="primary">Button</Button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <div id="fund_fifo" style=" width:100%; height:600px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts' // 这里是你必须的，千万不能忘记！
// import axios from 'axios' // 这里是你必须的，千万不能忘记！
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    // HelloWorld
  },
  mounted: function () {
    this.drawTest()
  },
  methods: {
    drawTest () {
      var upColor = '#ec0000'
      var upBorderColor = '#8A0000'
      var downColor = '#00da3c'
      var downBorderColor = '#008F28'

      // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
      var data0 = splitData([
        ['2013/1/24', 2320.26, 2320.26, 2287.3, 2362.94],
        ['2013/1/25', 2300, 2291.3, 2288.26, 2308.38],
        ['2013/1/28', 2295.35, 2346.5, 2295.35, 2346.92],
        ['2013/1/29', 2347.22, 2358.98, 2337.35, 2363.8],
        ['2013/1/30', 2360.75, 2382.48, 2347.89, 2383.76],
        ['2013/1/31', 2383.43, 2385.42, 2371.23, 2391.82],
        ['2013/2/1', 2377.41, 2419.02, 2369.57, 2421.15],
        ['2013/2/4', 2425.92, 2428.15, 2417.58, 2440.38],
        ['2013/2/5', 2411, 2433.13, 2403.3, 2437.42],
        ['2013/2/6', 2432.68, 2434.48, 2427.7, 2441.73],
        ['2013/2/7', 2430.69, 2418.53, 2394.22, 2433.89],
        ['2013/2/8', 2416.62, 2432.4, 2414.4, 2443.03],
        ['2013/2/18', 2441.91, 2421.56, 2415.43, 2444.8]
      ])

      function splitData (rawData) {
        var categoryData = []
        var values = []
        for (var i = 0; i < rawData.length; i++) {
          categoryData.push(rawData[i].splice(0, 1)[0])
          values.push(rawData[i])
        }
        return {
          categoryData: categoryData,
          values: values
        }
      }

      function calculateMA (dayCount) {
        var result = []
        for (var i = 0, len = data0.values.length; i < len; i++) {
          if (i < dayCount) {
            result.push('-')
            continue
          }
          var sum = 0
          for (var j = 0; j < dayCount; j++) {
            sum += data0.values[i - j][1]
          }
          result.push(sum / dayCount)
        }
        return result
      }

      var option = {
        title: {
          text: '上证指数',
          left: 0
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
        },
        grid: {
          left: '10%',
          right: '10%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
          data: data0.categoryData,
          scale: true,
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: { show: false },
          splitNumber: 20,
          min: 'dataMin',
          max: 'dataMax'
        },
        yAxis: {
          scale: true,
          splitArea: {
            show: true
          }
        },
        dataZoom: [
          {
            type: 'inside',
            start: 50,
            end: 100
          },
          {
            show: true,
            type: 'slider',
            y: '90%',
            start: 50,
            end: 100
          }
        ],
        series: [
          {
            data: [2320, 2340, 2360, 2380, 2400, 2420, 2440],
            type: 'line'
          },
          {
            name: '日K',
            type: 'candlestick',
            data: data0.values,
            itemStyle: {
              normal: {
                color: upColor,
                color0: downColor,
                borderColor: upBorderColor,
                borderColor0: downBorderColor
              }
            },
            markPoint: {
              label: {
                normal: {
                  formatter: function (param) {
                    return param != null ? Math.round(param.value) : ''
                  }
                }
              },
              data: [
                {
                  name: 'XX标点',
                  coord: ['2013/5/31', 2300],
                  value: 2300,
                  itemStyle: {
                    normal: { color: 'rgb(41,60,85)' }
                  }
                },
                {
                  name: 'highest value',
                  type: 'max',
                  valueDim: 'highest'
                },
                {
                  name: 'lowest value',
                  type: 'min',
                  valueDim: 'lowest'
                },
                {
                  name: 'average value on close',
                  type: 'average',
                  valueDim: 'close'
                }
              ],
              tooltip: {
                formatter: function (param) {
                  return param.name + '<br>' + (param.data.coord || '')
                }
              }
            },
            markLine: {
              symbol: ['none', 'none'],
              data: [
                [
                  {
                    name: 'from lowest to highest',
                    type: 'min',
                    valueDim: 'lowest',
                    symbol: 'circle',
                    symbolSize: 10,
                    label: {
                      normal: { show: false },
                      emphasis: { show: false }
                    }
                  },
                  {
                    type: 'max',
                    valueDim: 'highest',
                    symbol: 'circle',
                    symbolSize: 10,
                    label: {
                      normal: { show: false },
                      emphasis: { show: false }
                    }
                  }
                ],
                {
                  name: 'min line on close',
                  type: 'min',
                  valueDim: 'close'
                },
                {
                  name: 'max line on close',
                  type: 'max',
                  valueDim: 'close'
                }
              ]
            }
          },
          {
            name: 'MA5',
            type: 'line',
            data: calculateMA(5),
            smooth: true,
            lineStyle: {
              normal: { opacity: 0.5 }
            }
          },
          {
            name: 'MA10',
            type: 'line',
            data: calculateMA(10),
            smooth: true,
            lineStyle: {
              normal: { opacity: 0.5 }
            }
          },
          {
            name: 'MA20',
            type: 'line',
            data: calculateMA(20),
            smooth: true,
            lineStyle: {
              normal: { opacity: 0.5 }
            }
          },
          {
            name: 'MA30',
            type: 'line',
            data: calculateMA(30),
            smooth: true,
            lineStyle: {
              normal: { opacity: 0.5 }
            }
          }

        ]
      }
      var myChart = echarts.init(document.getElementById('fund_fifo'))
      myChart.setOption(option)
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
