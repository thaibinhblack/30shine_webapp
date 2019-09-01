<template> 
    <div class="col-sm-12">
        <header-manager :title="'THÊM CHI NHÁNH MỚI'" :link="'Thêm mới chi nhánh'"  :store="true"/>
       
        <v-card id="add-store">
            <form v-on:submit.prevent="addStore()">
                <v-row>
                    <v-col sm="6">
                        <v-text-field
                            name="name_store"
                            label="Tên Chi Nhánh"
                            prepend-icon="mdi-store"
                            required
                            v-model="store.NAME_STORE"
                        ></v-text-field>
                        <v-text-field
                            name="phone"
                            label="Số điện thoại"
                            prepend-icon="mdi-phone"
                            required
                            v-model="store.PHONE_STORE"
                        ></v-text-field>
                        <v-text-field
                            name="room"
                            label="Số lượng phòng"
                            type="number"
                            min="1"
                            value="1"
                            prepend-icon="mdi-home"
                            required
                            v-model="store.NUMBER_ROOM"
                        ></v-text-field>
                    </v-col>
                    <v-col sm="6">
                        <v-select
                            :items="provinces"
                            item-value="UUID_PROVINCE"
                            item-text="NAME_PROVICE"
                            label="THÀNH PHỐ"
                            v-model="selectedProvince"
                            @change="FilterCountry()"
                            required
                            prepend-icon="mdi-map-marker"
                        ></v-select>
                        <v-select
                            :items="country"
                            item-value="UUID_COUNTRY"
                            item-text="NAME_COUNTRY"
                            label="QUẬN / HUYỆN"
                            v-model="store.UUID_COUNTRY"
                            required
                            prepend-icon="mdi-map-marker"
                        ></v-select>
                        <v-text-field
                            name="address"
                            label="ĐỊA CHỈ"
                            prepend-icon="mdi-map-marker"
                            required
                            v-model="store.ADDRESS_STORE"
                        ></v-text-field>
                        <v-btn color="primary" type="submit" style="float:right">Thêm</v-btn>
                    </v-col>
                </v-row>
            </form>
        </v-card>
       <h3 style="margin-top: 15px;">THÊM DANH SÁCH PHÒNG</h3>
        <v-card v-if="add == true" class="row" style="margin: 15px 0;">
            <add-room v-for="i in parseInt(store.NUMBER_ROOM)" :key="i" :UUID_STORE="store.UUID_STORE"/>
        </v-card>
        
        <form-map :dialog="dialog" @closeDialog="dialog = $event" />
    </div>
</template>

<script>
import axios from 'axios'
import uuid from 'uuid'
import { mapActions } from 'vuex';
import { async } from 'q';
export default {
    data()
    {
        return{
            provinces: [],
            selectedProvince: 1,
            country: [
                {id: 1, name: 'Quận 1'}
            ],
            selectedCountry: 1,
            store: {
                UUID_STORE: uuid.v4(),
                NUMBER_ROOM: 2
            },
            dialog: false,
            data: [],
            add: false
        }
    },
    methods:{
        ...mapActions(["commitMessage"]),
        addStore(){
          
            axios.post("http://127.0.0.1:8000/api/v1/store",this.store)
            .then((response) => {
                this.add = true
                this.commitMessage({type: 'success',text: 'Thêm chi nhánh mới thành công!'})
            }).catch((error) => {
                this.commitMessage({type: 'error',text: 'Lỗi! Xin vui lòng thử lại!'})
            })
            // this.addRoom()
            // console.log(this.store)
        },
        ApiGetProvince()
        {
            axios.get("http://127.0.0.1:8000/api/v1/province").then((response) => {
                this.provinces = response.data
                this.selectedProvince= response.data[0].UUID_PROVINCE
                this.FilterCountry()
            }).catch((eror) => {

            })
        },
        FilterCountry()
        {
            axios.get('http://127.0.0.1:8000/api/v1/country/'+this.selectedProvince+'?type=UUID_PROVINCE')
            .then((response) => {
                this.country = response.data
            })
        }
        
    },
    components: {
        'header-manager': require('@/components/manager/HeaderManager').default,
        'form-map': require('@/components/dialog/FormMap.vue').default,
        'message-alert': require('@/components/AlertMessage.vue').default,
        'add-room': require('@/components/manager/store/AddRoomStore.vue').default
    },
    created() {
        this.ApiGetProvince()
    }
}
</script>

<style scoped>
#add-store {padding: 50px;}

</style>