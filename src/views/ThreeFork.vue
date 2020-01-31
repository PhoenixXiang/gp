<template>
  <div>
    <h1>三金叉</h1>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="code">
        <Input type="text" v-model="formInline.code" placeholder="Code">
          <Icon type="ios-search"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <!-- <Button type="primary" @click="handleSubmit('formInline')">Signin</Button> -->
        <Button
          type="primary"
          shape="circle"
          icon="ios-search"
          @click="queryCode(formInline.code)"
        >Search</Button>
        <Button
          type="primary"
          shape="circle"
          v-if="KLine"
          style="margin-left: 20px"
          @click="refresh()"
        >Refresh</Button>
      </FormItem>
    </Form>

    <Table :loading="loading" :row-class-name="rowClassName" :columns="cols" :data="shareData"></Table>

    <div id="kline" v-if="KLine" style=" width:100%; height:600px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts' // 这里是你必须的，千万不能忘记！
import axios from 'axios' // 这里是你必须的，千万不能忘记！

function calculateMA (dayCount, data) {
  var result = []
  for (var i = 0, len = data.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-')
      continue
    }
    var sum = 0
    for (var j = 0; j < dayCount; j++) {
      sum += data[i - j][1]
    }
    result.push(sum / dayCount)
  }
  return result
}

function getOption (rawData) {
  var dates = rawData.map(function (item) {
    return item[0]
  })

  var data = rawData.map(function (item) {
    return [+item[1], +item[2], +item[5], +item[6]]
  })

  return {
    // backgroundColor: '#21202D',
    legend: {
      data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],
      inactiveColor: '#777',
      textStyle: {
        color: 'blue'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        animation: false,
        type: 'cross',
        lineStyle: {
          color: '#376df4',
          width: 2,
          opacity: 1
        }
      }
    },
    xAxis: {
      type: 'category',
      data: dates,
      axisLine: { lineStyle: { color: '#8392A5' } }
    },
    yAxis: {
      scale: true,
      axisLine: { lineStyle: { color: '#8392A5' } },
      splitLine: { show: false }
    },
    grid: {
      bottom: 80
    },
    dataZoom: [{
      textStyle: {
        color: '#8392A5'
      },
      start: 80,
      end: 100,
      handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      handleSize: '80%',
      dataBackground: {
        areaStyle: {
          color: '#8392A5'
        },
        lineStyle: {
          opacity: 0.8,
          color: '#8392A5'
        }
      },
      handleStyle: {
        color: '#fff',
        shadowBlur: 3,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOffsetX: 2,
        shadowOffsetY: 2
      }
    }, {
      type: 'inside'
    }],
    animation: false,
    series: [
      {
        type: 'candlestick',
        name: '日K',
        data: data,
        itemStyle: {
          color: '#FD1050',
          color0: '#0CF49B',
          borderColor: '#FD1050',
          borderColor0: '#0CF49B'
        }
      },
      {
        name: 'MA5',
        type: 'line',
        data: calculateMA(5, data),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 1
        }
      },
      {
        name: 'MA10',
        type: 'line',
        data: calculateMA(10, data),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 1
        }
      },
      {
        name: 'MA20',
        type: 'line',
        data: calculateMA(20, data),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 1
        }
      },
      {
        name: 'MA30',
        type: 'line',
        data: calculateMA(30, data),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 1
        }
      }
    ]
  }
}

export default {
  name: 'ThreeFork',
  data () {
    return {
      formInline: {
        code: ''
      },
      ruleInline: {
        code: [
          { required: true, ype: 'string', min: 6, max: 6, message: '必须长度为6', trigger: 'blur' }
        ]
      },
      KLine: false,
      loading: false,
      cols: [
        {
          title: '股票代码',
          align: 'center',
          key: 'code'
        },
        {
          title: '买入日期',
          align: 'center',
          key: 'buy_time_str'
        },
        {
          title: '买入价格',
          align: 'center',
          key: 'buy_price'
        },
        {
          title: '收益率',
          align: 'center',
          key: 'earnings'
        }, {
          title: 'Action',
          key: 'action',
          align: 'center',
          // fixed: 'right',
          width: 80,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    var code = this.shareData[params.index].code
                    this.query(`/api/threeFork/only/${code}`)
                    this.drawKChart(`/api/kline/${code}`)
                  }
                }
              }, '详情')
            ])
          }
        }
      ],
      shareData: []
    }
  },
  mounted: function () {
    this.query(`/api/threeFork/recent/all`)
  },
  methods: {
    rowClassName (row, index) {
      // if (index === 1) {
      //   return 'demo-table-info-row'
      // }
      if (row.earnings < 0) {
        return 'demo-table-error-row'
      }
      return ''
    },
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Code：${this.shareData[index].code}<br>Date：${this.shareData[index].buy_time_str}<br>Sale：${this.shareData[index].sale_time_str}`
      })
    },
    query (url) {
      var vm = this
      vm.loading = true
      axios.get(url, {
        withCredentials: true // 加了这段就可以跨域了
      }).then(function (res) {
        console.log(res)
        if (res.status === 200) {
          vm.shareData = []
          vm.shareData.push(...res.data)
        }
        vm.loading = false
      })
    },
    queryCode (code) {
      this.query(`/api/threeFork/only/${code}`)
      this.drawKChart(`/api/kline/${code}`)
    },
    refresh () {
      this.query(`/api/threeFork/recent/all`)
      this.KLine = false
    },
    drawKChart (url) {
      this.KLine = true
      axios.get(url, {
        withCredentials: true // 加了这段就可以跨域了
      }).then(function (res) {
        console.log(res)
        if (res.status === 200) {
          var data = []
          for (const d of res.data) {
            data.push([d.time_str, d.start, d.end, 0, 0, d.min, d.max])
          }
          // vm.shareData = []
          // vm.shareData.push(...res.data)
          var myChart = echarts.init(document.getElementById('kline'))
          myChart.setOption(getOption(data))
        }
      })
    }
  }
}
</script>

<style>
.ivu-table .demo-table-info-row td {
  background-color: #2db7f5;
  color: #fff;
}
.ivu-table .demo-table-error-row td {
  background-color: #ff6600;
  color: #fff;
}
</style>
