<template>
  <Card>
    <Row :gutter="20">
      <i-col :xs="12" :md="8" :lg="6" v-for="(infor, i) in inforCardData" :key="`infor-${i}`"
             style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Divider></Divider>
    <Row>
      <i-col :md="24" :lg="6">
        <RadioGroup type="button" size="large">
          <Radio label="全部"></Radio>
          <Radio label="进行中"></Radio>
          <Radio label="已延期"></Radio>
          <Radio label="已完成"></Radio>
        </RadioGroup>
      </i-col>
      <i-col :md="24" :lg="4">
        <Select v-model="project" clearable style="width:200px">
          <Option v-for="item in projectList" :value="item" :key="item">{{item }}
          </Option>
        </Select>
      </i-col>
      <i-col :md="24" :lg="8">
        <Button type="primary" style="margin-right: 20px" @click="search">查询</Button>
        <Button style="margin-right: 20px" @click="reset">重置</Button>
        <Button type="primary" style="margin-right: 20px" @click="exportTable">导出</Button>
        <iframe id="ifile" style="display:none"></iframe>
        <Button type="primary" @click="explainModal = true" style="margin-right: 20px">说明</Button>
        <Modal
          v-model="explainModal"
          title="说明" :footer-hide="true">
          <p>1.千行代码复杂方法质量分零分线/百分线（常态值）：0.7~0（百分制线性转换得分：L1=100*（1-X/0.7），其中X为常态值下的实际千行代码复杂方法数）</p>
          <p>2.千行代码重复块质量分零分线/百分线（常态值）：7~0（百分制线性转换得分：L2=100*（1-Y/7），其中Y为常态值下的实际千行代码重复块数）</p>
          <p>3.千行代码坏味道质量分零分线/百分线（常态值）：8~0（百分制线性转换得分：L3=100*（1-Z/8），其中Z为常态值下的实际千行代码坏味道数）</p>
          <p>4.千行代码Bugs质量分零分线/百分线（常态值）：7~0（百分制线性转换得分：L4=100*（1-M/7），其中M为常态值下的实际千行代码Bugs数）</p>
          <p>5.千行代码漏洞质量分零分线/百分线（常态值）：0.3~0（百分制线性转换得分：L5=100*（1-N/0.3），其中N为常态值下的实际千行代码漏洞数）</p>
          <p>6.可维护性综合质量分（百分制）计算公式：M1=0.2*L1+0.2*L2+0.2*L3+0.2*L4+0.2*L5</p>
        </Modal>
      </i-col>
    </Row>
    <Row style="margin-top: 20px">
      <Table border :columns="projectColumns" :data="projectData" ref="selection" style="margin-bottom: 10px"></Table>
      <Button @click="handleSelectAll(true)" style="margin-right: 10px">全选</Button>
      <Button @click="handleSelectAll(false)">取消全选</Button>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="totalPage" :current="currentPage"
                show-total></Page>
        </div>
      </div>
    </Row>
  </Card>
</template>

<script>
  import InforCard from '../../components/info-card/infor-card.vue'
  import CountTo from '../../components/count-to/count-to'
  import {
    devCounts,
    siftScore,
    getMainTainNames,
    getByName
  } from '@/api/dataManage.js'

  export default {
    name: 'data-manage',
    components: {
      InforCard,
      CountTo
    },
    data() {
      return {
        project: '',
        totalPage: 0,
        currentPage: 1,
        explainModal: false,
        projectCard: ['all', 'dev', 'delay', 'finish'],
        inforCardData: [
          {title: '项目总数', icon: 'md-apps', count: 0, color: '#2d8cf0'},
          {title: '进行中', icon: 'md-barcode', count: 0, color: '#19be6b'},
          {title: '已延期', icon: 'md-alert', count: 0, color: '#ed3f14'},
          {title: '已完成', icon: 'md-flower', count: 0, color: '#ff9900'}
        ],
        projectList: [],
        projectColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '项目名称',
            key: 'productName'
          },
          {
            title: '代码总行数',
            key: 'codeLines'
          },
          {
            title: '千行代码复杂方法数质量分',
            key: 'scoreComplex'
          },
          {
            title: '千行代码重复块质量分',
            key: 'scoreRepeat'
          },
          {
            title: '千行代码坏味道质量分',
            key: 'scoreBadSmell'
          },
          {
            title: '千行代码Bugs质量分',
            key: 'scoreBugs'
          },
          {
            title: '千行代码漏洞数质量分',
            key: 'scoreLoophole'
          },
          {
            title: '可维护性综合质量分（百分制）',
            key: 'mainTainScore'
          }
        ],
        projectData: []
      }
    },
    methods: {
      handleSelectAll(status) {
        this.$refs.selection.selectAll(status)
      },
      exportTable() {
        let dom = document.getElementById('ifile');
        dom.src = 'http://192.168.2.112:8080' + `/maintain/export`;
      },
      getDevCounts() {
        this.projectCard.forEach(e => {
          if (e === 'all') {
            let params = {
              devStatus: 'all'
            }
            devCounts(params).then(res => {
              this.inforCardData[0].count = res.data.obj
            })
          }
          if (e === 'dev') {
            let params = {
              devStatus: 'dev'
            }
            devCounts(params).then(res => {
              this.inforCardData[1].count = res.data.obj
            })
          }
          if (e === 'delay') {
            let params = {
              devStatus: 'delay'
            }
            devCounts(params).then(res => {
              this.inforCardData[2].count = res.data.obj
            })
          }
          if (e === 'finish') {
            let params = {
              devStatus: 'finish'
            }
            devCounts(params).then(res => {
              this.inforCardData[3].count = res.data.obj
            })
          }
        })
      },
      getMainTain() {
        getMainTainNames().then(res => {
          res.data.obj.forEach(e => {
            if (!this.projectList.includes(e)) {
              this.projectList.push(e)
            }
          })
        })
      },
      search() {
        let params = {
          productName: this.project,
          page: this.currentPage,
          pageSize: 10
        }
        getByName(params).then(res => {
          this.projectData = [res.data.obj]
          this.totalPage = this.projectData.length
        })
      },
      reset() {
        this.project = ''
        this.initValue()
      },
      initValue() {
        let params = {
          devStatus: '',
          finishYear: '',
          page: this.currentPage,
          pageSize: 10
        }
        siftScore(params).then(res => {
          this.projectData = res.data.obj.list
          this.totalPage = res.data.obj.count
        })
      },
    },
    mounted() {
      this.initValue()
      this.getMainTain()
      this.getDevCounts()
    }
  }
</script>

<style lang="less">
  .count-style {
    font-size: 50px;
  }
</style>
