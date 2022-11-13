<template lang="">
    <div>
        <div class="flex flex-col text-left">
            <span class="tax-box cursor-pointer w-[225px] mt-4" @click="resetAll">Clear</span>
            <div class="tax-box tax-grid"><span class="tax "><input type="text" class="eNames" placeholder="Tax" v-model="taxTitle"> </span> <input type="number" v-model="addTax" min=0 max="100" class="tNames"> %</div>
            <div class="tax-box tax-grid"><span class="tax"><input type="text" class="eNames" placeholder="Deduct Tax" v-model="deductTitle"> </span> <input type="number" v-model="deductTax" min=0 max="100" class="tNames"> %</div>
            <div class="tax-box tax-grid"><span class="tax"><input type="text" class="eNames" placeholder="Discount" v-model="discTitle"> </span> <input type="number" v-model="discount" min=0 max="100" class="tNames"> %</div>
            <div class="tax-box tax-grid"><span class="tax"><input type="text" class="eNames" placeholder="Amount Paid" v-model="paid"> </span> {{currency}} <input type="number" v-model="paidA" min=0 max="100" class="tNames"></div>
            <!-- {{this.currencies}} -->
            <div class="bg-gray-200 rounded-md p-2 mt-2">
                <p>Select Currency: <b>{{currency}}</b></p>
                <select name="" id="" v-model="currency">
                    <option :value=cur.symbol v-for="cur in currencydata" :key="cur">{{cur.code}} ({{cur.symbol}}): {{cur.name}}</option>
                </select>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import { mapMutations ,mapState} from 'vuex';
import axios from 'axios'
import CurrencyData from './../store/currencyJson.json';
export default {
    data(){
        return{
            addTax:0,
            deductTax:0,
            discount:0,
            currencies:{},
            currency:'$',
            defaultColors:['#94a3b8','#3490dc','#ffed4a','#e3342f'],
            currencydata: CurrencyData,
            taxTitle:'Tax',
            deductTitle:'Deducted Tax',
            discTitle:'Discount',
            paid:'Amount Paid',
            paidA:0
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
            this.setTax(this.setTax(this.data2))
        },
        deductTax(){
            this.setTax(this.setTax(this.data2))
        },
        discount(){
            this.setTax(this.data2)
        },
        taxTitle(){
            this.setTax(this.data2)
        },
        deductTitle(){
            this.setTax(this.data2)
        },
        discTitle(){
            this.setTax(this.data2)
        },
        paid(){
            this.setTax(this.data2)
        },
        paidA(){
            this.setTax(this.data2)
        },
        currency(){
            this.setCurrency(this.currency)
        }
    },
    computed:{
        ...mapState(['tax','deduct','Discount','iCurrency','tName','dT_Name','discName','paidAmount','aPaid']),
        data2(){
            return{
                aTax:this.addTax*1,
                dTax:this.deductTax*1,
                disc:this.discount*1,
                tName:this.taxTitle,
                dT_Name:this.deductTitle,
                discName:this.discTitle,
                paid:this.paid,
                paidA:this.paidA
            }
        }
    },
    created(){
        this.addTax=this.tax
        this.deductTax=this.deduct
        this.discount=this.Discount
        this.getCurrency()
        this.currency=this.iCurrency
        this.taxTitle=this.tName
        this.deductTitle=this.dT_Name
        this.discTitle=this.discName
        this.paid=this.aPaid
        this.paidA=this.paidAmount
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
input.eNames {
  width: auto;
    max-width: 150px;
    border: none;
    border-right: 1px solid;
    border-left: 1px solid;
    text-align: center;
}
input.tNames{
    width: auto;
    max-width: 100px;
    min-width: 111px;
}
</style>