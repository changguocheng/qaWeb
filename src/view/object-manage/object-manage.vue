<template>
  <Card>
    <Row :gutter="20" style="margin-bottom: 20px">
      <i-col span="4" style="padding-right:10px">
        <Select v-model="objectField" filterable>
          <!--<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
        </Select>
      </i-col>
      <i-col span="4" style="padding-right:10px">
        <Select v-model="objectStatus" filterable>
          <!--<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
        </Select>
      </i-col>
      <i-col span="16" style="padding-right:10px;">
        <Button style="float: right;" type="primary">添加</Button>
      </i-col>
    </Row>
    <Row>
      <Table border :columns="objectColumns" :data="objectManageData" width=100%
             style="white-space:nowrap"></Table>
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
                     v-if="modalType==='new'||modalType === 'edit'"/>
              <!--<p v-if="modalType==='check'">{{usability.productName}}</p>-->
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="所属产品：" prop="devStatus">
              <Select style="width: 210px" placeholder="请选择所属产品" clearable
                      v-model="productArchives.sonarProject"
                      v-if="modalType==='new'||modalType === 'edit'">
                <Option v-for="item in sonarList" :value="item.name" :key="item.key">{{ item.name }}</Option>
                <!--<Option v-for="item in sonarList" :value="product[item]" :key="item">{{item }}-->
                <!--</Option>-->
              </Select>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="研制状态：" prop="devStatus">
              <Select style="width: 210px" placeholder="请选择研制状态" clearable
                      v-model="productArchives.devStatus"
                      v-if="modalType==='new'">
                <Option v-for="item in devList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
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
    <Divider orientation="left">产品领域状态</Divider>
    <Row :gutter="20" style="margin-bottom: 20px">
      <i-col span="12" style="padding-right:10px;">
        <Button style="float: right;" type="primary" @click="modalField = true">添加</Button>
      </i-col>
      <i-col span="12" style="padding-right:10px;float: right;">
        <Button style="float: right;" type="primary">添加</Button>
      </i-col>
    </Row>
    <Row :gutter="20">
      <i-col span="12">
        <Table border :columns="fieldColumns" :data="fieldData"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="100" :current="1"
                  show-total></Page>
          </div>
        </div>
      </i-col>
      <i-col span="12">
        <Table border :columns="productColumns" :data="productData"></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="100" :current="1"
                  show-total></Page>
          </div>
        </div>
      </i-col>
    </Row>
    <Modal v-model="modalField" :title="fieldTitle">
      <Form ref="productField" :model="productField" label-position="right" :label-width="110">
        <Row>
          <Col span="12">
            <FormItem label="分类名称：" prop="fieldName">
              <Input v-model.trim="productField.fieldName" style="width: 210px"
                     placeholder="请输入分类名称" type="text"
              ></Input>
              <!--<p v-if="modalType==='check'">{{productField.fieldName}}</p>-->
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  </Card>
</template>

<script>
  import {initArchives, syncSonarKey, updateKey} from '@/api/dataManage.js'

  export default {
    name: "object-manage",
    component: {},
    data() {
      return {
        totalPage: 0,
        currentPage: 1,
        modalState: false,
        modalTitle: '',
        isLoading: '',
        modalType: '',
        productArchives: {
          sonarProject: '',
          productName: '',
          // sonarName: '',
          // devStatus: '',
          // productManager: ''
        },
        sonarList: [],
        product: {},
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
        objectField: '',
        objectStatus: '',
        modalField: false,
        fieldTitle: '',
        objectData: {},
        productField: {
          fieldName: ''
        },
        key: '',
        objectColumns: [
          {
            title: '项目',
            key: 'productName',
            sortable: true
          },
          {
            title: '所属产品',
            key: 'key',
          },
          {
            title: '研制状态',
            key: 'devStatus'
          },
          {
            title: '操作',
            key: 'opt',
            width: 180,
            render: (h, params) => {
              return h('div', [
                h('Tooltip', {
                  props: {
                    content: '编辑',
                    placement: 'top'
                  },
                  class: {
                    'link-text': true
                  }
                }, [h('icon', {
                  props: {
                    type: 'ios-create-outline',
                    size: '24',
                    color: '#ff9900'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  nativeOn: {
                    click: () => {
                      this.show('edit', [params.row]);
                    }
                  }
                }, '编辑')
                ]),
                h('Tooltip', {
                  props: {
                    content: '同步',
                    placement: 'top'
                  },
                  class: {
                    'link-text': true
                  }
                }, [h('icon', {
                  props: {
                    type: 'md-refresh',
                    size: '24',
                    color: '#ff9900'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  nativeOn: {
                    click: () => {
                      this.show('update', params);
                    }
                  }
                }, '同步')
                ]),
              ]);
            }
          }
        ],
        objectManageData: [],
        fieldColumns: [
          {
            title: '产品领域',
            key: 'productField',
            sortable: true
          },
          {
            title: '操作',
            key: 'opt',
            width: 180,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Tooltip', {
                  props: {
                    content: '编辑',
                    placement: 'top'
                  },
                  class: {
                    'link-text': true
                  }
                }, [h('icon', {
                  props: {
                    type: 'ios-create-outline',
                    size: '24',
                    color: '#ff9900'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  nativeOn: {
                    click: () => {
                      this.show('edit', params);
                    }
                  }
                }, '编辑')
                ]),
                h('Tooltip', {
                  props: {
                    content: '删除',
                    placement: 'top'
                  },
                  class: {
                    'link-text': true
                  }
                }, [h('icon', {
                  props: {
                    type: 'md-trash',
                    size: '24',
                    color: '#ed4014'
                  },
                  nativeOn: {
                    click: () => {
                      this.delete([params.row.id]);
                    }
                  }
                }, '删除')
                ]),
              ]);
            }
          }
        ],
        fieldData: [
          {
            productField: 1
          }
        ],
        productColumns: [
          {
            title: '产品状态',
            key: 'productStatus',
            sortable: true
          },
          {
            title: '操作',
            key: 'opt',
            width: 180,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Tooltip', {
                  props: {
                    content: '编辑',
                    placement: 'top'
                  },
                  class: {
                    'link-text': true
                  }
                }, [h('icon', {
                  props: {
                    type: 'ios-create-outline',
                    size: '24',
                    color: '#ff9900'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  nativeOn: {
                    click: () => {
                      this.show('edit', params);
                    }
                  }
                }, '编辑')
                ]),
                h('Tooltip', {
                  props: {
                    content: '删除',
                    placement: 'top'
                  },
                  class: {
                    'link-text': true
                  }
                }, [h('icon', {
                  props: {
                    type: 'md-trash',
                    size: '24',
                    color: '#ed4014'
                  },
                  nativeOn: {
                    click: () => {
                      this.delete([params.row.id]);
                    }
                  }
                }, '删除')
                ]),
              ]);
            }
          }
        ],
        productData: [
          {
            productStatus: 1
          }
        ]
      }
    },
    methods: {
      getObjectName() {
        let params = {
          devStatus: '',
          finishYear: '',
          page: this.currentPage,
          pageSize: 10
        }
        initArchives(params).then(res => {
          this.objectManageData = res.data.obj.list
          this.totalPage = res.data.obj.count
          this.objectManageData.forEach(e => {
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
      changePage(data) {
        this.currentPage = data
        this.getObjectName()
      },
      getSyncSonarKey() {
        syncSonarKey().then(res => {
          // this.sonarList = Object.keys(res.data.obj)
          this.sonarList = res.data.obj
          this.product = res.data.obj
        })
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
      edit() {
        updateKey(this.productArchives).then(res => {
          this.objectManageData[0].sonarProject = this.productArchives.sonarProject
          // this.sonarProject = this.productArchives.sonarProject
          this.$Message.success("同步成功");
          this.cancelModal();
        })
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
          this.modalTitle = '编辑所属产品';
          // this.productArchives = Object.assign({}, params.row)
        }
      },
      cancelModal() {
        this.modalState = false;
        this.$refs.productArchives.resetFields();
      },
    },
    mounted() {
      this.getObjectName()
      this.getSyncSonarKey()
    }
  }
</script>
<style scoped>

</style>
