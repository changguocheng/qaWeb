<template>
  <Card>
    <auto-form :formItems="formItems"></auto-form>
    <Button @click="evaluate">动态赋值</Button>
  </Card>
</template>

<script>
import autoForm from '_c/auto-form'

export default {
  components: {
    autoForm
  },
  data () {
    return {
      formItems: [
        {
          name: 'username',
          value: '',
          label: '用户名',
          formType: 'v-input',
          rules: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          options: {
            clearable: true
          }
        },
        {
          name: 'password',
          value: '',
          label: '密码',
          formType: 'v-input',
          rules: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          options: {
            type: 'password',
            placeholder: '请输入密码'
          }
        },
        {
          name: 'city',
          value: null,
          label: '所在城市',
          formType: 'v-select',
          rules: [
            { required: true, type: 'number', message: '请选择所在城市', trigger: 'change' }
          ],
          options: {
            selectLabelKey: 'name',
            selectValueKey: 'id',
            placeholder: '请选择所在城市',
            selectItems: [
              {
                id: 1,
                name: '北京'
              },
              {
                id: 2,
                name: '上海'
              },
              {
                id: 3,
                name: '深圳'
              }
            ]
          }
        },
        {
          name: 'gender',
          label: '性别',
          value: '',
          formType: 'v-radio',
          options: {
            radioItems: [
              {
                label: '男',
                value: 1
              },
              {
                label: '女',
                value: 2
              }
            ]
          },
          rules: [
            { required: true, type: 'number', message: '请选择性别', trigger: 'change' }
          ]
        },
        {
          name: 'interest',
          label: '兴趣爱好',
          value: [],
          formType: 'v-checkbox',
          options: {
            size: 'large',
            checkboxItems: [
              {
                label: '看书',
                value: 'read'
              },
              {
                label: '运动',
                value: 'sports'
              },
              {
                label: '睡觉',
                value: 'sleep'
              }
            ]
          }
        },
        {
          name: 'enable',
          value: 1,
          label: '启用',
          formType: 'v-switch',
          options: {
            trueValue: 1,
            falseValue: 0
          }
        }
      ]
    }
  },
  methods: {
    evaluate () {
      this.formItems[0].value = 'zhu'
      this.formItems[1].value = '123456'
      this.formItems[2].value = 3
    }
  }
}
</script>

<style scoped>

</style>
