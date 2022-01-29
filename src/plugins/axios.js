import Axios from "axios";
import Vue from 'vue'

Vue.use({
    install (Vue) {
    Vue.prototype.$api = Axios.create({
      baseURL: 'http://localhost:3002/addresses/'
    })
  }
})
