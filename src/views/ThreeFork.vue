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
          style="margin-left: 20px"
          icon="md-refresh"
          @click="refresh()"
        >Refresh</Button>
        <Button
          type="primary"
          shape="circle"
          style="margin-left: 20px"
          :loading="updateCD > 0"
          icon="md-refresh"
          @click="update()"
        >
          <span v-if="updateCD == 0">Update</span>
          <span v-else>{{updateCD}}s</span>
        </Button>
        <Button
          type="primary"
          shape="circle"
          style="margin-left: 20px"
          icon="md-arrow-round-forward"
          @click="toDongCai()"
        >东方财富</Button>
      </FormItem>
    </Form>

    <Table
      :loading="loading"
      :row-class-name="rowClassName"
      :columns="KLine ? colOne : cols"
      :data="shareData"
    ></Table>

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
      start: 90,
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
      dongCaiCode: '',
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
      updateCD: 0,
      cols: [
        {
          title: '股票代码',
          align: 'center',
          key: 'code',
          filters: [{
            label: '科创板',
            value: '688'
          }, {
            label: '创业板',
            value: '300'
          }, {
            label: '主板',
            value: ''
          }],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value) {
              return row.code.startsWith(value)
            } else {
              return !row.code.startsWith('688') && !row.code.startsWith('300')
            }
          },
          render: (h, params) => {
            return h('div', [
              h('a', {
                on: {
                  click: () => {
                    var code = this.shareData[params.index].code
                    this.query(`/api/threeFork/only/${code}`)
                    this.drawKChart(code)
                  }
                }
              }, `${this.shareData[params.index].code}`)
            ])
          }
        },
        {
          title: '股票名称',
          align: 'center',
          key: 'name'
        },
        {
          title: '买入日期',
          align: 'center',
          key: 'buy_time_str',
          sortable: true,
          filters: [],
          filterMultiple: false,
          filterMethod (value, row) {
            return row.buy_time_str === value
          }
        },
        {
          title: '买入价格',
          align: 'center',
          key: 'buy_price',
          sortable: true
        },
        {
          title: '半年内涨停次数',
          align: 'center',
          key: 'max_count',
          sortable: true
        },
        {
          title: '股东减少',
          align: 'center',
          key: 'holder',
          render: (h, params) => {
            if (this.shareData[params.index].holder) {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'md-checkmark'
                  }
                })
              ])
            }
            return h('div', [
              h('Icon', {
                props: {
                  type: 'md-close'
                }
              })
            ])
          }
        },
        {
          title: '同比净利润增加',
          align: 'center',
          key: 'profit',
          render: (h, params) => {
            if (this.shareData[params.index].profit) {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'md-checkmark'
                  }
                })
              ])
            }
            return h('div', [
              h('Icon', {
                props: {
                  type: 'md-close'
                }
              })
            ])
          }
        },
        // {
        //   title: '是否回购',
        //   align: 'center',
        //   key: 'buy_back',
        //   render: (h, params) => {
        //     if (this.shareData[params.index].buy_back) {
        //       return h('div', [
        //         h('Icon', {
        //           props: {
        //             type: 'md-checkmark'
        //           }
        //         })
        //       ])
        //     }
        //     return h('div', [
        //       h('Icon', {
        //         props: {
        //           type: 'md-close'
        //         }
        //       })
        //     ])
        //   }
        // },
        {
          title: '是否减持',
          align: 'center',
          key: 'hold_more',
          render: (h, params) => {
            if (!this.shareData[params.index].hold_more) {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'md-checkmark'
                  }
                })
              ])
            }
            return h('div', [
              h('Icon', {
                props: {
                  type: 'md-close'
                }
              })
            ])
          }
        },
        {
          title: '净资产',
          align: 'center',
          key: 'net_asset',
          sortable: true
        },
        {
          title: 'Action',
          key: 'action',
          align: 'center',
          // fixed: 'right',
          width: 140,
          render: (h, params) => {
            var query = (url) => {
              var vm = this
              axios.get(url, {
                withCredentials: true // 加了这段就可以跨域了
              }).then(function (res) {
                console.log(res)
                if (res.status === 200) {
                  vm.$Notice.success({
                    title: '成功'
                  })
                } else {
                  vm.$Notice.error({
                    title: '失败'
                  })
                }
              })
            }
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    var code = this.shareData[params.index].code
                    query(`/api/threeFork/buy/${code}`)
                  }
                }
              }, '买入'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    var code = this.shareData[params.index].code
                    query(`/api/threeFork/sale/${code}`)
                  }
                }
              }, '卖出')
            ])
          }
        }
      ],
      colOne: [
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
    toDongCai () {
      if (this.dongCaiCode.length === 6) {
        window.open(`http://data.eastmoney.com/stockdata/${this.dongCaiCode}.html`, '_blank')
      } else if (this.formInline.code.length === 6) {
        window.open(`http://data.eastmoney.com/stockdata/${this.formInline.code}.html`, '_blank')
      }
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
          vm.cols[2].filters = []
          var filter = {}
          for (const d of res.data) {
            filter[d.buy_time_str] = true
          }
          for (const str in filter) {
            if (filter.hasOwnProperty(str)) {
              vm.cols[2].filters.push({
                label: str,
                value: str
              })
            }
          }
          vm.shareData.push(...res.data)
        }
        vm.loading = false
      })
    },
    queryCode (code) {
      this.query(`/api/threeFork/only/${code}`)
      this.drawKChart(code)
    },
    refresh () {
      this.query(`/api/threeFork/recent/all`)
      this.KLine = false
      this.dongCaiCode = ''
    },
    update () {
      var vm = this
      axios.get(`/api/threeFork/update`, {
        withCredentials: true // 加了这段就可以跨域了
      }).then(function (res) {
        console.log(res)
        if (res.status === 200) {
          vm.updateCD = 300
          var inter = setInterval(() => {
            vm.updateCD--
            if (vm.updateCD <= 0) {
              clearInterval(inter)
            }
          }, 1000)
        }
      })
    },
    drawKChart (code) {
      this.KLine = true
      this.dongCaiCode = code
      axios.get(`/api/kline/${code}`, {
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
