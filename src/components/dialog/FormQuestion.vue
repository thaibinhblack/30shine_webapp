<template>
    <v-dialog
        v-model="getDialogQuestion"
        persistent
        max-width="650px">
        <v-card class="card-question">
            <v-form>
                <v-alert :type="message.type" v-if="message.text != null" :value="true" style="width: 100%">
                    {{message.text}}
                </v-alert>
                <v-card-title primary-title>
                    FORM TẠO CÂU HỎI <span  class="btn-add-question" @click="numberQuestion++"><v-icon>mdi-plus</v-icon></span> 
                </v-card-title>
                <v-container>
                    <v-row>
                        <item-question v-for="i in numberQuestion" :key="i" />
                    </v-row>
                </v-container>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text @click="commitDialogQuestion(false)">Close</v-btn>
                    <v-btn color="blue darken-1" text type="reset"  @click="numberQuestion = 0 ">Reset</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
        
    </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    computed: {
        ...mapGetters(["getDialogQuestion"])
    },
    data()
    {
        return {
            numberQuestion: 1
        }
    },
    components: {
        'item-question': require('@/components/dialog/ItemQuestion.vue').default
    },
    methods: {
        ...mapActions(["commitDialogQuestion"])
    }
}
</script>

<style  scoped>
.card-question {padding: 25px;}
.btn-add-question {cursor: pointer;margin-left: 15px;padding: 5px;}
</style>