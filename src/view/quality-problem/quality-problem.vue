<template>
  <Card>
    <div class="titleBlock">
      <p class="title">
        项目质量问题统计（项目组）
      </p>
    </div>
    <Divider style="background: #001529"></Divider>
    <Row>
      <i-col :md="24" :lg="24">
        <div>
          <Select v-model="modelMap" clearable class="qualitySelect">
            <Option v-for="item in mapList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <DatePicker type="daterange" clearable class="qualitySelect" v-model="nowDate" :value="nowDate">
            <!--<Option v-for="item in qualityList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
          </DatePicker>
          <Select v-model="total" clearable class="qualitySelect">
            <Option v-for="item in totalList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <div class="titleMapBlock">
            <p class="title" style="color: white">
              质量问题燃尽图
            </p>
          </div>
        </div>
      </i-col>
    </Row>
    <Row>
      <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
        <my-chart style="height: 300px;" :options="optionMap" :autoResize="true"></my-chart>
      </i-col>
    </Row>
    <Row>
      <i-col :md="24" :lg="12">
        <my-chart style="height: 300px;" :options="longOption" :autoResize="true"></my-chart>
      </i-col>
      <i-col :md="24" :lg="12">
        <my-chart style="height: 300px;" :options="averageOption" :autoResize="true"></my-chart>
      </i-col>
    </Row>
    <Row>
      <i-col :md="24" :lg="12">
        <my-chart style="height: 300px;" :options="subjectOption" :autoResize="true"></my-chart>
      </i-col>
      <i-col :md="24" :lg="12">
        <my-chart style="height: 300px;" :options="peopleOption" :autoResize="true"></my-chart>
      </i-col>
    </Row>
  </Card>
</template>

<script>
import MyChart from '../../components/charts/index.vue'

export default {
  name: 'quality-problem',
  components: {
    MyChart
  },
  data () {
    return {
      nowDate: '',
      modelMap: '',
      total: '',
      mapList: [
        {
          value: '最近一个月',
          label: '最近一个月'
        },
        {
          value: '最近半年',
          label: '最近半年'
        },
        {
          value: '最近一个季度',
          label: '最近一个季度'
        },
        {
          value: '最近一年',
          label: '最近一年'
        }
      ],
      totalList: [
        {
          value: '全部来源',
          label: '全部来源'
        },
        {
          value: 'ASOCO',
          label: 'ASOCO'
        },
        {
          value: '星磐',
          label: '星磐'
        }
      ],
      optionMap: {
        color: ['#319AFF', '#1BD175', '#FFA800'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['new', 'solved', 'residue']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2019-09-1', '2019-09-2', '2019-09-3', '2019-09-4', '2019-09-5']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'new',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'solved',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'residue',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          }
        ]
      },
      longOption: {
        color: ['#319AFF'],
        title: {
          text: '最长持续时间问题',
          x: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['蔡海通', '梁园', '刘浩', '任松鑫', '刘浩'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'day',
            type: 'bar',
            barWidth: '40%',
            data: [19, 54, 45, 43, 15]
          }
        ]
      },
      averageOption: {
        color: ['#319AFF'],
        title: {
          text: '问题平均解决时间',
          x: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Asoco', '星磐', '智能工厂', '蓝区', '环保二期'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'day',
            type: 'bar',
            barWidth: '40%',
            data: [20, 23, 15, 35, 10]
          }
        ]
      },
      subjectOption: {
        color: ['#319AFF'],
        title: {
          text: '项目剩余问题个数',
          x: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Asoco', '星磐', '智能工厂', '蓝区', '环保二期'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'day',
            type: 'bar',
            barWidth: '40%',
            data: [20, 23, 15, 35, 10]
          }
        ]
      },
      peopleOption: {
        color: ['#319AFF'],
        title: {
          text: '责任人剩余问题个数',
          x: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['蔡海通', '梁园', '刘浩', '任松鑫', '刘浩'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'day',
            type: 'bar',
            barWidth: '40%',
            data: [20, 23, 15, 35, 10]
          }
        ]
      }
    }
  },
  methods: {},
  mounted () {
    this.modelMap = this.mapList[0].value
    this.total = this.totalList[0].value
    const myDate = new Date()
    const year = myDate.getFullYear() // 获取当前年份
    const month = myDate.getMonth() + 1 // 获取当前月份(0-11,0代表1月所以要加1);
    const day = myDate.getDate() // 获取当前日（1-31）
    this.nowDate = `${year}/${month}/${day} - ${year}/${month}/${day}`
  }
}
</script>
<style scoped>
  .titleBlock {
    background-color: #FFFFCC;
    width: 520px;
    height: 100px;
    margin: 0 auto;
    line-height: 100px;
    border-radius: 25px;
  }

  .titleBlock:hover {
    box-shadow: 5px 5px 5px grey;
  }

  .titleMapBlock {
    background-color: #5cadff;
    width: 250px;
    float: right;
    line-height: 25px;
    border-radius: 10px;
  }

  .title {
    font-style: normal;
    font-size: 1.8em;
    text-align: center;
  }

  .qualitySelect {
    width: 200px;
    margin-right: 10px;
  }
</style>
