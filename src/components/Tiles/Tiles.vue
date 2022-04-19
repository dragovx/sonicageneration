<template>
  <div class="tiles"  :class="[this.name.startsWith('Tiles/Number') ? (tiles.Flashing ? 'flash' : '') : '']" 
                      :style="cssProps" 
                      :title="'Состояние элемента ' + tiles.tooltip"
                      v-show="tiles.Visible"
  ><p>{{tiles.value}}</p></div>
</template>
<script>
export default {
  name: 'tiles',
  props: ['params','name'],
  data () {
    return {
        tiles:{
          Name: 'tiles',
          value: this.params.text,
          ForegroundColor: this.params.foreground,
          BackgroundColor: this.params.background,
          Flashing: false,
          AlarmInfo: 'Good',
          Visible: this.params.visible,
          Enabled: true,
          tooltip: 'подсказка!',
        },
    }
  },

  created(){
    console.log(this.name)
  },

  computed: {
    cssProps(){
      return {
        '--x':this.params.x + 'px',
        '--y':this.params.y + 'px',
        '--z':this.params.z,
        '--width': this.params.width + 'px',
        '--height': this.params.height + 'px',
        '--backgroundColor': [this.tiles.BackgroundColor == 'Blue' ? '#373737' : this.tiles.BackgroundColor], 
        '--color': this.tiles.ForegroundColor,
        '--borderThickness': this.params.borderThickness + 'px',
        '--borderBrush': this.params.borderBrush,
        '--scale': this.params.scale,
        '--borderRadius': this.params.borderRadius,
        '--align': [this.tiles.value == '***' ? 'center' : 'left'],
        '--fontSize': [this.params.fontSize == 0 ? 14 : this.params.fontSize] + 'px',
      }
    }
  },
}
</script>
<style scoped>

.tiles {
  display: flex; 
  transform:scale(var(--scale));
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
  border-style: solid;
  justify-content: flex-start;
}
p { 
  margin: auto; /* Important */ 
  width: 100%;
  text-align: var(--align); 
  font-size: var(--fontSize);
}

@keyframes glowing {
  from { background-color: var(--backgroundColor);}
  50% { background-color: var(--backgroundColor); filter: brightness(50%);}
  to { background-color: var(--backgroundColor); }
}
.flash {
  animation: glowing 2000ms infinite;
}
</style>