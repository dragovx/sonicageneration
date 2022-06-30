<template>
<div class="Subscreen" :style="cssProps">
    <window  :myJson = params.properties.screen :subscreensize ="[this.params.properties.height/this.params.properties.screen.canvas.height]" :boolback="false" />
</div>
</template>

<script>

import { defineAsyncComponent } from 'vue'
const Window = defineAsyncComponent (() => import('../Window.vue'))

export default {
  name: 'Subscreen',
  props:['params'],
  components: {
    Window
  },
 
  computed: {
    cssProps() {
      return {
        "--x": this.params.properties.x / 1 + "px",
        "--y": this.params.properties.y / 1 + "px",
        "--z": this.params.properties.z,
        "--width": this.params.properties.width / 1 + "px",
        "--height": this.params.properties.height / 1 + "px",
      }
    }
  },
  created(){
    console.log(this.params.properties.screen)
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