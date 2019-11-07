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
        <Table border style="height: 300px;" :columns="columns1" :data="data1"></Table>
      </i-col>
      <i-col :md="24" :lg="8">
        <div align="right">
          <i-switch>
            <span slot="open">开</span>
          </i-switch>
        </div>
        <Row>
          <my-chart style="height: 300px;" :options="option" :autoResize="true"></my-chart>
        </Row>
      </i-col>
    </Row>
    <Divider style="background: #001529"></Divider>
    <Row>
      <i-col :md="24" :lg="24">
        <div style="margin-bottom: 10px">
          <Select v-model="modelQuality" clearable class="qualitySelect" @on-change="onChange"
                  @on-clear="getData">
            <Option v-for="item in qualityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <DatePicker type="daterange" clearable class="qualitySelect" v-model="timeId" :value="timeId"
                      @on-change="getSonarData" format="yyyy-MM-dd" placeholder="请选择日期">
          </DatePicker>
          <Select v-model="objects" clearable multiple class="qualitySelect" @on-change="getObjects"
                  placeholder="请选择项目">
            <Option v-for="(item,index) in objectsList" :value="item.key" :key="'object'+index">{{ item.name }}</Option>
          </Select>
        </div>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;margin-bottom: 20px;">
      <i-col :md="24" :lg="8">
        <my-chart style="height: 300px;" :options="optionQuality" :autoResize="true"></my-chart>
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
  import moment from 'moment'
  import MyChart from '../../components/charts/index.vue'
  import {
    getCoverageList,
    getCodeSmellsList,
    getRepetitionList,
    getBugsMoonsList,
    getKeyList,
    getCommentsList,
    postHistoryScoreDistributionList
  } from '@/api/sonar.js'

  export default {
    name: 'sonar-object',
    components: {
      MyChart
    },
    data() {
      return {
        timeId: [],
        startTime: moment((new Date().getTime())).format('YYYY-MM-DD'),
        endTime: moment((new Date().getTime())).format('YYYY-MM-DD'),
        key: '',
        sign: '',
        modelQuality: '0',
        objects: [],
        selectDisabled: false,
        dateDisabled: false,
        qualityList: [
          {
            value: '0',
            label: '请选择'
          },
          {
            value: '1',
            label: '最近一个月'
          },
          {
            value: '2',
            label: '最近一个季度'
          },
          {
            value: '3',
            label: '最近半年'
          },
          {
            value: '4',
            label: '最近一年'
          }
        ],
        objectsList: [],
        optionPie: {
          title: {
            text: '得分比重',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}%'
          },
          color: ['#319AFF', '#1BD175', '#FFA800', '#FA76CD', '#9A66E4'],
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['单元测试覆盖率', '千行代码缺陷率', '代码重复率', '异味', 'bugs']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 20, name: '单元测试覆盖率'},
                {value: 20, name: '千行代码缺陷率'},
                {value: 20, name: '代码重复率'},
                {value: 20, name: '异味'},
                {value: 20, name: 'bugs'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        },
        columns1: [
          {
            title: '指标',
            key: 'target'
          },
          {
            title: '阈值',
            key: 'threshold'
          },
          {
            title: 'Column 3',
            key: 'column'
          }
        ],
        data1: [
          {
            target: '单元测试覆盖率'
          },
          {
            target: '千行代码缺陷率'
          },
          {
            target: '代码重复率'
          },
          {
            target: '异味'
          },
          {
            target: 'bugs'
          }
        ],
        option: {
          title: {
            text: 'sonar总得分',
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
              type: 'bar',
              stack: '一企一档',
              barWidth: 35,
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '千行代码缺陷率',
              type: 'bar',
              stack: '一企一档',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '代码重复率',
              type: 'bar',
              stack: '一企一档',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '异味',
              type: 'bar',
              stack: '一企一档',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: 'bugs',
              type: 'bar',
              stack: '一企一档',
              data: [120, 132, 101, 134, 290, 230, 220]
            }
          ]
        },
        optionQuality: {
          title: {
            text: '代码质量总分',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis',
            confine: true
          },
          legend: {
            top: '8%',
            data: [],
            type: 'scroll'
          },
          color: ['#319AFF', '#1BD175', '#FFA800', '#FA76CD', '#9A66E4'],
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: []
        },
        optionUnit: {
          title: {
            text: '单元测试覆盖率',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{b} <br/>{a}: {c}%'
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
            data: []
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
            formatter: '{b} <br/>{a}: {c}%'
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
            boundaryGap: false,
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: []
        },
        optionRepeat: {
          title: {
            text: '千行代码重复率',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{b} <br/>{a}: {c}%'
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
            data: []
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
            boundaryGap: false,
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: []
        }
      }
    },
    methods: {
      getSonarData(data) {
        this.startTime = data[0]
        this.endTime = data[1]
        this.getData()
      },
      onChange(data) {
        this.startTime = ''
        this.endTime = ''
        this.getData(this.modelQuality)
      },
      getObjects(data) {
        if (data) {
          this.objects = data
        }
        this.getData()
      },
      getCoverage() {
        let params = {
          startTime: this.startTime,
          endTime: this.endTime
          // key: this.objects
        }
        getCoverageList(this.objects, params).then(res => {
          this.optionUnit.series = res.data.series
          this.optionUnit.xAxis.data = res.data.xAxis
        })
      },
      getCodeSmells() {
        let params = {
          startTime: this.startTime,
          endTime: this.endTime
          // key: this.objects
        }
        getCodeSmellsList(this.objects, params).then(res => {
          this.optionBad.series = res.data.series
          this.optionBad.xAxis.data = res.data.xAxis
        })
      },
      getComments() {
        let params = {
          startTime: this.startTime,
          endTime: this.endTime
          // key: this.objects
        }
        getCommentsList(this.objects, params).then(res => {
          this.optionNotes.series = res.data.series
          this.optionNotes.xAxis.data = res.data.xAxis
        })
      },
      getRepetition() {
        let params = {
          startTime: this.startTime,
          endTime: this.endTime
          // key: this.objects
        }
        getRepetitionList(this.objects, params).then(res => {
          this.optionRepeat.series = res.data.series
          this.optionRepeat.xAxis.data = res.data.xAxis
        })
      },
      getBugsMoons() {
        let params = {
          startTime: this.startTime,
          endTime: this.endTime
          // key: this.objects
        }
        getBugsMoonsList(this.objects, params).then(res => {
          this.optionBugs.series = res.data.series
          this.optionBugs.xAxis.data = res.data.xAxis
        })
      },
      getKey() {
        getKeyList().then(res => {
          this.objectsList = res.data
          if (this.objectsList[0].key) {
            this.objects.push(this.objectsList[0].key)
          }
        })
      },
      getHistoryScoreDistribution() {
        let params = {
          startTime: this.startTime,
          endTime: this.endTime,
          sign: this.modelQuality
        }
        if (!this.modelQuality) {
          params.sign = 0
        }
        postHistoryScoreDistributionList(this.objects, params).then(res => {
          this.optionQuality.series = res.data.series
          this.optionQuality.xAxis.data = res.data.xAxis
          this.optionQuality.legend.data = res.data.legend
        })
      },
      getData() {
        this.getCoverage()
        this.getComments()
        this.getCodeSmells()
        this.getRepetition()
        this.getBugsMoons()
        this.getHistoryScoreDistribution()
      }
    },
    mounted() {
      this.getKey()
      this.timeId = [this.startTime, this.endTime]
    }
  }
</script>
<style scoped>
  .qualitySelect {
    width: 200px;
    margin-right: 10px;
  }

  .titleBlock {
    background-color: #57a3f3;
    width: 15%;
    margin: 0 auto;
    line-height: 50px;
    border-radius: 12px;
  }
</style>
