import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
    level :0  //代理等级
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})