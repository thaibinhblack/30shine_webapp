<template>
    <v-text-field
        style="margin-top: 15px;"
        name="country"
        label="QUẬN / HUYỆN"
        prepend-icon="mdi-map-marker"
        append-icon="mdi-update"
        v-model="item.NAME_COUNTRY"
        @click:append="updateCountry(item)"
    ></v-text-field>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex';
export default {
    props: ["item"],
    methods: {
        ...mapActions(["commitMessage"]),
        updateCountry(item){
            axios.put("http://127.0.0.1:8000/api/v1/country/"+item.UUID_COUNTRY,{
                NAME_COUNTRY: item.NAME_COUNTRY
            }).then((response) => {
                this.commitMessage({type: 'success', text: 'Cập nhật "'+ item.NAME_COUNTRY + '" thành công!'})
            }).catch((error) => {
                this.commitMessage({type: 'error', text: 'Lỗi! Xin vui lòng thử lại!'})
            })
        }
    }
}
</script>