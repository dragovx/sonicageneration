<template>
<!------------------tiles------------------>
<div>
  <div>{{info}}</div>
	<div class="tiles1"  :class="[tiles1.Flashing ? 'flash' : '']" 
                      :style="{backgroundColor: tiles1.BackgroundColor, 
                              color: tiles1.ForegroundColor}" 
                      :title="'Состояние элемента ' + tiles1.tooltip"
  >{{tiles1.value}}</div>
<!------------------TxtArg-------------------->
<div class="txtarg1">
  <span class="txtarg1_star" v-show="(txtarg1.value != txtarg1.Notification) && (txtarg1.ShowNotification)" >*</span>
  <input :style="[txtarg1.ShowNotification ? txtarg1.value == txtarg1.Notification ? {'margin-left' : '9.5px'} : '' : {'margin-left' : '9.5px'}]" class="txtarg1_value" v-model="txtarg1.value" @blur="submitForm(txtarg1)" @keyup.enter="$event.target.blur()" id="txtarg1" :disabled="txtarg1.disabled"/>
</div>
<!------------------RadioArg------------------>
  <div class="radioarg1">
    <div v-for="elem in radioarg1.masvalue" :key="elem.id" @change="submitForm(radioarg1)" >
      <input type="radio" :value="elem.item" v-model="radioarg1.value" :disabled="radioarg1.disabled">
      <label style="border: solid 1px black;">{{elem.item}}</label>
    </div>
  </div>
<!------------------PasswordArg------------------>
<div class="passwordarg1">
  <input  v-model="passwordarg1.value" type="password" @blur="submitForm(passwordarg1)" @keyup.enter="$event.target.blur()" :disabled="passwordarg1.disabled"/><br>
</div>
<!------------------IpAdressArg------------------>
<div class="ipadressarg1">
  <span class="ipadressarg1_star" v-show="(ipadressarg1.value != ipadressarg1.Notification) && (ipadressarg1.ShowNotification)" >*</span>
  <input class="ipadressarg1_value" :style="[ipadressarg1.ShowNotification ? ipadressarg1.value == ipadressarg1.Notification ? {'margin-left' : '9.5px'} : '' : {'margin-left' : '9.5px'}]" v-model="ipadressarg1.value" type="text"  placeholder="255.255.255.255" @input="ipchange()" @change="ipchange()" @blur="[ipadressarg1.isValid ? submitForm(ipadressarg1) : '']" @keyup.enter="[ipadressarg1.isValid ? $event.target.blur() : '']" :disabled="ipadressarg1.disabled"/>
  <div class="ipadressarg1_error"  v-if="!ipadressarg1.isValid">Ip is Invalid</div>
</div>
<!------------------ComboArg------------------>
  <div class="comboarg1">
    <select class="comboarg1_value" v-model="comboarg1.value" @change="submitForm(comboarg1)" :disabled="comboarg1.disabled">
      <option v-for="elem in comboarg1.masvalue" :key="elem.id">
        {{elem.item}}
      </option>
    </select>
  </div>
<!------------------BoolArg------------------>
<div class="boolarg1">
  <input class="boolarg1.value" type="checkbox" v-model="boolarg1.value" @change="submitForm(boolarg1)" :disabled="boolarg1.disabled">
</div>
<!------------------BitMaskArg------------------>
<div class="bitmaskarg1" @click="bitmaskarg1.window=!bitmaskarg1.window" >
  <span class="bitmaskarg1_star" v-show="(bitmaskarg1.value != bitmaskarg1.Notification) && (bitmaskarg1.ShowNotification)">*</span>
  <span class="bitmaskarg1_value" >0x{{bitmaskarg1value}}</span>
</div>
<div class="bitmaskarg1_table" v-show="bitmaskarg1.window" v-click-outside="onClickOutside">
      <table style="background-color: gray; color: white">
        <tr>
          <td colspan="3">Bit field</td>
        </tr>
        <tr>
          <td>Position</td>
          <td>Description</td>
          <td>Value</td>
        </tr>
        <tr v-for="elem in bitmaskarg1.masvalue" :key="elem.id">
          <td>{{elem.position}}</td>
          <td>{{elem.description}}</td>
          <td><input type="checkbox" v-model="elem.value" @change="[elem.value ? bitmaskarg1.value+=Math.pow(2,elem.position) : bitmaskarg1.value-=Math.pow(2,elem.position)], submitForm(bitmaskarg1)" :disabled="bitmaskarg1.disabled"></td>
        </tr>
      </table>
    </div>

<!------------------SliderArg------------------>
  <div class="sliderarg1"  :style="[sliderarg1.Orientation=='Vertical' ? {'transform': 'rotate(-90deg)'} : '' ]">
  <div  :style="[sliderarg1.Orientation=='Vertical' ? {'transform': 'rotate(90deg)'} : '' ]">{{sliderarg1.min}}</div>
  <div>
    <div :style="[sliderarg1.Orientation=='Vertical' ? {'transform': 'rotate(90deg)'} : '' ]" > {{sliderarg1.value}} </div>
    <custom-slider  :hideLabel="true" :min="sliderarg1.min" :max="sliderarg1.max" :step="sliderarg1.step" raising v-model="sliderarg1.value" @change="submitForm(sliderarg1)" :disabled="sliderarg1.disabled"/>
  </div>
  <div :style="[sliderarg1.Orientation=='Vertical' ? {'transform': 'rotate(90deg)'} : '' ]" >{{sliderarg1.max}}</div>
  </div>
<!------------------Apply style="border:solid 1px black"------------------>
  <button>Apply</button>
</div>
</template>

<script>

import CustomSlider from "vue-custom-range-slider";
import vClickOutside from 'v-click-outside';
import axios from 'axios'

export default {
  name: 'Main',
  data () {
    return {
      info: null,
        tiles1:{
          value: '***',
          ForegroundColor: 'white',
          BackgroundColor: 'blue',
          Flashing: false,
          AlarmInfo: 'Good',
          tooltip: 'подсказка!',
        },
        txtarg1:{
          value: null,
          ForegroundColor: 'white',
          BackgroundColor: 'blue',
          Flashing: false,
          AlarmInfo: 'Good',
          tooltip: 'подсказка!',
          ShowNotification: true,
          Notification: null,
          disabled: false,
        },
        radioarg1:{
          masvalue:[
            {
              item : "item1",
              val : "1"
            }, {
              item : "item2",
              val : "2"
            }, {
              item : "item3",
              val : "3"
            }, {
              item : "item4",
              val : "4"
            },
          ],
          value:"",
          ForegroundColor: 'white',
          BackgroundColor: 'blue',
          Flashing: false,
          AlarmInfo: 'Good',
          tooltip: 'подсказка!',
          disabled: false,
        },
        passwordarg1:{
          value:"",
          ForegroundColor: 'white',
          BackgroundColor: 'blue',
          Flashing: false,
          AlarmInfo: 'Good',
          tooltip: 'подсказка!',
          disabled: false,
        },
        ipadressarg1:{
          value: null,
          ForegroundColor: 'white',
          BackgroundColor: 'blue',
          Flashing: false,
          AlarmInfo: 'Good',
          tooltip: 'подсказка!',
          isValid: true,
          regex: /^(?:(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)\.){3}(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)$/,
          ShowNotification: true,
          Notification: null,
          disabled: false,
        },
        comboarg1:{
          selected:'',
          masvalue:[
            {
              item : "item1",
              val : "1"
            }, {
              item : "item2",
              val : "2"
            }, {
              item : "item3",
              val : "3"
            }, {
              item : "item4",
              val : "4"
            },
          ],
          value:"",
          ForegroundColor: 'white',
          BackgroundColor: 'blue',
          Flashing: false,
          AlarmInfo: 'Good',
          tooltip: 'подсказка!',
          disabled: false,
        },
        boolarg1:{
          value:null,
          ForegroundColor: 'white',
          BackgroundColor: 'blue',
          Flashing: false,
          AlarmInfo: 'Good',
          tooltip: 'подсказка!',
          disabled: false,
        },
        bitmaskarg1:{
          value: 0,
          masvalue:[
          {
            position: 0,
            description: '000',
            value: false,
          },
          {
            position: 1,
            description: '111',
            value: false,
          },
          {
            position: 2,
            description: '222',
            value: false,
          },
          {
            position: 3,
            description: '333',
            value: false,
          },
          {
            position: 4,
            description: '444',
            value: false,
          },
          {
            position: 10,
            description: '10',
            value: false,
          }],
          window: false,
          ForegroundColor: 'white',
          BackgroundColor: 'blue',
          Flashing: false,
          AlarmInfo: 'Good',
          tooltip: 'подсказка!',
          windowlist: false,
          ShowNotification: true,
          Notification: 0,
          disabled: false,
        },
        sliderarg1:{
          value:'50',
          ForegroundColor: 'white',
          BackgroundColor: 'blue',
          Flashing: false,
          AlarmInfo: 'Good',
          tooltip: 'подсказка!',
          Orientation: 'Verticall',
          min: "0",
          max: "300",
          step: "33",
          disabled: false,
        }
      }
    },

    created() {
      const getResourse = async () => {
        // // setInterval(async () => {
        const response = await fetch(
          `https://localhost:5001/api/Home?Text=TileTextModel`
        );
        const data = await response.text();
        var obj = (data.slice(0,10))
        console.log(obj)
        // // }, 10000);
      }
      getResourse();
    },

    components: {CustomSlider},

    methods: {
      submitForm(res) {
        res.disabled = true;
        setTimeout(async () => {
          res.Notification = res.value
          res.disabled = false;
          let response = await fetch('https://localhost:5001/api/Home', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(res)
        });

        let result = await response.json();
        alert(result.message);
        }, 100)
      },
      ipchange(){
        this.ipadressarg1.isValid=this.ipadressarg1.regex.test(this.ipadressarg1.value)
      },
      onClickOutside (event) {
        if(!(event.target._prevClass == "bitmaskarg1_value")){
          this.bitmaskarg1.window = false
        }
        
      }
    },
    computed: {
      bitmaskarg1value(){
        return this.bitmaskarg1.value.toString(16).toUpperCase()
      },
      
    },
    directives:{
       clickOutside: vClickOutside.directive
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "vue-custom-range-slider/dist/vue-custom-range-slider.scss";

body{
  background: rgb(26,26,26);
}
.tiles1 {
  display: block;
  width: 151px;
  height: 25px;
  position: absolute;
  top: 300px;
  left: 300px;
  border-radius: 0px;
  border: 1px solid black;
  text-align: center;
  padding:10px;
  font-size: 24;
}

.txtarg1{
  position: absolute;
  top: 150px;
  display: flex; 
  align-items: center; 
  border: solid 1px black;
  width: 80px;
  height: 30px;
}
.txtarg1_star{
  width: 10px;
}
.txtarg1_value{
  height: 80%;
  width: 90%;
  border: none;
  border-radius: none;
}
.txtarg1_value:focus{
  outline: none;
}

.ipadressarg1{
  position: absolute;
  left: 200px;
  display: flex; 
  align-items: center; 
  border: solid 1px black;
  width: 120px;
  height: 30px;
}
.ipadressarg1_star{
  width: 10px;
}
.ipadressarg1_value{
  height: 80%;
  width: 90%;
  border: none;
  border-radius: none;
}
.ipadressarg1_value:focus{
  outline: none;
}
.ipadressarg1_error{
  position: absolute;
  top: 40px;
}

.comboarg1{
  position: absolute;
  left: 350px;
  display: flex; 
  align-items: center; 
  border: solid 1px black;
  width: 120px;
  height: 30px;
}
.comboarg1_value{
  border: none;
  width: 100%;
  text-align: center;
}
.comboarg1_value:focus{
  outline: none;
}

.radioarg1{
  position: absolute;
  left: 500px;
}

.passwordarg1{
  position: absolute;
}

.bitmaskarg1{
  top: 2px;
  user-select: none;
  position: absolute;
  left: 700px;
  display: flex; 
  align-items: center; 
  border: solid 1px black;
  width: 60px;
  height: 30px;
}
  .bitmaskarg1:hover{
    background-color: blue;
  }
  .bitmaskarg1:active{
    background-color: rgb(13, 168, 240);
  }
.bitmaskarg1_star{
  position: absolute;
  width: 10px;
}
.bitmaskarg1_value{
  border: none;
  width: 100%;
  text-align: center;
}
.bitmaskarg1_table{
  position: absolute;
  left:700px;
  top: 34px
}

.boolarg1{
  position: absolute;
  left:600px;
}

.sliderarg1{
  transform: scale(1, 1);
  left: 320px;
  top: 150px;
  position: absolute;
  display: flex; 
  align-items: end;
}
@keyframes glowing {
  from { background-color: #2ba805; box-shadow: 0 0 5px #2ba805; }
  50% { background-color: #49e819; box-shadow: 0 0 20px #49e819; }
  to { background-color: #2ba805; box-shadow: 0 0 5px #2ba805; }
}
.flash {
  animation: glowing 700ms infinite;
}
</style>
