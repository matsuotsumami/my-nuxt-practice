import Vue from 'vue'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(Vuex)

export const store = new Vuex.Store({
  /*
  Ideally if all your modules are dynamic
  then your store is registered initially
  as a completely empty object
  */
})
