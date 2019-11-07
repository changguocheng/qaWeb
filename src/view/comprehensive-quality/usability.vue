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
      <i-col :md="24" :lg="10">
        <Button type="primary" style="margin-right: 20px">查询</Button>
        <Button style="margin-right: 20px">重置</Button>
        <Button type="primary" style="margin-right: 20px" @click="show('new')">添加</Button>
        <Button type="primary" style="margin-right: 20px" @click="deleteBatch">删除</Button>
        <Button type="primary" style="margin-right: 20px">导入</Button>
        <Button type="primary" style="margin-right: 20px">导出</Button>
        <Button type="primary" @click="explainModal = true" style="margin-right: 20px">说明</Button>
        <Modal
          v-model="explainModal"
          title="说明" :footer-hide="true">
          <p>可用性测试场景：【登录】【若干个常用业务操作】下每百万点击（PV）的错误数</p>
          <p>1.可用性（错误数/每百万PV）质量分零分线/百分线（常态值）：500~0（百分制线性转换得分：Ln=100*（1-X/500），
            其中X为常态值下的每百万点击对应实际错误数,n表示某个项目的第几个测试场景，可取值1、2、3...,）
          </p>
          <p>2、某一项目的可用性综合得分：M=(L1+L2+...+Ln)/n
          </p>
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
    <Modal :title="modalTitle" v-model="modalState" width="800">
      <Form ref="usability" :model="usability"
            label-position="right" :label-width="110">
        <Row>
          <i-col span="12">
            <FormItem label="项目名称：" prop="productName">
              <Input v-model.trim="usability.productName" style="width: 210px"
                     placeholder="请输入项目名称"
                     v-if="modalType==='new'|| modalType==='edit'"/>
              <!--<p v-if="modalType==='check'">{{usability.productName}}</p>-->
            </FormItem>
          </i-col>
        </Row>
      </Form>
    </Modal>
  </Card>
</template>

<script>
  import InforCard from '../../components/info-card/infor-card.vue'
  import CountTo from '../../components/count-to/count-to'
  import {addPerform} from '@/api/comprehensiveQuality.js'
  import path from '@/libs/path.js'
  import validate from '../../libs/validate.js'

  export default {
    name: "usability",
    components: {
      InforCard,
      CountTo
    },
    data() {
      return {
        modalState: false,
        modalTitle: '',
        usability: {
          productName: '',
          testSence: '',
          errorPreMillion: '',
          senceScore: '',
          productTotalScore: ''
        },
        modalType: '',
        project: '',
        totalPage: 1,
        currentPage: 1,
        explainModal: false,
        isLoading: false,
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
            title: '产品/项目名称',
            key: 'name'
          },
          {
            title: '测试场景',
            key: 'codeCount'
          },
          {
            title: '每百万点击出现错误数',
            key: 'complex'
          },
          {
            title: '本场景下正确性质量得分（百分制）',
            key: 'repeat'
          },
          {
            title: '本项目正确性综合得分（百分制）',
            key: 'bad'
          },
          {
            title: '操作',
            key: 'bugs',
            align: "center",
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '编辑')
              ])
            }
          },
          {
            title: '备注',
            key: 'loophole'
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
      show(type, params) {
        this.modalState = true;
        this.isLoading = false;
        if (type === 'new') {
          this.modalType = 'new';
          this.modalTitle = '新增信息';
          this.usability.status = 0;
          this.usability = Object.assign({}, params.row);
        } else if (type === 'check') {
          this.modalType = 'check';
          this.modalTitle = '信息详情';
          this.student = Object.assign({}, params.row);
        } else if (type === 'edit') {
          this.modalType = 'edit';
          this.modalTitle = '修改信息';
          this.student = Object.assign({
            fatherObj: {
              name: params.row.father,
              id: params.row.fatherId
            },
            motherObj: {
              name: params.row.mother,
              id: params.row.motherId
            }
          }, params.row);
        }
      },
      deleteBatch() {
      },
      makeSure() {
        this.$refs.usability.validate((valid) => {
          if (valid) {
            if (this.modalType === 'new') {
              this.add();
            } else if (this.modalType === 'edit') {
              this.edit();
            }
          } else {
            this.$Message.error('保存失败');
          }
        });
      },
      // initValue() {
      //   this.isLoading = true;
      //   this.$axios.get(path.initStudentHonor, params).then(data => {
      //     if (data) {
      //       this.list = data.data.list;
      //       this.setTotal(data.data.count);
      //     }
      //     this.loading = false
      //   })
      // },
      add() {
        this.isLoading = true;
        this.$axios.get(path.addPerform, this.usability).then(data => {
          if (data) {
            this.$Message.success("新增成功");
            // this.cancelModal();
            // this.initValue(this.currentSchool);
          }
        })
      },
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
