<template>
<v-col cols="12" sm="12">
    <header-manager :title="'CHI TIẾT BOOKING'" :link="booking.PHONE_BOOKING" />
    <v-card style="padding: 25px;">
        <h4>Thông tin chi tiết của khách hàng {{booking.PHONE_BOOKING}}</h4>
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-text-field
                    name="PHONE"
                    label="SỐ ĐIỆN THOẠI"
                    v-model="booking.PHONE_BOOKING"
                    prepend-icon="mdi-phone"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field
                    name="ROOM"
                    label="CHI NHÁNH ĐĂNG KÝ"
                    v-model="store.NAME_STORE"
                    prepend-icon="mdi-store"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field
                    name="ROOM"
                    label="PHÒNG ĐĂNG KÝ"
                    v-model="store.NAME_ROOM"
                    prepend-icon="mdi-scale-bathroom"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-text-field
                    name="TIME_BOOK"
                    label="THỜI GIAN ĐẶT LỊCH"
                    v-model="booking.TIME_BOOK"
                    prepend-icon="mdi-av-timer"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field
                    name="DATE_BOOK"
                    label="NGÀY HẸN"
                    v-model="booking.DATE_BOOK"
                    prepend-icon="mdi-av-timer"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field
                    name="CREATED_AT"
                    label="ĐẶT LỊCH VÀO LÚC"
                    v-model="booking.CREATED_AT"
                    prepend-icon="mdi-av-timer"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-text-field
                    name="ACTION_BOOKING"
                    label="BOOKING TỚI BƯỚC"
                    v-model="booking.ACTION_BOOKING"
                    prepend-icon="mdi-gesture-tap"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field
                    name="CREATED_AT"
                    label="GHI CHÚ"
                    v-model="booking.NOTE_BOOKING"
                    prepend-icon="mdi-note"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6" md="4" v-for="(service,i) in services" :key="i">
                <v-text-field
                    name="service"
                    label="DỊCH VỤ ĐĂNG KÝ"
                    v-model="service.NAME_SERVICE"
                    prepend-icon="mdi-face-agent"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="12">
                <h4>THÔNG TIN KHẢO SÁT</h4>
            </v-col>
            <v-col cols="12" sm="12" md="6" v-for="(question, i) in questions" :key="i">
                <p>{{question.NAME_QUESTION}}</p>
                <p>Trả lời: {{question.NAME_ANWSER}}</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col sm="12" md="6">
                <h4>GỬI TIN NHẮN CHO KHÁCH HÀNG</h4>
                <v-text-field
                    label="SMS"
                    name="SMS"
                    prepend-icon="mdi-message"
                    append-icon="mdi-send"
                    hint="Lưu ý nhập chữ không dấu"
                    v-model="contentSMS"
                    @click:append="SendSMS()"
                    textarea
                ></v-text-field>
            </v-col>
            <v-col sm="12" md="6">
                <h4>GỬI THÔNG BÁO CHO KHÁCH HÀNG</h4>
                <v-alert :type="message.type" :value="true" style="width: 100%" v-if="message.text != null">
                    {{message.text}}
                </v-alert>
                <v-text-field
                    label="NOTIFY"
                    name="NOTIFY"
                    prepend-icon="mdi-message"
                    append-icon="mdi-send"
                    :disabled="booking.NOTIFY_TOKEN != null ? false: true"
                    :placeholder="booking.NOTIFY_TOKEN != null ? 'NHẬP THÔNG TIN THÔNG BÁO CHO KHÁCH HÀNG' :'KHÁCH HÀNG CHƯA ĐĂNG KÝ NHẬN THÔNG BÁO'"
                    @click:append="SendNotify()"
                    v-model="contentNotify"
                    textarea
                ></v-text-field>
            </v-col>
        </v-row>
    </v-card>
</v-col>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex';
export default {
    components: {
        'header-manager': () => import('@/components/manager/HeaderManager.vue')
    },
    computed:
    {
        ...mapGetters(["BASE_URL"])
    },
    data()
    {
        return {
            booking: {},
            store: {},
            services: [],
            questions: [],
            contentNotify: '',
            contentSMS: '',
            message: {
                text: null,
                type: null
            }
        }
    },
    methods:
    {
        ApiGetInfoBooking()
        {
            axios.get(this.BASE_URL + 'booking/'+this.$route.params.uuid+'?type=uuid')
            .then((response) => {
                this.booking = response.data
                this.ApiGetStore()
            })
        },
        ApiGetStore()
        {
            axios.get(this.BASE_URL + 'room/'+this.booking.UUID_ROOM+ '?store=1')
            .then((response) => {
                console.log(response.data)
                this.store = response.data
            })
        },
        ApiGetService()
        {
            axios.get(this.BASE_URL + 'detail-service/'+this.$route.params.uuid)
            .then((response) => {
                console.log(response.data)
                this.services = response.data
            })
        },
        ApiGetUserQuestion()
        {
            axios.get(this.BASE_URL + 'user-question/'+this.$route.params.uuid)
            .then((response) => {
                this.questions = response.data
            })
        },
        SendSMS()
        {
            axios.post(this.BASE_URL + 'sms', {
                phone: '946105582',
                message: this.contentSMS
            }).then((response) => {
                console.log(response.data)
            })
        },
        SendNotify()
        {
             var key = 'AAAAtPzwO40:APA91bHYdG1E8UZNkGa8POHV83fUyehvqZ3IyG1NQDN_2Dr4v7ULve95OWBRuEznJb0SKRHak3InZWNu255M_7TucyEWHdXtG_FBKgLA9YLc0BwsA9ABzGKyKWSiAb079DZqqXEE9ltB';
            var to = this.booking.NOTIFY_TOKEN;
            var notification = this.contentNotify
            
            fetch('https://fcm.googleapis.com/fcm/send', {
                'method': 'POST',
                'headers': {
                    'Authorization': 'key=' + key,
                    'Content-Type': 'application/json'
                },
                'body': JSON.stringify({
                    'notification': {
                        "title": "Notify ",       
                        "body": this.contentNotify
                    },
                    'to': to
            })
            }).then(function(response) {
            console.log('sucess',response);
            }).catch(function(error) {
            console.error(error);
            })
            // axios.post("https://fcm.googleapis.com/fcm/send",{
            //     "notification": { 
            //         "title": "Notify ",       
            //         "body": this.contentNotify
		    //     },
	        //     "to": this.booking.NOTIFY_TOKEN,
            // },
            // {
            //     headers: {
            //         "Authorization": 'key=AAAAtPzwO40:APA91bHYdG1E8UZNkGa8POHV83fUyehvqZ3IyG1NQDN_2Dr4v7ULve95OWBRuEznJb0SKRHak3InZWNu255M_7TucyEWHdXtG_FBKgLA9YLc0BwsA9ABzGKyKWSiAb079DZqqXEE9ltB',
            //         "Content-Type": "application/json"
            //     }
            // }).then(( response ) => {
            //     console.log(response)
            //     this.message.type = 'success'
            //     this.message.text = 'Gửi thông báo thành công!'
            // }).catch(() => {
            //     this.message.type = 'error'
            //     this.message.text = 'Lỗi! xin vui lòng thửi lai!'
            // })
        }
    },
    created()
    {
        // console.log(this.$route.params.uuid )
        this.ApiGetInfoBooking()
        this.ApiGetService()
        this.ApiGetUserQuestion()
    }
}
</script>
