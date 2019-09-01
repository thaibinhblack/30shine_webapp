<template>
<div id="wrap-main">
    <div class="check-booking layout-main">
        <v-alert :type="message.type" v-if="message.text != null">
            {{message.text}}
        </v-alert>
        <div class="layout-check row">
            <div class="col-md-12">
                <v-text-field
                name="phone"
                label="Số điện thoại đăng ký"
                v-model="booking.PHONE_BOOKING"
                prepend-icon="mdi-phone"
            ></v-text-field>
            </div>
            <div class="col-md-7 col-sm-12">
                <div class="btn-booking" @click="checkBooking()">
                    <h4>ĐẶT LỊCH GIỮ CHỖ NGAY! </h4>
                    <small>Hoặc liên hệ ngay: 0947164024</small>
                </div>
            </div>
            <div class="col-md-5 col-sm-12">
                <button class="btn-check" @click="check()">KIỂM TRA ĐẶT LỊCH</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import * as firebase from 'firebase'
import uuid from 'uuid'
import moment from 'moment'
import axios from 'axios'
export default {
    computed: {
        ...mapGetters(["BASE_URL"])
    },
    data(){
        return{
            booking: {
                UUID_BOOKING: uuid.v4(),
                PHONE_BOOKING: '',
                ACTION_BOOKING: 1
            },
            message: {
                text: null,
                type: null
            }
        }
    },
    methods: {
        ...mapActions(["commitPhone","commitUUID", "commitDataFirebase","commitStep","commitCheckBooking"]),
        check()
        {
            if(!this.checkBooking())
            {
                axios.get(this.BASE_URL + "booking/"+this.booking.PHONE_BOOKING).then((response) => {
                    console.log(response.data)
                   if(response.data.ACTION_BOOKING < 3)
                   {
                       this.commitUUID(response.data.UUID_BOOKING)
                       this.commitPhone(this.booking.PHONE_BOOKING)
                       this.commitStep(1)
                       this.$router.push('/form-booking')
                   }
                    else
                    {
                        if(response.data.CHECK_BOOKING == 1)
                        {
                            this.message.type = 'warning'
                            this.message.text = 'Khách hàng vân chưa có đặt lịch!'
                        }
                        else{
                            this.commitUUID(response.data.UUID_BOOKING)
                            this.commitPhone(this.booking.PHONE_BOOKING)
                            this.commitCheckBooking(true)
                            this.commitStep(3)
                            this.$router.push('/booking-done')
                        }
                       
                    }
                })
                // if(booking.ACTION_BOOKING == 1)
                // {
                //     this.commitStep(2)
                // }
                // this.$router.push('/form-booking')
            }
        },
        ApiGetBooking(phone)
        {
            axios.get(this.BASE_URL + "booking/"+phone).then((response) => {
                return response.data
            })
        },
        checkBooking()
        {
            if(this.booking.PHONE_BOOKING == '')
            {
                this.message.text = 'Bạn chưa nhập số điện thoại để kiểm tra!'
                this.message.type = 'warning'
                return false
            }
            else
            {
                this.message.text = null
                this.commitPhone(this.booking.PHONE_BOOKING)
                axios.get(this.BASE_URL + "booking?phone="+this.booking.PHONE_BOOKING)
                .then((response) => {
                    
                    if(response.data == false)
                    {
                        this.message.text = 'Thuê bao này đã được đăng ký, xin vui lòng kiểm tra đăng ký!'
                        this.message.type = 'warning'
                        
                    }
                    else{
                        console.log(response.data)
                        this.ApiCreateBooking()
                    }
                    
                })
            }
        },
        ApiCreateBooking(){
            axios.post('http://127.0.0.1:8000/api/v1/booking?type=PHONE_BOOKING',this.booking).then((response) => {
                    console.log(response.data)
                    this.commitUUID(this.booking.UUID_BOOKING)
                    this.commitStep(1)
                    this.$router.push('/form-booking')
                })
        }
    }
}
</script>
<style lang="css">
a {text-decoration: none;color: #fff !important;}
.layout-check {margin: 0 !important}
.pd10 {padding: 10px;}
.btn-booking {text-align: center;border: 1px solid #e2e2e2;border-radius: 5px;background-color: #212121;color: #fff;padding: 15px;cursor: pointer;}
.btn-check {padding: 15px !important;height: 68px;background:#eee ;outline: none;height: 100%;width: 100%;}
</style>