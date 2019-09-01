<template>
    <v-alert :type="getMessage.type" :value="true" v-if="getMessage.text != null" style="width: 100%;">
        {{getMessage.text}}
    </v-alert>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed:{
        ...mapGetters(["getMessage"])
    }
}
</script>