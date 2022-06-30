<template>
  <div class="button" :style="cssProps" v-show="button.Visible" @click="some">
    <p>{{ button.value }}</p>
  </div>
</template>

<script>
export default {
  name: "app",
  props: ["params", "windowWidth", "subscreensize"],
  data() {
    return {
      button: {
        Name: "button",
        value: this.params.text,
        ForegroundColor: this.params.foreground,
        BackgroundColor: this.params.background,
        AlarmInfo: "Good",
        Visible: true,
        Enabled: true,
      },
    };
  },
  methods: {
    some(){
      let data = []
      data.name = this.params.path
      data.title = this.params.title
      data.screenPercentage = this.params.screenPercentage

      this.$store.dispatch('addElems', data)
    }
  },
  computed: {
    cssProps() {
      return {
        "--x": this.params.x / 1 * this.subscreensize + "px",
        "--y": this.params.y / 1 * this.subscreensize + "px",
        "--z": this.params.z,
        "--width": this.params.width / 1 * this.subscreensize + "px",
        "--height": this.params.height / 1 * this.subscreensize + "px",
        "--backgroundColor": "#" + this.button.BackgroundColor,
        "--color": this.button.ForegroundColor,
        "--borderThickness": this.params.borderThickness,
        "--borderBrush": this.params.borderBrush,
        "--scale": this.params.scale,
        "--borderRadius": this.params.borderRadius,
        "--fontSize": this.params.fontSize / 1 * this.subscreensize + "px",
      };
    },
  },
};
</script>

<style scoped>
.button {
  /*** Для эксплорера*/
  -ms-user-select: none;

  /*** Для мозилы*/
  -moz-user-select: none;

  /*** Для конкверора*/
  -khtml-user-select: none;

  /*** Для Сафари и Хрома*/
  -webkit-user-select: none;
  position: absolute;
  z-index: var(--z);
  left: var(--x);
  top: var(--y);
  width: var(--width);
  height: var(--height);
  background-color: var(--backgroundColor);
  color: var(--color);
  display: flex;
  border-radius: var(--borderRadius);
  /* border-color: var(--borderBrush); */
  border-color: white;
  /* border-width: var(--borderThickness); */
  border-width: 1px;
  border-style: solid;
  text-align: center;
  font-size: var(--fontSize);
}

p {
  margin: auto; /* Important */
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
