F<template>
    <v-dialog v-model="getDialogMap" persistent max-width="600px">
            <v-card>
                <v-card-title>
                <span class="headline">THÊM MỚI ĐỊA CHỈ</span>
               
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                        <message-alert />
                        <v-col cols="12">
                            <v-alert :type="message.type" v-if="message.text != null" :value="true">
                                {{message.text}}
                            </v-alert>
                            <v-btn @click="addProvince = !addProvince"><v-icon>mdi-map-marker</v-icon> Thêm TỈNH / THÀNH PHỐ mới</v-btn>
                            <v-text-field
                                v-if="addProvince == true"
                                style="margin-top:15px;"
                                name="province"
                                label="TỈNH / THÀNH PHỐ"
                                prepend-icon="mdi-map-marker"
                                v-model="name_province"
                                append-icon="mdi-plus"
                                @click:append="addProvincetoDB()"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-select
                                :items="provinces"
                                v-model="selectProvince"
                                item-text="NAME_PROVICE"
                                item-value="UUID_PROVINCE"
                                label="TỈNH / THÀNH PHỐ"
                                prepend-icon="mdi-map-marker"
                                @change="FilterCountry()"
                            ></v-select>
                            <v-btn @click="addCountry = !addCountry"><v-icon>mdi-plus</v-icon> Thêm QUẬN / HUYỆN mới</v-btn>
                             <item-country-input v-for="(item,i) in country" :key="i" :item="item" />
                            <v-text-field
                            v-if="addCountry == true"
                                v-model="NAME_COUNTRY"
                                style="margin-top: 15px;"
                                name="country"
                                label="QUẬN / HUYỆN"
                                prepend-icon="mdi-map-marker"
                            ></v-text-field>
                            <h4 style="margin-top: 15px;" v-if="country.length == 0">Chưa có chi nhánh nào thược tỉnh / thành phố này!</h4>
                            
                        </v-col>
                    </v-row>
                </v-container>
                </v-card-text>
                <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="commitDialogMap(false)">Close</v-btn>
                <v-btn color="blue darken-1" text @click="addCountrytoDB()">Thêm mới</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
</template>

<script>
import uuid from 'uuid'
import * as firebase from 'firebase'
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex';
export default {
    computed:{
        ...mapGetters(["getDialogMap"])
    },
    components: {
        'item-country-input': require('@/components/manager/ItemCountryInput.vue').default,
        'message-alert': require('@/components/AlertMessage.vue').default
    },
    data(){
        return {
            selectProvince: 1,
            provinces: [
                {id: 1, name: 'TP. HỒ CHÍ MINH'}
            ],
            country: [],
            addProvince: false,
            addCountry: false,
            uuid: uuid.v4(),
            name_province: null,
            message: {
                type: null,
                text:null
            },
            NAME_COUNTRY: null
        }
    },
    methods: {
        ...mapActions(["commitMessage","commitDialogMap"]),
        addProvincetoDB()
        {
            if(this.name_province == null)
            {
                this.message.type = 'warning'
                this.message.text = 'Bạn chưa nhập tên TỈNH / THÀNH PHỐ'
            }
            else
            {
                axios.post("http://127.0.0.1:8000/api/v1/province", {
                    UUID_PROVINCE: uuid.v4(),
                    NAME_PROVICE: this.name_province
                }).then((response) => {
                    this.name_province = null
                    this.commitMessage({type: 'success', text: 'Thêm TỈNH / THÀNH PHỐ mới thành công!'})
                    this.readProvicetoDB()
                }).catch((error) => {
                    this.commitMessage({type: 'error', text: 'Lỗi! Xin vui lòng thử lại!'})
                })
            }
           
        },
        FilterCountry()
        {
            axios.get("http://127.0.0.1:8000/api/v1/country/"+this.selectProvince+'?type=UUID_PROVINCE').then((response) => {
                    this.country = response.data
                })
        },
        readProvicetoDB()
        {
            axios.get("http://127.0.0.1:8000/api/v1/province").then((response) => {
                    this.provinces = response.data
                })
        },
        addCountrytoDB()
        {
            axios.post("http://127.0.0.1:8000/api/v1/country/",{
                UUID_COUNTRY: uuid.v4(),
                UUID_PROVINCE: this.selectProvince,
                NAME_COUNTRY: this.NAME_COUNTRY
            }).then((response) => {
                this.NAME_COUNTRY = null
                this.commitMessage({type: 'success', text: 'Thêm QUẬN / HUYỆN mới thành công!'})
                this.FilterCountry()
            }).catch((error) => {
                this.commitMessage({type: 'error', text: 'Lỗi! Xin vui lòng thử lại!'})
            })
        },
        updateCountry(item){
            console.log(item)
            // axios.put("http://127.0.0.1:8000/api/v1/country/"+item.UUID_COUNTRY,{

            // })
        }
    },
    created()
    {
       this.readProvicetoDB()
    }
}
</script>