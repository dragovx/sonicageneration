<template>
    <img :style="cssProps" class="Logo" src="../../img/Logo.jpg" />
</template>

<script>
export default {
  name: '',
  props:["params"],
  data () {
    return {
      path: 0,  
     
    }
  },
  computed:{
    cssProps() {
      return {
        "--x": this.params.x / 1 + "px",
        "--y": this.params.y / 1 + "px",
        "--z": -5,
        "--width": this.params.width / 1 + "px",
        "--height": this.params.height / 1 + "px",
      }
    }
  }
}
</script>

<style scoped>
.logo{
    position: absolute;
    z-index: var(--z);
    left: var(--x);
    top: var(--y);
    width: var(--width);
    height: var(--height);
  }
</style>