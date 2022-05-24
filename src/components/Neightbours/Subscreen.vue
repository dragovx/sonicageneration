<template>
<div class="Subscreen" :style="cssProps">
    <window  :myJson = params.screen :numberWindow = 0 :subscreensize ="[this.params.height/this.params.screen.properties.canvas.height]" :boolback="false" />
</div>
</template>

<script>
export default {
  name: 'Subscreen',
  props:['params'],
  data () {
    return {}
  },
  components: {Window: () => import('../Window.vue')},
  computed: {
    cssProps() {
      return {
        "--x": this.params.x / 1 + "px",
        "--y": this.params.y / 1 + "px",
        "--z": this.params.z,
        "--width": this.params.width / 1 + "px",
        "--height": this.params.height / 1 + "px",
      }
    }
  },
  methods: {
    some(){
      this.$parent.pushjson(this.params.path)
    }
  },
}
</script>

<style scoped>
  .Subscreen{
    position: absolute;
    z-index: var(--z);
    left: var(--x);
    top: var(--y);
    width: var(--width);
    height: var(--height);
  }
</style>