<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent light hide-overlay  max-width="800px" style="z-index: 99999">
      <v-card light>
        <v-card-title>
          <span class="headline">Câu hỏi khảo sát </span>
        </v-card-title>
        <v-card-text>
          <v-container>
              <item-question v-for="(question,i) in questions" :key="i" :check="i" @updateCheck="updateCheck" :question="question"/>
          </v-container>
        
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="$emit('updateDialog',false)">Close</v-btn>
          <v-btn color="blue darken-1" text @click="SubmitQuestion()">Xác Nhận</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
  export default {
      props: ["dialog"],
    components:
    {
         'item-question': () => import('@/components/manager/question/ItemQuestion.vue'),
    },
    data: () => ({
      questions: [],
      check: []
    }),
    computed:{
        ...mapGetters(["BASE_URL", "getUUID"])
    },
    methods: {
        ApiGetQuestion()
        {
            axios.get(this.BASE_URL + 'question')
            .then((response) => {
                this.questions = response.data
                console.log(response.data)
            })
        },
        updateCheck(i,value)
        {
            this.check[i] = value
            console.log(this.check)
        },
        SubmitQuestion()
        {
          console.log(this.getUUID, this.check)
          axios.post(this.BASE_URL + 'user-question', {
            'UUID_BOOKING' : this.getUUID,
            'UUID_ANWSER' : this.check
          }).then((response) => {
            console.log(response.data)
            axios.put(this.BASE_URL + 'booking/'+this.getUUID+'?type=question')
            .then(() => {
              this.$emit('updateDialog',false)
            })
            
          })

        }
    },
    created()
    {
        this.ApiGetQuestion()
    }
  }
</script>

<style>
.row.item-question>div {padding: 0 !important}
</style>