<template>
<div class="button"   :style="cssProps" 
                      :title="'Состояние элемента ' + button.tooltip"
                      v-show="button.Visible"
  ><p>{{button.value}}</p></div>
</template>

<script>
export default {
  name: '',
  props:['params'],
  data () {
    return {
     button:{
          Name: 'button',
          value: this.params.text,
          ForegroundColor: this.params.foreground,
          BackgroundColor: this.params.background,
          AlarmInfo: 'Good',
          Visible: true,
          Enabled: true,
          tooltip: 'подсказка!',
        },
    }
  },

  computed: {
    cssProps(){
      return {
        '--x':this.params.x + 'px',
        '--y':this.params.y + 'px',
        '--z':this.params.z,
        '--width': this.params.width + 'px',
        '--height': this.params.height + 'px',
        '--backgroundColor': '#' + this.button.BackgroundColor.slice(2,7) + this.button.BackgroundColor.slice(0,1), 
        '--color': this.button.ForegroundColor,
        '--borderThickness': this.params.borderThickness,
        '--borderBrush': this.params.borderBrush,
        '--scale': this.params.scale,
        '--borderRadius': this.params.borderRadius,
        '--fontSize': this.params.fontSize + 'px',
      }
    }
  },
}
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

.button:hover{
  background-color: var(--backgroundColor);
  filter: brightness(80%);
}
.button:active{
  background-color: var(--backgroundColor);
  filter: brightness(150%);
}

</style>