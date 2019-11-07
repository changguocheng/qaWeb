<template>
  <div>
    <Card>
      <page-table :get-method="getMethod" :columns="columns"></page-table>
    </Card>
  </div>
</template>

<script>
import pageTable from '_c/page-table'
import { getCars } from '@/api/car'

export default {
  components: {
    pageTable
  },
  data () {
    return {
      getUrl: '/api/vehicle/queryAllByEnterpriseId',
      getMethod: getCars,
      columns: [
        {
          title: '所属单位',
          key: 'enterpriseName'
        },
        {
          title: '车牌号',
          key: 'plateNo'
        },
        {
          title: '车型',
          key: 'carType'
        },
        {
          title: '道路运输证',
          key: 'transportNum'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
