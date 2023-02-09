<template>
    <main class="todo">
        <div class="todo__task">
            <input type="text" placeholder="Type new todo">
        </div>
        <div class="todo__list">
            
        </div>
    </main>
</template>

<style lang="scss" scoped>
.todo{
    @apply w-full;
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
    &__list{
        @apply bg-white shadow-xl text-gray-600 rounded-lg my-6 p-4;
        min-height: 200px;

    }
}


</style>