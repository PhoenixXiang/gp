<template>
  <div class="test">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <h1>按条件选股</h1>
    <Collapse v-model="panel">
      <Panel name="1">
        设置
        <div slot="content">
          <Form :model="formItem" :label-width="80">
            <FormItem label="Input">
              <Input v-model="formItem.input" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="Select">
              <Select v-model="formItem.select">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
              </Select>
            </FormItem>
            <FormItem label="DatePicker">
              <Row>
                <Col span="11">
                  <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                  <TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="Radio">
              <RadioGroup v-model="formItem.radio">
                <Radio label="male">Male</Radio>
                <Radio label="female">Female</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="Checkbox">
              <CheckboxGroup v-model="formItem.checkbox">
                <Checkbox label="Eat"></Checkbox>
                <Checkbox label="Sleep"></Checkbox>
                <Checkbox label="Run"></Checkbox>
                <Checkbox label="Movie"></Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="Switch">
              <i-switch v-model="formItem.switch" size="large">
                <span slot="open">On</span>
                <span slot="close">Off</span>
              </i-switch>
            </FormItem>
            <FormItem label="Slider">
              <Slider v-model="formItem.slider" range></Slider>
            </FormItem>
            <FormItem label="Text">
              <Input
                v-model="formItem.textarea"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="Enter something..."
              ></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit(formItem)">Submit</Button>
              <Button style="margin-left: 8px">Cancel</Button>
            </FormItem>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <Table stripe :loading="loading" :columns="col" :data="data"></Table>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios' // 这里是你必须的，千万不能忘记！

export default {
  name: 'selectShare',
  components: {
    // HelloWorld
  },
  data () {
    return {
      formItem: {
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: ''
      },
      loading: false,
      panel: '1',
      col: [
        {
          title: '股票代码',
          align: 'center',
          key: 'code'
        },
        {
          title: '股票名称',
          align: 'center',
          key: 'name'
        },
        {
          title: '半年内涨停次数',
          align: 'center',
          key: 'max_count',
          sortable: true
        },
        {
          title: '净资产',
          align: 'center',
          key: 'net_asset',
          sortable: true
        },
        {
          title: '现价',
          align: 'center',
          key: 'price',
          sortable: true
        }
      ],
      data: [
        {
          code: 'xxxxxx',
          name: '测试',
          max_count: 0,
          net_asset: 0,
          price: 10
        }
      ]
    }
  },
  methods: {
    handleSubmit (data) {
      console.log(data)
      var vm = this
      vm.loading = true
      axios.post(`/api/SelectShare`, data, {
        withCredentials: true // 加了这段就可以跨域了
      }).then(function (res) {
        console.log(res)
        if (res.status === 200) {
          vm.data = []
          vm.data.push(...res.data)
        }
        vm.loading = false
      })
    }
  }
}
</script>
