<template>
  <Row :gutter="20">
    <i-col :md="24" :lg="8">
      <my-chart style="height: 300px;" :options="reviewOption" :autoResize="true"></my-chart>
    </i-col>
    <i-col :md="24" :lg="8">
      <my-chart style="height: 300px;" :options="reviewOption" :autoResize="true"></my-chart>
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
</template>

<script>
  import MyChart from '../../components/charts/index.vue'

  export default {
    name: "review-related",
    components: {
      MyChart
    },
    data() {
      return {
        reviewOption: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          color: ['#319AFF'],
          legend: {
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          series: [
            {
              name: '直接访问',
              type: 'bar',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [320, 302, 301, 334, 390, 330, 320]
            }
          ]
        }
      }
    }
  }
</script>
<style scoped>

</style>
