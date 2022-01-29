import Vue from 'vue'
import Vuex from 'vuex'
import { v4 as uuidv4 } from 'uuid';
Vue.use(Vuex)
const api = Vue.prototype.$api;

const store = new Vuex.Store({
    state: {
      characters: []
    },
    mutations: {
      add_characters (state,payload) {
        state.characters = state.characters.concat(payload);
      },
      reset_characters(state){
        state.characters =[];
      },
      remove_character(state,payload){
          let index = state.characters.findIndex((e)=>e.id == payload);

          if(index > -1) state.characters.splice(index,1);
      },
      edit_character(state,payload){
        let editedIndex = state.characters.findIndex((e)=>e.id == payload.id);

        if(editedIndex > -1) {
          let newItem  = {...state.characters[editedIndex],...payload};
          state.characters.splice(editedIndex,1,newItem)
        }
      },
      add_character(state,payload){
        let obj = {...payload,id:uuidv4()};
        state.characters.push(obj);
      },

    },
    actions: {
      // eslint-disable-next-line no-unused-vars
      async increment (context) {
        context.commit('increment')
      },
      // eslint-disable-next-line no-unused-vars
      async fetch_characters({state,commit},payload){
        try{
          let next = 'people/';
          let array = [];
          commit('reset_characters');
          while(next){
            let result = await api.get(next);
            next = result.data.next;
            let temp_array = (result.data.results ? result.data.results : []).map(e => {return {...e,id:uuidv4()}})
            array = array.concat(temp_array)
          }
          commit('add_characters',array);
        }catch(err){
          console.log(err);
        }
      },
    },
    getters: {
      get_characters: state => {
        return state.characters;
      },
      get_characters_length: state => {
        return state.characters.length;
      }
    }
  })

export default store;