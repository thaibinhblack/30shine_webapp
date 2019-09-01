<template>
<div id="wrap-main">
    <div class="check-booking done layout-main">
        <v-row>
            <v-col md="12" class="image-done">
                <img src="https://30shine.com/images/ok.png" />
            </v-col>
            <v-col md="12" class="image-done">
                <h3>Bạn vừa đặt lịch vào lúc {{infoBooking.TIME_BOOK}} giờ, ngày {{infoBooking.DATE_BOOK}}</h3>
                <small>Chúng tôi xin chân thành cảm ơn quý khách đã tin tưởng và ủng hộ dịch vụ của chúng tôi!</small>
            </v-col>
        </v-row>
        <div class="group-btn">
            <v-row>
                
                <v-col xs="12" sm="6"  class="btn">
                    <v-btn class="btn-booking" color="success" @click="PrveBooking()"> <v-icon>mdi-update</v-icon> Đặt lịch lại</v-btn>
                </v-col>
                <v-col xs="12" sm="6"  class="btn">
                    <v-btn class="btn-booking" color="warning" @click="deleteBooking()"><v-icon>mdi-delete</v-icon> Hủy đặt đặt lịch</v-btn>
                </v-col>
            </v-row>
        </div>
        <v-row>
            <v-col xs="12" sm="12">
                <span style="color:#333;"> <v-icon>mdi-account-check</v-icon> THÔNG TIN CỦA QUÝ KHÁCH</span>
            </v-col>
            <v-col xs="12" sm="6">
                <v-text-field
                    name="phone"
                    label="Số điện thoại"
                    :value="infoBooking.PHONE_BOOKING"
                    prepend-icon="mdi-phone"
                    class="input-done"
                ></v-text-field>
                <v-text-field
                    name="province"
                    label="TỈNH / THÀNH PHỐ"
                    prepend-icon="mdi-map-marker"
                    :value="infoStore.NAME_PROVICE"
                    class="input-done"
                    
                ></v-text-field>
                <v-text-field
                
                    name="country"
                    prepend-icon="mdi-map-marker"
                    label="QUẬN / HUYỆN"
                    :value="infoStore.NAME_COUNTRY"
                    class="input-done"
                    
                ></v-text-field>
                <v-text-field
                    name="store"
                    label="CHI NHÁNH"
                    prepend-icon="mdi-store"
                    :value="infoStore.NAME_STORE"
                    class="input-done"
                    
                ></v-text-field>
                 <!-- <v-text-field
                    v-if="getStylist != null"
                    name="stylist"
                    label="STYLIST"
                    v-model="getStylist.name"
                    prepend-icon="mdi-account-card-details"
                    class="input-done"
                    
                ></v-text-field> -->
            </v-col>
            <v-col xs="12" sm="6">
                <v-text-field
                    v-for="(service,i) in services"
                    :key="i"
                    name="service"
                    label="DỊCH VỤ"
                    prepend-icon="mdi-face-agent"
                    :value="service.NAME_SERVICE"
                    class="input-done"
                    
                ></v-text-field>
                <v-text-field
                    v-if="infoBooking.CODE != null"
                    name="code"
                    label="MÃ KHUYẾN MÃI"
                    v-model="infoBooking.CODE"
                    prepend-icon="mdi-gift-outline"
                    class="input-done"
                    
                ></v-text-field>
               
            </v-col>
            
        </v-row>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
export default {
    name: 'page-step-done',
    computed: {
        ...mapGetters(["getUUID", "BASE_URL", "getPhone"])
    },
    data()
    {
        return {
            infoBooking: {},
            infoStore: {},
            services: []
        }
    },
    methods: 
    {
        ...mapActions(["commitStep", "commitUUID"]),
        getInfoBookingByPhone()
        {
            axios.get(this.BASE_URL + 'booking/'+ this.getPhone).
            then((response) => {
                console.log(response.data)
                this.infoBooking = response.data
                this.InfoStore()
                this.InffoService()
            })
        },
        InfoStore()
        {
            axios.get(this.BASE_URL + 'room/'+this.infoBooking.UUID_ROOM+'?store=1').
            then((response) => {
                console.log(response.data)
                this.infoStore = response.data
            })
        },
        InffoService()
        {
            axios.get(this.BASE_URL+'detail-service/'+this.infoBooking.UUID_BOOKING).then((response) => {
                this.services = response.data
            })
        },
        deleteBooking()
        {
            axios.put(this.BASE_URL+'booking/'+this.infoBooking.UUID_BOOKING+'?type=delete')
            .then((response) => {
                this.$router.push('/')
            })
        },
        PrveBooking()
        {
             axios.put(this.BASE_URL+'booking/'+this.infoBooking.UUID_BOOKING+'?type=update')
            .then((response) => {
                this.$router.push('/')
            })
        }
    },
    created()
    {
        this.getInfoBookingByPhone()
    }
}
</script>

<style scoped>
.image-done{text-align: center}
.image-done img {width: 50%;}
.input-done label, .input-done input {color: #333 !important}
.avatar {width: 60px;height: 60px;border-radius: 50%;;}
.item-stylist {text-align: center}
.check-booking.done {height: 100%;overflow-y: scroll}
</style>