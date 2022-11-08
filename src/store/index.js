import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    InvoiceValues:{},
    itemsDetails:[],
    subTotal:null,
    logo:null,
    iTitle:'Invoice',
    tax:0,
    deduct:0,
    Discount:0,
    resetForm:false,
    theme:'#94a3b8',
    notes:''
  },
  getters: {
    taxed(state){
      return (state.subTotal * state.tax)/100
    },
    deducted(state){
      return (state.subTotal * state.deduct)/100
    },
    discounted(state){
      return (state.subTotal * state.Discount)/100
    },
    totalValue(state,getters){
      return Math.round(state.subTotal + getters.taxed -getters.discounted - getters.deducted )
    }
  },
  mutations: {
    reset(state,val){
      state.resetForm=val
      
    },
    setTheme(state,val){
      state.theme=val
      
    },
    setValues(state,param){
      state.InvoiceValues=JSON.stringify(param.value)
      state.itemsDetails=JSON.stringify(param.itemsDetails)
      state.subTotal=param.subTotal
      state.logo=param.logo
      state.iTitle=param.title
      state.notes=param.notes
      console.log(state.InvoiceValues,'val')
    },
    setTax(state,param){
      state.tax=param.aTax
      state.deduct=param.dTax
      state.Discount=param.disc
    }
  },
  actions: {
  },
  modules: {
  }
})
