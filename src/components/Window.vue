<template>
  <div id="background" :style="cssProps">
    <div id="head" v-show="myJson.title">
      <div>{{myJson.title}}</div>
      <div id="closewindow" @click="closejson">x</div>
    </div>
    <div id="mainbody" :style="cssProps">
      <tiles v-for="elem  in tiless" :key="elem.name" :params="elem.properties" :name="elem.name" :subscreensize="subscreensize" :screenPercentage="this.myJson.screenPercentage" :windowWidth="this.myJson.canvas.width" :windowHeight="this.myJson.canvas.height"/>
      <subscreen v-for="elem in subscreens" :key="elem.name" :params="elem" :name="elem.type" />
      <!-- <txtarg /> -->
      <!-- <radioarg></radioarg> -->
      <!-- <passwordarg></passwordarg> -->
      <!-- <ipadressarg></ipadressarg> -->
      <!-- <comboarg></comboarg> -->
      <!-- <boolarg></boolarg> -->
      <!-- <bitmaskarg></bitmaskarg> -->
      <!-- <sliderarg></sliderarg> -->
      <!-- <apply></apply> -->
      <tooltiper v-for="elem in tooltipers" :key="elem.name" :params="elem.properties" :subscreensize="subscreensize" />
      <svg v-if="this.lines.length" :height="this.myJson.canvas.height" :width="this.myJson.canvas.width" xmlns="http://www.w3.org/2000/svg" style="position: absolute; left: 0px; top: 0px; z-index: -4">
        <sline v-for="line in lines" :key="line.name" :params="line.properties" />
      </svg>
      <imagetrans v-for="elem in imagestrans" :key="elem.name" :params="elem.properties"/>
      <imagelogo v-for="elem in imageslogo" :key="elem.name" :params="elem.properties"/>
    </div>
  </div>
</template>

<script>
import Tiles from "./Tiles/Tiles.vue";
import Txtarg from "./Commands/Txtarg.vue";
import Radioarg from "./Commands/Radioarg.vue";
import Passwordarg from "./Commands/Passwordarg.vue";
import Ipadressarg from "./Commands/Ipadressarg.vue";
import Comboarg from "./Commands/Comboarg.vue";
import Boolarg from "./Commands/Boolarg.vue";
import Bitmaskarg from "./Commands/Bitmaskarg.vue";
import Sliderarg from "./Commands/Sliderarg.vue";
import Apply from "./Commands/Apply.vue";
import Sline from "./Primitives/Sline.vue";
import Tooltiper from "./Neightbours/Tooltiper.vue";
import Subscreen from "./Neightbours/Subscreen.vue";
import Imagetrans from './Primitives/Image.vue';
import Imagelogo from './Primitives/Logo.vue';

export default {
  name: "window",
  props: {
    myJson:{},
    subscreensize:{default:1},
    //фон для вложенный subscreen
    boolback:{default:true},
    title:{default:''},
  },
  data() {
    return {
      info: null,
      data: 0,
      lines: [],
      tiless: [],
      tooltipers: [],
      subscreens:[],
      imagestrans:[],
      imageslogo:[],
      width: 0,
      height: 0,
    };
  },

  components: {
    Tiles,
    Txtarg,
    Radioarg,
    Passwordarg,
    Ipadressarg,
    Comboarg,
    Boolarg,
    Bitmaskarg,
    Sliderarg,
    Apply,
    Sline,
    Tooltiper,
    Subscreen,
    Imagetrans,
    Imagelogo,
  },

  computed: {
    cssProps() {
      return {
        "--windowWidth": [this.boolback ? this.width + "px": this.myJson.canvas.width*this.subscreensize + "px"],
        "--windowHeight": [this.boolback ? this.height + "px": this.myJson.canvas.height*this.subscreensize + "px"],
        "--width": this.myJson.canvas.width*this.subscreensize + "px",
        "--height": this.myJson.canvas.height*this.subscreensize + "px",
        "--background": "#" + this.myJson.canvas.background,
        "--borderRadius": this.myJson.canvas.borderRadius + "px",
        '--backgroundArea1': parseInt(this.myJson.canvas.backgroundArea.slice(0,2), 16),
        '--backgroundArea2': parseInt(this.myJson.canvas.backgroundArea.slice(2,4), 16),
        '--backgroundArea3': parseInt(this.myJson.canvas.backgroundArea.slice(4,6), 16),
        '--backgroundArea4': ((parseInt(this.myJson.canvas.backgroundArea.slice(6,8), 16))/255),
      };
    },
  },  

  methods: {
    updateWidth() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    },
    closejson(){
      this.$store.dispatch('closewindow')
    }
  },

  created() {
    console.log(this.myJson.screenPercentage)
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    window.addEventListener("resize", this.updateWidth);
    this.myJson.widgets.forEach(element => {
      let res = element;
      if (res.type.startsWith("primitives/Line")) {
        this.lines.push(res);
      }
      if (
        res.type.startsWith("tile") ||
        res.type.startsWith("primitives/Text") ||
        res.type.startsWith("Tiles")
      ) {
        this.tiless.push(res);
      }
      if (
        res.type.startsWith("tooltip") ||
        res.type.startsWith("neightbours/Tooltiper")) 
      {
        this.tooltipers.push(res);  
      }
      if (res.type.startsWith("neightbours/Subscreen")) {
        this.subscreens.push(res);
      }
      if (res.type.startsWith("image")) {
        this.imagestrans.push(res);
      }
      if (res.type.startsWith("logo")) {
        this.imageslogo.push(res);
      }
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mainbody {
  position: relative;
  z-index: -5;
  width: var(--width);
  height: var(--height);
  color: white;
  background-color: var(--background);
  border: solid 1px white;
  border-radius: var(--borderRadius);
}
#background {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0px;
  top: 0px;
  background: rgb(var(--backgroundArea1),var(--backgroundArea2),var(--backgroundArea3), var(--backgroundArea4));
  width: var(--windowWidth);
  height: var(--windowHeight);
  z-index: -10;
}
#head {
  color: white;
  padding: 2px;
  display: flex;
  justify-content: space-between;
  width: var(--width);
  height: 25px;
  background-color: var(--background);
  margin-bottom: 10px;
}
#closewindow{
  user-select: none;
  color:blue; 
  font-size:25px; 
  width: 25px; 
  text-align:center; 
  height: 100%;
}
#closewindow:hover{
  background-color: rgb(4, 174, 253);
}
#closewindow:active{
  background-color: rgb(4, 21, 253);
}
</style>
