<template>
    <v-col cols="12" sm="12">
    <header-manager :title="'DANH SÁCH NHÂN VIÊN'" link="Danh sách nhân viên" />
    <v-card style="padding:25px;">
        <v-data-table
            :headers="headers"
            :items="users"
        >
        <template v-slot:item.AVATAR="{item}">
            <v-avatar
                size="50"
                color="#e2e2e2"
            >
                <img v-if="item.AVATAR != null" :src="PUBLIC_URL + item.AVATAR" alt="alt">
            </v-avatar>
        </template>
        <template v-slot:item.GENDER="{item}">
            <v-icon>{{item.GENDER == 0 ? 'mdi-gender-male' : 'mdi-gender-female'}}</v-icon>
        </template>
        <template v-slot:item.ACTION="{item}">
            <router-link :to="'./user/'+item.UUID_USER"><v-icon>mdi-chevron-right</v-icon></router-link>
        </template>
        </v-data-table>
    </v-card>
</v-col>
</template>
<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
export default {
    components: {
        'header-manager': () => import('@/components/manager/HeaderManager.vue')
    },
    data()
    {
        return {
            headers: [
                {text: 'AVATAR', value: 'AVATAR',sortable: false,align: 'center'},
                {text: 'USERNAME', value: 'USERNAME', sortable: true},
                {text: 'QUYỀN', value: 'NAME_RULE', sortable: false},
                {text: 'EMAIL', value: 'EMAIL', sortable: true},
                {text: 'PHONE', value: 'PHONE', sortable: true},
                {text: 'GIỚI TÍNH', value: 'GENDER', sortable: false, align: 'center'},
                {text: 'NGÀY SINH', value: 'BIRTH_DAY', sortable: false},
                {text: 'TÁC VỤ', value: 'ACTION', sortable: true},

            ],
            users: [
                
            ],
            province: [],
            country: []
        }
    },
    computed: {
        ...mapGetters(["BASE_URL","PUBLIC_URL"]),
    },
    methods: {
        ApiGetUser()
        {
            axios.get(this.BASE_URL + 'user?code=29091996').then((response) => {
                this.users = response.data
            })
        },
        ApiGetProvince() {
            axios.get(this.BASE_URL + 'province').then((response) => {
                this.province = response.data
            })
        },
        ApiGetCountry() {
            axios.get(this.BASE_URL + 'country').then((response) => {
                this.country = response.data
            })
        }
    },
    created()
    {
        this.ApiGetUser()
        this.ApiGetProvince()
        this.ApiGetCountry()
    }
}
</script>

<style scoped>
a {text-decoration: none}
</style>