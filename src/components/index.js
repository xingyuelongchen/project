
/***********************************
 * 
 * 这里自动加载公共组件，只需要遵从命名规则。
 * 在当前目录内，只会加载以 mix[A-Z] 开头，并以JS 或 VUE 结尾的文件。
 * 
 */
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

export default {
    install(Vue, i18n) {
        Vue.use(Element, {
            i18n: (key, value) => i18n.t(key, value),
            size: 'small', zIndex: 200
        });
        loadComponents(Vue);
    }
}
function loadComponents(Vue) {
    let requireComponent = require.context('./', true, /(mix[A-Z]\w+)\.(vue|js)$/);
    let componentConfig, componentName;
    requireComponent.keys().forEach(fileName => {
        componentConfig = requireComponent(fileName)
        componentName = upperFirst(camelCase(fileName.split('/').pop().replace(/\.\w+$/, ''))
        )
        Vue.component(componentName, componentConfig.default || componentConfig)
    })
}