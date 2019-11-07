<template>
  <Card>
    <Row :gutter="10">
      <i-col :md="24" :lg="12">
        <my-chart style="height: 300px;" :options="cakeOption" :autoResize="true"></my-chart>
      </i-col>
      <i-col :md="24" :lg="12">
        <my-chart style="height: 300px;" :options="ringOption" :autoResize="true"></my-chart>
      </i-col>
    </Row>
  </Card>
</template>

<script>
import MyChart from '../../components/charts/index.vue'

export default {
  name: 'process-quality',
  components: {
    MyChart
  },
  data () {
    return {
      cakeOption: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: ['#319AFF', '#1BD175', '#FFA800', '#FA76CD', '#9A66E4'],
        legend: {
          data: ['单元测试覆盖率', '千行代码缺陷率', '代码重复率', '异味', 'bugs']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '单元测试覆盖率' },
              { value: 310, name: '千行代码缺陷率' },
              { value: 234, name: '代码重复率' },
              { value: 135, name: '异味' },
              { value: 1548, name: 'bugs' }
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
      ringOption: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: ['#319AFF', '#1BD175', '#FFA800', '#FA76CD', '#9A66E4'],
        legend: {
          data: ['单元测试覆盖率', '千行代码缺陷率', '代码重复率', '异味', 'bugs']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '55%'],
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '单元测试覆盖率' },
              { value: 310, name: '千行代码缺陷率' },
              { value: 234, name: '代码重复率' },
              { value: 135, name: '异味' },
              { value: 1548, name: 'bugs' }
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
      }
    }
  }
}
</script>
<style scoped>

</style>
