
import { createStore } from "vuex";
import ip from '../assets/ip.json'
import moment from "moment";

export default createStore({
  state: {
    head: null,
    main: null,
    // mainstate: null,
    // buttonstate: [],
    footer: null,
    elems: [],
    tickmas: [],
    tick: null,
    isLoading: true,
    ip: null,
    mainheight: null,
    updatedmainheight: null,
    historymas: [],
    mainmultiplier: true,
  },
  getters: {
    isLoading: (state) => state.isLoading,
    main: (state) => state.main,
    mainstate: (state) => state.mainstate,
    mainheight: (state) => state.mainheight,
    updatedmainheight: (state) => state.updatedmainheight,
    head: (state) => state.head,
    footer: (state) => state.footer,
    elems: (state) => state.elems,
    elemByName: (state) => (res) =>
      state.tickmas[state.tickmas.findIndex((s)=> s.name === res.namewindow)]?.mas.find((t) => t.name === res.namewidget),
    historymas: (state) => state.historymas,
    mainmultiplier: (state) => state.mainmultiplier,
  },
  mutations: {
    async fetchElems(state) {
      state.mainheight = window.innerHeight
      state.ip = (ip.ip)

      let response = await fetch(
        `http://${state.ip}/api/nodes/main/current`,{
          method: "GET",
          mode: "cors",
        }
      );
      const data = JSON.parse(await response.text());
      state.tick = data.tick;
      console.log(data)
      state.main = (data);

      let response2 = await fetch(
        `http://${state.ip}/api/nodes/header/current`
      );
      setTimeout(() => { state.isLoading = false }, 200);
      const data2 = JSON.parse(await response2.text());
      state.head = data2;

      // data2.widgets.forEach(async (elem) =>{
      //   if (elem.type.startsWith('neightbours/Navigator')){
      //     let response = await fetch(
      //       `http://${state.ip}/api/nodes/${btoa(elem.properties.path)}/current`
      //     );
      //     const data = JSON.parse(await response.text());
      //     this.dispatch("updateElems", ">:\\" + data.name);
      //     state.main.push(data)
      //     state.buttonstate.push({'name': data.name, 'path': elem.properties.path.split('\\').join('')})
      //     state.mainstate = data.name
      //   }
      // })

      let response3 = await fetch(
        `http://${state.ip}/api/nodes/footer/current`
      );
      setTimeout(() => { state.isLoading = false }, 200);
      const data3 = JSON.parse(await response3.text());
      state.footer = data3;

      this.dispatch("updateElems", ">:\\" + data.name);
      this.dispatch("updateElems", ">:\\" + data2.name);
    },

    async updateElems(state, name) {
      const today = new Date();
      var currentDateMilliseconds = today.getMilliseconds();
      let ticknumber = state.tickmas.length
      let con = {'tick': state.tick, 'name': name.split('\\').join(''), 'mas': [1]}
      state.tickmas.push(con)
      var zyx = setTimeout(() => {
        // console.log("я запустил:" + name)
        var xyz = setInterval(async () => {
          state.tickmas[ticknumber].mas = []
          let response = await fetch(
            `http://${state.ip}/api/nodes/${btoa(name)}/delta/0/${
              state.tickmas[ticknumber].tick
            }`
          );
          // console.log("number= " + ticknumber + " tick=" + state.tickmas[ticknumber])
          const data = JSON.parse(await response.text());
          
          state.tickmas[ticknumber].tick = data.tick
          data.widgets.forEach((element) => {
            if (element.name.startsWith("Sub")) {
              element.properties.screen.widgets.forEach((elements) => {
                elements.name += '/' + element.name
                state.tickmas[ticknumber].mas.push(elements)
              });
            } else {
              state.tickmas[ticknumber].mas.push(element)
            }
          });
          // console.log(" time:" + new Date().getHours() + ":"+ new Date().getMinutes() + ":"+ new Date().getSeconds() + ":" + asdasda.getMilliseconds() + ' name = ' + name + " tick:" + state.tickmas[ticknumber].tick) 
          // console.log(data)
          // console.log(state.tickmas[ticknumber])
        }, 1000);
        state.tickmas[ticknumber].interval = xyz
        
      }, 1000 - Math.abs(500 - currentDateMilliseconds));
      state.tickmas[ticknumber].timeout = zyx
    },

    async addElems(state, data) {
      let response = await fetch(
        `http://${state.ip}/api/nodes/${btoa(data.name)}/current`
      );
      if (response.ok){
        console.log(`http://${state.ip}/api/nodes/${btoa(data.name)}/current`)
        const res = JSON.parse(await response.text());
        res.title = data.title
        res.screenPercentage = data.screenPercentage
        res.typename = data.name
        state.elems.push(res);
        this.dispatch("updateElems", data.name);
      } else {
        alert("Ошибка HTTP: " + response.status)
      }
    },

    closewindow(state, name) {
      const index = state.tickmas.findIndex((t) => t.name === name)
      state.elems.pop();
      clearInterval(state.tickmas[index].interval);
      clearTimeout(state.tickmas[index].timeout)
      state.tickmas.splice(index,1)
    },

    changemainheight(state, h){
      state.mainheight = state.mainheight - h
    },
    updatemainheight(state, h){
      state.updatedmainheight = h
    },
    mainmultiplier(state, h){
      state.mainmultiplier = h
    },
    async gethistorytime(state, data){
      let response = await fetch(
        `http://${state.ip}/api/nodes/history/${moment(data[1]).format("YYYY-MM-DDTHH:mm:ss")}/${moment(data[0]).format("YYYY-MM-DDTHH:mm:ss")}`
      );
      const res = JSON.parse(await response.text());
      state.historymas = res
    },

    innactivereset(state){
      state.elems = []
    },

    // changemain(state, name){
    //   console.log(state.buttonstate.find((t) => t.path === name))
    //   this.mainstate = state.buttonstate.find((t) => t.path === name).name
    //   console.log(this.mainstate)
    // }

  },
  actions: {
    fetchElems({ commit }, elems) {
      commit("fetchElems", elems);
    },
    updateElems({ commit }, elems) {
      commit("updateElems", elems);
    },
    addElems({ commit }, elems) {
      commit("addElems", elems);
    },
    closewindow({ commit }, elems) {
      commit("closewindow", elems);
    },
    changemainheight({ commit }, elems) {
      commit("changemainheight", elems);
    },
    updatemainheight({ commit }, elems) {
      commit("updatemainheight", elems);
    },
    innactivereset({ commit }, elems) {
      commit("innactivereset", elems);
    },
    gethistorytime({ commit }, elems) {
      commit("gethistorytime", elems);
    },
    mainmultiplier({ commit }, elems) {
      commit("mainmultiplier", elems);
    },
    // changemain({ commit }, elems) {
    //   commit("changemain", elems);
    // },
  },
  modules: {},
});
