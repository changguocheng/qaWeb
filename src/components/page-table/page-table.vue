<template>
  <div>
    <Table :loading="loading" :columns="tableColumns" :data="rows">
      <template slot-scope="{ row, index }" slot="action">
        <Button v-if="operation.edit"
                type="primary"
                size="small"
                style="margin-right: 5px"
                @click="edit(row)">{{ operation.edit.text ? operation.edit.text : '编辑' }}</Button>
        <Button v-if="operation.view"
                type="success"
                size="small"
                style="margin-right: 5px"
                @click="view(row)">{{ operation.view.text ? operation.view.text : '详情' }}</Button>
        <Button v-if="operation.delete"
                type="error"
                size="small"
                style="margin-right: 5px"
                @click="del(row)">{{ operation.delete.text ? operation.delete.text : '删除' }}</Button>
      </template>
    </Table>
    <div class="page-bar">
      <Page :current="page"
            :total="count"
            :page-size="pageSize"
            show-elevator
            show-sizer
            show-total
            @on-change="changePage"
            @on-page-size-change="changeSize"></Page>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-table',
  props: {
    columns: { // 定义列
      required: true,
      type: Array
    },
    getMethod: {
      required: true,
      type: Function
    },
    delMethod: {
      type: Function
    },
    params: { // 接口参数（可不传）
      type: Object,
      default: function () {
        return {}
      }
    },
    pageIndexKey: { // 页码key 默认为pageIndex
      type: String,
      default: 'pageIndex'
    },
    pageSizeKey: { // 每页数量key 默认为pageSize
      type: String,
      default: 'pageSize'
    },
    operation: {
      type: Object
    }
  },
  data () {
    return {
      loading: false, // loading效果
      tableColumns: [], // 表格列
      rows: [], // 获取的list数据
      count: 0, // 数据总条数
      page: 1, // 当前页数,
      pageSize: 10 // 每页显示条数
    }
  },
  mounted () {
    this.getData()
    this.initColumns()
  },
  methods: {
    /**
     * @description 获取列表数据
     */
    getData () {
      this.loading = true
      this.params[this.pageIndexKey] = this.page
      this.params[this.pageSizeKey] = this.pageSize
      this.getMethod(this.params).then(res => {
        this.loading = false
        this.rows = res.data.data.list
        this.count = res.data.data.count
        console.log(this.rows)
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    changePage (page) {
      this.page = page
      this.getData()
    },
    changeSize (size) {
      this.page = 1
      this.pageSize = size
      this.getData()
    },
    initColumns () {
      this.tableColumns = this.columns
      if (this.operation && this.tableColumns[this.tableColumns.length - 1].title !== '操作') {
        this.tableColumns[this.tableColumns.length] = {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      }
    },
    /**
     *  @description 刷新页面从第一页开始
     */
    refreshNew () {
      this.page = 1
      this.getData()
    },
    /**
     *  @description 刷新页面从当前页开始
     */
    refreshCurrent () {
      if (this.rows.length === 1 && this.page > 1) {
        this.page -= 1
      }
      this.getData()
    },
    edit (model) {
      this.$emit('edit', model)
    },
    /**
     * @description 删除数据
     * @param model
     */
    del (model) {
      let delId = this.operation.delete.key ? this.operation.delete.key : 'id'
      this.$Modal.confirm({
        title: '确定要删除这条数据吗？',
        onOk: () => {
          this.delMethod(model[delId]).then(res => {
            if (res.status === 200 && res.data.code === 0) {
              this.refreshCurrent()
              this.$Message.success('删除成功！')
              this.$emit('del-success')
            }
            if (this.operation.delete.on) {
              this.operation.delete.on()
            }
          })
        }
      })
    },
    view (model) {
      this.operation.view.on(model)
    }
  }
}
</script>

<style lang="less" scoped>
.page-bar {
  margin-top: 10px;
  text-align: right;
}
</style>
