<template>
    <v-col cols="12" sm="6">
        <v-text-field
            name="name_room"
            label="TÊN PHÒNG"
            append-icon="mdi-check"
            v-model="room.NAME_ROOM"
            :disabled="disabled"
            @click:append="addRoom()"
            required
        ></v-text-field>
    </v-col>
</template>

<script>
import uuid from 'uuid'
import axios from 'axios'
export default {
    props: ["UUID_STORE"],
    data()
    {
        return{
            room: {
                UUID_ROOM: uuid.v4(),
                UUID_STORE: this.UUID_STORE,
                NAME_ROOM: ''
            },
            disabled: false
        }
    },
    methods:
    {
         addRoom()
        {
            axios.post("http://127.0.0.1:8000/api/v1/room",this.room)
            .then((response) => {
                console.log(response.data)
                this.disabled = true
            })
            
        },
    }
}
</script>