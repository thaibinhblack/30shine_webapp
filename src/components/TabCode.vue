<template>
    <v-row>
        <v-col
        xs="12">
            <v-alert :type="message.type" :value="true" v-if="message.text != null">
                    {{message.text}}
            </v-alert>
            <v-text-field
                name="code"
                label="MÃ KHUYẾN MÃI"
                prepend-icon="mdi-gift-outline"
                append-icon="mdi-check-bold"
                :disabled="disabled"
                v-model="code"
                @click:append="CheckCode()"
            ></v-text-field>
        </v-col>
    </v-row>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    data()
    {
        return {
            message: {
                type: null,
                text: null
            },
            disabled: false
        }
    },
    methods: {
        ...mapActions(["commitCode"]),
        CheckCode()
        {
            if(this.code == 29091996)
            {
                this.message.type = 'success'
                this.message.text = 'Mã khuyến mãi hợp lệ!'
                this.disabled = true
                this.commitCode(this.code)
            }
            else
            {
                this.message.type = 'warning'
                this.message.text = 'Mã khuyến mãi sai!'
            }
        }
    }
}
</script>