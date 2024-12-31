import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */


// 公共路由
export const constantRoutes = [
  {
    path: '',
    redirect: "/layout",
  },


  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },


  {
    path: '*',
    component: () => import('@/views/error/404'),
    name: '404'
  },

  // {
  //   path: '',
  //   component: Layout,
  //   redirect: 'index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/index'),
  //       name: 'Index',
  //       meta: { title: '首页', icon: 'dashboard', affix: true }
  //     }
  //   ]
  // },

  {
    path: '/layout',
    component: () => import('@/layout/index'),
    redirect: '/layout/home',
    children: [
      {
        path: "home",
        component: () => import('@/views/home'),
        name: "Home",
        meta: {
          title: "首页"
        }
      },
      {
        path: "user-management",
        component: () => import('@/views/user-management'),
        name: "UserManagement",
        meta: {
          title: "用户管理"
        }
      },

      {
        path: "ai-card-management",
        component: () => import('@/views/ai-card-management'),
        name: "AiCardManagement",
        meta: {
          title: "AI板卡管理"
        }
      },{
        path: "data-source-management",
        component: () => import('@/views/data-source-management'),
        name: "DataSourceManagement",
        meta: {
          title: "数据源分组管理"
        }
      },
      {
        path: "model-management",
        component: () => import('@/views/model-management'),
        name: "ModelManagement",
        meta: {
          title: "模型库管理"
        }
      },
      {
        path: "mqtt-config",
        component: () => import('@/views/massage-push/mqtt-config'),
        name: "MqttConfig",
        meta: {
          title: "MQTT推送配置"
        }
      },
      {
        path: "http-config",
        component: () => import('@/views/massage-push/http-config'),
        name: "HttpConfig",
        meta: {
          title: "HTTP推送配置"
        }
      },
      {
        path: "kafka-config",
        component: () => import('@/views/massage-push/kafka-config'),
        name: "KafkaConfig",
        meta: {
          title: "KAFKA配置"
        }
      },
      {
        path: "scene-management",
        component: () => import('@/views/scene-management'),
        name: "SceneManagement",
        meta: {
          title: "场景管理"
        }
      },
      {
        path: "alarm-log",
        component: () => import('@/views/alarm-log'),
        name: "alarmLog",
        meta: {
          title: "告警日志"
        }
      },
      {
        path: "video-capture",
        component: () => import('@/views/video-capture'),
        name: "videoCapture",
        meta: {
          title: "视频采集卡"
        }
      },
      {
        path: "video-storage",
        component: () => import('@/views/video-storage'),
        name: "videoStorage",
        meta: {
          title: "NVR视频存储"
        }
      },
      {
        path: "video-splicing",
        component: () => import('@/views/video-splicing'),
        name: "videoSplicing",
        meta: {
          title: "RMG300视频拼接"
        }
      },
      {
        path: "video-dispatch",
        component: () => import('@/views/video-info-dispatch'),
        name: "videoDispatch",
        meta: {
          title: "视频信息系统调度"
        }
      },
      {
        path: "video-forwarding",
        component: () => import('@/views/video-synthetic-forwarding'),
        name: "videoForwarding",
        meta: {
          title: "视频合成转发功能"
        }
      },
      {
        path: "import-point",
        component: () => import('@/views/import-point'),
        name: "importPoint",
        meta: {
          title: "导入监控点"
        }
      },
      {
        path: "decode-card-management",
        component: () => import('@/views/decode-card-management'),
        name: "decodeCardManagement",
        meta: {
          title: "解码卡管理"
        }
      },
      {
        path: "network-set",
        component: () => import('@/views/network-set'),
        name: "networkSet",
        meta: {
          title: "网络设置"
        }
      },


    ]
  },

]

// 动态路由，基于用户权限动态去加载
// export const dynamicRoutes = [
//   {
//     path: '/system/user-auth',
//     component: Layout,
//     hidden: true,
//     permissions: ['system:user:edit'],
//     children: [
//       {
//         path: 'role/:userId(\\d+)',
//         component: () => import('@/views/system/user/authRole'),
//         name: 'AuthRole',
//         meta: { title: '分配角色', activeMenu: '/system/user' }
//       }
//     ]
//   },
//   {
//     path: '/system/role-auth',
//     component: Layout,
//     hidden: true,
//     permissions: ['system:role:edit'],
//     children: [
//       {
//         path: 'user/:roleId(\\d+)',
//         component: () => import('@/views/system/role/authUser'),
//         name: 'AuthUser',
//         meta: { title: '分配用户', activeMenu: '/system/role' }
//       }
//     ]
//   },
//   {
//     path: '/system/dict-data',
//     component: Layout,
//     hidden: true,
//     permissions: ['system:dict:list'],
//     children: [
//       {
//         path: 'index/:dictId(\\d+)',
//         component: () => import('@/views/system/dict/data'),
//         name: 'Data',
//         meta: { title: '字典数据', activeMenu: '/system/dict' }
//       }
//     ]
//   },
//   {
//     path: '/monitor/job-log',
//     component: Layout,
//     hidden: true,
//     permissions: ['monitor:job:list'],
//     children: [
//       {
//         path: 'index/:jobId(\\d+)',
//         component: () => import('@/views/monitor/job/log'),
//         name: 'JobLog',
//         meta: { title: '调度日志', activeMenu: '/monitor/job' }
//       }
//     ]
//   },
//   {
//     path: '/tool/gen-edit',
//     component: Layout,
//     hidden: true,
//     permissions: ['tool:gen:edit'],
//     children: [
//       {
//         path: 'index/:tableId(\\d+)',
//         component: () => import('@/views/tool/gen/editTable'),
//         name: 'GenEdit',
//         meta: { title: '修改生成配置', activeMenu: '/tool/gen' }
//       }
//     ]
//   }
// ]

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push;
let routerReplace = Router.prototype.replace;
// push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}
// replace
Router.prototype.replace = function push(location) {
  return routerReplace.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }), //路由跳转后页面滚动到顶部
  routes: constantRoutes
})
