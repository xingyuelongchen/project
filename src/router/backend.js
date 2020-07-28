export default


  [
    { path: 'index', name: 'Index', meta: { keepAlive: true, role: 19, title: '首页', }, component: () => import('@/views/backend/crm/home') },
    {
      path: 'admin', name: 'Admin', meta: { keepAlive: true, role: 20, title: '行政管理', }, component: () => import('@/views/layou'),
      children: [
        { path: 'member', name: 'Adminmenber', meta: { keepAlive: true, role: 21, title: '员工管理', }, component: () => import('@/views/backend/crm/admin/member') },
        { path: 'roles', name: 'Adminroles', meta: { keepAlive: true, role: 22, title: '权限分配', }, component: () => import('@/views/backend/crm/admin/roles') },
      ]
    },
    {
      path: 'data', name: 'Data', meta: { keepAlive: true, role: 30, title: '数据管理', }, component: () => import('@/views/layou'),
      children: [
        { path: 'index', name: 'Dataindex', meta: { keepAlive: true, role: 31, title: '数据概览', }, component: () => import('@/views/backend/crm/data/index/') },
      ]
    },
    {
      path: 'sales', name: 'Sales', meta: { keepAlive: true, role: 40, title: '销售中心', }, component: () => import('@/views/layou'),
      children: [
        { path: 'index', name: 'Salesindex', meta: { keepAlive: true, role: 41, title: '数据管理', }, component: () => import('@/views/backend/crm/sales/index/') },
        { path: 'receive', name: 'Salesreceive', meta: { keepAlive: true, role: 42, title: '接待设置', }, component: () => import('@/views/backend/crm/sales/receive') },
      ]
    },
    {
      path: 'tutor', name: 'Tutor', meta: { keepAlive: true, role: 60, title: '导师中心', }, component: () => import('@/views/layou'),
      children: [
        { path: 'index', name: 'Tutorindex', meta: { keepAlive: true, role: 61, title: '数据管理', }, component: () => import('@/views/backend/crm/tutor') }
      ]
    },
    {
      path: 'quality', name: 'Quality', meta: { keepAlive: true, role: 80, title: '质检中心', }, component: () => import('@/views/layou'),
      children: [
        { path: 'index', name: 'Qualityindex', meta: { keepAlive: true, role: 81, title: '数据管理', }, component: () => import('@/views/backend/crm/quality') }
      ]
    },
    {
      path: 'customer', name: 'Customer', meta: { keepAlive: true, role: 100, title: '客户管理', }, component: () => import('@/views/layou'),
      children: [
        { path: 'index', name: 'Customerindex', meta: { keepAlive: true, role: 101, title: '数据管理', }, component: () => import('@/views/backend/crm/customer') }
      ]
    },
    {
      path: 'extend', name: 'Ether', meta: { keepAlive: true, role: 120, title: '扩展管理', }, component: () => import('@/views/layou'),
    },
    {
      path: 'setting', name: 'Setting', meta: { keepAlive: true, role: 140, title: '设置', }, component: () => import('@/views/layou'),
      children: [
        { path: 'roles', name: 'Roles', meta: { keepAlive: true, role: 141, title: '权限菜单', }, component: () => import('@/views/backend/crm/setting/roles') },
        { path: 'role-group', name: 'Rolegroup', meta: { keepAlive: true, role: 141, title: '权限组', }, component: () => import('@/views/backend/crm/setting/roleGroup') },
      ]
    },

  ]