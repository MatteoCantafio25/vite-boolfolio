<script>
export default {
    name: "NotFoundPage",
};
</script>

<template>
    <div class="vh-100 d-flex flex-column align-items-center justify-content-center">
        <h3 class="text-white text-center">404 | Page not found</h3>
        <button class="btn btn-secondary mt-2" @click="$router.back()">Go Back</button>
    </div>
</template>

<style lang="scss" scoped>
/* Style here */
</style>