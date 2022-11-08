<template>
  <div class="home resp justify-center">
    
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <taxPage/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/editPage.vue'
import taxPage from '@/components/taxPage.vue'

export default {
  name: 'HomeView',
  components: {
    taxPage,
    HelloWorld,
  }
}
</script>
