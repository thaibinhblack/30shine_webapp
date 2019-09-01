<template>
  <v-app>
    <div id="main">
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>
<style scoped>
#main {width: 100%;height: 100%;}
</style>
