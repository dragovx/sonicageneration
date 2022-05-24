<template>
  <div class="tiles" :class="[ this.name.startsWith('Tiles/Number') ? tiles.Flashing ? 'flash' : '' : '', ]" :style="cssProps" :title="'Состояние элемента ' + tiles.tooltip" v-show="tiles.Visible" >
    <p v-show="tiles.value!='text'">{{ tiles.value }}</p>
  </div>
</template>
<script>
export default {
  name: "app",
  props: ["params", "name", "subscreensize"],
  data() {
    return {
      tiles: {
        Name: "tiles",
        value: this.params.text,
        ForegroundColor: this.params.foreground,
        BackgroundColor: this.params.background,
        Flashing: false,
        AlarmInfo: "Good",
        Visible: this.params.visible,
        Enabled: true,
        tooltip: "подсказка!",
      },
    };
  },
  // 1920/this.windowWidth

  computed: {
    cssProps() {
      return {
        "--x": (this.params.x / 1) * this.subscreensize  + "px",
        "--y": this.params.y / 1 * this.subscreensize + "px",
        "--z": this.params.z,
        "--width": (this.params.width / 1) * this.subscreensize + "px",
        "--height": this.params.height / 1 * this.subscreensize + "px",
        "--backgroundColor": "#" + [ this.tiles.BackgroundColor == "Blue" ? "#373737" : this.tiles.BackgroundColor, ],
        "--color": "#" + this.tiles.ForegroundColor,
        "--borderThickness": this.params.borderThickness * this.subscreensize + "px",
        "--borderBrush": "#" + this.params.borderBrush,
        "--scale": this.params.scale,
        "--borderRadius": this.params.borderRadius,
        "--align": this.params.hAlignment,
        "--fontSize": [this.params.fontSize == 0 ? 14 / 1 : this.params.fontSize / 1] * this.subscreensize + "px",
        "--margin": this.params.margin.split(" : ")[0] + "px",
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
