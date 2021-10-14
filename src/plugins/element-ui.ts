import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
// import locale from '../utils/elementUI/ja'

export default () => {
  Vue.use(ElementUI, { locale })
}
