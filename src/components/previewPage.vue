<template lang="">
  <div>
    <div style="max-width: 800px;height: auto;
    min-height: 750px !important;" class="p-8 pb-12 top">
        <div class="head-title flex justify-between">
            <div class="logo ">
                <span style="float:left; font-size: 24px;font-weight: 500 !important;" class="upper"><h5>{{iTitle}}</h5></span><br>
                <div v-if="logo" class="p-2 pt-4">
                    <img :src="logo" width="130px" height="130px" alt="">
                </div>
            </div>
            <div class="business flex flex-col text-right">
                <p><b class="upper">{{this.formFields.Name}}</b></p>
                <span v-if="this.formFields.address">
                    <p>{{this.formFields.address[0].address1}}</p>
                <p>{{this.formFields.address[0].city}}</p>
                <p>{{this.formFields.address[0].zipcode}}</p></span>
                <p>{{this.formFields.email}}</p>
                <p>{{this.formFields.phone}}</p>
                <p>{{this.formFields.businessPhone}}</p>
            </div>
        </div>
        <div class="bill grid grid-cols-2">
            <div>
              <div class="business business1 flex flex-col text-left pr-2">
                <p class="light">BILL TO</p>
                <p>{{this.formFields.cName}}</p>
                <p>{{this.formFields.cEmail}}</p>
                <span v-if="this.formFields.cAddress">
                    <p>{{this.formFields.cAddress[0].address}}</p>
                <p>{{this.formFields.cAddress[0].city}}</p>
                <p>{{this.formFields.cAddress[0].zipcode}}</p></span>
                
                <p>{{this.formFields.cPhone}}</p>
            </div>
            </div>
            <div class="grid grid-cols-1" >
              <div class="business flex flex-col text-left">
                <p class="light">Created Date</p>
                <p>{{this.formFields.iDate}}</p>
               
            </div>
             <div class="business flex flex-col text-left ">
                <p class="light" v-if="this.formFields.dueDate">Due Date</p>
                <p>{{this.formFields.dueDate}}</p>
            </div>
            <div class="business flex flex-col text-left">
                <p class="light">{{bName}}</p>
                <p>{{iCurrency}} {{totalValue}}</p>
            </div>
            <div class="business flex flex-col text-left">
                <p class="light">Invoice number</p>
                <p class="upper">{{this.formFields.iNumber}}</p>
            </div>
            </div>
        </div>
        <div class="topB">
            <b-table :items="items" :fields="fields" borderless fixed>
              <template #head(name)>
        <span class="light text-left">{{ itemName.toUpperCase() }}</span>
      </template>
              <template #head(rate)>
        <span class="light" style="text-align:right !important">{{ rName.toUpperCase() }}</span>
      </template>
              <template #head(quantity)>
        <span class="light">{{ qName.toUpperCase() }}</span>
      </template>
              <template #head(amount)>
        <span class="light">{{ aName.toUpperCase() }}</span>
      </template>
            <template #cell(amount)="row">
                <div class="">
                  {{iCurrency}} {{row.item.rate * row.item.quantity}}
                </div>
            </template>
            <template #cell(name)="row">
                <div class="text-left">
                    {{row.item.name}}
                    <br>
                    <span style="font-size:12px" class="text-gray-500pt-4">{{row.item.desc}}</span>
                </div>
            </template>
          </b-table>
        </div>
        <div class="grid grid-cols-2 pr-4">
            <div>
              <!-- <p class="light p-0 m-0">Invoice total</p>
              <h4 class="text-left p-0 m-0">{{iCurrency}} {{subTotal}}</h4>
              <br>
              <p class="light p-0 m-0" v-if="this.formFields.dueDate">Due date</p>
              <p class="text-left p-0 m-0">{{this.formFields.dueDate}}</p> -->
            </div>
            <div class="sub-total table-box1">
          <table>
            <tr>
              <td class="text-left">SubTotal</td><td class="text-right">{{iCurrency}} {{subTotal}}</td>
            </tr>
            <tr v-if="(tax)">
              <td class="text-left">{{tName}} ({{tax}}%)</td><td class="text-right">{{iCurrency}} {{taxed}}</td>
            </tr>
            <tr v-if="deduct">
              <td class="text-left">{{dT_Name}}({{deduct}}%)</td><td class="text-right">-{{iCurrency}} {{deducted}}</td>
            </tr>
            <tr v-if="Discount">
              <td class="text-left">{{discName}} ({{Discount}}%)</td><td class="text-right">-{{iCurrency}} {{discounted}}</td>
            </tr>
            <br><br>
            <tr class="">
              <td class="text-left">{{bName}}</td><td class="text-right">{{iCurrency}} {{totalValue}}</td>
            </tr>
          </table>
          <br><br>
        </div>
          </div>
          <div class="text-left flex" v-if="notes">
            <br>
            <span>Notes:<br>{{notes}}</span>
          </div>
          <br>
          <div class="text-left flex" v-if="terms">
            <br>
            <span>Terms:<br>{{terms}}</span>
          </div>
        <br>
    </div></div>
</template>
<script>
import { mapState ,mapGetters} from 'vuex';
export default {
    data() {
      return {
        // Note `isActive` is left out and will not appear in the rendered table
        fields: [
          {
            key: 'name',
            label: 'Description',
            thClass:"light text-left",
            class:'desc text-left'
          },
          {
            key: 'rate',
            sortable: false,
            label: 'Rate',
            class:'text-right',
            
          },
          {
            key: 'quantity',
            label: 'Quantity',
            class:'text-center',
            thClass:'light'
          },
          {
            key: 'amount',
            label: 'Amount',
            class:'text-center',
            thClass:'light'
          }
        ],
        formFields:{},
        items:[]
      }
    },
    computed:{
        ...mapState(['itemsDetails','iTitle','logo','subTotal','InvoiceValues','tax','Discount','deduct','theme','iCurrency','notes','itemName','rName','qName','aName','tName','dT_Name','discName','bName','terms']),
    ...mapGetters(['taxed','deducted','discounted','totalValue']),
    filterdRows(){
      console.log(typeof(this.itemsDetails))
      return ['abc']
    }
    },
    created(){
    console.log(this.InvoiceValues)
    this.formFields=JSON.parse(this.InvoiceValues)
    // this.items=JSON.parse(this.itemsDetails)
    var filt =JSON.parse(this.itemsDetails)
    var filterred = filt.filter((item)=>{
      return item.name!=''
    })
    this.items=filterred
  }
}
</script>
<style scoped lang="css">
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@500&display=swap');
  body{
    margin: 0 !important;
    padding: 0 !important;
    line-height: 80% !important;
}  
:root {
    --var-txt-color: v-bind(theme);
 }
 .business1 {
  height: auto;
    min-height: 220px !important;
    /* max-width: 50%; */
    word-wrap: break-word;
}
.head-title {
    background: padding-box;
    min-height: 121px;
    height: auto;
}
 .light{
    color:v-bind(theme);
    font-weight: 500;
}
.top{
  border-top: 10px solid v-bind(theme);
}
.topB{
  border-top:2px solid v-bind(theme);
  margin-top:5%;padding-top:5px;
}
th{
 color: v-bind(theme) !important;
}
</style>