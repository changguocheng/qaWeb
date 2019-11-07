<template>
  <Card>
    <div class="titleBlock">
      <p style="text-align: center">
      <span style="font-size: 2.5em">
        可维护性
      </span>
      </p>
    </div>
    <Divider style="background: #001529"></Divider>
    <Row :gutter="20">
      <i-col :md="24" :lg="8">
        <my-chart style="height: 300px;" :options="optionPie" :autoResize="true"></my-chart>
      </i-col>
      <i-col :md="24" :lg="8">
        <Table border :columns="thresholdColumns" :data="thresholdData"></Table>
      </i-col>
      <i-col :md="24" :lg="8">
        <Row>
          <Select v-model="objects" clearable multiple style="width: 200px;margin-right: 20px;" @on-change="getObjects"
                  placeholder="请选择项目">
            <Option v-for="(item,index) in objectsList" :value="item.key" :key="'object'+index">{{ item.name }}</Option>
          </Select>
          <i-switch>
            <span slot="open">开</span>
          </i-switch>
        </Row>
        <Row>
          <my-chart style="height: 300px;" :options="option" :autoResize="true"></my-chart>
        </Row>
      </i-col>
    </Row>
    <Divider style="background: #001529"></Divider>
    <Row :gutter="20">
      <i-col :md="24" :lg="8">
        <my-chart style="height: 300px;" :options="optionScore" :autoResize="true"></my-chart>
      </i-col>
      <i-col :md="24" :lg="8">
        <my-chart style="height: 300px;" :options="optionUnit" :autoResize="true"></my-chart>
      </i-col>
      <i-col :md="24" :lg="8">
        <my-chart style="height: 300px;" :options="optionNotes" :autoResize="true"></my-chart>
      </i-col>
      <i-col :md="24" :lg="8">
        <my-chart style="height: 300px;" :options="optionBad" :autoResize="true"></my-chart>
      </i-col>
      <i-col :md="24" :lg="8">
        <my-chart style="height: 300px;" :options="optionRepeat" :autoResize="true"></my-chart>
      </i-col>
      <i-col :md="24" :lg="8">
        <my-chart style="height: 300px;" :options="optionBugs" :autoResize="true"></my-chart>
      </i-col>
    </Row>
  </Card>
</template>

<script>
import MyChart from '../../components/charts/index.vue'
import { getKeyList } from '@/api/sonar.js'
import {
  getProportionList,
  getAllProportionAndThresholdList,
  getCoverageBarList,
  getCodeSmellsBarList,
  getRepetitionBarList,
  getBugsBarList,
  getCommentsBarList,
  getLatestTotalScoreList
} from '@/api/sonarHome.js'

export default {
  name: 'sonar-home',
  components: {
    MyChart
  },
  data () {
    return {
      modelQuality: '',
      objects: [],
      objectsList: [],
      optionPie: {
        title: {
          text: '得分比重',
          x: 'center'
        },
        tooltip: {
          trigger: 'item'
          // formatter: '{a} <br/>{b} : {c}%'
        },
        color: ['#319AFF', '#1BD175', '#FFA800', '#FA76CD', '#9A66E4', '#ed4014'],
        legend: {
          orient: 'vertical',
          left: 'left',
          data: []
        },
        series: []
      },
      thresholdColumns: [
        {
          title: '指标',
          key: 'name'
        },
        {
          title: '阈值',
          key: 'threshold'
        },
        {
          title: '占比',
          key: 'proportion'
        }
      ],
      thresholdData: [],
      option: {
        title: {
          text: '项目总得分',
          x: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: '{b}<br />\
                    <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#319AFF"></span>\
                    {a0}：{c0}%<br />\
                    <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#1BD175"></span>\
                    {a1}：{c1}<br />\
                    <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#FFA800"></span>\
                    {a2}：{c2}%<br />\
                    <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#FA76CD"></span>\
                    {a3}：{c3}%<br />\
                    \<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#9A66E4"></span>\
                    {a4}：{c4}<br />'
        },
        color: ['#319AFF', '#1BD175', '#FFA800', '#FA76CD', '#9A66E4'],
        legend: {
          top: '8%',
          data: []
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
            data: [],
            axisLabel: {
              interval: 0,
              rotate: 20
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: []
      },
      optionQuality: {
        title: {
          text: '代码质量总分',
          x: 'center'
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{a} <br/>{b} : {c}%'
        },
        color: ['#319AFF'],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2019-09-01', '2019-09-02', '2019-09-03', '2019-09-04', '2019-09-05']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'uac',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          }
        ]
      },
      optionScore: {
        title: {
          text: '代码质量总分',
          x: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        color: ['#319AFF', '#1BD175', '#FFA800', '#FA76CD', '#9A66E4'],
        legend: {
          top: '8%',
          data: ['单元测试覆盖率', '千行代码缺陷率', '代码重复率', '异味', 'bugs']
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
            data: ['一企一档', 'iots', 'uac', '环保二期', '危化品']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '单元测试覆盖率',
            type: 'line',
            stack: '一企一档',
            barWidth: 35,
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '千行代码缺陷率',
            type: 'line',
            stack: '一企一档',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '代码重复率',
            type: 'line',
            stack: '一企一档',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '异味',
            type: 'line',
            stack: '一企一档',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'bugs',
            type: 'line',
            stack: '一企一档',
            data: [120, 132, 101, 134, 290, 230, 220]
          }
        ]
      },
      optionUnit: {
        title: {
          text: '单元测试覆盖率',
          x: 'center'
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{a} <br/>\
                       <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#319AFF"></span>\
                       \{b} : {c}%'
        },
        color: ['#319AFF'],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLabel: {
            interval: 0,
            rotate: 30
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value} %'
          }
        },
        series: []
      },
      optionNotes: {
        title: {
          text: '注释率',
          x: 'center'
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{a} <br/>\
                       <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#319AFF"></span>\
                       \{b} : {c}%'
        },
        color: ['#319AFF'],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLabel: {
            interval: 0,
            rotate: 30
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value} %'
          }
        },
        series: []
      },
      optionBad: {
        title: {
          text: '千行代码坏味道',
          x: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        color: ['#319AFF'],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLabel: {
            interval: 0,
            rotate: 30
          }
        },
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: []
      },
      optionRepeat: {
        title: {
          text: '千行代码重复率',
          x: 'center'
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{a} <br/>\
                       <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#319AFF"></span>\
                       \{b} : {c}%'
        },
        color: ['#319AFF'],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLabel: {
            interval: 0,
            rotate: 30
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value} %'
          }
        },
        series: []
      },
      optionBugs: {
        title: {
          text: '千行代码bugs',
          x: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        color: ['#319AFF'],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLabel: {
            interval: 0,
            rotate: 30
          }
        },
        yAxis: {
          type: 'value'
        },
        series: []
      }
    }
  },
  methods: {
    getKey () {
      getKeyList().then(res => {
        this.objectsList = res.data
        if (this.objectsList[0].key) {
          this.objects.push(this.objectsList[0].key)
        }
      })
    },
    getProportion () {
      getProportionList().then(res => {
        this.optionPie.series = res.data.series
        this.optionPie.legend.data = res.data.legend
      })
    },
    getAllProportionAndThreshold () {
      getAllProportionAndThresholdList().then(res => {
        this.thresholdData = res.data.obj
      })
    },
    getObjects (data) {
      if (data) { this.objects = data }
      this.getLatestTotalScore()
    },
    getCoverageBar () {
      getCoverageBarList().then(res => {
        this.optionUnit.series = res.data.series
        this.optionUnit.xAxis.data = res.data.xAxis
      })
    },
    getCommentsBar () {
      getCommentsBarList().then(res => {
        this.optionNotes.series = res.data.series
        this.optionNotes.xAxis.data = res.data.xAxis
      })
    },
    getCodeSmellsBar () {
      getCodeSmellsBarList().then(res => {
        this.optionBad.series = res.data.series
        this.optionBad.xAxis.data = res.data.xAxis
      })
    },
    getRepetitionBar () {
      getRepetitionBarList().then(res => {
        this.optionRepeat.series = res.data.series
        this.optionRepeat.xAxis.data = res.data.xAxis
      })
    },
    getBugsMoonsBar () {
      getBugsBarList().then(res => {
        this.optionBugs.series = res.data.series
        this.optionBugs.xAxis.data = res.data.xAxis
      })
    },
    getLatestTotalScore () {
      getLatestTotalScoreList(this.objects).then(res => {
        this.option.series = res.data.series
        this.option.xAxis[0].data = res.data.xAxis
        this.option.legend.data = res.data.legend
      })
    }
  },
  mounted () {
    this.getKey()
    this.getAllProportionAndThreshold()
    this.getProportion()
    this.getCoverageBar()
    this.getCodeSmellsBar()
    this.getRepetitionBar()
    this.getBugsMoonsBar()
    this.getCommentsBar()
    // this.getLatestTotalScore()
  }
}
</script>
<style scoped>
  .titleBlock {
    background-color: #57a3f3;
    width: 15%;
    margin: 0 auto;
    line-height: 50px;
    border-radius: 12px;
  }
</style>
