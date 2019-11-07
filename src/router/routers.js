import Main from '@/components/main'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  // {
  //   path: '/',
  //   name: '_home',
  //   redirect: '/home',
  //   component: Main,
  //   meta: {
  //     hideInMenu: true,
  //     notCache: true
  //   },
  //   children: [
  //     {
  //       path: '/home',
  //       name: 'home',
  //       meta: {
  //         hideInMenu: true,
  //         title: '首页',
  //         notCache: true,
  //         icon: 'md-home'
  //       },
  //       component: () => import('@/view/single-page/home')
  //     }
  //   ]
  // },
  // {
  //   path: '/message',
  //   name: 'message',
  //   component: Main,
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   children: [
  //     {
  //       path: 'message_page',
  //       name: 'message_page',
  //       meta: {
  //         icon: 'md-notifications',
  //         title: '消息中心'
  //       },
  //       component: () => import('@/view/single-page/message/index.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/curd_components',
  //   name: 'curd_components',
  //   meta: {
  //     icon: 'ios-book',
  //     title: 'curd组件'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'page-table',
  //       name: 'page-table',
  //       meta: {
  //         icon: 'md-browsers',
  //         title: '分页表格'
  //       },
  //       component: () => import('@/view/curd-components/page-table/page-table.vue')
  //     },
  //     {
  //       path: 'auto-form',
  //       name: 'auto-form',
  //       meta: {
  //         icon: 'md-clipboard',
  //         title: '自动表单'
  //       },
  //       component: () => import('@/view/curd-components/auto-form/auto-form.vue')
  //     },
  //     {
  //       path: 'modal-form',
  //       name: 'modal-form',
  //       meta: {
  //         icon: 'md-albums',
  //         title: '模态框表单'
  //       },
  //       component: () => import('@/view/curd-components/modal-form/modal-form.vue')
  //     },
  //     {
  //       path: 'search-bar',
  //       name: 'search-bar',
  //       meta: {
  //         icon: 'ios-search',
  //         title: '搜索框'
  //       },
  //       component: () => import('@/view/curd-components/search-bar/search-bar.vue')
  //     },
  //     {
  //       path: 'curd-page',
  //       name: 'curd-page',
  //       meta: {
  //         icon: 'ios-albums',
  //         title: '综合实例'
  //       },
  //       component: () => import('@/view/curd-components/curd-page/curd-page.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/components',
  //   name: 'components',
  //   meta: {
  //     icon: 'logo-buffer',
  //     title: '组件'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'count_to_page',
  //       name: 'count_to_page',
  //       meta: {
  //         icon: 'md-trending-up',
  //         title: '数字渐变'
  //       },
  //       component: () => import('@/view/components/count-to/count-to.vue')
  //     },
  //     {
  //       path: 'drag_list_page',
  //       name: 'drag_list_page',
  //       meta: {
  //         icon: 'ios-infinite',
  //         title: '拖拽列表'
  //       },
  //       component: () => import('@/view/components/drag-list/drag-list.vue')
  //     },
  //     {
  //       path: 'drag_drawer_page',
  //       name: 'drag_drawer_page',
  //       meta: {
  //         icon: 'md-list',
  //         title: '可拖拽抽屉'
  //       },
  //       component: () => import('@/view/components/drag-drawer')
  //     },
  //     {
  //       path: 'org_tree_page',
  //       name: 'org_tree_page',
  //       meta: {
  //         icon: 'ios-people',
  //         title: '组织结构树'
  //       },
  //       component: () => import('@/view/components/org-tree')
  //     },
  //     {
  //       path: 'tree_table_page',
  //       name: 'tree_table_page',
  //       meta: {
  //         icon: 'md-git-branch',
  //         title: '树状表格'
  //       },
  //       component: () => import('@/view/components/tree-table/index.vue')
  //     },
  //     {
  //       path: 'cropper_page',
  //       name: 'cropper_page',
  //       meta: {
  //         icon: 'md-crop',
  //         title: '图片裁剪'
  //       },
  //       component: () => import('@/view/components/cropper/cropper.vue')
  //     },
  //     {
  //       path: 'tables_page',
  //       name: 'tables_page',
  //       meta: {
  //         icon: 'md-grid',
  //         title: '多功能表格'
  //       },
  //       component: () => import('@/view/components/tables/tables.vue')
  //     },
  //     {
  //       path: 'split_pane_page',
  //       name: 'split_pane_page',
  //       meta: {
  //         icon: 'md-pause',
  //         title: '分割窗口'
  //       },
  //       component: () => import('@/view/components/split-pane/split-pane.vue')
  //     },
  //     {
  //       path: 'markdown_page',
  //       name: 'markdown_page',
  //       meta: {
  //         icon: 'logo-markdown',
  //         title: 'Markdown编辑器'
  //       },
  //       component: () => import('@/view/components/markdown/markdown.vue')
  //     },
  //     {
  //       path: 'editor_page',
  //       name: 'editor_page',
  //       meta: {
  //         icon: 'ios-create',
  //         title: '富文本编辑器'
  //       },
  //       component: () => import('@/view/components/editor/editor.vue')
  //     },
  //     {
  //       path: 'icons_page',
  //       name: 'icons_page',
  //       meta: {
  //         icon: '_bear',
  //         title: '自定义图标'
  //       },
  //       component: () => import('@/view/components/icons/icons.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/tools_methods',
  //   name: 'tools_methods',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'tools_methods_page',
  //       name: 'tools_methods_page',
  //       meta: {
  //         icon: 'ios-hammer',
  //         title: '工具方法',
  //         beforeCloseName: 'before_close_normal'
  //       },
  //       component: () => import('@/view/tools-methods/tools-methods.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/error_logger',
  //   name: 'error_logger',
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'error_logger_page',
  //       name: 'error_logger_page',
  //       meta: {
  //         icon: 'ios-bug',
  //         title: '错误收集'
  //       },
  //       component: () => import('@/view/single-page/error-logger.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/directive',
  //   name: 'directive',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'directive_page',
  //       name: 'directive_page',
  //       meta: {
  //         icon: 'ios-navigate',
  //         title: '指令'
  //       },
  //       component: () => import('@/view/directive/directive.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/multilevel',
  //   name: 'multilevel',
  //   meta: {
  //     icon: 'md-menu',
  //     title: '多级菜单'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'level_2_1',
  //       name: 'level_2_1',
  //       meta: {
  //         icon: 'md-funnel',
  //         title: '二级-1'
  //       },
  //       component: () => import('@/view/multilevel/level-2-1.vue')
  //     },
  //     {
  //       path: 'level_2_2',
  //       name: 'level_2_2',
  //       meta: {
  //         access: ['super_admin'],
  //         icon: 'md-funnel',
  //         showAlways: true,
  //         title: '二级-2'
  //       },
  //       component: parentView,
  //       children: [
  //         {
  //           path: 'level_2_2_1',
  //           name: 'level_2_2_1',
  //           meta: {
  //             icon: 'md-funnel',
  //             title: '三级'
  //           },
  //           component: () => import('@/view/multilevel/level-2-2/level-2-2-1.vue')
  //         },
  //         {
  //           path: 'level_2_2_2',
  //           name: 'level_2_2_2',
  //           meta: {
  //             icon: 'md-funnel',
  //             title: '三级'
  //           },
  //           component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
  //         }
  //       ]
  //     },
  //     {
  //       path: 'level_2_3',
  //       name: 'level_2_3',
  //       meta: {
  //         icon: 'md-funnel',
  //         title: '二级-3'
  //       },
  //       component: () => import('@/view/multilevel/level-2-3.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/argu',
  //   name: 'argu',
  //   meta: {
  //     hideInMenu: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'params/:id',
  //       name: 'params',
  //       meta: {
  //         icon: 'md-flower',
  //         title: route => `{{ params }}-${route.params.id}`,
  //         notCache: true,
  //         beforeCloseName: 'before_close_normal'
  //       },
  //       component: () => import('@/view/argu-page/params.vue')
  //     },
  //     {
  //       path: 'query',
  //       name: 'query',
  //       meta: {
  //         icon: 'md-flower',
  //         title: route => `{{ query }}-${route.query.id}`,
  //         notCache: true
  //       },
  //       component: () => import('@/view/argu-page/query.vue')
  //     }
  //   ]
  // },
  {
    path: '/comprehensive_quality_menu',
    name: 'comprehensive_quality_menu',
    meta: {
      icon: 'ios-book',
      title: '综合质量'
    },
    component: Main,
    children: [
      {
        path: 'correctness',
        name: 'correctness',
        meta: {
          icon: 'md-browsers',
          title: '正确性'
        },
        component: () => import('@/view/comprehensive-quality/correctness.vue')
      },
      {
        path: 'testability',
        name: 'testability',
        meta: {
          icon: 'md-browsers',
          title: '可测性'
        },
        component: () => import('@/view/comprehensive-quality/testability.vue')
      },
      {
        path: 'usability',
        name: 'usability',
        meta: {
          icon: 'md-browsers',
          title: '可用性'
        },
        component: () => import('@/view/comprehensive-quality/usability.vue')
      },
      {
        path: 'maintainability',
        name: 'maintainability',
        meta: {
          icon: 'md-browsers',
          title: '可维护性'
        },
        component: () => import('@/view/data-manage/maintainability.vue')
      }
    ]
  },
  {
    path: '/',
    name: '_home',
    redirect: '/login',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/sonar-home/sonar-home.vue')
      }
    ]
  },
  {
    path: '/sonar_object_menu',
    name: 'sonar_object_menu',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'sonar_object',
        name: 'sonar_object',
        meta: {
          icon: 'ios-hammer',
          title: '可维护性',
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/sonar-object/sonar-object.vue')
      }
    ]
  },
  {
    path: '/process_quality_menu',
    name: 'process_quality_menu',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'process_quality',
        name: 'process_quality',
        meta: {
          icon: 'ios-hammer',
          title: '过程质量',
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/process-quality/process-quality.vue')
      }
    ]
  },
  {
    path: '/quality_problem_menu',
    name: 'quality_problem_menu',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'quality_problem',
        name: 'quality_problem',
        meta: {
          icon: 'ios-hammer',
          title: '质量问题',
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/quality-problem/quality-problem.vue')
      }
    ]
  },
  {
    path: '/quality_disc_menu',
    name: 'quality_disc_menu',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'quality_disc',
        name: 'quality_disc',
        meta: {
          icon: 'ios-hammer',
          title: '质量大盘',
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/quality-disc/quality-disc.vue')
      }
    ]
  },
  {
    path: '/code_statistics_menu',
    name: 'code_statistics_menu',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'code_statistics',
        name: 'code_statistics',
        meta: {
          icon: 'ios-hammer',
          title: '代码统计',
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/code-statistics/code-statistics.vue')
      }
    ]
  },
  {
    path: '/bugs_statistics_menu',
    name: 'bugs_statistics_menu',
    meta: {
      icon: 'ios-book',
      title: '缺陷统计'
    },
    component: Main,
    children: [
      {
        path: 'bugs-visualization',
        name: 'bugs-visualization',
        meta: {
          icon: 'md-browsers',
          title: '缺陷质量可视化'
        },
        component: () => import('@/view/bugs-statistics/bugs-visualization.vue')
      },
      {
        path: 'bugs-survey',
        name: 'bugs-survey',
        meta: {
          icon: 'md-browsers',
          title: '缺陷概况'
        },
        component: () => import('@/view/bugs-statistics/bugs-survey.vue')
      },
      {
        path: 'bugs-solve',
        name: 'bugs-solve',
        meta: {
          icon: 'md-clipboard',
          title: '缺陷解决及时性'
        },
        component: () => import('@/view/bugs-statistics/bugs-solve.vue')
      }
    ]
  },
  {
    path: '/process_statistics_menu',
    name: 'process_statistics_menu',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'process_statistics',
        name: 'process_statistics',
        meta: {
          icon: 'ios-hammer',
          title: '流程规范统计',
          beforeCloseName: 'before_close_normal'
        }
        // component: () => import('@/view/code-statistics/code-statistics.vue')
      }
    ]
  },
  {
    path: '/object_manage_menu',
    name: 'object_manage_menu',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'object-manage',
        name: 'object-manage',
        meta: {
          icon: 'ios-hammer',
          title: '项目管理',
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/object-manage/object-manage.vue')
      }
    ]
  },
  {
    path: '/data_manage_menu',
    name: 'data_manage_menu',
    meta: {
      icon: 'ios-book',
      title: '数据管理中心'
    },
    component: Main,
    children: [
      {
        path: 'project-files',
        name: 'project-files',
        meta: {
          icon: 'md-browsers',
          title: '项目档案'
        },
        component: () => import('@/view/data-manage/project-files.vue')
      },
      {
        path: 'review-related',
        name: 'review-related',
        meta: {
          icon: 'md-browsers',
          title: '评审相关'
        },
        component: () => import('@/view/data-manage/review-related.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
