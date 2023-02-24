<template>
  <main class="todo">
    <div class="todo__task">
      <input v-model="task" type="text" placeholder="Type new todo" @keyup.enter="addTask">
    </div>
    <div class="todo__tasks">
      <div class="todo__tasks--list">
        <div class="task" v-for="(item, index) in getList" :key="index">
          <input
            :id="'task'+index"
            type="checkbox"
            v-model="item.isComplete"
            @change="updateTaskSelected(index)"
          >
          <input 
            v-if="index === itemToEdit"
            type="text"
            v-model="item.task"
            class="task--edit"
            @keyup.enter="closeInputEdit"
          >
          <label
            v-else
            class="task__name"
            :class="{'complete': item.isComplete}"
            @dblclick="openUpdateName(index)"
            >{{ item.task }}</label>
        </div>
      </div>
      <div class="todo__tasks--options">
        <span>0 items left</span>
        <div>
          <button>All</button>
          <button>Pending</button>
          <button>Completed</button>
        </div>
        <button>Clear completed</button>
      </div>
    </div>
    
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const getList = computed(() => {
  return store.getters.getList;
});


const task = ref('');
const addTask = () => {
  if(task.value === '') return 
  store.dispatch("addTask", task.value);
  task.value = '';
};
const itemToEdit = ref(null);
const updateTaskSelected = (index) => store.dispatch('updateTaskSelected', index);
const openUpdateName = (index) => itemToEdit.value = index ;
const closeInputEdit = () => itemToEdit.value = null ;
</script>

<style lang="scss" scoped>
.todo{
  @apply w-full h-full;
  max-width: 600px;
  &__task{
    @apply w-full;
    max-width: 600px;
    & input{
      @apply w-full px-5 py-2 rounded-lg outline-none text-gray-600;
      &::placeholder{
        @apply text-lg italic;
      }
    }
  }
  &__tasks{
    @apply bg-white shadow-xl text-gray-600 rounded-lg mt-6 p-4 ;
    &--list{
      @apply  overflow-auto w-full max-h-[calc(100%-160px)] sm:max-h-[400px] ;
      min-height: 200px;
      & .task {
        @apply flex gap-2;
        &__name{
          @apply text-lg font-semibold;
        }
        &__name.complete{
          @apply line-through decoration-gray-500 text-gray-500 decoration-double;
        }
        &--edit{
          @apply w-full border-2 border-gray-500 outline-none px-2;
        }
      }
    }
    &--options{
      @apply flex justify-between p-3;
    }
  }
  
}


</style>