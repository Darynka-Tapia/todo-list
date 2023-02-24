import { createStore } from "vuex";

const store = createStore({
  state() {
  return {
    list: [
      { task: 'Tarea 01', isComplete: false },
      { task: 'Tarea 02', isComplete: true },
    ]
  };
  },
  getters: {
    getList(state) {
      return state.list;
    }
  },
  mutations: {
    addTask(state, value){
      state.list.push({task: value, isComplete:false})
    },
    updateTaskSelected(state, value){
      state.list[value].isComplete = !state.list[value].isComplete;
    }
  },
  actions: {
    addTask({ commit }, value){
      commit("addTask", value);
    }, 
    updateTaskSelected({ commit }, value){
      // commit("updateTaskSelected", value);
    }
    
  },
});

export default store;