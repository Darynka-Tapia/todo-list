<template>
  <main class="todo">
    <div class="todo__task">
      <input v-model="task" type="text" placeholder="Type new todo" @keyup.enter="addTask">
    </div>
    <div class="todo__tasks">
      <div class="todo__tasks--list">
        <p class="without-task" v-if="taskList.length === 0">Sin tareas</p>
        <div class="task" v-for="(item, index) in taskList" :key="index">
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
        <span>{{ getItemsLeft }} items left</span>
        <div class="filters">
          <button
            :class="{'isSelect': buttonSelected === 'all'}"
            @click="changeFilter('all')"
          >
            All
          </button>
          <button
            :class="{'isSelect': buttonSelected === 'pending'}"
            @click="changeFilter('pending')"
          >
            Pending
          </button>
          <button
            :class="{'isSelect': buttonSelected === 'completed'}"
            @click="changeFilter('completed')"
          >
            Completed
          </button>
        </div>
        <button class="clear-completed" @click="clearComplete">Clear completed</button>
      </div>
    </div>
    
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const getList = ((filter) => store.getters.getList(filter));
const taskList = ref(getList('all')); 
const buttonSelected = ref('all');

const getItemsLeft = computed(() => store.getters.getItemsLeft );


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

const changeFilter = (filter) => {
  taskList.value = getList(filter);
  buttonSelected.value = filter;
};

const clearComplete = () => store.dispatch('clearComplete');

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
      @apply  overflow-auto w-full 
        min-h-[200px] max-h-[calc(100vh-350px)]
        sm:max-h-[400px] sm:min-h-[200px];
      & .without-task{ 
        @apply flex w-full h-full justify-center items-center text-center
        text-lg font-bold sm:min-h-[200px] sm:max-h-[400px] ;
      }
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
      @apply flex flex-col sm:flex-row justify-start sm:justify-between p-3;
      & .filters{
        @apply flex gap-2;
         & button {
          @apply px-2 border-2 border-transparent;
         }
        & button.isSelect{
          @apply border-2 border-gray-300;
        }
      }
      & button.clear-completed{
        @apply text-start sm:text-center;
      }
    }
  }
  
}


</style>