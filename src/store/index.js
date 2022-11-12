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
    notes:'',
    iCurrency:'$',
    itemName:'Item',
    rName:'Rate',
    qName:'Quantity',
    aName:'Amount',
    tName:'Tax',
    dT_Name:'Deducted Tax',
    discName:'Discount',
    bName:'Balance Due'
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
      return Math.round((state.subTotal + getters.taxed -getters.discounted - getters.deducted)*100)/100
    },
  },
  mutations: {
    reset(state,val){
      state.resetForm=val
      
    },
    setCurrency(state,val){
      state.iCurrency=val
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
      state.itemName=param.iName
      state.rName=param.iRname
      state.qName=param.iQname
      state.aName=param.iAname
      state.bName=param.iBname
      state.terms=param.terms
      console.log(state.InvoiceValues,'val')
    },
    setTax(state,param){
      state.tax=param.aTax
      state.deduct=param.dTax
      state.Discount=param.disc
      state.tName=param.tName
      state.dT_Name=param.dT_Name
      state.discName=param.discName
    }
  },
  actions: {
  },
  modules: {
  }
})
