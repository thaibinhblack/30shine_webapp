<template>
    <div id="wrap-manager">
        <v-row class="layout-manager">         
            <nav-bar />
            <v-row class="layout-content pd15">  
                <router-view></router-view>
            </v-row>
        </v-row>
    </div>
</template>

<script>
export default {
    components: {
        'nav-bar': require('@/components/NavSidebar.vue').default
    },

}
</script>

<style scoped>
#wrap-manager,.layout-manager {height: 100%;}
.layout-content {width: calc(100% - 250px)}
.pd15 {padding: 15px;}
.title-content h3{text-transform: uppercase}
</style>