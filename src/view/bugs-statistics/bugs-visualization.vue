<template>
  <Card>
    <div class="titleBlock">
      <p style="text-align: center">
      <span style="font-size: 1.5em">
        缺陷概况统计
      </span>
      </p>
    </div>
    <Divider style="background: #001529"></Divider>
    <Row :gutter="20">
      <i-col :md="24" :lg="6">
        <my-chart style="height: 300px;" :options="optionPie" :autoResize="true"></my-chart>
      </i-col>
      <i-col :md="24" :lg="6">
        <Row style="margin-left: 20px">
          <i-switch>
            <span slot="open">开</span>
          </i-switch>
        </Row>
        <my-chart style="height: 300px;" :options="topOption" :autoResize="true"></my-chart>
      </i-col>
      <i-col :md="24" :lg="12">
        <div>
          <Select v-model="modelMap" clearable class="qualitySelect" @on-change="onChange">
            <Option v-for="item in mapList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <DatePicker type="daterange" clearable style=" width: 200px;margin-right: 20px;" v-model="timeId"
                      :value="timeId"
                      @on-change="getScoreData" format="yyyy-MM-dd" placeholder="请选择日期">
          </DatePicker>
          <Select v-model="objects" multiple clearable style=" width: 200px;margin-right: 20px;"
                  @on-change="getObjects"
                  placeholder="请选择项目">
            <Option v-for="item in objectsList" :value="item.archivesId" :key="item.value">{{
              item.productName }}
            </Option>
          </Select>
          <div class="titleMapBlock">
            <p class="title" style="color: white">
              得分趋势图
            </p>
          </div>
        </div>
        <my-chart style="height: 300px;" :options="optionMap" :autoResize="true"></my-chart>
      </i-col>
    </Row>
    <Divider style="background: #001529"></Divider>
    <Row>
      <i-col :md="24" :lg="8">
        <my-chart style="height: 300px;" :options="thousandOption" :autoResize="true"></my-chart>
      </i-col>
      <i-col :md="24" :lg="8">
        <my-chart style="height: 300px;" :options="seriousOption" :autoResize="true"></my-chart>
      </i-col>
      <i-col :md="24" :lg="8">
        <my-chart style="height: 300px;" :options="bugsAverageOption" :autoResize="true"></my-chart>
      </i-col>
    </Row>
    <Divider style="background: #001529"></Divider>
    <Row :gutter="20">
      <i-col :md="24" :lg="24">
        <div>
          <Select v-model="targetMap" clearable class="qualitySelect" @on-change="onChangeTarget">
            <Option v-for="item in targetMapList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <DatePicker type="daterange" clearable style=" width: 200px;margin-right: 20px;" v-model="nowDate"
                      :value="nowDate" @on-change="getTargetData" format="yyyy-MM-dd" placeholder="请选择日期"
          >
          </DatePicker>
          <Select v-model="total" multiple clearable style=" width: 200px;margin-right: 20px;" @on-change="getTotal"
                  placeholder="请选择项目">
            <Option v-for="item in totalList" :value="item.archivesId" :key="item.value">{{ item.productName }}</Option>
          </Select>
          <Select v-model="target" clearable style=" width: 200px;margin-right: 20px;" @on-change="getChangeTarget">
            <Option v-for="item in targetList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <div class="titleMapBlock">
            <p class="title" style="color: white">
              指标趋势图
            </p>
          </div>
        </div>
      </i-col>
    </Row>
    <Row>
      <i-col :md="24" :lg="24">
        <my-chart style="height: 300px;" :options="optionTargetMap" :autoResize="true"></my-chart>
      </i-col>
    </Row>
  </Card>
</template>

<script>
  import moment from 'moment'
  import MyChart from '../../components/charts/index.vue'
  import {
    getMeanCloseTimeList,
    getSeriousBugRatioList,
    getProportionToPieList,
    getLatestList,
    getProductList,
    getScoresList,
    getTargetList,
    getThousandLineCodeDefectRateList
  } from '@/api/quality.js'

  export default {
    name: 'bugs-visualization',
    components: {
      MyChart
    },
    data() {
      return {
        modelMap: '0',
        mapList: [
          {
            value: '0',
            label: '请选择'
          },
          {
            value: '1',
            label: '最近一个季度'
          },
          {
            value: '2',
            label: '最近一个月'
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
        timeId: [],
        startTime: moment((new Date().getTime())).format('YYYY-MM-DD'),
        endTime: moment((new Date().getTime())).format('YYYY-MM-DD'),
        selectDisabled: false,
        dateDisabled: false,
        objects: [],
        objectsList: [],
        archivesId: '',
        productName: '',
        targetMap: '0',
        targetMapList: [
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
        nowDate: [],
        nowStartTime: moment((new Date().getTime())).format('YYYY-MM-DD'),
        nowEndTime: moment((new Date().getTime())).format('YYYY-MM-DD'),
        total: [],
        totalList: [],
        target: '0',
        targetList: [
          {
            value: '0',
            label: '全部指标'
          },
          {
            value: '1',
            label: '严重缺陷占比率'
          },
          {
            value: '2',
            label: '千行代码缺陷率'
          },
          {
            value: '3',
            label: '缺陷平均解决时间'
          }
        ],
        optionPie: {
          title: {
            text: '缺陷得分比重',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            // formatter: '{a} <br/>{b} : {c}%'
          },
          color: ['#319AFF', '#1BD175', '#FFA800'],
          legend: {
            orient: 'vertical',
            left: 'left',
            data: []
          },
          series: []
        },
        topOption: {
          color: ['#319AFF', '#1BD175', '#FFA800', '#FA76CD', '#9A66E4'],
          title: {
            text: '缺陷总得分TOP5',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            top: '8%',
            data: [],
            type: 'scroll'
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
                rotate: 0
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
        thousandOption: {
          color: ['#319AFF'],
          title: {
            text: '千行代码缺陷率',
            x: 'center'
          },
          legend: {
            data: [],
            top: '9%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: '{a} <br/>\
                       <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#319AFF"></span>\
                       \{b} : {c}%'
          },
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
              rotate: 0
            }
          },
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value} %'
              }
            }
          ],
          series: []
        },
        seriousOption: {
          color: ['#319AFF'],
          title: {
            text: '严重缺陷占比率',
            x: 'center'
          },
          legend: {
            data: [],
            top: '9%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: '{a} <br/>\
                       <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#319AFF"></span>\
                       \{b} : {c}%'
          },
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
              rotate: 0
            }
          },
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value} %'
              }
            }
          ],
          series: []
        },
        bugsAverageOption: {
          title: {
            text: '缺陷平均解决时间',
            x: 'center'
          },
          legend: {
            data: [],
            top: '9%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          color: ['#319AFF'],
          xAxis: {
            type: 'category',
            data: []
          },
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [],
        },
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
        optionTargetMap: {
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
        }
      }
    },
    methods: {
      getScoreData(data) {
        this.startTime = data[0]
        this.endTime = data[1]
        this.getScores()
      },
      onChangeTarget(data) {
        this.nowStartTime = ''
        this.nowEndTime = ''
        this.getScores(this.modelMap)
      },
      getObjects(data) {
        if (data)
          this.objects = data
        this.getScores()
      },
      getProduct() {
        getProductList().then(res => {
          this.objectsList = res.data
          if (this.objectsList[0].archivesId) {
            this.objects.push(this.objectsList[0].archivesId)
          }
        })
      },
      getProportionToPie() {
        getProportionToPieList().then(res => {
          this.optionPie.series = res.data.series
          this.optionPie.legend.data = res.data.legend
        })
      },
      getTargetData(data) {
        this.nowStartTime = data[0]
        this.nowEndTime = data[1]
      },
      getTotal(data) {
        if (data)
          this.total = data
        this.getTarget()
      },
      getTargetProduct() {
        getProductList().then(res => {
          this.totalList = res.data
          if (this.totalList[0].archivesId) {
            this.total.push(this.totalList[0].archivesId)
          }
        })
      },
      getLatest() {
        getLatestList().then(res => {
          this.topOption.series = res.data.series
          this.topOption.xAxis[0].data = res.data.xAxis
          this.topOption.legend.data = res.data.legend
        })
      },
      getScores() {
        let params = {
          startTime: this.startTime,
          endTime: this.endTime,
          sign: this.modelMap
        }
        if (!this.modelMap || !this.target)
          params.sign = 0
        getScoresList(this.objects, params).then(res => {
          this.optionMap.series = res.data.series
          this.optionMap.xAxis.data = res.data.xAxis
          this.optionMap.legend.data = res.data.legend
        })
      },
      onChange(data) {
        if (data !== 0) {
          this.startTime = ''
          this.endTime = ''
          this.dateDisabled = true
        }
        this.getScores(this.modelMap)
      },
      getChangeTarget(data) {
        if (data)
          this.target = data
        this.getTarget()
      },
      getThousandLineCodeDefectRate() {
        getThousandLineCodeDefectRateList().then(res => {
          this.thousandOption.series = res.data.series
          this.thousandOption.xAxis.data = res.data.xAxis
          this.thousandOption.legend.data = res.data.legend
        })
      },
      getBugsAverageTime() {
        getMeanCloseTimeList().then(res => {
          this.bugsAverageOption.series = res.data.series
          this.bugsAverageOption.xAxis.data = res.data.xAxis
          this.bugsAverageOption.legend.data = res.data.legend
        })
      },
      getSeriousBugsRatio() {
        getSeriousBugRatioList().then(res => {
          this.seriousOption.series = res.data.series
          this.seriousOption.xAxis.data = res.data.xAxis
          this.seriousOption.legend.data = res.data.legend
        })
      },
      getTarget() {
        let params = {
          startTime: this.startTime,
          endTime: this.endTime,
          sign: this.targetMap,
          target: this.target
        }
        if (!this.targetMap)
          params.sign = 0
        getTargetList(this.objects, params).then(res => {
          this.optionTargetMap.series = res.data.series
          this.optionTargetMap.xAxis.data = res.data.xAxis
          this.optionTargetMap.legend.data = res.data.legend
        })
      },
    },
    mounted() {
      this.getThousandLineCodeDefectRate()
      this.getBugsAverageTime()
      this.getSeriousBugsRatio()
      this.getProportionToPie()
      this.getLatest()
      this.getProduct()
      this.getScores()
      this.getTargetProduct()
      this.getTarget()
      this.timeId = [this.startTime, this.endTime]
      this.nowDate = [this.nowStartTime, this.nowEndTime]
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

  .titleMapBlock {
    background-color: #5cadff;
    width: 150px;
    float: right;
    line-height: 25px;
    border-radius: 10px;
  }

  .title {
    font-style: normal;
    font-size: 1.3em;
    text-align: center;
  }

  .qualitySelect {
    width: 150px;
    margin-right: 20px;
  }
</style>
