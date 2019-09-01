<template>
    <v-col cols="12" sm="12">
        <header-manager :title="'DANH SÁCH DỊCH VỤ'" :link="'Dịch vụ'" :service="true"/>
        <v-card>
            <v-data-table
                :headers="headers"
                :items="items"
                show-select
                v-model="selected_service"
            > 
            <template v-slot:item.IMAGE_SERVICE="{item}">
                <img :src="'http://127.0.0.1:8000/'+item.IMAGE_SERVICE" />
            </template>
            </v-data-table>
        </v-card>
        <form-service />
    </v-col>
</template>

<script>
import axios from 'axios'
export default {
    components: {
        'header-manager': require('@/components/manager/HeaderManager.vue').default,
        'form-service': require('@/components/dialog/FormService.vue').default
    },
    data()
    {
        return {
            headers: [
                {text: 'TÊN DỊCH VỤ', value: 'NAME_SERVICE'},
                {text: 'HÌNH ẢNH', value: 'IMAGE_SERVICE', align: 'center', sortable: false},
                {text: 'NGÀY TẠO DỊCH VỤ', value: 'CREATED_AT'}
            ],
            items: [],
            selected_service: []
        }
    },
    methods: {
        ApiGetService(){
            axios.get('http://127.0.0.1:8000/api/v1/service')
            .then((response) => {
                this.items = response.data
            })
        }
    },
    created()
    {
        this.ApiGetService()
    }
}
</script>