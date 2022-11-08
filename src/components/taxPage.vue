<template lang="">
    <div>
        <div class="flex flex-col text-left">
            <span class="tax-box cursor-pointer w-[225px] mt-4" @click="resetAll">Clear</span>
            <div class="tax-box tax-grid"><span class="tax ">Add Tax %</span> <input type="number" v-model="addTax" min=0 max="100"></div>
            <div class="tax-box tax-grid"><span class="tax">Deduct Tax % </span> <input type="number" v-model="deductTax" min=0 max="100"></div>
            <div class="tax-box tax-grid"><span class="tax">Discount %</span> <input type="number" v-model="discount" min=0 max="100"></div>
            <!-- {{this.currencies}} -->
            
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
            currency:{},
            defaultColors:['#94a3b8','#3490dc','#ffed4a','#e3342f']
        }
    },
    methods:{
        ...mapMutations(['setTax','reset']),
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
                aTax:this.addTax,
                dTax:this.deductTax,
                disc:this.discount
            })
        },
        deductTax(){
            this.setTax({
                aTax:this.addTax,
                dTax:this.deductTax,
                disc:this.discount
            })
        },
        discount(){
            this.setTax({
                aTax:this.addTax,
                dTax:this.deductTax,
                disc:this.discount
            })
        },
    },
    computed:{
        ...mapState(['tax','deduct','Discount'])
    },
    created(){
        this.addTax=this.tax
        this.deductTax=this.deduct
        this.discount=this.Discount
        this.getCurrency()
    }
}
</script>
<style scoped lang="css">
</style>