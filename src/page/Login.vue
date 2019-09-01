<template>
<div id="wrap-main">
    <div class="layout-main page-login">
        <v-form class="form-login" @submit.prevent="ApiLogin()">
            <div class="header-login">
                <img class="logo-login" src="@/assets/logo.png" />
            </div>
            <v-text-field
                name="username"
                label="USERNAME"
                prepend-icon="mdi-account"
                required
            ></v-text-field>
            <v-text-field
                name="pasword"
                label="PASSWORD"
                prepend-icon="mdi-key"
                :append-icon="iconPassword"
                :type="type_password"
                required
                @click:append="changeTypeInput()"
            ></v-text-field>
            <div class="group-btn">
                <v-btn type="submit"  color="primary">Đăng Nhập</v-btn>
            </div>
            
        </v-form>
    </div
></div>
</template>
<script>
export default {
    data()
    {
        return{
            type_password: 'password',
            iconPassword: 'mdi-eye'
        }
    },
    methods: {
        changeTypeInput()
        {
            if(this.type_password == 'password')
            {
                this.type_password = 'text'
                this.iconPassword = 'mdi-eye-off'
            }
            else
            {
                this.type_password = 'password'
                this.iconPassword = 'mdi-eye'
            }
        }
    }
}
</script>

<style scoped>
.logo-login {width: 70px;height: 70px;border-radius: 50%; margin: auto;border:1px solid #e2e2e2;}
.header-login {text-align: center;padding: 15px 0;}
.layout-main.page-login {width: 320px;padding: 35px 25px;}
.group-btn {text-align: center}
</style>