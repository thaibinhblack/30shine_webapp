<template>
    <v-dialog
        v-model="dialog"
        scrollable fullscreen 
        persistent :overlay="false"
        max-width="500px"
        transition="dialog-transition">
        <v-card>
            <v-text-field
                name="PHONE"
                label="SỐ ĐIỆN THOẠI"
                prepend-icon="mdi-phone"
                disabled=""
            ></v-text-field>
            <span>CHI NHÁNH</span>
            <v-text-field
                name="NAME_STORE"
                label="label"
                value="value"
                single-line
            ></v-text-field>
        </v-card>
    </v-dialog>
</template>