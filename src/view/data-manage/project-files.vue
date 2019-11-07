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
        <RadioGroup type="button" size="large" @on-change="getSiftArchives" v-model="radio">
          <Radio label="all">全部</Radio>
          <Radio label="dev">进行中</Radio>
          <Radio label="delay">已延期</Radio>
          <Radio label="finish">已完成</Radio>
        </RadioGroup>
      </i-col>
      <i-col :md="24" :lg="4">
        <Input v-model="project" placeholder="请输入项目名称" clearable style="width:200px">
        </Input>
      </i-col>
      <i-col :md="24" :lg="4">
        <DatePicker type="year" placeholder="请选择年份" v-model="finishYear" :value="finishYear"
                    style="width: 200px" @on-change="getSiftArchives"></DatePicker>
      </i-col>
      <i-col :md="24" :lg="6">
        <Button type="primary" style="margin-right: 20px" @click="search">查询</Button>
        <Button style="margin-right: 20px" @click="reset">重置</Button>
        <Button type="primary" style="margin-right: 20px" @click="show('new')">添加</Button>
        <Button type="primary" style="margin-right: 20px" @click="deleteBatch()">删除</Button>
        <Button type="primary" style="margin-right: 20px" @click="exportTable">导出</Button>
        <iframe id="ifile" style="display:none"></iframe>
      </i-col>
      <i-col :md="24" :lg="4">
        <Upload action="/back/archives/import">
          <Button type="primary" style="margin-right: 20px"
          >导入
          </Button>
        </Upload>
      </i-col>
    </Row>
    <Row style="margin-top: 20px">
      <Table border :columns="projectColumns" :data="projectData" ref="selection" style="margin-bottom: 10px"
             @on-selection-change="getArchivesId"></Table>
      <Button @click="handleSelectAll(true)" style="margin-right: 10px">全选</Button>
      <Button @click="handleSelectAll(false)">取消全选</Button>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="totalPage" :current="currentPage" @on-change="changePage"
                show-total></Page>
        </div>
      </div>
    </Row>
    <Modal :title="modalTitle" v-model="modalState" width="900">
      <Form ref="productArchives" :model="productArchives"
            label-position="right" :label-width="140">
        <Row>
          <i-col span="12">
            <FormItem label="项目名称：" prop="productName">
              <Input v-model.trim="productArchives.productName" style="width: 210px"
                     placeholder="请输入项目名称"
                     v-if="modalType==='new'|| modalType==='edit'"/>
              <!--<p v-if="modalType==='check'">{{usability.productName}}</p>-->
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="项目承接/自筹：" prop="engineeringContract">
              <Select style="width: 210px" placeholder="请选择项目承接/自筹" clearable
                      v-model="productArchives.engineeringContract"
                      v-if="modalType==='new' || modalType==='edit'">
                <Option v-for="item in wayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="中标时间：" prop="winTime">
              <DatePicker type="date" placeholder="请选择中标时间" v-model="productArchives.winTime" style="width: 210px"
                          v-if="modalType==='new' || modalType==='edit'"></DatePicker>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="项目金额：" prop="productFund">
              <Input v-model.trim="productArchives.productFund" style="width: 210px"
                     placeholder="请输入项目金额"
                     v-if="modalType==='new'|| modalType==='edit'"/>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="立项前已签承接合同：" prop="signStatus">
              <Select style="width: 210px" placeholder="请选择是否承接合同" clearable
                      v-model="productArchives.signStatus"
                      v-if="modalType==='new' || modalType==='edit'">
                <Option v-for="item in signList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="立项时间：" prop="setupTime">
              <DatePicker type="date" placeholder="请选择立项时间" v-model="productArchives.setupTime" style="width: 210px"
                          v-if="modalType==='new' || modalType==='edit'"></DatePicker>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="承接合同签订时间：" prop="signTime">
              <DatePicker type="date" placeholder="请选择承接合同签订时间" v-model="productArchives.signTime" style="width: 210px"
                          v-if="modalType==='new' || modalType==='edit'"></DatePicker>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="交付要求时间：" prop="finishTime">
              <DatePicker type="date" placeholder="请选择交付要求时间" v-model="productArchives.finishTime" style="width: 210px"
                          v-if="modalType==='new' || modalType==='edit'"></DatePicker>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="验收时间：" prop="acceptTime">
              <DatePicker type="date" placeholder="请选择验收时间" v-model="productArchives.acceptTime" style="width: 210px"
                          v-if="modalType==='new' || modalType==='edit'"></DatePicker>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="研制状态：" prop="devStatus">
              <Select style="width: 210px" placeholder="请选择研制状态" clearable
                      v-model="productArchives.devStatus"
                      v-if="modalType==='new' || modalType==='edit'">
                <Option v-for="item in devList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="项目经理：" prop="productManager">
              <Input v-model.trim="productArchives.productManager" style="width: 210px"
                     placeholder="请输入项目经理"
                     v-if="modalType==='new'|| modalType==='edit'"/>
            </FormItem>
          </i-col>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="cancelModal" v-if="modalType === 'new'||modalType === 'edit'">取消</Button>
        <Button type="primary" @click="makeSure" :loading="isLoading" v-if="modalType === 'new'||modalType === 'edit'">
          保存
        </Button>
      </div>
    </Modal>
  </Card>
</template>

<script>
  import moment from 'moment'
  import InforCard from '../../components/info-card/infor-card.vue'
  import CountTo from '../../components/count-to/count-to'
  import {
    initArchives,
    devCounts,
    siftArchives,
    addArchives,
    deleteArchives,
    updateArchives,
    exportArchives,
    searchArchives
  } from '@/api/dataManage.js'
  import path from '@/libs/path.js'

  export default {
    name: 'project-files',
    components: {
      InforCard,
      CountTo
    },
    data() {
      return {
        radio: 'all',
        modalState: false,
        modalTitle: '',
        isLoading: '',
        modalType: '',
        deleteList: [],
        productArchives: {
          productName: '',
          engineeringContract: '',
          winTime: '',
          productFund: '',
          signStatus: '',
          setupTime: '',
          signTime: '',
          finishTime: '',
          acceptTime: '',
          devStatus: '',
          productManager: ''
        },
        wayList: [
          {
            value: '承接',
            label: '承接'
          },
          {
            value: '自筹',
            label: '自筹'
          }
        ],
        signList: [
          {
            value: '已签',
            label: '已签'
          },
          {
            value: '未签',
            label: '未签'
          }
        ],
        devList: [
          {
            value: '研制中',
            label: '研制中'
          },
          {
            value: '延期中',
            label: '延期中'
          },
          {
            value: '已完成',
            label: '已完成'
          }
        ],
        project: '',
        finishYear: '',
        totalPage: 0,
        currentPage: 1,
        projectCard: ['all', 'dev', 'delay', 'finish'],
        inforCardData: [
          {title: '项目总数', icon: 'md-apps', count: 0, color: '#2d8cf0'},
          {title: '进行中', icon: 'md-barcode', count: 0, color: '#19be6b'},
          {title: '已延期', icon: 'md-alert', count: 0, color: '#ed3f14'},
          {title: '已完成', icon: 'md-flower', count: 0, color: '#ff9900'}
        ],
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
            title: '承接/自筹',
            key: 'engineeringContract'
          },
          {
            title: '中标时间',
            key: 'winTime'
          },
          {
            title: '项目金额',
            key: 'productFund'
          },
          {
            title: '立项前已签承接合同',
            key: 'signStatus'
          },
          {
            title: '立项时间',
            key: 'setupTime'
          },
          {
            title: '承接合同签订时间',
            key: 'signTime'
          },
          {
            title: '交付要求时间',
            key: 'finishTime'
          },
          {
            title: '验收时间',
            key: 'acceptTime'
          },
          {
            title: '研制状态',
            key: 'devStatus'
          },
          {
            title: '项目经理',
            key: 'productManager'
          },
          {
            title: '操作',
            key: 'operation',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  nativeOn: {
                    click: () => {
                      this.show('edit', params);
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  nativeOn: {
                    click: () => {
                      this.delete([params.row.archivesId]);
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        projectData: []
      }
    }
    ,
    methods: {
      changePage(data) {
        this.currentPage = data
        this.initValue()
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
      getSiftArchives() {
        let params = {
          devStatus: this.radio,
          finishYear: moment(this.finishYear).format('YYYY'),
          page: 1,
          pageSize: 10
        }
        siftArchives(params).then(res => {
          if (res.data.obj === null) {
            this.$Message.error('暂无数据');
            this.projectData = []
            this.totalPage = 0
          } else {
            this.projectData = res.data.obj.list
            this.totalPage = res.data.obj.count
            this.projectData.forEach(e => {
              e.winTime = moment(e.winTime).format('YYYY-MM-DD')
              e.setupTime = moment(e.setupTime).format('YYYY-MM-DD')
              e.signTime = moment(e.signTime).format('YYYY-MM-DD')
              e.finishTime = moment(e.finishTime).format('YYYY-MM-DD')
              e.acceptTime = moment(e.acceptTime).format('YYYY-MM-DD')
              if (e.devStatus === 'dev') {
                e.devStatus = '研制中'
              }
              if (e.devStatus === 'delay') {
                e.devStatus = '延期中'
              }
              if (e.devStatus === 'finish') {
                e.devStatus = '已完成'
              }
            });
          }
        })
      },
      search() {
        let params = {
          productName: this.project,
          page: this.currentPage,
          pageSize: 10
        }
        searchArchives(params).then(res => {
          this.projectData = res.data.obj.list
          this.totalPage = res.data.obj.count
          this.projectData.forEach(e => {
            e.winTime = moment(e.winTime).format('YYYY-MM-DD')
            e.setupTime = moment(e.setupTime).format('YYYY-MM-DD')
            e.signTime = moment(e.signTime).format('YYYY-MM-DD')
            e.finishTime = moment(e.finishTime).format('YYYY-MM-DD')
            e.acceptTime = moment(e.acceptTime).format('YYYY-MM-DD')
            if (e.devStatus === 'dev') {
              e.devStatus = '研制中'
            }
            if (e.devStatus === 'delay') {
              e.devStatus = '延期中'
            }
            if (e.devStatus === 'finish') {
              e.devStatus = '已完成'
            }
          });
        })
      },
      reset() {
        this.project = ''
        this.initValue()
      },
      show(type, params) {
        this.modalState = true;
        this.isLoading = false;
        if (type === 'new') {
          this.modalType = 'new';
          this.modalTitle = '添加项目';
          this.productArchives.status = 0;
        } else if (type === 'check') {
          this.modalType = 'check';
          this.modalTitle = '项目详情';
          this.productArchives = Object.assign({}, params.row);
        } else if (type === 'edit') {
          this.modalType = 'edit';
          this.modalTitle = '修改项目信息';
          this.productArchives = Object.assign({}, params.row)
        }
      },
      getArchivesId(data) {
        this.deleteList = data;
      },
      delete(data) {
        this.$Modal.confirm({
          title: '您确定要删除吗？',
          onOk: () => {
            deleteArchives(data).then(res => {
              this.$Message.success("删除成功");
              this.cancelModal();
              this.initValue();
            })
          }
        })
      },
      deleteBatch() {
        if (this.deleteList.length < 1) {
          this.$Message.info('请选择要删除的数据')
        } else {
          let idList = [];
          this.deleteList.forEach(e => {
            idList.push(e.archivesId)
          });
          this.delete(idList)
          this.initValue()
        }
      },
      exportTable() {
        let dom = document.getElementById('ifile');
        dom.src = 'http://192.168.2.112:8080' + `/archives/export`;
      },
      makeSure() {
        this.$refs.productArchives.validate((valid) => {
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
      initValue() {
        // this.isLoading = true;
        let params = {
          devStatus: '',
          finishYear: '',
          page: this.currentPage,
          pageSize: 10
        }
        initArchives(params).then(res => {
          this.projectData = res.data.obj.list
          this.totalPage = res.data.obj.count
          this.projectData.forEach(e => {
            e.winTime = moment(e.winTime).format('YYYY-MM-DD')
            e.setupTime = moment(e.setupTime).format('YYYY-MM-DD')
            e.signTime = moment(e.signTime).format('YYYY-MM-DD')
            e.finishTime = moment(e.finishTime).format('YYYY-MM-DD')
            e.acceptTime = moment(e.acceptTime).format('YYYY-MM-DD')
            if (e.devStatus === 'dev') {
              e.devStatus = '研制中'
            }
            if (e.devStatus === 'delay') {
              e.devStatus = '延期中'
            }
            if (e.devStatus === 'finish') {
              e.devStatus = '已完成'
            }
          });
        })
        this.getDevCounts()
        // this.isLoading = false;
      },
      add() {
        this.isLoading = true;
        addArchives(this.productArchives).then(res => {
          this.$Message.success("新增成功");
          this.cancelModal();
          this.initValue();
        })
      },
      edit() {
        updateArchives(this.productArchives).then(res => {
          this.$Message.success("修改成功");
          this.cancelModal();
          this.initValue();
        })
      },
      cancelModal() {
        this.modalState = false;
        this.$refs.productArchives.resetFields();
      }
      ,
      handleSelectAll(status) {
        this.$refs.selection.selectAll(status)
      },
    },
    mounted() {
      this.initValue();
      this.getDevCounts()
    }
  }

</script>
<style lang="less">
  .count-style {
    font-size: 50px;
  }
</style>
