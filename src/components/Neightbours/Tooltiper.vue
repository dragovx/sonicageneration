<template>
  <div class="button" :style="cssProps" v-show="button.Visible" @click="some">
    <img
      v-if="button.value == 'Navigator'"
      src="../../img/Navigator.png"
      :style="cssPropsimg"
      class="img"
    />
    <p v-else>{{ button.value }}</p>
  </div>
</template>

<script>
export default {
  name: "app",
  props: ["params", "windowWidth", "subscreensize",],
  data() {
    return {
      button: {
        name: null,
        value: this.params.properties.text,
        ForegroundColor: this.params.properties.foreground,
        BackgroundColor: this.params.properties.background,
        neightbourState: this.params.properties.neightbourState,
        AlarmInfo: "Good",
        Visible: true,
        Enabled: true,
      },
    };
  },
  created() {
    // if (this.$parent.subscreenname){ 
    //   this.button.Name += '/' + this.$parent.subscreenname
    // }
    this.button.name = this.params.name
    const today = new Date();
    var currentDateMilliseconds = today.getMilliseconds();
    const res = {'namewidget': this.button.name, 'namewindow': this.$parent.windowname}
    setTimeout(() => {
      setInterval(() => {
        let changedelem= this.$store.getters.elemByName(res)?.properties
        if (changedelem) {
          if (changedelem.neightbourState) this.button.neightbourState = changedelem.neightbourState
        }
      },1000)
    }, 1000 - currentDateMilliseconds);
    
  },
  methods: {
    some() {
      let data = [];
      data.name = this.params.properties.path;
      if (this.params.properties.title) {
        data.title = this.params.properties.title;
      } else {
        data.title = this.params.properties.text;
      }
      data.screenPercentage = this.params.properties.screenPercentage;
      // if (this.$parent.windowname == ">:Header" || this.params.type == "neightbours/Navigator"){
      //   this.$store.dispatch("changemain", this.params.properties.path.split('\\').join(''))
      // } else {
        if (this.params.properties.text != "Главный экран") this.$store.dispatch("addElems", data);
      // }
    },
  },
  computed: {
    cssProps() {
      return {
        "--x": (this.params.properties.x / 1) * this.$parent.multiplier + "px",
        "--y": (this.params.properties.y / 1) * this.$parent.multiplier + "px",
        "--z": this.params.properties.z,
        "--width": (this.params.properties.width / 1) * this.$parent.multiplier + "px",
        "--height": (this.params.properties.height / 1) * this.$parent.multiplier + "px",
        "--backgroundColor": [this.button.neightbourState == "Red" ? "Red" : [ this.button.neightbourState == "Yellow" ? "Yellow" : "#" + this.button.BackgroundColor, ],],
        "--color": [this.button.neightbourState == "Yellow" ? "Black": this.button.ForegroundColor,],
        "--borderThickness": this.params.properties.borderThickness,
        "--borderBrush": this.params.properties.borderBrush,
        "--scale": this.params.properties.scale,
        "--borderRadius": this.params.properties.borderRadius,
        "--fontSize":(this.params.properties.fontSize / 1) * this.$parent.multiplier + "px",
      };
    },
    cssPropsimg() {
      return {
        "--widthimg": (this.params.properties.width * this.$parent.multiplier) / 2 + "px",
        "--heightimg": (this.params.properties.height * this.$parent.multiplier) / 2 + "px",
        "--topy": (this.params.properties.height * this.$parent.multiplier) / 4 + "px",
        "--topx": (this.params.properties.width * this.$parent.multiplier) / 4 + "px",
      };
    },
  },
};
</script>

<style scoped>
.button {
  cursor: pointer;
  user-select: none;
  -ms-user: none;
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: var(--width);
  height: var(--height);
  background-color: var(--backgroundColor);
  color: var(--color);
  display: flex;
  border-radius: var(--borderRadius);
  border-color: white;
  border-width: 1px;
  border-style: solid;
  text-align: center;
  font-size: var(--fontSize);
}

img {
  position: absolute;
  width: var(--widthimg);
  height: var(--heightimg);
  left: var(--topx);
  top: var(--topy);
}

p {
  margin: auto;
  text-align: center;
}

.button:hover {
  background-color: var(--backgroundColor);
  filter: brightness(80%);
  background-blend-mode: da;
}
.button:active {
  background-color: var(--backgroundColor);
  filter: brightness(150%);
}
</style>
