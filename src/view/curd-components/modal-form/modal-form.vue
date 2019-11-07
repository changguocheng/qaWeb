<template>
  <div>
    <Card>
      <Row>
        <Col span="24">
          <pre> {{ JSON.stringify(info) }} </pre>
        </Col>
        <Col span="24">
          <Button @click="add" type="primary">新增</Button>
          <Button @click="edit" style="margin-left: 10px;">修改</Button>
        </Col>
      </Row>
      <modal-form ref="modal" :formItems="formItems" @saved="savedHandle"></modal-form>
    </Card>
  </div>
</template>

<script>
import modalForm from '_c/modal-form'

export default {
  components: {
    modalForm
  },
  data () {
    return {
      formItems: [
        {
          name: 'id',
          value: null
        },
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
        }
      ],
      info: {
        username: '',
        password: '',
        city: null
      }
    }
  },
  methods: {
    add () {
      this.$refs.modal.showAdd()
    },
    edit () {
      this.formItems[0].value = 1
      this.formItems[1].value = 'zhu'
      this.formItems[2].value = '123456'
      this.formItems[3].value = 3
      this.$refs.modal.showEdit()
    },
    savedHandle (formModel) {
      console.log(formModel)
      this.info.username = formModel.username
      this.info.password = formModel.password
      this.info.city = formModel.city
    }
  }
}
</script>

<style scoped>

</style>
