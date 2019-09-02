<template>
    <v-stepper-content step="2">
        <div class="list-service">
            <v-alert :type="message.type" :value="true" v-if="message.text != null">
                {{message.text}}
            </v-alert>
            <v-tabs>
                <v-tab>
                    DỊCH VỤ
                </v-tab>
                <v-tab>
                    STYLE LIST 
                </v-tab>
                 <v-tab>
                    MÃ KHUYẾN MÃI
                </v-tab>
                <v-tab-item>
                    <tab-service />
                </v-tab-item>
                <v-tab-item>
                    <tab-stylist />
                </v-tab-item>
                <v-tab-item>
                    <tab-code/>
                </v-tab-item>
            </v-tabs>
            
        </div>
        <div class="check-time">
           <v-tabs v-model="tabs">
               <v-tab class="item-tab"><h4 style="width:100%;">CHỦ NHẬT</h4></v-tab>
                <v-tab class="item-tab"><h4 style="width:100%;">THỨ 2</h4></v-tab>
                <v-tab class="item-tab"><h4 style="width:100%;">THỨ 3</h4></v-tab>
                <v-tab class="item-tab"><h4 style="width:100%;">THỨ 4</h4></v-tab>
                <v-tab class="item-tab"><h4 style="width:100%;">THỨ 5</h4></v-tab>
                <v-tab class="item-tab"><h4 style="width:100%;">THỨ 6</h4></v-tab>
                <v-tab class="item-tab"><h4 style="width:100%;">THỨ 7</h4></v-tab>
                
                <v-tab-item>
                    <tab-time :now="now" :tab="0"/>
                </v-tab-item>
                <v-tab-item>
                    <tab-time :now="now" :tab="1" />
                </v-tab-item>
                <v-tab-item> 
                    <tab-time :now="now" :tab="2"/>
                </v-tab-item>
                <v-tab-item> 
                    <tab-time :now="now" :tab="3"/>
                </v-tab-item>
                <v-tab-item>
                    <tab-time :now="now" :tab="4" />
                </v-tab-item>
                <v-tab-item>
                    <tab-time :now="now" :tab="5"/>
                </v-tab-item>
                <v-tab-item>
                    <tab-time :now="now" :tab="6" />
                </v-tab-item>
                
                
            </v-tabs>
            
           
        </div>
        <div class="group-btn">
            
                <v-layout row>
                    <v-flex xs12 sm6 class="btn">
                        <v-btn class="btn-booking"  @click="commitStep(1)"> <v-icon>mdi-chevron-left</v-icon> Quay Lại</v-btn>
                    </v-flex>
                    <v-flex xs12 sm6 class="btn">
                        <v-btn class="btn-booking" color="primary" @click="NextStep(3)">Tiếp Tục {{getUUID_ROOM}} <v-icon>mdi-chevron-right</v-icon></v-btn>
                    </v-flex>
                </v-layout>
            </div>
    </v-stepper-content>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import axios from 'axios'
import moment from 'moment'
export default {
    components:
    {
        'tab-time': () => import('@/components/TabTimes.vue'),
        'tab-service': () => import('@/components/TabService.vue'),
        'tab-code': () => import('@/components/TabCode.vue'),
        'tab-stylist': () => import('@/components/TabItemStylist.vue')
    },
    data()
    {
        return{
            timeNow: new Date(),
            tabs: 0,
            now: true,
            message: {
                type: null,
                text: null
            },
            CODE: null
        }
    },
    watch:
    {
        tabs(newVal)
        {
            const date = new Date()
            if(date.getDay() != newVal)
            {
                var day = 0
                if(this.tabs > date.getDay())
                {
                    day = this.tabs - date.getDay()
                    date.setDate(date.getDate() + day)
                }
                else
                {
                    day = this.tabs -  date.getDay()
                    day = day + 8
                    date.setDate(date.getDate() + day)
                }
                
            }
            const dateBooking = new Date(date.getFullYear(),date.getMonth(),date.getDate())

            this.commitDateBooking(dateBooking)
            // console.log(dateBooking)
        }
    },
    computed:
    {
        ...mapGetters(["getService","getTimeBooking","getPhone","getUUID","getStore", "getUUID_ROOM", "getDateBooking", "getCode", "BASE_URL"])
    },
    methods: {
        ...mapActions(["commitNow", "commitStep", "commitDateBooking", "commitTodayRoom"]),
        NextStep(value)
        {
            if(this.getService == null || this.getTimeBooking == null || this.getService.length == 0 ) 
            {
                this.message.type = 'warning'
                
                if(this.getTimeBooking == null)
                {
                    this.message.text = 'Bạn chưa chọn thời gian!'
                }
                else
                {
                    this.message.text = 'Bạn vẫ chưa chọn dịch vụ nào!'
                }
            }
            else
            {
                const data = {
                    UUID_ROOM: this.getUUID_ROOM,
                    TIME_BOOK: this.getTimeBooking.time,
                    DATE_BOOK: moment(this.getDateBooking).format('YYYY-MM-DD'),
                    CODE: this.getCode,
                    NOTE_BOOKING: 'Khách hàng mới chọn tới bước dịch vụ!'
                }
                console.log(data,this.getService)
                const detail = {
                    UUID_BOOKING: this.getUUID,
                    service: this.getService
                }
                this.ApiCreateDetailService(detail)
                axios.put(this.BASE_URL + "booking/"+this.getUUID+'?action=3',data)
                .then((response) => {
                    // console.log(response.data)
                    this.ApiSMS(parseInt(this.getPhone))
                    this.commitStep(value)
                })
               
                // this.$emit("updateStep",value)
            }
            
        },
        ApiCreateDetailService(detail)
        {
             axios.post(this.BASE_URL + "detail_service_booking",detail)
                .then((response) => {
                    console.log(response.data)
                })
        },
        ApiUpdateBooking(data)
        {
            axios.put(this.BASE_URL + 'store/'+this.getUUID+'?action=2',data).then((response) => {
                console.log(response.data)
            })
        },
        ApiSMS(phone)
        {
            axios.post(this.BASE_URL + 'sms?phone='+phone)
        }

    },
    mounted()
    {
        console.log('test', this.timeNow.getDay())
        this.tabs = this.timeNow.getDay() 
    },
    updated()
    {
      
        if(this.tabs == (this.timeNow.getDay() )) 
        {
            this.now = true
            this.commitTodayRoom(true)
        }
        else
        {
            console.log('update false')
            this.now = false
            this.commitTodayRoom(false)
        }
        this.commitNow(this.now)
    },
}
</script>

<style scoped>

.item-tab {display: block;padding: 15px;text-align: center}

</style>