<template>
<v-slide-group
    
    class="pa-4"
    active-class="success"
    show-arrows
    >
    <v-slide-item
        v-for="(stylist,i) in stylists"
        :key="i"
        v-slot:default="{ active, toggle }"
    >
        <div class="item-stylist" @click="commitStylist(stylist)"> 
            <v-card
            class="ma-2 avtar-stlylist"
            height="90"
            width="90"
            @click="toggle">
                <img :src="stylist.avatar" />
            </v-card>
            <span>{{stylist.name}}</span>
        </div>
    </v-slide-item>
</v-slide-group>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data(){
        return {
            stylists: [
                {
                    id: 1,
                    name: 'THÁI BÌNH',
                    avatar: 'https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.0-9/51616984_1085308531669390_369459533547831296_n.jpg?_nc_cat=111&_nc_oc=AQmFJBOBK7n2O7H7nRqDldS2UWwj3GdIZg9Wo0wT40bid1bp-_5sOtb-fIpsxxOkBnE&_nc_ht=scontent.fsgn3-1.fna&oh=991613332d3bf7a2ba138f41aafa1af1&oe=5DCD78E2',
                },
                {
                    id: 2,
                    name: 'THÁI BẢO',
                    avatar: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.0-9/41580126_2213384928879877_2322036406014181376_n.jpg?_nc_cat=103&_nc_oc=AQmZZjC6ebJCqy1tueXnnQls3c6Lgs4nticmX9kYsY3Pmc2mJhsRDSSO6Fz1idNAht4&_nc_ht=scontent.fsgn4-1.fna&oh=8c760ae7c391b0097031dccc186c01b4&oe=5DDD17D8',
                },
                {
                    id: 3,
                    name: 'THỦY TIÊN',
                    avatar: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.0-9/30657007_982069108623666_739797559706386432_n.jpg?_nc_cat=100&_nc_oc=AQmUBddp-kQH2NMlg5WtvrDoZufzW4F0-pLOxHwfoqQznY4i8o6ydxv9kvCj82U1l3w&_nc_ht=scontent.fsgn4-1.fna&oh=49b4731fe1c6cd40f79dd87c548e2cc4&oe=5E1338DC'
                },
                 {
                    id: 4,
                    name: 'THÁI BÌNH',
                    avatar: 'https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.0-9/51616984_1085308531669390_369459533547831296_n.jpg?_nc_cat=111&_nc_oc=AQmFJBOBK7n2O7H7nRqDldS2UWwj3GdIZg9Wo0wT40bid1bp-_5sOtb-fIpsxxOkBnE&_nc_ht=scontent.fsgn3-1.fna&oh=991613332d3bf7a2ba138f41aafa1af1&oe=5DCD78E2',
                },
                {
                    id: 5,
                    name: 'THÁI BẢO',
                    avatar: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.0-9/41580126_2213384928879877_2322036406014181376_n.jpg?_nc_cat=103&_nc_oc=AQmZZjC6ebJCqy1tueXnnQls3c6Lgs4nticmX9kYsY3Pmc2mJhsRDSSO6Fz1idNAht4&_nc_ht=scontent.fsgn4-1.fna&oh=8c760ae7c391b0097031dccc186c01b4&oe=5DDD17D8',
                },
                {
                    id: 6,
                    name: 'THỦY TIÊN',
                    avatar: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.0-9/30657007_982069108623666_739797559706386432_n.jpg?_nc_cat=100&_nc_oc=AQmUBddp-kQH2NMlg5WtvrDoZufzW4F0-pLOxHwfoqQznY4i8o6ydxv9kvCj82U1l3w&_nc_ht=scontent.fsgn4-1.fna&oh=49b4731fe1c6cd40f79dd87c548e2cc4&oe=5E1338DC'
                },
                 {
                    id: 1,
                    name: 'THÁI BÌNH',
                    avatar: 'https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.0-9/51616984_1085308531669390_369459533547831296_n.jpg?_nc_cat=111&_nc_oc=AQmFJBOBK7n2O7H7nRqDldS2UWwj3GdIZg9Wo0wT40bid1bp-_5sOtb-fIpsxxOkBnE&_nc_ht=scontent.fsgn3-1.fna&oh=991613332d3bf7a2ba138f41aafa1af1&oe=5DCD78E2',
                },
                {
                    id: 2,
                    name: 'THÁI BẢO',
                    avatar: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.0-9/41580126_2213384928879877_2322036406014181376_n.jpg?_nc_cat=103&_nc_oc=AQmZZjC6ebJCqy1tueXnnQls3c6Lgs4nticmX9kYsY3Pmc2mJhsRDSSO6Fz1idNAht4&_nc_ht=scontent.fsgn4-1.fna&oh=8c760ae7c391b0097031dccc186c01b4&oe=5DDD17D8',
                },
                {
                    id: 3,
                    name: 'THỦY TIÊN',
                    avatar: 'https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.0-9/30657007_982069108623666_739797559706386432_n.jpg?_nc_cat=100&_nc_oc=AQmUBddp-kQH2NMlg5WtvrDoZufzW4F0-pLOxHwfoqQznY4i8o6ydxv9kvCj82U1l3w&_nc_ht=scontent.fsgn4-1.fna&oh=49b4731fe1c6cd40f79dd87c548e2cc4&oe=5E1338DC'
                }
            ]
        }
    },
    methods: 
    {
        ...mapActions(["commitStylist"])
    }
}
</script>

<style scoped>
.item-stylist {background: transparent !important;text-align: center;position: relative;}
.item-stylist.success::after{content: '';position: absolute;width: 23px;height: 23px;background-image:url('https://image.shutterstock.com/image-vector/green-check-mark-icon-box-260nw-536858419.jpg');top: 0;left:0;background-size:cover; }
.item-stylist span {text-transform: uppercase}
.avtar-stlylist {border-radius: 50%;}
.avtar-stlylist:focus {border:none}
.avtar-stlylist img{border-radius: 50%;width: 100%;height: 100%;}
</style>