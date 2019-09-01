<template>
<v-card max-width="250px" height="100%">
    <v-navigation-drawer
    permanent
    expand-on-hover
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
            <v-list-item link class="item-sub" to="bookings">
                <v-list-item-title>Danh sách booking</v-list-item-title>
                <v-icon>mdi-eye</v-icon>
            </v-list-item>    
        </v-list-group>
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
            <v-list-item link to="add-store" class="item-sub">
                <v-list-item-title>
                    Thêm chi nhánh
                </v-list-item-title>
                
            </v-list-item>
             <v-list-item link to="services" class="item-sub">
                <v-list-item-title>
                    Danh sách dịch vụ
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
            <v-list-item link to="questions" class="item-sub">
                <v-list-item-title>Danh sách câu hỏi</v-list-item-title>
            </v-list-item>
        </v-list-group>
    </v-list>
</v-navigation-drawer>
</v-card>

</template>

<style scoped>
.item-sub {padding-left: 45px;text-transform: uppercase}
</style>