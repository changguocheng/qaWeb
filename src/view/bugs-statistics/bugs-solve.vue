<template>
  <Card>
    <Row style="margin-bottom: 20px;">
      <i-col :md="24" :lg="8">
        <span style="margin-left: 20%">开始时间</span>
        <DatePicker type="date" style="margin-left: 20px" clearable v-model="startTime" :options="startOption"
                    @on-change="startTimeChange">
          <!--<Option v-for="item in qualityList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
        </DatePicker>
      </i-col>
      <i-col :md="24" :lg="8">
        <span style="margin-left: 20%">结束时间</span>
        <DatePicker type="date" style="margin-left: 20px" clearable v-model="endTime" :options="endOption"
                    @on-change="endTimeChange">
          <!--<Option v-for="item in qualityList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
        </DatePicker>
      </i-col>
      <i-col :md="24" :lg="8">
        <Button type="primary" style="margin-left: 10%;"
                @click="getMeanCloseTime(),getBugBurnout(),getSeriousBugRatioTime()">查询
        </Button>
      </i-col>
    </Row>
    <Row>
      <i-col :md="24" :lg="12">
        <my-chart style="height: 300px;" :options="averageCloseOption" :autoResize="true"></my-chart>
      </i-col>
      <i-col :md="24" :lg="12">
        <my-chart style="height: 300px;" :options="averageCloseTimeOption" :autoResize="true"></my-chart>
      </i-col>
    </Row>
    <Row>
      <i-col :md="24" :lg="24">
        <my-chart style="height: 300px;" :options="bugsMapOption" :autoResize="true"></my-chart>
      </i-col>
    </Row>
  </Card>
</template>

<script>
  import MyChart from '../../components/charts/index.vue'
  import {getMeanCloseTimeList, getBugBurnoutList} from '@/api/quality.js'

  export default {
    name: "bugs-solve",
    components: {
      MyChart,
      getMeanCloseTimeList,
      getBugBurnoutList
    },
    data() {
      return {
        startTime: '',
        endTime: '',
        startOption: {},
        endOption: {},
        averageCloseOption: {
          title: {
            text: '缺陷平均关闭时间',
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
        averageCloseTimeOption: {
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
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
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
          series: [
            {
              name: 'total_bugs',
              type: 'bar',
              data: []
            }
          ],
        },
        bugsMapOption: {
          title: {
            text: '缺陷燃尽图',
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
          color: ['#319AFF', '#1BD175'],
          xAxis: {
            type: 'category',
            data: []
          },
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: 'total_bugs',
              type: 'line',
              data: [7, 6.9, 9.5, 14.5, 18.4, 21.5]
            },
            {
              name: 'unresolved_bugs',
              type: 'line',
              data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2]
            }
          ]
        }
      }
    },
    methods: {
      startTimeChange: function (e) { //设置开始时间
        this.startTime = e;
        this.endOption = {
          disabledDate: date => {
            let startDateTime = this.startTime ? new Date(this.startTime).valueOf() - 86400000 : '';
            return date && (date.valueOf() < startDateTime);
          }
        }
      },
      endTimeChange: function (e) { //设置结束时间
        this.endTime = e;
        let endDateTime = this.endTime ? new Date(this.endTime).valueOf() : '';
        this.startOption = {
          disabledDate(date) {
            return date && date.valueOf() > endDateTime && date && date.valueOf() < Date.now() - 86400000;
          }
        }
      },
      getMeanCloseTime() {
        let params = {
          startTime: this.startTime,
          endTime: this.endTime
        }
        getMeanCloseTimeList(params).then(res => {
          this.averageCloseOption.series = res.data.series
          this.averageCloseOption.xAxis.data = res.data.xAxis
          this.averageCloseOption.legend.data = res.data.legend
        })
      },
      getSeriousBugRatioTime(){
        let params = {
          startTime: this.startTime,
          endTime: this.endTime
        }
        getMeanCloseTimeList(params).then(res => {
          this.averageCloseTimeOption.series = res.data.series
          this.averageCloseTimeOption.xAxis.data = res.data.xAxis
          this.averageCloseTimeOption.legend.data = res.data.legend
        })
      },
      getBugBurnout() {
        let params = {
          startTime: this.startTime,
          endTime: this.endTime
        }
        getBugBurnoutList(params).then(res => {
          this.bugsMapOption.series = res.data.series
          this.bugsMapOption.xAxis.data = res.data.xAxis
          this.bugsMapOption.legend.data = res.data.legend
        })
      },
    },
    mounted() {
      this.getBugBurnout()
    }
  }
</script>
<style lang="less" scoped>
  * {
    margin: 0;
  }
</style>
