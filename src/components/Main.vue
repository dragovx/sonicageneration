<template>
<div>
  <window v-for="elem in mas" :key= elem.properties.widgets[0].name :myJson = elem :numberWindow = mas.length />
</div>
</template>

<script>

import Window from './Window.vue';
import json from '../assets/Krasnojarsk-main-ninja.json'
import json1 from '../assets/Krasnojarsk-rejim-ninja.json'
import json2 from '../assets/Krasnojarsk-energoparam-ninja'

export default {
  name: 'Main',
  data () {
    return {
      info: null,
      data: null,
      mas: [],
      myJson: json,
      myJson1: json1,
    }
  },
  
  components: {Window},

  methods: {
    pushjson(param){
      console.log(param)
      if (param == ">:\\REJIM:\\Screens:\\MAIN"){
        this.mas.push(json1)
      }
      if (param == ">:\\ENERG_PARAM:\\MAIN"){
        this.mas.push(json2)
      }
    },
    closejson(){
      this.mas.pop()
    }
  },
  created(){
    this.mas.push(this.myJson)
  },
  // computed:{
  //   cssProps(){
  //     return {
  //       '--width': [this.myJson.properties.canvas.width>this.myJson.properties.canvas.height ? Math.round(this.myJson.properties.canvas.width/(1920/this.width)) + 'px' : Math.round(this.width/(this.myJson.properties.canvas.height/this.myJson.properties.canvas.width)) + 'px'],
  //       '--height': [this.myJson.properties.canvas.height>this.myJson.properties.canvas.width ? Math.round(this.myJson.properties.canvas.height/(1080/this.height)) + 'px' : Math.round(this.height/(this.myJson.properties.canvas.width/this.myJson.properties.canvas.height)) + 'px'],
  //       '--left': (this.width - Math.round(this.myJson.properties.canvas.width/(1920/this.width)))/2 + 'px',
  //       '--backgroundArea': '#' + this.myJson.properties.canvas.backgroundArea
  //     }
  //   },
  // },

  beforeCreate() {
    const param = async () => {
      // setInterval(async ()=> {
        const response = await fetch(
          `https://localhost:5001/api/nodes/main/current`
        );
      this.data = JSON.parse(await response.text())
      console.log(this.data)
      // }, 1000)
    }
    param();
  },
  
}
</script>


<style>
body{
 -webkit-user-select: none;
}
</style>
