<template>
    <v-col cols="12" sm="12">
        <header-manager :title="'DANH SÁCH CÂU HỎI'" :link="'Danh sách câu hỏi'" :question="true"/>
        <v-card style="padding:25px;" >
           <item-question v-for="(question,i) in questions" :key="i" :manager="true" :question="question"/>
        </v-card>
        <form-question />
    </v-col>
   
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
export default {
    components: {
        'header-manager': () => import('@/components/manager/HeaderManager.vue'),
        'form-question': () => import('@/components/dialog/FormQuestion.vue'),
        'item-question': () => import('@/components/manager/question/ItemQuestion.vue'),
    },
    computed:
    {
        ...mapGetters(["BASE_URL"]),
    },
    data()
    {
        return{
            questions: [],
            answers: [],
            question_answers: []
        }
    },
    methods:
    {
        ApiGetQuestion()
        {
            axios.get(this.BASE_URL + 'question')
            .then((response) => {
                this.questions = response.data
                console.log(response.data)
            })
        },
        
    },
    created()
    {
        this.ApiGetQuestion()
    }
}
</script>