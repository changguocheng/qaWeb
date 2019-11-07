<template>
  <div>
    <Card>
      <search-bar :form-items="formItems" @search="searchHandle" @reset="resetHandle"></search-bar>
    </Card>
  </div>
</template>

<script>
import searchBar from '_c/search-bar'

export default {
  components: {
    searchBar
  },
  data () {
    return {
      formItems: [
        {
          name: 'name',
          label: '名称',
          value: '',
          formType: 'v-input'
        },
        {
          name: 'email',
          label: 'email',
          value: '',
          formType: 'v-input'
        },
        {
          name: 'gender',
          label: '性别',
          value: null,
          formType: 'v-select',
          options: {
            selectItems: [
              {
                label: '男',
                value: 1
              },
              {
                label: '女',
                value: 2
              }
            ]
          }
        }
      ]
    }
  },
  methods: {
    searchHandle (model) {
      console.log(model)
    },
    resetHandle (model) {
      console.log(model)
    }
  }
}
</script>

<style scoped>

</style>
