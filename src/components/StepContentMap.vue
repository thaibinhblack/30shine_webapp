<template>
     <v-stepper-content step="1">
        <div>
            <div class="header-form">
            <v-icon>mdi-map-marker</v-icon> CHỌN TỈNH / THÀNH PHỐ
            </div>
            <select-map />
            <div class="group-btn">
                <v-layout row>
                    <v-flex xs12 sm6 class="btn">
                        <v-btn class="btn-booking"> <v-icon>mdi-chevron-left</v-icon> Quay Lại</v-btn>
                    </v-flex>
                    <v-flex xs12 sm6 class="btn">
                        <v-btn class="btn-booking" color="primary" @click="NextStep()">Tiếp Tục <v-icon>mdi-chevron-right</v-icon></v-btn>
                    </v-flex>
                </v-layout>
            </div>
        </div>
    </v-stepper-content>
</template>
<script>
import axios from 'axios'
import {mapGetters, mapActions} from 'vuex'
export default {
    props: ["el"],
    data()
    {
        return{
            update: false
        }
    },
    components: {
        'select-map': require('../components/SelectMap.vue').default
    },
    computed:{
        ...mapGetters(["getStore", "getUUID"])
    },
    methods: {
        ...mapActions(["commitDataFirebase", "commitStep"]),
        NextStep()
        {
            const message = {
                type: 'warning',
                text: 'Bạn chưa chọn địa điểm!'
            }
            if(this.getStore == null)
            {

                this.$emit("message",message)
            }
            else
            {
                 const data = {
                    NOTE_BOOKING: 'Khách hàng chọn chi nhánh '+ this.getStore.NAME_STORE
                }
                if(this.update == false)
                {
                    this.ApiUpdateBooking(data)
                    this.update = true
                }
                
                this.commitStep(2)
            }
            
        },
        
        ApiUpdateBooking(data)
        {
            axios.put('http://127.0.0.1:8000/api/v1/booking/'+this.getUUID+'?action=2',data).then((response) => {
                console.log(response.data)
            })
        },
    }
}
</script>
<style scoped>
.pd0 {margin: 0 !important}

</style>