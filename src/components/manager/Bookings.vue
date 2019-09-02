<template>
<v-col cols="12" sm="12">
    <header-manager :title="'DANH SÁCH BOOKING'" :link="'Danh sách booking'" />
    <v-alert :type="message.type"  v-if="message.text != null" :value="true" >
        {{message.text}}
    </v-alert>
    <v-card>
        <v-data-table
        :headers="headers"
        :items="desserts"
        show-select
        item-key="name"
        v-model="selected">
            <template v-slot:item.action1="{ item }">
                <v-icon>{{item.ACTION_BOOKING >= 1 ?  'mdi-check' : 'mdi-alert-circle-outline'}}</v-icon>
            </template>
            <template v-slot:item.action2="{ item }">
                <v-icon>{{item.ACTION_BOOKING >= 2 ?  'mdi-check' : 'mdi-alert-circle-outline'}}</v-icon>
            </template>
            <template v-slot:item.action3="{ item }">
                <v-icon>{{item.ACTION_BOOKING == 3 ?  'mdi-check' : 'mdi-alert-circle-outline'}}</v-icon>
            </template>
            <template v-slot:item.TIME_BOOK="{ item }">
                <span>{{item.TIME_BOOK}}, ngày {{item.DATE_BOOK}}</span>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon class="btn-table" v-if="item.CHECK_BOOKING == 0" title="Xác nhận đăng ký" @click="checkBooking(item.UUID_BOOKING)">mdi-check</v-icon>
                <v-icon class="btn-table" v-else title="Hủy đăng ký" @click="DeleteBooking(item.UUID_BOOKING)">mdi-close</v-icon>
                <router-link class="link-booking" :to="'./booking/' +item.UUID_BOOKING"><v-icon class="btn-table" title="Xem thông tin chi tiết"> mdi-chevron-right</v-icon></router-link>
               
            </template>
        </v-data-table>
    </v-card>
</v-col>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex';
export default {
    components: {
        'header-manager': require('@/components/manager/HeaderManager.vue').default
    },
    computed:{
        ...mapGetters(["BASE_URL"])
    },
    data()
    {
        return {
            selected: [],
            headers: [
            {
                text: 'SĐT',
                align: 'center',
                sortable: true,
                value: 'PHONE_BOOKING',
                width: '120px'
            },
            { text: 'B1', value: 'action1', sortable: false, },
            { text: 'B2', value: 'action2', sortable: false, },
            { text: 'B3', value: 'action3', sortable: false, },
            { text: 'GHI CHÚ', value: 'NOTE_BOOKING', sortable: false, },
            { text: 'NGÀY BOOKING', value: 'CREATED_AT' },
            { text: 'LỊCH HẸN', value: 'TIME_BOOK'},
            { text: 'TÁC VỤ', value: 'actions',align: 'center', sortable: false,width: '120px'}
            ],
            desserts: [],
            message: {
                type: null,
                text: null
            }
        }
    },
    methods: {
        ApiGetBooking(){
            axios.get(this.BASE_URL + 'booking/')
            .then((response) => {
                this.desserts = response.data
            })
        },
        checkBooking(UUID_BOOKING)
        {
            axios.put(this.BASE_URL + "booking/"+UUID_BOOKING+"?check_booking=1")
            .then((response) => {
                this.message.type = 'success'
                this.message.text = 'Cập nhật thành công!'
                this.ApiGetBooking()
                console.log(response.data)
            }).catch((error) => {
                this.message.type = 'error'
                this.message.text = 'Lôi! Xin vui lòng thử lại!'
            })
        },
        DeleteBooking(UUID_BOOKING)
        {
            axios.delete(this.BASE_URL + "booking/"+UUID_BOOKING)
            .then((response) => {
                this.message.type = 'success'
                this.message.text = 'Bạn vừa xóa một booking!'
                this.ApiGetBooking()
            }).catch((eror) => {
                this.message.type = 'error'
                this.message.text = 'Lôi! Xin vui lòng thử lại!'
            })
        }
    },
    created()
    {
        this.ApiGetBooking()
    }
}
</script>

<style scoped>
.btn-table {padding: 5px;cursor: pointer;}
.link-booking {text-decoration: none}
</style>