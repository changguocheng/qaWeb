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
    <Row :gutter="10">
      <i-col :md="24" :lg="12">
        <my-chart style="height: 300px;" :options="surveyOption" :autoResize="true"></my-chart>
      </i-col>
      <i-col :md="24" :lg="12">
        <my-chart style="height: 300px;" :options="gradeOption" :autoResize="true"></my-chart>
      </i-col>
    </Row>
    <Divider style="background: #001529"></Divider>
    <Row>
      <i-col :md="24" :lg="24">
        <my-chart style="height: 300px;" :options="optionBugsMap" :autoResize="true"></my-chart>
      </i-col>
    </Row>
    <Divider orientation="left">缺陷统计表格（默认时间：周）</Divider>
    <Row>
      <i-col :md="24" :lg="18" style="margin-bottom: 20px">
        <div v-if="cardList">
          <Checkbox
            :indeterminate="indeterminate"
            :value="checkAll"
            @click.prevent.native="handleCheckAll"
          >全选
          </Checkbox>
          <CheckboxGroup v-model="tableColumnsChecked" @on-change="checkAllGroupChange">
            <Checkbox label="projectName" style="margin-right: 10px">项目</Checkbox>
            <Checkbox label="newAdd" style="margin-right: 10px">新增缺陷</Checkbox>
            <Checkbox label="newAddSerious" style="margin-right: 10px">新增严重缺陷</Checkbox>
            <Checkbox label="discovered" style="margin-right: 10px">已发现缺陷</Checkbox>
            <Checkbox label="resolved" style="margin-right: 10px">已关闭缺陷</Checkbox>
            <Checkbox label="unresolved" style="margin-right: 10px">未关闭缺陷</Checkbox>
            <Checkbox label="reopen" style="margin-right: 10px">重新打开缺陷</Checkbox>
            <Checkbox label="deadlineUnresolved" style="margin-right: 10px">到期未解决缺陷</Checkbox>
            <Checkbox label="unresolvedSerious" style="margin-right: 10px">未关闭严重缺陷</Checkbox>
          </CheckboxGroup>
        </div>
      </i-col>
      <i-col style="margin-bottom:10px;" align="right">
        <Tooltip content="筛选列">
          <Icon type="ios-list" size="30" @click.native="listClick"/>
        </Tooltip>
        <Tooltip content="导出">
          <Icon type="md-download" size="24" @click.native="downloadClick"/>
        </Tooltip>
      </i-col>
    </Row>
    <Row>
      <Table border :columns="bugCountColumns" :data="bugCountData" ref="bugCountTable"
             @on-row-click="getRowTitle"
      >
      </Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="totalPage" :current="currentPage" @on-change="changePage"
                show-total></Page>
        </div>
      </div>
    </Row>
    <Modal v-model="modalList" :footer-hide="true" :title="modalTitle" width=900>
      <Table border :columns="bugAddressColumns" :data="bugAddressData" ref="table">
      </Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="totalTablePage" :current="currentTablePage"
                show-total></Page>
        </div>
      </div>
    </Modal>
  </Card>
</template>

<script>
  import MyChart from '../../components/charts/index.vue'
  import {getBugSurveyList, getBugGradeList, getBugDistributionList} from '@/api/quality.js'

  export default {
    name: 'bugs-survey',
    components: {
      MyChart
    },
    data() {
      return {
        currentPage: 1,
        totalPage: 0,
        currentTablePage: 1,
        totalTablePage: 0,
        cardList: false,
        clickColumns: false,
        modalList: false,
        modalTitle: '',
        currentRow: '',
        indeterminate: false,
        checkAll: true,
        test: [],
        bugCountColumns: [],
        bugCountData: [],
        surveyOption: {
          title: {
            text: '缺陷概况统计图',
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
          series: []
        },
        gradeOption: {
          title: {
            text: '缺陷等级分布',
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
            }
          },
          color: ['#97D0FF', '#FDC850', '#FF7676', '#00F937'],
          xAxis: {
            type: 'category',
            data: []
          },
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: []
        },
        optionBugsMap: {
          color: ['#319AFF', '#1BD175', '#FFA800'],
          title: {
            text: '缺陷燃尽图',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['new', 'solved', 'residue'],
            top: '9%'
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
        tableColumnsChecked: ['projectName', 'newAdd', 'newAddSerious', 'discovered', 'resolved', 'unresolved', 'reopen', 'deadlineUnresolved', 'unresolvedSerious'],
        bugAddressColumns: [
          {
            title: 'ID',
            key: 'id',
            sortable: true
          },
          {
            title: '缺陷标题',
            key: 'bugsTitle',
            width: 350
          },
          {
            title: '创建时间',
            key: 'creatTime',
            width: 120
          },
          {
            title: '测试负责人',
            key: 'testLeader'
          },
          {
            title: '指派给',
            key: 'assign'
          },
          {
            title: '平台来源',
            key: 'platformSource'
          }
        ],
        bugAddressData: [
          {
            id: '00001',
            bugsTitle: '性能大佬邓阳连桂林无敌',
            creatTime: '2019 - 10 - 11',
            testLeader: '邓阳连',
            assign: '邓阳连',
            platformSource: '禅道'
          }
        ]
      }
    },
    methods: {
      listClick() {
        if (!this.cardList) {
          this.cardList = true
        } else {
          this.cardList = false
        }
      },
      getRowTitle(data) {
        this.modalTitle = data.projectName
      },
      handleCheckAll() {
        if (this.indeterminate) {
          this.checkAll = false;
        } else {
          this.checkAll = !this.checkAll;
        }
        this.indeterminate = false;

        if (this.checkAll) {
          this.tableColumnsChecked = ['projectName', 'newAdd', 'newAddSerious', 'discovered', 'resolved', 'unresolved', 'reopen', 'deadlineUnresolved', 'unresolvedSerious'];
          this.getTableColumnsChecked(this.tableColumnsChecked)
        } else {
          this.tableColumnsChecked = [];
          this.deleteTableColumns()
        }
      },
      checkAllGroupChange(data) {
        this.deleteTableColumns()
        this.tableColumnsChecked = data
        if (data.length === 9) {
          this.indeterminate = false;
          this.checkAll = true;
        } else if (data.length > 0) {
          this.indeterminate = true;
          this.checkAll = false;
        } else {
          this.indeterminate = false;
          this.checkAll = false;
        }
        this.getTableColumnsChecked()
      },
      downloadClick() {
        this.$refs.bugCountTable.exportCsv({
          filename: '缺陷周报表',
          original: false
        })
      },
      getBugSurvey() {
        getBugSurveyList().then(res => {
          this.surveyOption.series = res.data.series
          this.surveyOption.xAxis.data = res.data.xAxis
          this.surveyOption.legend.data = res.data.legend
        })
      },
      getBugGrade() {
        getBugGradeList().then(res => {
          this.gradeOption.series = res.data.series
          this.gradeOption.xAxis.data = res.data.xAxis
          this.gradeOption.legend.data = res.data.legend
        })
      },
      getBugDistribution() {
        let params = {
          page: this.currentPage,
          limit: 10
        }
        getBugDistributionList(params).then(res => {
          this.bugCountData = res.data.data.list
          this.totalPage = res.data.data.total
        })
      },
      changePage(data) {
        this.currentPage = data
        this.getBugDistribution()
      },
      show() {
        if (!this.modalList) {
          this.modalList = true
        }
      },
      getTableColumnsChecked() {
        this.tableColumnsChecked.forEach(e => {
          if (e === 'projectName') {
            this.bugCountColumns.push(
              {
                title: '项目',
                key: 'projectName',
                sortable: true
              }
            );
          }
          if (e === 'newAdd') {
            this.bugCountColumns.push(
              {
                title: '新增缺陷',
                key: 'newAdd',
                sortable: true
              }
            );
          }
          if (e === 'newAddSerious') {
            this.bugCountColumns.push(
              {
                title: '新增严重缺陷',
                key: 'newAddSerious',
                sortable: true
              }
            );
          }
          if (e === 'discovered') {
            this.bugCountColumns.push(
              {
                title: '已发现缺陷',
                key: 'discovered',
                sortable: true
              }
            );
          }
          if (e === 'resolved') {
            this.bugCountColumns.push(
              {
                title: '已关闭缺陷',
                key: 'resolved',
                sortable: true
              }
            );
          }
          if (e === 'unresolved') {
            this.bugCountColumns.push(
              {
                title: '未关闭缺陷',
                key: 'unresolved',
                sortable: true
              }
            );
          }
          if (e === 'reopen') {
            this.bugCountColumns.push(
              {
                title: '重新打开缺陷',
                key: 'reopen',
                sortable: true
              }
            );
          }
          if (e === 'deadlineUnresolved') {
            this.bugCountColumns.push(
              {
                title: '到期未解决缺陷',
                key: 'deadlineUnresolved',
                sortable: true,
                render: (h, params) => {
                  return h('div', [
                    h('p', {
                      style: {
                        color: '#319AFF'
                      },
                      on: {
                        click: () => {
                          this.show(params.index)
                        }
                      }
                    }, params.row.deadlineUnresolved)
                  ])
                }
              }
            );
          }
          if (e === 'unresolvedSerious') {
            this.bugCountColumns.push(
              {
                title: '未关闭严重缺陷',
                key: 'unresolvedSerious',
                sortable: true,
                render: (h, params) => {
                  return h('div', [
                    h('p', {
                      style: {
                        color: '#319AFF'
                      },
                      on: {
                        click: () => {
                          this.show(params.index)
                        }
                      }
                    }, params.row.unresolvedSerious)
                  ])
                }
              }
            );
          }
        })
      },
      deleteTableColumns() {
        let bugCountColumns = this.bugCountColumns
        bugCountColumns.splice(0, this.bugCountColumns.length)
      }
    },
    mounted() {
      this.getBugSurvey()
      this.getBugGrade()
      this.getBugDistribution()
      this.getTableColumnsChecked()
    }
  }
</script>
<style lang="less">
  .titleBlock {
    background-color: #57a3f3;
    width: 15%;
    margin: 0 auto;
    line-height: 50px;
    border-radius: 12px;
  }
</style>
