import { createStore } from "vuex";

export default createStore({
  state: {
    elems: [],
    tick: null,
    changedelems: [],
    intervals: [],
  },
  getters: {
    elems: (state) => state.elems,
    elemByName: (state) => (name) =>
      state.changedelems.find((t) => t.name === name),
    lastElemName: (state) => state.elems[state.elems.length - 1],
  },
  mutations: {
    async fetchElems(state) {
      let response = await fetch(
        `https://localhost:5001/api/nodes/main/current`
      );
      const data = JSON.parse(await response.text());
      state.tick = data.tick;
      state.elems.push(data);
      this.dispatch("updateElems", ">:\\" + data.name);
      const today = new Date();
      var currentDateMilliseconds = today.getMilliseconds();
      setTimeout(() => {
        setInterval(async () => {
          state.changedelems = [];
          fetch(`https://localhost:5001/api/nodes/main/current`)
            .then((response) => response.json())
            .then((data) => (state.tick = data.tick));
        }, 1000);
      }, 1000 - currentDateMilliseconds);
    },

    async updateElems(state, name) {
      const today = new Date();
      var currentDateMilliseconds = today.getMilliseconds();
      setTimeout(() => {
        var xyz = setInterval(async () => {
          let response = await fetch(
            `https://localhost:5001/api/nodes/${btoa(name)}/delta/0/${
              state.tick
            }`
          );
          const data = JSON.parse(await response.text());
          data.widgets.forEach((element) => {
            // const idx = state.elems[0].widgets.findIndex(t => t.name === element.name)
            state.changedelems.push(element);
          });
        }, 1000);
        state.intervals.push(xyz);
      }, 1000 - currentDateMilliseconds);
    },

    async addElems(state, data) {
      let response = await fetch(
        `https://localhost:5001/api/nodes/${btoa(data.name)}/current`
      );
      console.log(`https://localhost:5001/api/nodes/${btoa(data.name)}/current`)
      const res = JSON.parse(await response.text());
      res.title = data.title
      res.screenPercentage = data.screenPercentage
      state.elems.push(res);
      this.dispatch("updateElems", data.name);
    },

    closewindow(state) {
      state.elems.pop();
      clearInterval(state.intervals[state.intervals.length - 1]);
      state.intervals.pop();
    },
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
  },
  modules: {},
});
