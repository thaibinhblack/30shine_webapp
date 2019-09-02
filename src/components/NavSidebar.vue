<template>
<v-card  class="left-sidebar" :class="{active: classActive}" height="100%">
    <v-navigation-drawer
    permanent
    width="100%"
    >
    <template v-slot:prepend>
        <v-list>
        <v-list-item
            link
            two-line>
            <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
            <v-list-item-title class="title">Sandra Adams</v-list-item-title>
            <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
            </v-list-item-action>
        </v-list-item>
        </v-list>
    </template>

    <v-divider></v-divider>

    <v-list
        nav
        dense
    >
        <v-list-group>
            <template v-slot:activator>
              
                    <v-list-item-icon>
                        <v-icon>mdi-book-open-page-variant</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Quản lý booking</v-list-item-title>
            </template>
            <v-list-item link class="item-sub" >
                <v-list-item-title><router-link to="/manager/bookings"> Danh sách booking</router-link></v-list-item-title>
               
            </v-list-item>    
        </v-list-group>
        <!-- Quản lý user -->
        <v-list-group>
            <template v-slot:activator>
                <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                    Quản lý nhân viên
                </v-list-item-title>
            </template>
            <v-list-item link class="item-sub">
                
                <v-list-item-title>
                    <router-link to="/manager/users">
                        Danh sách nhân viên
                    </router-link>
                </v-list-item-title>
            </v-list-item>
            <v-list-item link class="item-sub">
                <v-list-item-title>
                    <router-link to="/manager/add-user">
                        Thêm mới nhân viên
                    </router-link>
                </v-list-item-title>
            </v-list-item>
        </v-list-group>
        <!-- Quản lý chi nhánh -->
        <v-list-group >
           <template v-slot:activator>
              
                    <v-list-item-icon>
                        <v-icon>mdi-store</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Quản lý chi nhánh</v-list-item-title>
            </template>
            <v-list-item link class="item-sub">
                <v-list-item-title>
                    Danh sách chi nhánh
                </v-list-item-title>
                
            </v-list-item>
            <v-list-item link class="item-sub">
                <v-list-item-title >
                    <router-link to="/manager/add-store">
                        Thêm chi nhánh
                    </router-link>
                    
                </v-list-item-title>
                
            </v-list-item>
             <v-list-item link to="services" class="item-sub">
                <v-list-item-title>
                   <router-link to="/manager/services">
                        Danh sách dịch vụ
                   </router-link>
                </v-list-item-title>
                
            </v-list-item>
        </v-list-group>
        <v-list-group>
            <template v-slot:activator>
                <v-list-item-icon>
                        <v-icon>mdi-frequently-asked-questions</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Quản lý cẩu hỏi</v-list-item-title>
            </template>
            <v-list-item link class="item-sub">
                <v-list-item-title>
                    <router-link to="/manager/questions">
                        Danh sách câu hỏi
                    </router-link>
                </v-list-item-title>
            </v-list-item>
        </v-list-group>
        <v-list-item link to="/manager/history">
            <v-list-item-icon><v-icon>mdi-history</v-icon></v-list-item-icon>
            <v-list-item-title>
                    Quản lý lịch sử
            </v-list-item-title>
        </v-list-item>
    </v-list>
</v-navigation-drawer>
</v-card>

</template>

<script>
export default {
    props: ["classActive"],
    data()
    {
        return {
            url: "http://localhost:24181"
        }
    },
    created()
    {
        console.log(this.$route)
    }
}
</script>

<style scoped>
.item-sub {padding-left: 45px;text-transform: uppercase}
.left-sidebar {width: 0}
.left-sidebar.active {width: 250px}
a {text-decoration: none}
</style>