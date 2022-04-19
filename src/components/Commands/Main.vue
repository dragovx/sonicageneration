<template>
<div>
  <div :style="{width: data.properties.width + 'px', height: data.properties.height + 'px', color: data.properties.foreground, backgroundColor: data.properties.background}" id="mainbody">
  <tiles v-for="elem in data.Widgets.$values" :key=elem.$id :params = elem.properties></tiles>
  <!-- <txtarg></txtarg> -->
  <!-- <radioarg></radioarg> -->
  <!-- <passwordarg></passwordarg> -->
  <!-- <ipadressarg></ipadressarg> -->
  <!-- <comboarg></comboarg> -->
  <!-- <boolarg></boolarg> -->
  <!-- <bitmaskarg></bitmaskarg> -->
  <!-- <sliderarg></sliderarg> -->
  <!-- <apply></apply> -->
  </div>
</div>
</template>

<script>
"data.Widgets.$values.0.properties.sWidth"

import Tiles from './Tiles.vue';
import Txtarg from './Txtarg.vue';
import Radioarg from './Radioarg.vue';
import Passwordarg from './Passwordarg.vue';
import Ipadressarg from './Ipadressarg.vue';
import Comboarg from './Comboarg.vue';
import Boolarg from './Boolarg.vue';
import Bitmaskarg from './Bitmaskarg.vue';
import Sliderarg from './Sliderarg.vue';
import Apply from './Apply.vue'


export default {
  name: 'Main',
  data () {
    return {
      info: null,
      data: null,
    }
  },
  
  components: {Tiles,Txtarg,Radioarg,Passwordarg,Ipadressarg,Comboarg,Boolarg, Bitmaskarg, Sliderarg, Apply},

  beforeCreate() {
    const tiles1param = async () => {
      const response = await fetch(
        `https://localhost:5001/api/Home?Text=TileTextModel`
      );
      this.data = JSON.parse(await response.text())
      console.log(this.data.Widgets.$values[0].properties.sWidth)
    }
    tiles1param();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mainbody{
  position: absolute;
  left: 0px;
  top: 0px;
}
</style>
