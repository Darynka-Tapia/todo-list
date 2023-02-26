import { createStore } from "vuex";

const store = createStore({
  state() {
  return {
    list: []
  };
  },
  getters: {
    getList: (state) => (filter) => {
      if(filter === 'all') return state.list;
      if(filter === 'pending') return state.list.filter((task) => !task.isComplete);
      if(filter === 'completed') return state.list.filter((task) => task.isComplete);
    },
    getItemsLeft(state){
      return  state.list.reduce((acumulador, task) => (acumulador + (task.isComplete ? 0 : 1) ), 0);
    }
  },
  mutations: {
    addTask(state, value){
      state.list.push({task: value, isComplete:false})
    },
    updateTaskSelected(state, value){
      state.list[value].isComplete = !state.list[value].isComplete;
    },
    clearComplete(state){
      let existComplete = false;
      do{
        const index = state.list.findIndex((task) => task.isComplete );
        existComplete = index > 0;
        if(index > 0) state.list.splice(index, 1);
      }while(existComplete)
    }
  },
  actions: {
    addTask({ commit }, value){
      commit("addTask", value);
    }, 
    updateTaskSelected({ commit }, value){
      // commit("updateTaskSelected", value);
    },
    clearComplete({ commit }){
      commit("clearComplete");
    }
    
  },
});

export default store;