export default
  [
    { path: 'crm', name: 'crm', meta: { keepAlive: true, role: 1, title: '首页', }, component: () => import('@/views/layou/backend') },
    { path: 'index', name: 'Index', meta: { keepAlive: true, role: 87, title: '首页', }, component: () => import('@/views/backend/crm/home') },
    { path: 'admin', name: 'Admin', meta: { keepAlive: true, role: 33, title: '行政管理', }, component: () => import('@/views/layou') },
    { path: 'user', name: 'Adminmenber', meta: { keepAlive: true, role: 34, title: '员工列表', }, component: () => import('@/views/backend/crm/admin/user') },
    { path: 'roles', name: 'Adminroles', meta: { keepAlive: true, role: 85, title: '权限分配', }, component: () => import('@/views/backend/crm/admin/roles') },
    // 财务管理
    { path: 'finance', name: 'Finance', meta: { keepAlive: true, role: 83, title: '财务管理', }, component: () => import('@/views/layou') },
    { path: 'index', name: 'Financeindex', meta: { keepAlive: true, role: 84, title: '顾问审核', }, component: () => import('@/views/backend/crm/finance/index/') },
    // 咨询管理
    { path: 'customer', name: 'Customer', meta: { keepAlive: true, role: 10, title: '咨询管理', }, component: () => import('@/views/layou') },
    { path: 'list', name: 'Customerlist', meta: { keepAlive: true, role: 32, title: '咨询列表', }, component: () => import('@/views/backend/crm/customer/list') },
    { path: 'index', name: 'Customerindex', meta: { keepAlive: true, role: 20, title: '咨询统计', }, component: () => import('@/views/backend/crm/customer/index/') },
    // 销售中心
    { path: 'sales', name: 'Sales', meta: { keepAlive: true, role: 7, title: '销售中心', }, component: () => import('@/views/layou'), },
    { path: 'seek', name: 'Saleseek', meta: { keepAlive: true, role: 192, title: '咨询记录', }, component: () => import('@/views/backend/crm/sales/seek') },
    { path: 'total', name: 'Salestotal', meta: { keepAlive: true, role: 77, title: '数据总览', }, component: () => import('@/views/backend/crm/sales/total') },
    { path: 'index', name: 'Salesindex', meta: { keepAlive: true, role: 16, title: '顾问记录', }, component: () => import('@/views/backend/crm/sales/index/') },
    { path: 'forming', name: 'Salesforming', meta: { keepAlive: true, role: 79, title: '个人目标', }, component: () => import('@/views/backend/crm/sales/forming') },
    { path: 'receive', name: 'Salesreceive', meta: { keepAlive: true, role: 17, title: '顾问接待', }, component: () => import('@/views/backend/crm/sales/receive') },
    { path: 'personal', name: 'Salespersonal', meta: { keepAlive: true, role: 76, title: '个人数据', }, component: () => import('@/views/backend/crm/sales/personal') },
    { path: 'commission', name: 'Salescommission', meta: { keepAlive: true, role: 78, title: '提成设置', }, component: () => import('@/views/backend/crm/sales/commission') },
    { path: 'coefficient', name: 'Salescoefficient', meta: { keepAlive: true, role: 80, title: '提成系数', }, component: () => import('@/views/backend/crm/sales/coefficient') },
    // 数据管理
    { path: 'data', name: 'Data', meta: { keepAlive: true, role: 13, title: '数据管理', }, component: () => import('@/views/layou'), },
    { path: 'index', name: 'Dataindex', meta: { keepAlive: true, role: 31, title: '数据总览', }, component: () => import('@/views/backend/crm/data/index/') },
    // 导师中心
    { path: 'tutor', name: 'Tutor', meta: { keepAlive: true, role: 8, title: '导师中心', }, component: () => import('@/views/layou'), },
    { path: 'index', name: 'Tutorindex', meta: { keepAlive: true, role: 18, title: '导师记录', }, component: () => import('@/views/backend/crm/tutor/index/') },
    { path: 'receive', name: 'Tutorreceive', meta: { keepAlive: true, role: 40, title: '导师接待', }, component: () => import('@/views/backend/crm/tutor/receive') },
    { path: 'personal', name: 'Tutordata', meta: { keepAlive: true, role: 81, title: '个人数据', }, component: () => import('@/views/backend/crm/tutor/personal') },
    { path: 'total', name: 'Tutortotal', meta: { keepAlive: true, role: 82, title: '数据总览', }, component: () => import('@/views/backend/crm/tutor/total') },
    { path: 'renovation', name: 'Tutorrenovation', meta: { keepAlive: true, role: 169, title: '装修账号', }, component: () => import('@/views/backend/crm/tutor/renovation') },
    // 质检中心
    { path: 'quality', name: 'Quality', meta: { keepAlive: true, role: 9, title: '质检中心', }, component: () => import('@/views/layou'), },
    { path: 'index', name: 'Qualityindex', meta: { keepAlive: true, role: 19, title: '数据管理', }, component: () => import('@/views/backend/crm/quality') },
    { path: 'extend', name: 'Ether', meta: { keepAlive: true, role: 11, title: '扩展管理', }, component: () => import('@/views/layou'), },
    // 营销中心
    { path: 'marketing', name: 'Marketing', meta: { keepAlive: true, role: 179, title: '营销', }, component: () => import('@/views/layou'), },
    { path: 'activity', name: 'Marketingactivity', meta: { keepAlive: true, role: 180, title: '活动管理', }, component: () => import('@/views/backend/crm/marketing/activity') },
    { path: 'member', name: 'Marketingmember', meta: { keepAlive: true, role: 181, title: '会员数据', }, component: () => import('@/views/backend/crm/marketing/member') },



  ]