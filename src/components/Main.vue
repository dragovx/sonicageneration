<template>
<div>
  <!-- <div :style="{width: data.properties.width + 'px', height: data.properties.height + 'px', color: data.properties.foreground, backgroundColor: data.properties.background}" id="mainbody"> -->
  <div :style="{width: 1820 + 'px', height: 1000 + 'px', color: 'white', backgroundColor: 'black'}" id="mainbody">
  <tiles v-for="elem in tiless" :key=elem.name :params = elem.properties :name = elem.type></tiles>
  <!-- <txtarg></txtarg> -->
  <!-- <radioarg></radioarg> -->
  <!-- <passwordarg></passwordarg> -->
  <!-- <ipadressarg></ipadressarg> -->
  <!-- <comboarg></comboarg> -->
  <!-- <boolarg></boolarg> -->
  <!-- <bitmaskarg></bitmaskarg> -->
  <!-- <sliderarg></sliderarg> -->
  <!-- <apply></apply> -->
  <tooltiper v-for="elem in tooltipers" :key=elem.name :params = elem.properties></tooltiper>
  <svg height="1000" width="1820" xmlns="http://www.w3.org/2000/svg" style="position: absolute; left: 0px; top: 0px; z-index:-4">
    <sline v-for="line in lines" :key=line.name :params = line.properties></sline>
  </svg>
  </div>
</div>
</template>

<script>

import Tiles from './Tiles/Tiles.vue';
import Txtarg from './Commands/Txtarg.vue';
import Radioarg from './Commands/Radioarg.vue';
import Passwordarg from './Commands/Passwordarg.vue';
import Ipadressarg from './Commands/Ipadressarg.vue';
import Comboarg from './Commands/Comboarg.vue';
import Boolarg from './Commands/Boolarg.vue';
import Bitmaskarg from './Commands/Bitmaskarg.vue';
import Sliderarg from './Commands/Sliderarg.vue';
import Apply from './Commands/Apply.vue'
import Sline from './Primitives/Sline.vue'
import json from '../assets/ScreenInit.json'
import Tooltiper from './Neightbours/Tooltiper.vue'

export default {
  name: 'Main',
  data () {
    return {
      info: null,
      data: null,
      myJson: json,
      lines:[],
      tiless:[],
      tooltipers:[],
    }
  },
  
  components: {Tiles,Txtarg,Radioarg,Passwordarg,Ipadressarg,Comboarg,Boolarg, Bitmaskarg, Sliderarg, Apply,Sline,Tooltiper},

  beforeCreate() {
    const tiles1param = async () => {
      const response = await fetch(
        `https://localhost:5001/api/Home?Text=TileTextModel`
      );
      this.data = JSON.parse(await response.text())
      
    }
    tiles1param();
  },

  mounted(){
    for (let i=0; i<=75; i++){
      let res = this.myJson.properties.widgets[i]
      if( res.type.startsWith('Primitives/Line')){
        this.lines.push(res)
      }
      if ( res.type.startsWith('Tiles')){
        this.tiless.push(res)
      }
      if ( res.type.startsWith('Neightbours/Tooltiper')){
        this.tooltipers.push(res)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mainbody{
  z-index: -5;
  position: absolute;
  left: 0px;
  top: 0px;
}
</style>
