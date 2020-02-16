<template>
  <!-- <img src="./assets/logo.png">
    <div>
      <p>
        If ViewUI is successfully added to this project, you'll see an
        <code v-text="'<Button>'"></code>
        below
      </p>
      <Button type="primary">Button</Button>
  </div>-->
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>Item 1
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>Item 2
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-analytics"></Icon>Item 3
            </MenuItem>
            <MenuItem name="4">
              <Icon type="ios-paper"></Icon>Item 4
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '16px 0'}">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem>
        </Breadcrumb>
        <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
          <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
              <Menu :active-name="active_name" theme="light" width="auto" :open-names="open_name">
                <Submenu name="1">
                  <template slot="title">
                    <Icon type="ios-navigate"></Icon>Home
                  </template>
                  <router-link to="/">
                    <MenuItem name="1-1">介绍</MenuItem>
                  </router-link>
                  <router-link to="/test">
                    <MenuItem name="1-2">测试</MenuItem>
                  </router-link>
                  <router-link to="/selectShare">
                    <MenuItem name="1-3">选股</MenuItem>
                  </router-link>
                </Submenu>
                <Submenu name="2">
                  <template slot="title">
                    <Icon type="ios-keypad"></Icon>策略
                  </template>
                  <router-link to="/threeFork">
                    <MenuItem name="2-1">三金叉</MenuItem>
                  </router-link>
                  <router-link to="/kdj">
                    <MenuItem name="2-2">KDJ金叉</MenuItem>
                  </router-link>
                  <router-link to="/macd">
                    <MenuItem name="2-3">MACD金叉</MenuItem>
                  </router-link>
                  <MenuItem name="2-4">5日均线金叉</MenuItem>
                </Submenu>
                <Submenu name="3">
                  <template slot="title">
                    <Icon type="ios-analytics"></Icon>历史记录
                  </template>
                  <MenuItem name="3-1">Option 1</MenuItem>
                  <MenuItem name="3-2">Option 2</MenuItem>
                </Submenu>
              </Menu>
            </Sider>
            <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
              <router-view></router-view>
            </Content>
          </Layout>
        </Content>
      </Layout>
      <Footer class="layout-footer-center">
        2020 &copy; xiangyt
        <Icon type="logo-github" />
        <a href="https://github.com/xiangyt/share">Github</a>
      </Footer>
      <BackTop></BackTop>
    </Layout>
  </div>

  <!-- <Slider v-model="value" range />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  <div id="fund_fifo" style=" width:100%; height:600px;"></div>-->
</template>
<script>
// import echarts from 'echarts' // 这里是你必须的，千万不能忘记！
// import axios from 'axios' // 这里是你必须的，千万不能忘记！
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  data: function () {
    return {
      open_name: ['1', '2'],
      active_name: '1-1'
    }
  },
  components: {
    // HelloWorld
  },
  mounted: function () {
    // this.drawTest()
  },
  methods: {
    // drawTest () {
    //   var vm = this
    //   axios
    //     .get(`/share/600536/180`, {
    //       withCredentials: true // 加了这段就可以跨域了
    //     })
    //     .then(function (res) {
    //       console.log(res)
    //       vm.drawKChart(res.data)
    //     })
    // },
    // drawKChart (data) {
    //   var source = []
    //   for (const v of data) {
    //     source.push([v.time, v.start, v.end, v.min, v.max])
    //     console.log(v)
    //   }

    //   // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
    //   var data0 = splitData(source)

    //   var upColor = '#ec0000'
    //   var upBorderColor = '#8A0000'
    //   var downColor = '#00da3c'
    //   var downBorderColor = '#008F28'
    //   function splitData (rawData) {
    //     var categoryData = []
    //     var values = []
    //     for (var i = 0; i < rawData.length; i++) {
    //       categoryData.push(rawData[i].splice(0, 1)[0])
    //       values.push(rawData[i])
    //     }
    //     return {
    //       categoryData: categoryData,
    //       values: values
    //     }
    //   }

    //   function calculateMA (dayCount) {
    //     var result = []
    //     for (var i = 0, len = data0.values.length; i < len; i++) {
    //       if (i < dayCount) {
    //         result.push('-')
    //         continue
    //       }
    //       var sum = 0
    //       for (var j = 0; j < dayCount; j++) {
    //         sum += data0.values[i - j][1]
    //       }
    //       result.push(sum / dayCount)
    //     }
    //     return result
    //   }

    //   var option = {
    //     title: {
    //       text: '上证指数',
    //       left: 0
    //     },
    //     tooltip: {
    //       trigger: 'axis',
    //       axisPointer: {
    //         type: 'cross'
    //       }
    //     },
    //     legend: {
    //       data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
    //     },
    //     grid: {
    //       left: '10%',
    //       right: '10%',
    //       bottom: '15%'
    //     },
    //     xAxis: {
    //       type: 'category',
    //       data: data0.categoryData,
    //       scale: true,
    //       boundaryGap: false,
    //       axisLine: { onZero: false },
    //       splitLine: { show: false },
    //       splitNumber: 20,
    //       min: 'dataMin',
    //       max: 'dataMax'
    //     },
    //     yAxis: {
    //       scale: true,
    //       splitArea: {
    //         show: true
    //       }
    //     },
    //     dataZoom: [
    //       {
    //         type: 'inside',
    //         start: 50,
    //         end: 100
    //       },
    //       {
    //         show: true,
    //         type: 'slider',
    //         y: '90%',
    //         start: 50,
    //         end: 100
    //       }
    //     ],
    //     series: [
    //       // {
    //       //   data: [2320, 2340, 2360, 2380, 2400, 2420, 2440],
    //       //   type: 'line'
    //       // },
    //       {
    //         name: '日K',
    //         type: 'candlestick',
    //         data: data0.values,
    //         itemStyle: {
    //           normal: {
    //             color: upColor,
    //             color0: downColor,
    //             borderColor: upBorderColor,
    //             borderColor0: downBorderColor
    //           }
    //         },
    //         markPoint: {
    //           label: {
    //             normal: {
    //               formatter: function (param) {
    //                 return param != null ? Math.round(param.value) : ''
    //               }
    //             }
    //           },
    //           data: [
    //             {
    //               name: 'XX标点',
    //               coord: ['2013/5/31', 2300],
    //               value: 2300,
    //               itemStyle: {
    //                 normal: { color: 'rgb(41,60,85)' }
    //               }
    //             },
    //             {
    //               name: 'highest value',
    //               type: 'max',
    //               valueDim: 'highest'
    //             },
    //             {
    //               name: 'lowest value',
    //               type: 'min',
    //               valueDim: 'lowest'
    //             },
    //             {
    //               name: 'average value on close',
    //               type: 'average',
    //               valueDim: 'close'
    //             }
    //           ],
    //           tooltip: {
    //             formatter: function (param) {
    //               return param.name + '<br>' + (param.data.coord || '')
    //             }
    //           }
    //         },
    //         markLine: {
    //           symbol: ['none', 'none'],
    //           data: [
    //             [
    //               {
    //                 name: 'from lowest to highest',
    //                 type: 'min',
    //                 valueDim: 'lowest',
    //                 symbol: 'circle',
    //                 symbolSize: 10,
    //                 label: {
    //                   normal: { show: false },
    //                   emphasis: { show: false }
    //                 }
    //               },
    //               {
    //                 type: 'max',
    //                 valueDim: 'highest',
    //                 symbol: 'circle',
    //                 symbolSize: 10,
    //                 label: {
    //                   normal: { show: false },
    //                   emphasis: { show: false }
    //                 }
    //               }
    //             ],
    //             {
    //               name: 'min line on close',
    //               type: 'min',
    //               valueDim: 'close'
    //             },
    //             {
    //               name: 'max line on close',
    //               type: 'max',
    //               valueDim: 'close'
    //             }
    //           ]
    //         }
    //       },
    //       {
    //         name: 'MA5',
    //         type: 'line',
    //         data: calculateMA(5),
    //         smooth: true,
    //         lineStyle: {
    //           normal: { opacity: 0.5 }
    //         }
    //       },
    //       {
    //         name: 'MA10',
    //         type: 'line',
    //         data: calculateMA(10),
    //         smooth: true,
    //         lineStyle: {
    //           normal: { opacity: 0.5 }
    //         }
    //       },
    //       {
    //         name: 'MA20',
    //         type: 'line',
    //         data: calculateMA(20),
    //         smooth: true,
    //         lineStyle: {
    //           normal: { opacity: 0.5 }
    //         }
    //       },
    //       {
    //         name: 'MA30',
    //         type: 'line',
    //         data: calculateMA(30),
    //         smooth: true,
    //         lineStyle: {
    //           normal: { opacity: 0.5 }
    //         }
    //       }
    //     ]
    //   }
    //   var myChart = echarts.init(document.getElementById('fund_fifo'))
    //   myChart.setOption(option)
    // }
  }
}
</script>
<style scoped>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
router-link {
  /* font-size: 12px; */
  color: #000000;
  text-decoration: none;
}
.layout {
  /* border: 0px solid #d7dde4; */
  background: #f5f7f9;
  position: relative;
  /* border-radius: 4px; */
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
}
</style>
