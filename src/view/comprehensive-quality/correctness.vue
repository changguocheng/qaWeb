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
          <Option v-for="item in projectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </i-col>
      <i-col :md="24" :lg="8">
        <Button type="primary" style="margin-right: 20px">查询</Button>
        <Button style="margin-right: 20px">重置</Button>
        <Button type="primary" style="margin-right: 20px">删除</Button>
        <Button type="primary" style="margin-right: 20px">导入</Button>
        <Button type="primary" style="margin-right: 20px">导出</Button>
        <Button type="primary" @click="explainModal = true" style="margin-right: 20px">说明</Button>
        <Modal
          v-model="explainModal"
          title="说明" :footer-hide="true">
          <p>缺陷等级划分：【轻微】【普通】【严重】【紧急】</p>
          <p>1.线上普通+严重+紧急缺陷率质量分零分线/百分线（常态值）：0.2~0（百分制线性转换得分：L1=100*（1-X/0.2），其中X为常态值下的实际缺陷率）</p>
          <p>2.线上严重+紧急缺陷率质量分零分线/百分线（常态值）：0.1~0（百分制线性转换得分：L2=100*（1-Y/0.1），其中Y为常态值下的实际缺陷率）</p>
          <p>3.正确性的质量分（百分制）计算公式：M1=0.7*L1+0.3*L2</p>
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

  export default {
    name: "correctness",
    components: {
      InforCard,
      CountTo
    },
    data() {
      return {
        project: '',
        totalPage: 1,
        currentPage: 1,
        explainModal: false,
        inforCardData: [
          {title: '项目总数', icon: 'md-apps', count: 33, color: '#2d8cf0'},
          {title: '进行中', icon: 'md-barcode', count: 15, color: '#19be6b'},
          {title: '已延期', icon: 'md-alert', count: 8, color: '#ed3f14'},
          {title: '已完成', icon: 'md-flower', count: 10, color: '#ff9900'}
        ],
        projectList: [
          {
            value: '所有项目',
            label: '所有项目'
          },
          {
            value: 'ASOCO',
            label: 'ASOCO'
          },
          {
            value: '星磐',
            label: '星磐'
          }
        ],
        projectColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '项目名称',
            key: 'name'
          },
          {
            title: '代码总行数',
            key: 'codeCount'
          },
          {
            title: '线上缺陷总数',
            key: 'complex'
          },
          {
            title: '线上普通及以上等级缺陷的千行代码缺陷率',
            key: 'repeat'
          },
          {
            title: '线上严重及以上等级缺陷的千行代码缺陷数率',
            key: 'bad'
          },
          {
            title: '线上普通及以上等级的缺陷率质量分',
            key: 'bugs'
          },
          {
            title: '线上严重及以上等级缺陷率质量分',
            key: 'loophole'
          },
          {
            title: '正确性质量综合得分（百分制）',
            key: 'maintain'
          }
        ],
        projectData: [
          {
            name: '1'
          }
        ]
      }
    },
    methods: {
      handleSelectAll(status) {
        this.$refs.selection.selectAll(status)
      }
    },
  }
</script>
<style lang="less">
  .count-style {
    font-size: 50px;
  }
</style>
