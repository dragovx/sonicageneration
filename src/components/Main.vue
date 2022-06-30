<template>
<div>
  <!-- <button @click="pip">123</button> -->
  <window v-for="elem in elems" :key= elem.name :myJson = elem />
</div>
</template>

<script>

import Window from './Window.vue';

export default {
  name: 'Main',
  data () {
    return {
      info: null,
      mas: [],
      tick: null,
      nnnn: "Number#3",
    }
  },
  
  components: {Window},

// data-v-1002064a
  methods: {
    pip(){
      console.log(this.lastname.name)
    }
  },
  // mounted(){
  //   this.$store.dispatch("updateElems", '>:\\Logic')
  // },
  computed:{
    elems(){
      return this.$store.getters.elems
    },
    lastname(){
      return this.$store.getters.lastElemName
    }
  //   cssProps(){
  //     return {
  //       '--width': [this.myJson.properties.canvas.width>this.myJson.properties.canvas.height ? Math.round(this.myJson.properties.canvas.width/(1920/this.width)) + 'px' : Math.round(this.width/(this.myJson.properties.canvas.height/this.myJson.properties.canvas.width)) + 'px'],
  //       '--height': [this.myJson.properties.canvas.height>this.myJson.properties.canvas.width ? Math.round(this.myJson.properties.canvas.height/(1080/this.height)) + 'px' : Math.round(this.height/(this.myJson.properties.canvas.width/this.myJson.properties.canvas.height)) + 'px'],
  //       '--left': (this.width - Math.round(this.myJson.properties.canvas.width/(1920/this.width)))/2 + 'px',
  //       '--backgroundArea': '#' + this.myJson.properties.canvas.backgroundArea
  //     }
  //   },
  },

  beforeCreate() {
    this.$store.dispatch("fetchElems")
  },
  
}
</script>


<style>
body{
 -webkit-user-select: none;
}
</style>
