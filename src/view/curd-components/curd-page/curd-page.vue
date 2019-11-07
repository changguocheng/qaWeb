<template>
  <div>
    <Card>
      <curd-page :get-method="getMethod"
                 :columns="columns"
                 :search-items="searchItems"
                 :form-items="formItems"
                 :add-method="addMethod"
                 :edit-method="editMethod"
                 :del-method="delMethod"
                 :operation="operation"></curd-page>
    </Card>
  </div>
</template>

<script>
import curdPage from '_c/curd-page'
import { getEnterpriseList } from '@/api/enterprise'
import { addCar, delCar, editCar, getCars } from '@/api/car'

export default {
  components: {
    curdPage
  },
  data () {
    return {
      enterprises: [],
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
      ],
      operation: {
        edit: {},
        delete: {}
      },
      searchItems: [
        {
          name: 'enterpriseId',
          label: '所属企业',
          value: '',
          formType: 'v-select',
          rules: [
            { required: true, type: 'number', message: '请选择所属单位', trigger: 'change' }
          ],
          options: {
            selectItems: [],
            selectLabelKey: 'enterpriseName',
            selectValueKey: 'id',
            width: 200
          }
        },
        {
          name: 'plateNo',
          label: '车牌号',
          value: '',
          formType: 'v-input'
        }
      ],
      addMethod: addCar,
      delMethod: delCar,
      editMethod: editCar,
      formItems: [
        {
          name: 'id',
          value: ''
        },
        {
          name: 'enterpriseId',
          label: '所属企业',
          value: '',
          formType: 'v-select',
          rules: [
            { required: true, type: 'number', message: '请选择所属单位', trigger: 'change' }
          ],
          options: {
            selectItems: [],
            selectLabelKey: 'enterpriseName',
            selectValueKey: 'id'
          }
        },
        {
          name: 'plateNo',
          label: '车牌号',
          value: '',
          formType: 'v-input',
          rules: [
            { required: true, message: '请输车牌号', trigger: 'blur' }
          ]
        },
        {
          name: 'carType',
          label: '车型号',
          value: '',
          formType: 'v-input',
          rules: [
            { required: true, message: '请输车型号', trigger: 'blur' }
          ]
        },
        {
          name: 'transportNum',
          label: '道路运输证号',
          value: '',
          formType: 'v-input',
          rules: [
            { required: true, message: '请输道路运输证号', trigger: 'blur' }
          ]
        }
      ]
    }
  },
  created () {
    this.getEnterprises()
  },

  methods: {
    getEnterprises () {
      getEnterpriseList({ pageIndex: 1, pageSize: 1000 }).then(res => {
        this.enterprises = res.data.data.list
        this.formItems[1].options.selectItems = this.enterprises
        this.searchItems[0].options.selectItems = this.enterprises
      })
    }
  }
}
</script>

<style scoped>

</style>
