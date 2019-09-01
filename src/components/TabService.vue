<template>
<v-list>
    <v-list-item v-for="(service,i) in services" :key="i">
        <v-layout row class="item-service">
            <v-flex xs2 class="layout-check">
                <v-checkbox v-model="checkService" class="check-service" :value="service.UUID_SERVICE"></v-checkbox>
            </v-flex>
            <v-flex xs10 class="image-service">
                <img :src="PUBLIC_URL +service.IMAGE_SERVICE" />
            </v-flex>
        </v-layout>
    </v-list-item>
</v-list>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import axios from 'axios'
export default {
    data()
    {
        return {
            checkService: [],
            services: []
        }
    },
    computed: {
        ...mapGetters(["BASE_URL", "PUBLIC_URL"])
    },
    methods: {
        ...mapActions(["commitService"]),
        ApiGetService()
        {
            axios.get(this.BASE_URL + 'service')
            .then((response) => {
                this.services = response.data
            })
        }
    },
    updated()
    {
        this.commitService(this.checkService)
    },
    created()
    {
        this.ApiGetService()
    }
}
</script>

<style scoped>
.check-time {padding: 0 16px;}
.image-service img{width: 100%;height: 100px;;}
.item-service {border: 1px solid #e2e2e2;border-radius: 5px;margin: 7px 0;}
.layout-check {position: relative;}
.check-service {text-align: center;position: absolute;left: 50%;top: 50%; transform: translate(-50%, -50%);margin: 0!important; height: 32px;}
.check-service input {position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%)}
</style>