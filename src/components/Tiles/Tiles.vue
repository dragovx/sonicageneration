<template>
  <div class="tiles" :class="[ this.name.startsWith('Tiles/Number') ? tiles.Flashing ? 'flash' : '' : '', ]" :style="cssProps" :title="'Состояние элемента ' + tiles.tooltip" v-show="tiles.Visible" >
    <p :id="this.name" v-show="tiles.value!='text'">{{ tiles.value }}</p>
  </div>
</template>
<script>
export default {
  name: 'Tile',
  props: {
    params:{}, 
    name:{}, 
    subscreensize:{},
    screenPercentage:{},
    windowWidth:{},
    windowHeight:{}
  },
  data() {
    return {
      tiles: {
        Name: '',
        value: '',
        ForegroundColor: '',
        BackgroundColor: '',
        Flashing: false,
        AlarmInfo: '',
        Visible: true,
        Enabled: true,
        tooltip: '',
      },
    };
  },
  created(){
    console.log(this.screenPercentage + "  " + this.windowWidth + "  " + this.windowHeight)
    this.tiles.Name = this.name,
    this.tiles.value = this.params.text,
    this.tiles.ForegroundColor = this.params.foreground,
    this.tiles.BackgroundColor = this.params.background,
    this.tiles.Flashing = false,
    this.tiles.AlarmInfo = "Good",
    this.tiles.Visible = this.params.visible,
    this.tiles.Enabled = true,
    this.tiles.tooltip = "подсказка!"
  },
  mounted(){
    setInterval(() => {
      let changedelem = this.$store.getters.elemByName(this.tiles.Name)?.properties
      // console.log(this.tiles.Name)
      if (changedelem) {
        if (changedelem.text) this.tiles.value = changedelem.text
        if (changedelem.background) this.tiles.BackgroundColor = changedelem.background
        if (changedelem.foreground) this.tiles.ForegroundColor = changedelem.foreground
      }
    },1000)
  },
  // 1920/this.windowWidth
  computed: {
    cssProps() {
      // function sizelemenet(state){
      //   return this.subscreensize * (state / (this.screenPercentage / 1080))
      // } 
      return {
        "--x": this.params.x * this.subscreensize + "px",
        "--y": this.params.y * this.subscreensize + "px",
        "--z": this.params.z,
        "--width": this.params.width * this.subscreensize + "px",
        "--height": this.params.height * this.subscreensize  + "px",
        "--backgroundColor": "#" + [ this.tiles.BackgroundColor == "Blue" ? "#373737" : this.tiles.BackgroundColor, ],
        "--color": "#" + this.tiles.ForegroundColor,
        "--borderThickness": this.params.borderThickness * this.subscreensize + "px",
        "--borderBrush": "#" + this.params.borderBrush,
        "--scale": this.params.scale,
        "--borderRadius": this.params.borderRadius,
        "--align": this.params.hAlignment,
        "--fontSize": [this.params.fontSize == 0 ? 14 / 1 : this.params.fontSize / 1] * this.subscreensize + "px",
        "--margin": this.params.margin.split(" : ")[0] + "px",
        "--margin": this.params.margin + "px",
        "--borderRadius": this.params.borderRadius + "px"
      };
    },
  },
};
</script>
<style scoped>
.tiles {
  display: flex;
  transform: scale(var(--scale));
  position: absolute;
  z-index: var(--z);
  left: var(--x);
  top: var(--y);
  width: var(--width);
  height: var(--height);
  background-color: var(--backgroundColor);
  color: var(--color);
  border-radius: var(--borderRadius);
  border-color: var(--borderBrush);
  border-width: var(--borderThickness);
  border-Radius: var(--borderRadius);
  border-style: solid;
  justify-content: flex-start;
  margin-left: var(--margin);
}
p {
  margin: auto; /* Important */
  width: 100%;
  text-align: var(--align);
  font-size: var(--fontSize);
}

@keyframes glowing {
  from {
    background-color: var(--backgroundColor);
  }
  50% {
    background-color: var(--backgroundColor);
    filter: brightness(50%);
  }
  to {
    background-color: var(--backgroundColor);
  }
}
.flash {
  animation: glowing 2000ms infinite;
}
</style>
