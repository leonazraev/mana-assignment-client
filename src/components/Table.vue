<template>
   <div>
         <v-container>
            <v-row v-if="allAddresses.length>0" :justify="'center'">
               <v-col cols="12" md="8" sm="12">
                  <v-data-table
                     :headers="allAddressesHeaders"
                     :items="allAddresses"
                     :page.sync="allAddPage"
                     class="elevation-3"
                     :search="search"
                     :custom-filter="filterOnlyCapsText"
                     :items-per-page="allAddItemsPerPage"
                     hide-default-footer
                     @page-count="allAddPageCount = $event"
                     >
                     <template v-slot:top>
                        <v-text-field
                           v-model="search"
                           label="Search"
                           class="mx-4"
                           ></v-text-field>
                     </template>
                  </v-data-table>
                  <v-row :justify ="'space-around'" class="mt-10">
                     <v-pagination
                        v-model="allAddPage"
                        :length="totalPages"
                        :total-visible="6"
                        :color="'grey darken-4'"
                        ></v-pagination>
                  </v-row>
                  <v-row :justify ="'space-around'" class="mt-15 pl-2 pr-2">
                     <v-toolbar
                        :class="`rounded-lg`"
                        dark
                        color="grey darken-4"
                        >
                        <v-toolbar-title>Nearby Addresses</v-toolbar-title>
                        <v-autocomplete
                           :search-input.sync="poiSearch"
                           class="mx-4"
                           flat
                           hide-no-data
                           hide-details
                           label="What is your address?"
                           solo-inverted
                           rounded
                           ></v-autocomplete>
                        <div class="mr-2">
                           <v-menu offset-y class="mr-5">
                              <template class="mr-5"  v-slot:activator="{ on, attrs }">
                                 <v-btn
                                    color="grey darken-3"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    >
                                    {{selectedNumOfItems}}
                                 </v-btn>
                              </template>
                              <v-list>
                                 <v-list-item
                                    @click="selectedNumOfItems = item"
                                    v-for="(item, index) in items"
                                    :key="index"
                                    >
                                    <v-list-item-title>{{ item }}</v-list-item-title>
                                 </v-list-item>
                              </v-list>
                           </v-menu>
                        </div>
                        <v-btn
                           @click="fetchPOI()"
                           :color="'grey darken-3'"
                           elevation="2"
                           >Search</v-btn>
                     </v-toolbar>
                  </v-row>
               </v-col>
            </v-row>
            <v-row  :justify="'center'" v-if="queryAddresses.length > 0">
               <v-col cols="12" md="8" sm="12">
                  <v-data-table
                     :headers="queryAddressesHeaders"
                     :items="queryAddresses"
                     :items-per-page="selectedNumOfItems"
                     item-key="name"
                     class="elevation-4"
                     hide-default-footer
                     ></v-data-table>
               </v-col>
            </v-row>
         </v-container>

   </div>
</template>
<script>
// import {SlideYUpTransition} from 'vue2-transitions'
  export default {
    components:{
      // SlideYUpTransition
    },
    created(){
        this.$api.get('').then((result) => {
            this.allAddresses = result.data;
        })
        // eslint-disable-next-line no-unused-vars
        .catch(err => {
            this.allAddresses = []
        })
    },
    data () {
      return {
      poiSearch: '',
      selectedNumOfItems:5,
            items: [5,10,15,20],
      
      allAddPage: 1,
      allAddPageCount: 0,
      allAddItemsPerPage: 5,
      search: '',
      allAddresses: [],
      queryAddresses: []
      }
    },
    computed: {
      allAddressesHeaders () {
        return [
          {
            text: 'Name',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          {
            text: 'Address',
            value: 'address',
            align: 'start',
            width: 500          },
        ]
      },
      queryAddressesHeaders(){
        return [
          {
            text: 'Name',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          {
            text: 'Distance',
            value: 'distance.text',
            align: 'start',
          },
        ]
      },
      totalPages(){
          return this.allAddresses.length / this.allAddItemsPerPage;
      }
    },
    methods: {
        // eslint-disable-next-line no-unused-vars
      filterOnlyCapsText (value, search, item) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1
      },
      fetchPOI(){
        this.$api.get(`poi?street_address=${this.poiSearch}&n=${this.selectedNumOfItems}`).then((result) => {
            this.queryAddresses = result.data.result;
            console.log(this.queryAddresses)
        })
        // eslint-disable-next-line no-unused-vars
        .catch(err => {
            this.queryAddresses = []
        })
      }
    },
  }
</script>

<style>

</style>