<template>
    <div id="page-manager">
        <layout-manager />
    </div>
</template>

<script>
export default {
    components: {
        'layout-manager': require('@/layout/LayoutManager.vue').default
    },
    created()
    {
    
    }
}
</script>

<style scoped>
#page-manager {height: 100%;}
</style>