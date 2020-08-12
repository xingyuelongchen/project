export default [
    { path: 'setting', name: 'Setting', meta: { keepAlive: true, role: 118, title: '系统设置', }, component: () => import('@/views/layou/backend'), },
    { path: 'function', name: 'Function', meta: { keepAlive: true, role: 119, title: '功能设置', }, component: () => import('@/views/layou') },
    { path: 'icon', name: 'Settingicon', meta: { keepAlive: true, role: 117, title: '图标管理', }, component: () => import('@/views/backend/setting/icon') },
    { path: 'roles', name: 'Roles', meta: { keepAlive: true, role: 21, title: '权限菜单', }, component: () => import('@/views/backend/setting/roles') },
    { path: 'role-field', name: 'RoleField', meta: { keepAlive: true, role: 45, title: '字段管理', }, component: () => import('@/views/backend/setting/roleField') },
    { path: 'role-group', name: 'Rolegroup', meta: { keepAlive: true, role: 30, title: '角色权限', }, component: () => import('@/views/backend/setting/roleGroup') },
    { path: 'option', name: 'option', meta: { keepAlive: true, role: 86, title: '选项管理', }, component: () => import('@/views/backend/setting/option') },
    { path: 'system-setting', name: 'Systemsetting', meta: { keepAlive: true, role: 46, title: '系统配置', }, component: () => import('@/views/backend/setting/systemSetting') },
    { path: 'organization', name: 'Adminorganization', meta: { keepAlive: true, role: 75, title: '组织构架', }, component: () => import('@/views/backend/setting/organization') },

    { path: 'contract', name: 'Admincontract', meta: { keepAlive: true, role: 121, title: '合同管理', }, component: () => import('@/views/backend/setting/contract') },
] 