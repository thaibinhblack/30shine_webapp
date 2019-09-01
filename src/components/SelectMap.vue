<template>
    <div class="row pd0">
        <div class="col-xs-12 col-sm-6 pd15">
            <v-select
                :items="province"
                item-text="NAME_PROVICE"
                item-value="UUID_PROVINCE"
                v-model="checkProvince"
                @change="ApiGetCountry()"
                label="TỈNH / THÀNH PHỐ"
            ></v-select>
        </div>
        <div class="col-xs-12 col-sm-6 pd15">
            <v-select
                :items="country"
                item-text="NAME_COUNTRY"
                item-value="UUID_COUNTRY"
                v-model="checkCountry"
                @change="choseCountry()"
                label="QUẬN / HUYỆN"
            ></v-select>
        </div>
        <v-list row id="list-item">
            <item-data  v-for="(item,i) in salons" :key="i" :index="index"  :item="item" @activeClass="activeClass"/>
        </v-list>
    </div>
</template>

<script>
// Add active class to the current button (highlight it)

import axios from 'axios'
import {mapActions, mapGetters} from 'vuex'
export default {
    components: {
        'item-data': require('./ItemData.vue').default
    },
    computed: {
        ...mapGetters(["BASE_URL"])
    },
    data()
    {
        return {
            province: [],
            country: [],
            checkProvince: null,
            checkCountry: null,
            salons: [],
            check: {},
            active: null,
            index: null,
            location: {
                province: null,
                country: null
            }
            
        }
    },
    methods: {
        ...mapActions(["commitLocation"]),
        ApiGetProvince(){     
            axios.get(this.BASE_URL + "province").then((response) => {
                this.province = response.data
            })
        },
        ApiGetStore()
        {
            axios.get(this.BASE_URL + "store")
            .then((response) => {
                this.salons = response.data
            })
        },
        ApiFilterStore(filter,value)
        {
            axios.get(this.BASE_URL + "store?filter="+filter+"&value="+value)
            .then((response) => {
                this.salons = response.data
                console.log(response.data)
            })
        },
        ApiGetCountry()
        {   
            this.ApiFilterStore('UUID_PROVINCE',this.checkProvince)
             this.location.province = this.province.filter((value,index,array) => {
                return array[index].UUID_PROVINCE == this.checkProvince
            })
            this.commitLocation(this.location)
           axios.get(this.BASE_URL + 'country/'+this.checkProvince+'?type=UUID_PROVINCE')
           .then((response) => {
               this.country = response.data
           })
        },

        activeClass(index)
        {
            this.index = index
        },
        choseCountry()
        {
            console.log(this.checkCountry)
            this.ApiFilterStore('UUID_COUNTRY',this.checkCountry)
            this.location.country = this.country.filter((value,index,array) => {
                return array[index].UUID_COUNTRY == this.checkCountry
            })
            this.commitLocation(this.location)
        }
    },
    created()
    {
        this.ApiGetProvince()
        this.ApiGetStore()
    }
}
</script>

<style scoped>
.pd15 {padding: 15px !important}

</style>