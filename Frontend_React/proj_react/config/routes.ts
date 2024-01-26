/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      // 当一个绝对路径的子路由被嵌套在另一个路径下时，子路由不应该以斜杠（/）开头。在 React Router v6 中，所有的 <Route> 元素的 path 属性都被视为相对于其父路由的路径，
      // 除非它们以斜杠开头，那么它们就会被视为绝对路径。
      // An absolute child route path must start with the combined path of all its parent routes.

      // 在UmiJS（或类似路由系统）中，子路由的路径应该是相对于父路由的，除非它是一个独立的路由。
      {
        path: 'login',// path: '/user/login', // /user/login会报错，修改为相对路径
        layout: false,
        name: 'login',
        component: './user/login',
      },
      {
        path: '', //path: '/user',  // 当访问 '/user' 时，重定向到 '/user/login'
        redirect: 'login'// redirect: '/user/login', 子路由改为相对路径
      },
      {
        name: 'register-result',
        icon: 'smile',
        path: 'register-result',// path: '/user/register-result',
        component: './user/register-result',
      },
      {
        name: 'register',
        icon: 'smile',
        path: 'register', // path: '/user/register', 子路由改为相对路径
        component: './user/register',
      },
      {
        component: '404',
        path: '*', // path: '/*', 子路由改为相对路径
      },
    ],
  },
  // 其他路径和重定向应保持为绝对路径，因为它们不是嵌套在另一个路由下。

  //******************** SearchKeyword - NewPage ********************
  // {
  //   component: './SearchKeyword/article', // 输入相关关键字 这一块的组件
  //   //  component: './SearchKeyword',
  //   // component: './list/search/articles'
  //   // component: './articles',
  // },
  {
    name: 'Search-Keyword',// name: 'Search - Keyword', i18报错
    icon: 'smile',
    path: '/search_keyword', // 新的单独页面路径
    component: './SearchKeyword' // 渲染 搜索框 + 文章板块
    // component: './SearchKeyword/articles' // 只渲染文章板块

    // routes: [
    //   {
    //     path: '/SearchKeyword',
    //     component: './SearchKeyword', // 第一个子组件
    //   },
    //   {
    //     path: '/SearchKeyword/articles',
    //     component: './SearchKeyword/articles', // 第二个子组件
    //   },
    // ],
  },

    {
    name: 'upload-pdf-files',// name: 'Search - Keyword', i18报错
    icon: 'smile',
    path: '/upload-pdf-files', // 新的单独页面路径
    component: './upload-pdf-files' // 渲染 搜索框 + 文章板块

  },



  // ******************** Dashboard ********************
  // {
  //   path: '/dashboard',
  //   name: 'dashboard',
  //   icon: 'dashboard',
  //   routes: [
  //     {
  //       path: '/dashboard',
  //       redirect: '/dashboard/analysis',
  //     },
  //     {
  //       name: 'analysis',
  //       icon: 'smile',
  //       path: '/dashboard/analysis',
  //       component: './dashboard/analysis',
  //     },
  //     {
  //       name: 'monitor',
  //       icon: 'smile',
  //       path: '/dashboard/monitor',
  //       component: './dashboard/monitor',
  //     },
  //     {
  //       name: 'workplace',
  //       icon: 'smile',
  //       path: '/dashboard/workplace',
  //       component: './dashboard/workplace',
  //     },
  //   ],
  // },
  // ********************  表单页  ********************
  // {
  //   path: '/form',
  //   icon: 'form',
  //   name: 'form',
  //   routes: [
  //     {
  //       path: '/form',
  //       redirect: '/form/basic-form',
  //     },
  //     {
  //       name: 'basic-form',
  //       icon: 'smile',
  //       path: '/form/basic-form',
  //       component: './form/basic-form',
  //     },
      // {
      //   name: 'step-form',  // 分步骤表单
      //   icon: 'smile',
      //   path: '/form/step-form',
      //   component: './form/step-form',
      // },
  //     {
  //       name: 'advanced-form',
  //       icon: 'smile',
  //       path: '/form/advanced-form',
  //       component: './form/advanced-form',
  //     },
  //   ],
  // },

  // ********************  列表页 【搜索列表 可折叠3 + 单项3】********************
  // {
  //   path: '/list',
  //   icon: 'table',
  //   name: 'list',
  //   routes: [
  //     {
  //       // ******* 下面有 3 个搜索列表 // *******
  //       path: '/list/search',
  //       name: 'search-list',
  //       component: './list/search',
  //       routes: [
  //         {
  //           path: '/list/search',
  //           redirect: '/list/search/articles',
  //         },
  //         {
  //           name: 'articles',
  //           icon: 'smile',
  //           path: '/list/search/articles',
  //           component: './list/search/articles',
  //         },
  //         {
  //           name: 'projects',
  //           icon: 'smile',
  //           path: '/list/search/projects',
  //           component: './list/search/projects',
  //         },
  //         {
  //           name: 'applications',
  //           icon: 'smile',
  //           path: '/list/search/applications',
  //           component: './list/search/applications',
  //         },
  //       ],
  //     },
      // {
      //   path: '/list',
      //   redirect: '/list/table-list',
      // },
      // {  // 查询表格
      //   name: 'table-list',
      //   icon: 'smile',
      //   path: '/list/table-list',
      //   component: './table-list',
      // },
      // {  // 标准列表
      //   name: 'basic-list',
      //   icon: 'smile',
      //   path: '/list/basic-list',
      //   component: './list/basic-list',
      // },
      // { // 标准列表 卡片列表
      //   name: 'card-list',
      //   icon: 'smile',
      //   path: '/list/card-list',
      //   component: './list/card-list',
      // },
  //   ],
  // },

  //******************** 详情页 ********************
  // {
  //   path: '/profile',
  //   name: 'profile',
  //   icon: 'profile',
  //   routes: [
  //     {
  //       path: '/profile',
  //       redirect: '/profile/basic',
  //     },
  //     {
  //       name: 'basic',  // 基础详情页
  //       icon: 'smile',
  //       path: '/profile/basic',
  //       component: './profile/basic',
  //     },
  //     {
  //       name: 'advanced',  // 高级详情页
  //       icon: 'smile',
  //       path: '/profile/advanced',
  //       component: './profile/advanced',
  //     },
  //   ],
  // },

  // ******************** 结果页 成功/失败 ********************
  // {
  //   name: 'result',
  //   icon: 'CheckCircleOutlined',
  //   path: '/result',
  //   routes: [
  //     {
  //       path: '/result',
  //       redirect: '/result/success',
  //     },
  //     {
  //       name: 'success',
  //       icon: 'smile',
  //       path: '/result/success',
  //       component: './result/success',
  //     },
  //     {
  //       name: 'fail',
  //       icon: 'smile',
  //       path: '/result/fail',
  //       component: './result/fail',
  //     },
  //   ],
  // },

  //******************** 异常页 ********************
  // {
  //   name: 'exception',
  //   icon: 'warning',
  //   path: '/exception',
  //   routes: [
  //     {
  //       path: '/exception',
  //       redirect: '/exception/403',
  //     },
  //     {
  //       name: '403',
  //       icon: 'smile',
  //       path: '/exception/403',
  //       component: './exception/403',
  //     },
  //     {
  //       name: '404',
  //       icon: 'smile',
  //       path: '/exception/404',
  //       component: './exception/404',
  //     },
  //     {
  //       name: '500',
  //       icon: 'smile',
  //       path: '/exception/500',
  //       component: './exception/500',
  //     },
  //   ],
  // },

  // ******************** 个人页 ********************
  {
    name: 'account',
    icon: 'user',
    path: '/account',
    routes: [
      {
        path: '/account',
        redirect: '/account/center',
      },
      {
        name: 'center',
        icon: 'smile',
        path: '/account/center',
        component: './account/center',
      },
      {
        name: 'settings',
        icon: 'smile',
        path: '/account/settings',
        component: './account/settings',
      },
    ],
  },
  {
    path: '/',
    redirect: '/dashboard/analysis',
  },
  {
    component: '404',
    path: '/*',
  },
];
