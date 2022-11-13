<template lang="">
  <div
    class="preview p-8 px-4 max-w-[800px] top"
    style="height: auto;"
  >
    <div class="sm:grid sm:grid-cols-2 flex flex-row justify-between">
     <div>
        <div v-if="logo" class="p-2 pt-1 pb-4">
                    <img :src="logo" width="130px" height="130px" alt="">
                </div>
                <div class="business flex flex-col text-left">
                <p><b class="upper">{{this.formFields.Name}}</b></p>
                <span v-if="this.formFields.address">
                    <p>{{this.formFields.address[0].address1}}</p>
                <p>{{this.formFields.address[0].city}}</p>
                <p>{{this.formFields.address[0].zipcode}}</p></span>
                <p>{{this.formFields.email}}</p>
                <p>{{this.formFields.phone}}</p>
                <p>{{this.formFields.businessPhone}}</p>
            </div>
            <p class="light text-left">Ship TO</p>
            <div class="business3 flex flex-row text-left">
                <div class="pr-4">     
                <p>{{this.formFields.cName}}</p>
                <p>{{this.formFields.cEmail}}</p>
                <p>{{this.formFields.cPhone}}</p>
                </div>
                <div>
                    <span v-if="this.formFields.cAddress">
                    <p>{{this.formFields.cAddress[0].address}}</p>
                <p>{{this.formFields.cAddress[0].city}}</p>
                <p>{{this.formFields.cAddress[0].zipcode}}</p></span>
                </div>
            </div>
     </div>
     <div>
        <div class="flex flex-col">
                <h2 class="upper text-right font-medium" style="font-size: 34px;">{{iTitle}}</h2>
                <span class="text-slate-400 upper text-right font-medium">#{{this.formFields.iNumber}}</span>
        </div><br><br>
        <div class="sub-total table-box3 px-4 mr-2">
          <table style="    width: 225px !important;
    ">
            <tr>
              <td class="text-left trow p-2">Date:</td><td class="text-left trow p-2">{{this.formFields.iDate}}</td>
            </tr>
            <tr v-if="this.formFields.dueDate">
              <td class="text-left trow p-2">Due Date:</td><td class="text-left trow p-2">{{this.formFields.dueDate}}</td>
            </tr>
            <tr >
              <td class="text-left trow p-2 light">{{bName}}</td><td class="text-left trow p-2">{{iCurrency}} {{totalValue}}</td>
            </tr>
            </table>
            </div>
     </div>
    </div>
    <div class="topB">
        <b-table :items="items" :fields="fields" fixed>
      <template #head(name)>
        <span class="light text-left">{{ itemName.toUpperCase() }}</span>
      </template>
      <template #head(rate)>
        <span class="light" style="text-align: right !important">{{
          rName.toUpperCase()
        }}</span>
      </template>
      <template #head(quantity)>
        <span class="light">{{ qName.toUpperCase() }}</span>
      </template>
      <template #head(amount)>
        <span class="light">{{ aName.toUpperCase() }}</span>
      </template>
      <template #cell(amount)="row">
        <div class="">
          {{ iCurrency }} {{ row.item.rate * row.item.quantity }}
        </div>
      </template>
      <template #cell(rate)="row">
        <div class="">
          {{ iCurrency }} {{ row.item.rate}}
        </div>
      </template>
      <template #cell(name)="row">
        <div class="text-left">
          {{ row.item.name }}
          <br>
          <span style="font-size: 12px" class="text-gray-500pt-4">{{
            row.item.desc
          }}</span>
        </div>
      </template>
    </b-table>
    </div>
    <div class="flex justify-end">
      <!-- <div style="text-align: left !important">
        <p class="light p-0 m-0">Invoice total</p>
        <h4 class="text-left p-0 m-0" style="font-size: 24px !important">
          {{ iCurrency }} {{ subTotal }}
        </h4>
        <br>
        <p class="light p-0 m-0" v-if="this.formFields.dueDate">Due date</p>
              <p class="text-left p-0 m-0">{{this.formFields.dueDate}}</p> 
      </div> -->
      <div class="sub-total table-box1 px-4 mr-2">
        <table  style="    width: auto;">
          <tr>
            <td class="text-left">SubTotal</td>
            <td class="text-right">{{ iCurrency }} {{ subTotal }}</td>
          </tr>
          <tr v-if="tax">
            <td class="text-left">{{ tName }} ({{ tax }}%)</td>
            <td class="text-right">{{ iCurrency }} {{ taxed }}</td>
          </tr>
          <tr v-if="deduct">
            <td class="text-left">{{ dT_Name }}({{ deduct }}%)</td>
            <td class="text-right">{{ iCurrency }} -{{ deducted }}</td>
          </tr>
          <tr v-if="Discount">
            <td class="text-left">{{ discName }} ({{ Discount }}%)</td>
            <td class="text-right">{{ iCurrency }} -{{ discounted }}</td>
          </tr>
          <tr v-if="paidAmount">
            <td class="text-left">{{ aPaid }}</td>
            <td class="text-right">{{ iCurrency }} -{{ paidAmount }}</td>
          </tr>
          <br><br>
          <tr class="">
            <td class="text-left">{{ bName }}</td>
            <td class="text-right">{{ iCurrency }} {{ totalValue }}</td>
          </tr>
        </table>
        <br><br>
      </div>
    </div>
    <div class="text-left flex" v-if="notes">
      <br>
      <span>Notes:<br>{{ notes }}</span>
    </div>
    <br>
    <div class="text-left flex" v-if="terms">
      <br>
      <span>Terms:<br>{{ terms }}</span>
    </div>
    <br>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      // Note `isActive` is left out and will not appear in the rendered table
      fields: [
        {
          key: "name",
          label: "Description",
          thClass: "light text-left",
        },
        {
          key: "rate",
          sortable: false,
          label: "Rate",
          class: "text-right space",
        },
        {
          key: "quantity",
          label: "Quantity",
          class: "text-center space",
          thClass: "light",
        },
        {
          key: "amount",
          label: "Amount",
          class: "text-center space",
          thClass: "light",
        },
      ],
      formFields: {},
      items: [],
    };
  },
  computed: {
    ...mapState([
      "itemsDetails",
      "iTitle",
      "logo",
      "subTotal",
      "InvoiceValues",
      "tax",
      "Discount",
      "deduct",
      "theme",
      "iCurrency",
      "notes",
      "itemName",
      "rName",
      "qName",
      "aName",
      "tName",
      "dT_Name",
      "discName",
      "bName",
      "terms",
      "paidAmount",
      "aPaid",
    ]),
    ...mapGetters(["taxed", "deducted", "discounted", "totalValue"]),
  },
  created() {
    console.log(this.InvoiceValues);
    this.formFields = JSON.parse(this.InvoiceValues);
    // this.items=JSON.parse(this.itemsDetails)
    var filt = JSON.parse(this.itemsDetails);
    var filterred = filt.filter((item) => {
      return item.name != "";
    });
    this.items = filterred;
  },
};
</script>
<style scoped lang="css">
@import url("https://fonts.googleapis.com/css2?family=Work+Sans:wght@500&display=swap");
.space {
  max-width: 25%;
  width: 22%;
}
:root {
  --var-txt-color: v-bind(theme);
}
.light {
  color: v-bind(theme);
  font-weight: 500;
}

/* /deep/thead {
    vertical-align: middle !important;
    background: #eeecec !important;
    padding: 5px;
    padding-top:0px !important
}
span{
    background-color: rgb(0, 75, 25);
    padding: 5px;
    padding-top:0px !important
}
p{
    background-color: rgb(250, 250, 203);
    padding: 5px;
}
div{
    background-color: rgb(167, 252, 252);
    padding: 5px;
} */
.top {
  border-top: 10px solid v-bind(theme);
}
.topB {
  border-top: 2px solid v-bind(theme);
  margin-top: 5%;
  padding-top: 5px;
}
.business {
  height: auto;
  min-height: 120px !important;
  word-wrap: break-word;
  /* line-height: 70% !important; */
}
.business2 {
  height: auto;
  min-height: 120px !important;
  /* max-width: 50%; */
  word-wrap: break-word;
  /* line-height: 70% !important; */
}
.business3{
    word-wrap: break-word;
  /* line-height: 70% !important; */
}
.topB{
  border-top:2px solid v-bind(theme);
  margin-top:5%;padding-top:5px;
  padding: 0;
}
</style>
