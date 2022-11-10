<template>
  <div class="home resp justify-center">

    <div class="shadow-2xl">
      
     <div>
      <vue-html2pdf
        :show-layout="true"
        :float-layout="false"
        :enable-download="true"
        :preview-modal="false"
        :paginate-elements-by-height="1400"
        filename="invoice"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="portrait"
        pdf-content-width="800px"

        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
    >
        <section slot="pdf-content" style="width:auto">
            <!-- PDF Content Here -->
            <div v-if="format=='format1'">
              <previewPage/>
            </div>
            <div v-if="format=='format2'">
              <secondFormat/>
            </div>
            
        </section>
    </vue-html2pdf>
     </div>
  </div>
  <div class="flex flex-col text-left  shadow-md  px-4 py-1">
    <span class="tax-box cursor-pointer mt-4 shadow-md shadow-green-400"><button @click="generateReport">Download</button></span>
            <span class="tax-box cursor-pointer mt-4 shadow-md shadow-green-400"><button @click="format='format1'" :class="[this.format=='format1'?'light':'']">Format 1</button></span>
            <span class="tax-box cursor-pointer mt-4 shadow-md shadow-green-400"><button @click="format='format2'" :class="[this.format=='format2'?'light':'']">Format 2</button></span>
            <div class="tax-box mt-4 shadow-md shadow-green-400">
                <div class="flex flex-wrap">
                    <span class="h-8 w-8 border-4 cursor-pointer" v-for="colors in defaultColors" :key="colors" :style="{'background-color' : colors}" @click="setColor(colors)"></span><br>
                    <input type="color" name="" id="" v-model="myColor">
                </div>
            </div>
        </div>
  <div>
    
    
  </div>
  </div>

</template>

<script>
// @ is an alias to /src
import previewPage from '@/components/previewPage.vue'
import secondFormat from '@/components/secondFormat.vue'
import VueHtml2pdf from 'vue-html2pdf'
import { mapMutations ,mapState} from 'vuex';
export default {
  name: 'HomeView',
  components: {
    secondFormat,
    previewPage,
    VueHtml2pdf
  },
  data(){
    return{
      format:'format1',
      defaultColors:['#94a3b8','#f87171','#fb923c','#fbbf24',"#65a30d","#15803d","#2dd4bf","#0369a1","#6d28d9","#701a75","#be185d","#9f1239","#000000"],
      myColor:'#94a3b8'
    }
  },
  methods: {
    ...mapMutations(['setTheme']),
        /*
            Generate Report using refs and calling the
            refs function generatePdf()
        */
        generateReport () {
            this.$refs.html2Pdf.generatePdf()
        },
        setColor(val){
          this.myColor=val
          
        }
    },
    watch:{
      myColor(){
        this.setTheme(this.myColor)
      }
    },
    computed:{
      ...mapState(['theme'])
    },
    created(){
      this.myColor=this.theme
    }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@500&display=swap');
section.content-wrapper {
    width: auto !important;
}
:root {
    --var-txt-color: v-bind(myColor);
 }
 .light{
    color:v-bind(myColor);
    font-weight: 500;
    text-transform: uppercase;
}
.top{
  border-top: 10px solid v-bind(myColor);
}
th{
 color: v-bind(theme) !important;
}
</style>