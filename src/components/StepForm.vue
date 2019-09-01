<template>
    <v-stepper-header>
      <v-stepper-step
        :complete="getStep >= 1 && getStep < 3"
        :editable="getStep >= 1 && getStep < 3"
        step="1"
      >
       CHỌN KHU VỰC
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="getStep >= 2  && getStep < 3"
        :editable="getStep >= 2  && getStep < 3"
        step="2"
      >CHỌN DỊCH VỤ</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
       
        step="3"
      >
        HOÀN THÀNH
      </v-stepper-step>
    </v-stepper-header>
   

  
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed:{
      ...mapGetters(["getStep"])
    },
    methods:{
        updateStep(value)
        {
            this.$emit("updateStep",value)
        }
    }
}
</script>

<style scoped>
.step-form {width: 100%;}
</style>