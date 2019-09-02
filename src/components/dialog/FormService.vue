<template>
    <v-dialog v-model="getDialogService" persistent max-width="600px">
        <form @submit.prevent="addService()">
            <v-card>
                <v-card-title>
                <span class="headline">THÊM MỚI ĐỊA CHỈ</span>
               
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-alert :type="message.type" v-if="message.text != null" :value="true">
                                {{message.text}}
                            </v-alert>
                        </v-col>
                        <v-col cols="12" sm="12">
                            
                            <v-text-field
                                name="NAME_SERVICE"
                                label="TÊN DỊCH VỤ"
                                prepend-icon="mdi-face-agent"
                                v-model="service.NAME_SERVICE"
                                required
                            ></v-text-field>
                            <span>HÌNH ẢNH DỊCH VỤ</span>
                            <div class="bg-servivce">
                                <input type="file" ref="myFiles" @change="renderImage()">
                                <img v-if="url != null" :src="url" required />
                            </div>
                        </v-col>
                        <v-col cols="12" sm="6">
                           
                        </v-col>
                    </v-row>
                </v-container>
                </v-card-text>
                <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="commitDialogService(false)">Close</v-btn>
                <v-btn color="blue darken-1" text type="submit" >Thêm mới</v-btn>
                </v-card-actions>
            </v-card>
            </form>
        </v-dialog>
</template>

<script>
import uuid from 'uuid'
import * as firebase from 'firebase'
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(["getDialogService", "BASE_URL"])
    },
    data()
    {
        return {
            message: {
                type: null,
                text: null
            },
            url: null,
            service: {
                UUID_SERVICE: uuid.v4(),
                NAME_SERVICE: '',
                IMAGE_SERVICE: ''
            }
        }
    },
    methods: {
        ...mapActions(["commitDialogService"]),
        renderImage(){
            var reader  = new FileReader()
            const file = this.$refs.myFiles.files[0]
            this.service.IMAGE_SERVICE = file
            this.url  = URL.createObjectURL(file)
            console.log(file)
        },
        addService()
        {
            const data = new FormData()
            data.append("UUID_SERVICE",this.service.UUID_SERVICE)
            data.append("NAME_SERVICE",this.service.NAME_SERVICE)
            data.append("IMAGE_SERVICE",this.service.IMAGE_SERVICE)
            axios.post(this.BASE_URL + "service",data)
            .then((response) => {
                this.service = {}
                this.service.UUID_SERVICE = uuid.v4()
                this.message.type = 'success'
                this.message.text = 'Bạn vừa thêm dịch vụ mới!'
            }).catch((eror) => {
                this.message.type = 'error'
                this.message.text = 'Lôi! Có vấn đề xảy ra, xin vuio lòng thử lại!'
            })
        }
    }
}
</script>
<style scoped>
.bg-servivce {width: 100%; position: relative;min-height: 120px;border: 1px solid #e2e2e2;border-radius: 5px;}
.bg-servivce img {width: 100%;height: 100%;}
.bg-servivce input[type="file"] { position: absolute;width: 100%;height: 100%;opacity: 0;top: 0;left: 0;}
</style>