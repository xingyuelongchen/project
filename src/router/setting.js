export default [
    { path: 'setting', name: 'Setting', meta: { keepAlive: true, role: 118, title: '系统设置', }, component: () => import('@/views/layou/backend'), },
    { path: 'function', name: 'Function', meta: { keepAlive: true, role: 119, title: '功能设置', }, component: () => import('@/views/layou') },
    { path: 'icon', name: 'Settingicon', meta: { keepAlive: true, role: 117, title: '图标管理', }, component: () => import('@/views/backend/setting/function/icon') },
    { path: 'roles', name: 'Roles', meta: { keepAlive: true, role: 21, title: '权限菜单', }, component: () => import('@/views/backend/setting/function/roles') },
    { path: 'role-field', name: 'RoleField', meta: { keepAlive: true, role: 45, title: '字段管理', }, component: () => import('@/views/backend/setting/function/roleField') },
    { path: 'role-group', name: 'Rolegroup', meta: { keepAlive: true, role: 30, title: '角色权限', }, component: () => import('@/views/backend/setting/function/roleGroup') },
    { path: 'option', name: 'option', meta: { keepAlive: true, role: 86, title: '选项管理', }, component: () => import('@/views/backend/setting/function/option') },
    { path: 'system-setting', name: 'Systemsetting', meta: { keepAlive: true, role: 46, title: '系统配置', }, component: () => import('@/views/backend/setting/function/systemSetting') },
    { path: 'organization', name: 'Adminorganization', meta: { keepAlive: true, role: 75, title: '组织构架', }, component: () => import('@/views/backend/setting/function/organization') },
    { path: 'tag', name: 'Admintag', meta: { keepAlive: true, role: 190, title: '流程标签', }, component: () => import('@/views/backend/setting/function/tag') },

  
    { path: 'pay', name: 'Settingpay', meta: { keepAlive: true, role: 191, title: '支付管理', }, component: () => import('@/views/backend/setting/pay') },
    { path: 'backup', name: 'Settingbackup', meta: { keepAlive: true, role: 210, title: '数据备份', }, component: () => import('@/views/backend/setting/backup') },
    { path: 'updatelog', name: 'Settingupdatelog', meta: { keepAlive: true, role: 211, title: '数据备份', }, component: () => import('@/views/backend/setting/updatelog') },
] 