<template lang="">
    <div>
        <div class="flex flex-col text-left">
            <span class="tax-box cursor-pointer w-[225px] mt-4" @click="resetAll">Clear</span>
            <div class="tax-box tax-grid"><span class="tax ">Add Tax %</span> <input type="number" v-model="addTax" min=0 max="100"></div>
            <div class="tax-box tax-grid"><span class="tax">Deduct Tax % </span> <input type="number" v-model="deductTax" min=0 max="100"></div>
            <div class="tax-box tax-grid"><span class="tax">Discount %</span> <input type="number" v-model="discount" min=0 max="100"></div>
            <!-- {{this.currencies}} -->
            <div class="bg-gray-200 rounded-md p-2 mt-2">
                <p>Select Currency: <b>{{currency}}</b></p>
                <select name="" id="" v-model="currency">
                    <option :value=cur.symbol v-for="cur in currencies" :key="cur">{{cur.code}} ({{cur.symbol}}): {{cur.name}}</option>
                </select>
            </div>
            
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import { mapMutations ,mapState} from 'vuex';
import axios from 'axios'
export default {
    data(){
        return{
            addTax:0,
            deductTax:0,
            discount:0,
            currencies:{},
            currency:'$',
            defaultColors:['#94a3b8','#3490dc','#ffed4a','#e3342f']
        }
    },
    methods:{
        ...mapMutations(['setTax','reset','setCurrency']),
        resetAll(){
            Object.assign(this.$data, this.$options.data())
        this.reset(true)
        },
        getCurrency(){
            console.log('called')
            axios
      .get('https://gist.githubusercontent.com/ksafranski/2973986/raw/5fda5e87189b066e11c1bf80bbfbecb556cf2cc1/Common-Currency.json')
      .then(response => (
        this.currencies = response.data))
        }
    },
    watch:{
        addTax(){
            this.setTax({
                aTax:this.addTax*1,
                dTax:this.deductTax*1,
                disc:this.discount*1
            })
        },
        deductTax(){
            this.setTax({
                aTax:this.addTax*1,
                dTax:this.deductTax*1,
                disc:this.discount*1
            })
        },
        discount(){
            this.setTax({
                aTax:this.addTax*1,
                dTax:this.deductTax*1,
                disc:this.discount*1
            })
        },
        currency(){
            this.setCurrency(this.currency)
        }
    },
    computed:{
        ...mapState(['tax','deduct','Discount','iCurrency'])
    },
    created(){
        this.addTax=this.tax
        this.deductTax=this.deduct
        this.discount=this.Discount
        this.getCurrency()
        this.currency=this.iCurrency
    }
}
</script>
<style scoped lang="css">
select {
    word-wrap: normal;
    width: 200px;
    padding: 5px;
    border-radius: 10px;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #860202;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
}
</style>