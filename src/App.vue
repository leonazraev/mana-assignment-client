<template>
<v-app>
  <Header/>
  <!-- Sizes your content based upon application components -->
  <v-main>
    <!-- Provides the application the proper gutter -->
    <v-container fluid>
      <h1 class="mt-10 text-center">{{title}}</h1>
      <!-- If using vue-router -->
       <slide-x-right-transition>
        <Table/>
       </slide-x-right-transition>
    </v-container>
  </v-main>

  <v-footer app>
    <!-- -->
  </v-footer>
</v-app>

</template>

<script>
// import HelloWorld from './components/HelloWorld';
import Header from './components/Header.vue'
import Table from './components/Table.vue';
import {SlideXRightTransition} from 'vue2-transitions'

export default {
  name: 'App',
  
  components: {
    SlideXRightTransition,
    Header,
    Table
    // HelloWorld,
  },

  watch:{
    // eslint-disable-next-line no-unused-vars
     $route(to, from) {
    }
  },

  data: () => ({
    title:"USERS LIST",
  }),
};
</script>
<style scoped>

</style>
