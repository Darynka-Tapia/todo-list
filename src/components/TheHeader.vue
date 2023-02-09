<template>
    <header class="header">
        <h1 class="header__title">My day!</h1>
        <p class="header__subtitle">All my task in one place!</p>
    </header>
</template>

<style lang="scss" scoped>
.header{
    @apply text-white w-full m-6;
    max-width: 600px;
    &__title{
        @apply text-2xl font-bold;
    }
    &__subtitle{
        @apply text-sm;
    }
}

</style>