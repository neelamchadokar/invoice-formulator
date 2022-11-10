<template>
  <div class="flex justify-center text-left">
    <div class="edit w-auto shadow-xl">
      <div class="head-title from flex justify-around">
        <div>
          <button @click="$refs.file.click()" class="p-2 bg-green-200 rounded-md upload shadow-md shadow-green-400">{{imageData?'Change LOGO':'Upload LOGO'}}</button>
          <input type="file" @change="previewImage" accept="image/*" class="file" ref="file">
          <span class="image-preview" v-if="imageData.length > 0">
        <img class="preview" :src="imageData" width="200px" height="200px">
      </span>
        </div>
        <div style="float:right">
          <FormulateInput
              type="text"
              name="Invoice"
              v-model="title"
            />
        </div>
      </div>
      <hr>
      
        <FormulateForm class="login-form " v-model="formValues">
          <div class="from-to py-2 resp">
          <div class="from">
            <b class="py-2">FROM</b>
            <FormulateInput
              type="text"
              name="Name"
              label="Name"
              placeholder="enter name"
            />
            <FormulateInput
              type="email"
              name="email"
              label="Email"
              placeholder="email address"
            />
            <FormulateInput
    type="group"
    name="address"
    label="Address"
  >
  <FormulateInput
      type="text"
      name="address1"
      placeholder="address"
    />
    <FormulateInput
      type="text"
      name="city"
      placeholder="city"
    />
    <FormulateInput
      type="number"
      name="zipcode"
      placeholder="zipcode"
    />
  </FormulateInput>
  <FormulateInput
      type="tel"
      name="phone"
      label="Phone"
      placeholder="phone"
    />
  <FormulateInput
      type="tel"
      name="businessPhone"
      label="Business Number"
      placeholder="enter business number"
    />
          </div>
          <div class="from">
            <b>TO</b>
            <FormulateInput
              type="text"
              name="cName"
              label="Name"
              placeholder="Client name"
            />
            <FormulateInput
              type="email"
              name="cEmail"
              label="Email"
              placeholder="email address"
            />
            <FormulateInput
    type="group"
    name="cAddress"
    label="Address"
  >
    <FormulateInput
      type="text"
      name="address"
      placeholder="address"
    />
    <FormulateInput
      type="text"
      name="city"
      placeholder="city"
    />
    <FormulateInput
      type="number"
      name="zipcode"
      placeholder="zipcode"
    />
  </FormulateInput>
  <FormulateInput
      type="tel"
      name="cPhone"
      label="Phone"
      placeholder="phone"
    />
          </div>
        </div>
        <hr>
        <div class="from py-2">
          <FormulateInput
      type="text"
      name="iNumber"
      label="Invoice Number"
    />
          <FormulateInput
      type="date"
      name="iDate"
      label="Issue Date"
      @change="dateCheck"
    />
          <FormulateInput
      type="date"
      name="dueDate"
      :min='formValues.iDate'
      label="Due Date"
      
    />
        </div>
        <div class="table-box pl-5 py-2 grid grid-cols-4">
          <span class="text-center">Description</span>
          <span class="text-center">Rate</span>
          <span class="text-center">Quantity</span>
          <span class="text-center">Amount</span>
        </div>
        <div class="desc">
         </div>
        </FormulateForm>
        <div v-for="(item,i) in items" :key="i">
          <button class="remove" v-if="items.length>1" @click="remove(item.id)"><img src="./../assets/delete.png" alt=""></button>
          <div class="table-boxs ">
           <input class="name" type="" name="" value="" v-model="item.name" placeholder="item name">
          <input class="rate mx-2" type="number" min=0 max="9999999" name="" value="" v-model="item.rate" placeholder="rate"> *
          <input class="rate mx-2" type="number" name="" min=0 max="999" value="" v-model="item.quantity" placeholder="quantity"> =
          <input class="amount bg-gray-100" type="number" name="" min=0 value="" :placeholder="+item.rate * item.quantity" disabled>
          <br>
            <input class="amount bg-gray-100" type="number" name="" min=0 value="" :placeholder="item.rate * item.quantity" disabled>
          <br>
          <span class="">
            <input class="desc" type="" name="" value="" v-model="item.desc" placeholder="description">
          </span>
          </div><br>
          <button class="remove" v-if="i==items.length-1" @click="add()"><img src="./../assets/add.png" alt=""></button>
        </div>
        <div class="sub-total table-box">
          <table>
            <tr>
              <td>SubTotal</td><td class="text-right">{{iCurrency}} {{subtotal}}</td>
            </tr>
            <tr v-if="(tax)">
              <td>Tax ({{tax}}%)</td><td class="text-right">{{iCurrency}} {{taxed}}</td>
            </tr>
            <tr v-if="deduct">
              <td> Tax Deducted({{deduct}}%)</td><td class="text-right">-{{iCurrency}} {{deducted}}</td>
            </tr>
            <tr v-if="Discount">
              <td>Discount ({{Discount}}%)</td><td class="text-right">-{{iCurrency}} {{discounted}}</td>
            </tr>
            <br><br>
            <tr class="">
              <td>Amount Due</td><td class="text-right">{{iCurrency}} {{totalValue}}</td>
            </tr>
          </table>
        </div>
        <div>
        <textarea name="" id="" cols="30" rows="5" placeholder="Additional note" class="border-black border-2 p-2" v-model="note"></textarea>
      </div>
      </div>
      
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { mapState,mapGetters} from 'vuex';
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      formValues: {},
      title:'Invoice',
      imageData: "",
        items:[{
          id:Date.now(),
          rate:null,
          amount:0,
          quantity:1,
          total:0,
          desc:'',
          name:''
        }],
        note:''
    };
  },
  watch:{
    resetForm(){
      console.log(this.resetForm)
      if(this.resetForm){
        Object.assign(this.$data, this.$options.data())
        this.reset(false)
      }
    },
    formValues:{
      handler() {
        console.log('before')
        this.setValues(this.data)
      
      // console.log(this.data,newValue,oldValue)
      },
      deep:true
    },
    title(){
      this.setValues(this.data)
    },
    imageData:{
      handler() {
        this.setValues(this.data)
      
      // console.log(this.data,newValue,oldValue)
      },
      deep:true
    },
    subtotal(){
      this.setValues(this.data)
    },
    note(){
      this.setValues(this.data)
    },
    items:{
      handler() {
        this.setValues(this.data)
      
      // console.log(this.data,newValue,oldValue)
      },
      deep:true
    }

  },
  methods:{
    ...mapMutations(['setValues','reset']),
    dateCheck(){
      this.formValues.dueDate=null
    },
    previewImage(event){
      var input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.imageData = e.target.result;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    },
    add(){
      let box={
          id:Date.now(),
          rate:null,
          amount:0,
          quantity:1,
          desc:'',
          name:'',
          total:0,
          note:''
        }
      this.items.push(box)
    },
    remove(item){
      var filt = this.items.filter((el=>{
        return el.id!=item
      }))
      this.items=filt
    }
  },
  computed:{
    ...mapState(['itemsDetails','iTitle','logo','subtotal','InvoiceValues','tax','Discount','deduct','resetForm','notes','iCurrency']),
    ...mapGetters(['taxed','deducted','discounted','totalValue']),
    data(){
      return{
        subTotal:this.subtotal,
        title:this.title,
        logo:this.imageData,
        itemsDetails:this.items,
        value:this.formValues,
        notes:this.note
      }
    },
    subtotal(){
      var sum=0
      this.items.forEach(element => {
        sum+=element.rate * element.quantity
      });
      return sum;
    }
  },

created(){
    console.log(this.InvoiceValues,'create')
    this.formValues=JSON.parse(this.InvoiceValues)
    this.items=JSON.parse(this.itemsDetails)
    this.imageData=this.logo
    this.title=this.iTitle
    this.note=this.notes
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" src="./../styles/form.css"></style>
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>