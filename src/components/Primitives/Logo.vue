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
        "--x": this.params.x * this.$parent.multiplier  + "px",
        "--y": this.params.y * this.$parent.multiplier + "px",
        "--width": this.params.width * this.$parent.multiplier * this.params.scale + "px",
        "--height": this.params.height * this.$parent.multiplier * this.params.scale + "px",
      }
    }
  }
}
</script>

<style scoped>
.logo{
    position: absolute;
    left: var(--x);
    top: var(--y);
    width: var(--width);
    height: var(--height);
  }
</style>