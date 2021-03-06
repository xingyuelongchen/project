export default
  [
    { path: 'crm', name: 'crm', meta: { keepAlive: true, role: 1, title: '首页', }, component: () => import('@/views/layou/backend') },
    { path: 'home', name: 'Home', meta: { keepAlive: true, role: 87, title: '首页', }, component: () => import('@/views/backend/crm/home') },
    { path: 'admin', name: 'Admin', meta: { keepAlive: true, role: 33, title: '行政管理', }, component: () => import('@/views/layou') },
    { path: 'user', name: 'Adminmenber', meta: { keepAlive: true, role: 34, title: '员工列表', }, component: () => import('@/views/backend/crm/admin/user') },
    { path: 'roles', name: 'Adminroles', meta: { keepAlive: true, role: 85, title: '权限分配', }, component: () => import('@/views/backend/crm/admin/roles') },
    // 财务管理
    { path: 'finance', name: 'Finance', meta: { keepAlive: true, role: 83, title: '财务管理', }, component: () => import('@/views/layou') },
    { path: 'index', name: 'Financeindex', meta: { keepAlive: true, role: 84, title: '顾问销售审核', }, component: () => import('@/views/backend/crm/finance/index/') },
    { path: 'refund', name: 'Financerefund', meta: { keepAlive: true, role: 199, title: '售后退款', }, component: () => import('@/views/backend/crm/finance/refund') },
    { path: 'tutor', name: 'Financetutor', meta: { keepAlive: true, role: 238, title: ' 导师销售审核', }, component: () => import('@/views/backend/crm/finance/tutor') },
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
    { path: 'return_customer', name: 'Salesreturn_customer', meta: { keepAlive: true, role: 324, title: '回流客户', }, component: () => import('@/views/backend/crm/sales/return_customer') },
    // 数据管理
    { path: 'data', name: 'Data', meta: { keepAlive: true, role: 13, title: '数据管理', }, component: () => import('@/views/layou'), },
    { path: 'index', name: 'Dataindex', meta: { keepAlive: true, role: 256, title: '数据总览', }, component: () => import('@/views/backend/crm/data/index/') },
    // 导师中心
    { path: 'tutor', name: 'Tutor', meta: { keepAlive: true, role: 8, title: '导师中心', }, component: () => import('@/views/layou'), },
    { path: 'index', name: 'Tutorindex', meta: { keepAlive: true, role: 18, title: '导师记录', }, component: () => import('@/views/backend/crm/tutor/index/') },
    { path: 'receive', name: 'Tutorreceive', meta: { keepAlive: true, role: 40, title: '导师接待', }, component: () => import('@/views/backend/crm/tutor/receive') },
    { path: 'personal', name: 'Tutordata', meta: { keepAlive: true, role: 81, title: '个人数据', }, component: () => import('@/views/backend/crm/tutor/personal') },
    { path: 'total', name: 'Tutortotal', meta: { keepAlive: true, role: 82, title: '数据总览', }, component: () => import('@/views/backend/crm/tutor/total') },
    { path: 'renovation', name: 'Tutorrenovation', meta: { keepAlive: true, role: 169, title: '装修账号', }, component: () => import('@/views/backend/crm/tutor/renovation') },
    { path: 'deallog', name: 'Tutordeallog', meta: { keepAlive: true, role: 214, title: '成交记录', }, component: () => import('@/views/backend/crm/tutor/deallog') },

    // 跨境电商导师 
    { path: 'cross', name: 'cross', meta: { keepAlive: true, role: 212, title: '跨境中心', }, component: () => import('@/views/layou'), },
    { path: 'receive', name: 'Crossreceive', meta: { keepAlive: true, role: 220, title: '接待设置', }, component: () => import('@/views/backend/crm/cross/receive') },
    { path: 'crosstutor', name: 'Crosstutor', meta: { keepAlive: true, role: 213, title: '导师记录', }, component: () => import('@/views/backend/crm/cross/crosstutor') },
    { path: 'personal', name: 'Crossdata', meta: { keepAlive: true, role: 242, title: '个人数据', }, component: () => import('@/views/backend/crm/cross/personal') },
    { path: 'total', name: 'Crosstotal', meta: { keepAlive: true, role: 243, title: '总数据', }, component: () => import('@/views/backend/crm/cross/total') },


    // 质检中心
    { path: 'quality', name: 'Quality', meta: { keepAlive: true, role: 9, title: '质检中心', }, component: () => import('@/views/layou'), },
    { path: 'index', name: 'Qualityindex', meta: { keepAlive: true, role: 19, title: '数据管理', }, component: () => import('@/views/backend/crm/quality') },

    // 营销中心
    { path: 'marketing', name: 'Marketing', meta: { keepAlive: true, role: 179, title: '营销', }, component: () => import('@/views/layou'), },
    { path: 'activity', name: 'Marketingactivity', meta: { keepAlive: true, role: 180, title: '活动管理', }, component: () => import('@/views/backend/crm/marketing/activity') },
    { path: 'member', name: 'Marketingmember', meta: { keepAlive: true, role: 181, title: '会员数据', }, component: () => import('@/views/backend/crm/marketing/member') },
    { path: 'contract', name: 'Admincontract', meta: { keepAlive: true, role: 121, title: '合同管理', }, component: () => import('@/views/backend/crm/marketing/contract') },

    // 扩展管理
    { path: 'extend', name: 'Ether', meta: { keepAlive: true, role: 11, title: '扩展管理', }, component: () => import('@/views/layou') },
    { path: 'goodnews', name: 'Goodnews', meta: { keepAlive: true, role: 314, title: '战报管理', }, component: () => import('@/views/backend/crm/extend/goodnews') },
    { path: 'coupon', name: 'Coupon', meta: { keepAlive: true, role: 313, title: '礼包管理', }, component: () => import('@/views/backend/crm/extend/coupon') },
    { path: 'gift', name: 'Gift', meta: { keepAlive: true, role: 315, title: '礼包管理', }, component: () => import('@/views/backend/crm/extend/gift') },
    { path: 'book', name: 'Book', meta: { keepAlive: true, role: 316, title: '学员证书', }, component: () => import('@/views/backend/crm/extend/book') },

  ]