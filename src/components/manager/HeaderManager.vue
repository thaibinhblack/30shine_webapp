<template>
    <div class="header-title row">
            <div class="col-sm-8 left-header">
                <h3>{{title}}</h3>
            </div>
            <div class="col-sm-4 right-header">
                <ul class="list-link">
                    <li><v-icon>mdi-home</v-icon><a href="./manager">Home</a></li>
                    <li><v-icon>mdi-chevron-right</v-icon></li>
                    <li>{{link}}</li>
                </ul>
            </div>
            <div class="col-sm-12" v-if="store == true">
                <v-btn class="dialog-form-map" @click="commitDialogMap(true)"><v-icon>mdi-plus</v-icon> Thêm mới địa chỉ</v-btn>
                <message-alert />
            </div>
            <div class="col-sm-12" v-if="service == true">
                <v-btn class="dialog-form-map" @click="commitDialogService(true)"><v-icon>mdi-plus</v-icon> Thêm mới dịch vụ</v-btn>
            </div>
            <div class="col-sm-12" v-if="question == true">
                <v-btn class="dialog-form-map" @click="commitDialogQuestion(true)"><v-icon>mdi-plus</v-icon> Thêm mới câu hỏi</v-btn>
            </div>
        </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    props: ["title", "link", "store", "service", "booking", "question"],
    components: {
        'message-alert': require('@/components/AlertMessage.vue').default
    },
    methods: {
        ...mapActions(["commitDialogService","commitDialogMap","commitDialogQuestion"])
    }
}
</script>

<style scoped>
.header-title {margin-bottom: 50px;margin-left: 0;margin-right: 0;}
.list-link {text-align: right}
.list-link li {list-style: none;display: inline-block;}
.list-link li a {text-decoration: none;color: #333}
.list-link li a:hover {color: #2196f3}
</style>