<template>
    <v-col cols="12" sm="12" class="item-question"  :class="{active: open}">
        <div class="group-close-open row">
            <v-col cols="12" sm="10">
                <span style="font-size:14px;">{{question.NAME_QUESTION != '' ? question.NAME_QUESTION: 'CÂU HỎI'}}</span>
            </v-col>
            <v-col  cols="12" sm="2" style="text-align:right;">
                <span class="btn-open-close btn-open" v-if="open == true" @click="closeOpen(false)"><v-icon>mdi-plus</v-icon></span>
                <span class="btn-open-close btn-close" v-else @click="closeOpen(true)"><v-icon>mdi-minus</v-icon></span>
            </v-col>
            
        </div>
        <v-text-field
            name="question"
            label="CÂU HỎI"
            prepend-icon="mdi-comment-question-outline"
            append-icon="mdi-check"
            v-model="question.NAME_QUESTION"
            :disabled="disabled"
            @click:append="CreateQuestion()"
        ></v-text-field>
        <div class="group-answwer row">
        <v-col cols="12" sm="6" v-for="(item,i) in answers" :key="i">
            <v-radio :label="item.NAME_ANWSER" :value="item.UUID_ANSWER"></v-radio>
        </v-col>
        </div>
        <v-text-field
            name="answer"
            label="CÂU TRẢ LỜI"
            prepend-icon="mdi-forum"
            append-icon="mdi-check"
            v-model="answer.NAME_ANWSER"
            v-if="addQuestion == true"
            @click:append="CreateAnswer()"
        ></v-text-field>
        
    </v-col>
</template>

<script>
import {mapGetters} from 'vuex'
import axios from 'axios'
import uuid from 'uuid'
import { async } from 'q';
export default {
    computed:{
        ...mapGetters([ "BASE_URL"])
    },
    data()
    {
        return {
            message: {
                type: null,
                text: null
            },
            question: {
                UUID_QUESTION: uuid.v4(),
                NAME_QUESTION: ''
            },
            answers: [],
            answer: {
                UUID_QUESTION: '',
                UUID_ANWSER: uuid.v4(),
                NAME_ANWSER: ''
            },
            disabled: false,
            open: true,
            addQuestion: false
            
        }
    },
    methods: {
        CreateQuestion()
        {
            console.log(this.question)
            axios.post(this.BASE_URL+"question",this.question)
            .then((response) => {
                this.message.type = 'success'
                this.message.text = 'Bạn vừa thêm một câu hỏi mới!'
                this.answer.UUID_QUESTION = this.question.UUID_QUESTION
                this.disabled = this.addQuestion = true
            }).catch((error) => {
                this.message.type = 'error'
                this.message.text = 'Lỗi! Xin vui lòng thử lại!'
            })
        },
        CreateAnswer()
        {

            console.log(this.answer)
            axios.post(this.BASE_URL+"answer",this.answer)
            .then(async (response) => {
                this.message.type = 'success'
                this.message.text = 'Bạn vừa thêm một câu trả lời mới!'
               await this.answers.push(response.data)
                console.log(this.answers)
                this.answer.UUID_ANWSER = await uuid.v4()
                this.answer.NAME_ANWSER = await ''

            }).catch((error) => {
                this.message.type = 'error'
                this.message.text = 'Lỗi! Xin vui lòng thử lại!'
            })
        },
        closeOpen(value)
        {
            this.open = value
        }
    }
}
</script>

<style scoped>
.btn-open-close {cursor: pointer;padding: 10px;}
.item-question {border: 1px solid #e2e2e2;margin: 7px 0;}
.item-question.active {height: 68px;overflow: hidden;;}
</style>