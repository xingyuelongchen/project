export default


  [
    { path: 'index', name: 'Index', title: '首页', component: () => import('@/views/backend/crm/home'), meta: { keepAlive: true, role: 19, } },
    {
      path: 'admin', name: 'Admin', title: '行政管理', meta: { keepAlive: true, role: 20, }, component: () => import('@/views/layou'),
      children: [
        { path: 'index', name: 'Adminindex', title: '员工管理', meta: { keepAlive: true, role: 21, }, component: () => import('@/views/backend/crm/admin/index') },
      ]
    },
    {
      path: 'sales', name: 'Sales', title: '销售中心', meta: { keepAlive: true, role: 40, }, component: () => import('@/views/layou'),
      children: [
        { path: 'index', name: 'Salesindex', title: '数据管理', meta: { keepAlive: true, role: 41, }, component: () => import('@/views/backend/crm/sales/index') },
        { path: 'receive', name: 'Salesreceive', title: '接待设置', meta: { keepAlive: true, role: 42, }, component: () => import('@/views/backend/crm/sales/receive') },
      ]
    },
    {
      path: 'tutor', name: 'Tutor', title: '导师中心', meta: { keepAlive: true, role: 60, }, component: () => import('@/views/layou'),
      children: [
        { path: 'index', name: 'Tutorindex', title: '数据管理', meta: { keepAlive: true, role: 61 }, component: () => import('@/views/backend/crm/tutor') }
      ]
    },
    {
      path: 'quality', name: 'Quality', title: '质检中心', meta: { keepAlive: true, role: 80, }, component: () => import('@/views/layou'),
      children: [
        { path: 'index', name: 'Qualityindex', title: '数据管理', meta: { keepAlive: true, role: 81, }, component: () => import('@/views/backend/crm/quality') }
      ]
    },
    {
      path: 'customer', name: 'Customer', title: '客户管理', meta: { keepAlive: true, role: 100, }, component: () => import('@/views/layou'),
      children: [
        { path: 'index', name: 'Customerindex', title: '数据管理', meta: { keepAlive: true, role: 101, }, component: () => import('@/views/backend/crm/customer') }
      ]
    },
    {
      path: 'extend', name: 'Ether', title: '扩展管理', meta: { keepAlive: true, role: 120, }, component: () => import('@/views/layou'),
    },
    {
      path: 'setting', name: 'Setting', title: '设置', meta: { keepAlive: true, role: 140, }, component: () => import('@/views/layou'),
      children: [
        { path: 'roles', name: 'Roles', title: '权限管理', meta: { keepAlive: true, role: 141, }, component: () => import('@/views/backend/crm/setting/roles') },
      ]
    },

  ]