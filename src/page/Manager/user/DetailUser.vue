<template>
    <v-col cols="12" sm="12">
    <header-manager :title="'THÔNG TIN NHÂN VIÊN'" :link="user.USERNAME" :sublink="{name: 'Danh sách user', link: 'http://localhost:24181/manager/users'}" />
    <v-card style="padding:25px;">
        <v-alert :type="message.type" v-if="message.text != null" :value="true">
            {{message.text}}
        </v-alert>
        <v-form @submit.prevent="updateUser()">
            <v-row >
                <v-col cols="12" sm="12" class="group-avatar">
                    
                        <v-avatar
                            size="180"
                            color="#e2e2e2"
                            class="avatar"
                        >
                        <!-- <input class="input-add-avatar" type="file" ref="MyAvatar" @change="renderAvatar()" required> -->
                            <img v-if="user.AVATAR != null && avatar == null" :src="PUBLIC_URL + user.AVATAR" alt="AVATAR" />
                            <img v-if="avatar != null"  :src="avatar" alt="AVATAR" />
                        </v-avatar>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        name="username"
                        label="USERNAME"
                        disabled
                        prepend-icon="mdi-account"
                        placeholder="Nhập tài khoản cho người dùng"
                        v-model="user.USERNAME"
                        required
                    ></v-text-field>
                    
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        name="password"
                        label="PASSWORD"
                        :type="typePassword"
                        prepend-icon="mdi-key"
                        placeholder="Nhập password cho người dùng"
                        :append-icon="iconPassword"
                        @click:append="showPassword()"
                        v-model="user.PASSWORD"
                        @change="changePassword()"
                        :rules="rulePassword"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        name="email"
                        label="EMAIL"
                        prepend-icon="mdi-email"
                        placeholder="Nhập email cho người dùng"
                        v-model="user.EMAIL"
                        :counter="50"
                        :error="checkEmail"
                        :rules="ruleEmail"
                        @change="ApiCheckEmail()"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        name="phone"
                        label="SỐ ĐIỆN THOẠI"
                        prepend-icon="mdi-phone"
                        v-model="user.PHONE"
                        placeholder="Nhập số điện thoại người dùng"
                        :counter="10"
                        :rules="rulePhone"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                        v-model="dateFormatted"
                        label="Date"
                        hint="MM/DD/YYYY format"
                        persistent-hint
                        prepend-icon="mdi-calendar-range"
                        @blur="date = parseDate(dateFormatted)"
                        required
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-select
                        :items="gender"
                        item-value="value"
                        item-text="text"
                        label="GIỚI TÍNH"
                        prepend-icon="mdi-gender-male-female"
                        
                        v-model="user.GENDER"
                        required
                    ></v-select>
                </v-col>
                
                <v-col cols="12" sm="6" md="4">
                    
                    <v-select
                        :items="province"
                        item-value="UUID_PROVINCE"
                        item-text="NAME_PROVICE"
                        label="TỈNH / THÀNH PHỐ"
                        prepend-icon="mdi-map-marker"
                        v-model="UUID_PROVINCE"
                        required
                    ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-select
                        :items="country"
                        item-value="UUID_COUNTRY"
                        item-text="NAME_COUNTRY"
                        label="QUẬN / HUYỆN"
                        prepend-icon="mdi-map-marker"
                        v-model="user.UUID_COUNTRY"
                        color="error"
                        required
                    ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-select
                        :items="rule"
                        item-value="UUID_RULE"
                        item-text="NAME_RULE"
                        label="QUYỀN"
                        prepend-icon="mdi-account-tie"
                        v-model="user.UUID_RULE"
                        required
                    ></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6" md="4">
                    <v-btn color="primary" type="submit">Cập Nhật</v-btn>
                </v-col>
            </v-row>
        </v-form>
        
    </v-card>
</v-col>
</template>
<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import uuid from 'uuid'
export default {
    components: {
        'header-manager': () => import('@/components/manager/HeaderManager.vue')
    },
    data: vm => ({
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      avatar: null,
      gender: [
          {text: 'NAM', value: 0},
          {text: 'NỮ', value: 1}
      ],
      rule: [],
      user: {
          UUID_RULE: 'user-2019',
          GENDER: 0,
          BIRTH_DAY: new Date().toISOString().substr(0, 10),
          UUID_COUNTRY: ''
      },
      message: {
          type: null,
          text: null
      },
      province: [],
      country: [],
       checkEmail: false,
       rulePassword: [
           v => !!v || 'Chưa nhập password',
           v => v.length >= 8 || 'Password ít nhất 8 ký tự!'
       ],
       ruleEmail: [
            v => !!v || 'Bạn chưa nhập Email',
            v => /.+@.+\..+/.test(v) || 'Đây không phải là email!',
       ],
       rulePhone: [
            v => /((09|03|07|08|05|01)+([0-9]{8})\b)/.test(v) || 'Đây không phải là số điện thoại',
       ],
       iconPassword: 'mdi-eye',
       typePassword: 'password',
       UUID_PROVINCE: null,
       change_password: false
    }),
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
      ...mapGetters(["BASE_URL", "PUBLIC_URL"])
    },
     watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
    },
    methods: {
        renderAvatar()
        {
            var reader  = new FileReader()
            const file = this.$refs.MyAvatar.files[0]
            this.user.AVATAR = file
            this.avatar  = URL.createObjectURL(file)
            // console.log(file)
        },
        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
        parseDate (date) {
            if (!date) return null

            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        updateUser()
        {
            const data = {
               EMAIL: this.user.EMAIL,
               PHONE: this.user.PHONE,
               BIRTH_DAY: this.date,
               GENDER: this.user.GENDER,
               UUID_RULE: this.user.UUID_RULE,
               UUID_COUNTRY: this.user.UUID_COUNTRY
                
            }
            if(this.change_password == true)
            {
                data.PASSWORD = this.user.PASSWORD
            }
            axios.put(this.BASE_URL + 'user/'+this.user.UUID_USER,data)
            .then((response) => {
                console.log('data',response.data)
                this.message.type = 'success'
                this.message.text = 'Cập nhật thành công!'
                this.ApiGetInfoUser()
            }).catch((error) => {
                console.log('eror',error)
                // this.user =  {
                //     UUID_RULE: 'user-2019',
                //     GENDER: 0,
                //     UUID_COUNTRY: null
                // }
                // this.avatar = null
            })
        },
        ApiGetRule()
        {
            axios.get(this.BASE_URL + 'rule')
            .then((response) => {
                this.rule = response.data
            })
        },
        ApiCheckEmail()
        {
            axios.get(this.BASE_URL + 'user?check=email&value='+this.user.EMAIL).then((response) => {
                // console.log(response.data)
                if(response.data)
                {
                    this.message.type = 'warning'
                    this.message.text = 'Email đã tồn tại!'
                    this.checkEmail = true
                }
                else
                {
                    this.message.text = null
                    this.checkEmail = false
                }
            }) 
        },
        ApiGetInfoUser()
        {
            axios.get(this.BASE_URL + 'user/'+this.$route.params.uuid+'?code=29091996').then((response) => {
                // console.log(response.data)
                this.date = response.data.BIRTH_DAY
                this.user = response.data
                this.ApiGetCountry(response.data.UUID_COUNTRY, 'UUID_COUNTRY')
                
            })
        },
        showPassword()
        {
            if(this.typePassword == 'password')
            {
                this.typePassword = 'text'
                this.iconPassword = 'mdi-eye-off'
            }
            else
            {
                this.typePassword = 'password'
                this.iconPassword = 'mdi-eye'
            }
        },
        ApiGetProvince()
        {
            axios.get(this.BASE_URL + 'province')
            .then((response) => {
                this.province = response.data
                // this.user.UUID_PROVINCE = response.data[0].UUID_PROVINCE
                // this.ApiGetCountry(response.data[0].UUID_PROVINCE)
            })
        },
        ApiGetCountry(UUID_PROVINCE,TYPE)
        {
            axios.get(this.BASE_URL + 'country/'+UUID_PROVINCE+'?type=' + TYPE)
            .then((response) => {
                this.UUID_PROVINCE = response.data[0].UUID_PROVINCE
                this.DisplayCountry(response.data[0].UUID_PROVINCE)
            })
        },
        DisplayCountry(UUID_PROVINCE)
        {
            axios.get(this.BASE_URL + 'country/'+UUID_PROVINCE+'?type=UUID_PROVINCE')
            .then((response) => {
                this.country = response.data
            })
        },
        changePassword()
        {
            this.change_password = true
        }
    },
    created()
    {
        this.ApiGetRule()
        this.ApiGetProvince()
        this.ApiGetInfoUser()
    }
}
</script>

<style scoped>
.group-avatar {text-align: center}
.avatar {position: relative;border: 1px solid #e2e2e2;}
.input-add-avatar {position: absolute;width: 100%;height: 100%;top: 0;left: 0;opacity: 0;}
</style>