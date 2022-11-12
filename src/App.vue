<template>
  <div id="app" class="app">
    <nav class="page">
      <span class="text-center p-4 mr-3 inline-block shadow-md shadow-green-600 rounded-md shadow-inner"><router-link to="/">Edit</router-link> </span>
      <span class="text-center p-4 inline-block shadow-md shadow-green-600 rounded-md shadow-inner"><router-link to="/preview">Preview</router-link></span>
    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: 'Work Sans', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
img, svg, video, canvas, audio, iframe, embed, object {
    display: block;
    vertical-align: middle;
    object-fit: contain !important;
}
nav {
  padding: 30px;
}

nav a {
  font-weight: medium;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

</style>
