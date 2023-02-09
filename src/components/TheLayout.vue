<script setup>
import TheHeader from '@/components/TheHeader.vue'
import ToDo from '@/components/ToDo.vue'

</script>

<template>
    <div class="layout">
        <div class="layout--bground"></div>
        <TheHeader />
        <ToDo />
    </div>
</template>

<style lang="scss" scoped>
    .layout{
        @apply bg-[rgb(134,110,199)] text-white w-full h-full relative flex flex-col items-center z-10 p-4;
        background: linear-gradient(90deg, rgba(134,110,199,1) 0%, rgba(32,19,255,1) 72%);
        &--bground{
            @apply absolute w-full bg-white -z-10;
            bottom: 0;
            height: calc(100% - 200px);
        }
    }
</style>
