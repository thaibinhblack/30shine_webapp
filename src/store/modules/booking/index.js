import * as firebase from 'firebase'
import moment  from 'moment'
const state = {
    phone: null,
    address: null,
    service: null,
    timebooking: null,
    dateBooking: new Date(),
    location: {
        province: null,
        country: null
    },
    store: null,
    code: null,
    times: [
        {time: '8:00', slot: false, value: 8},
        {time: '9:00', slot: false, value: 9},
        {time: '10:00', slot: false, value: 10},
        {time: '11:00', slot: false, value: 11},
        {time: '12:00', slot: false, value: 12},
        {time: '13:00', slot: false, value: 13},
        {time: '14:00', slot: false, value: 14},
        {time: '15:00', slot: false, value: 15},
        {time: '16:00', slot: false, value: 16},
        {time: '17:00', slot: false, value: 17},
        {time: '18:00', slot: false, value: 18},
        {time: '19:00', slot: false, value: 19},
        {time: '20:00', slot: false, value: 20},
        {time: '21:00', slot: false, value: 21}
    ],
    now: false,
    overlayBooking: false,
    stylist: null,
    uuid: null,
    today: moment(new Date()).format('DD-MM-YYYY'),
    UUID_ROOM: null,
    step: 1,
    checkBooking: false,
    todayRoom: true
}

const getters = {
    getPhone: (state) => {
        return state.phone
    },
    getAddress: (state) => {
        return state.address
    },
    getService: (state) => {
        return state.service
    },
    getTimeBooking: (state) => {
        return state.timebooking
    },
    getDateBooking: (state) => {
        return state.dateBooking
    },
    getLocation: (state) => {
        return state.location
    },
    getStore: (state) => {
        return state.store
    },
    getCode: (state) => {
        return state.code
    },
    getTimes: (state) => {
        return state.times
    },
    getNow: (state) => {
        return state.now
    },
    getOverlayBooking: (state) => {
        return state.overlayBooking
    },
    getStylist: (state) => {
        return state.stylist
    },
    getUUID: (state) => {
        return state.uuid
    },
    getUUID_ROOM: (state) => {
        return state.UUID_ROOM
    },
    getStep: (state) => {
        return state.step
    },
    getCheckBooking: (state) => {
        return state.checkBooking
    },
    getTodayRoom: (state) => {
        return state.todayRoom
    }
}

const mutations = {
    updatePhone: (state,payload) => {
        state.phone = payload
    },
    updateAddress: (state,payload) => {
        state.address = payload
    },
    updateService: (state,payload) => {
        state.service = payload
    },
    updateTimeBooking: (state,payload) => {
        state.timebooking = payload
    },
    updateDateBooking: (state,payload) => {
        state.dateBooking = payload
    },
    updateLocation: (state,payload) => {
        state.location = payload
    },
    updateStore: (state,payload) => {
        state.store = payload
    },
    updateCode: (state,payload) => {
        state.code = payload
    },
    updateTimes: (state,times) => {
        state.times = times
    },
    updateNow: (state,payload) => {
        state.now = payload
    },
    updateStylist: (state,payload) => {
        state.stylist = payload
    },
    updateUUID: (state,payload) => {
        state.uuid = payload
    },
    addDataFirebase: (state,payload) => {
        if(payload.action == 1)
        {
            firebase.database().ref('booking/'+state.phone+'/'+state.today).set({
                created_at: moment(new Date()).format('hh:mm:ss, DD-MM-YYY')
            })
        }
        else if(payload.action == 2)
        {
            firebase.database().ref('booking/'+state.phone+'/'+state.today).update({
                province: state.location.province,
                country: state.location.country,
                store: state.store,
                action: 1
            })
        }
        else if(payload.action == 3)
        {
            firebase.database().ref('booking/'+state.phone+'/'+state.today).update({
                action: 2,
                services: state.service,
                stylist: state.stylist,
                code: state.code    
            })
        }
    },
    updateUUID_ROOM: (state,payload) => {
        state.UUID_ROOM = payload
    },
    updateStep: (state,payload) => {
        state.step = payload
    },
    updateCheckBooking: (state,payload) => {
        state.checkBooking = payload
    },
    updateTodayRoom: (state,payload) => {
        state.todayRoom = payload
    }
}

const actions = {
    commitPhone: ({commit},payload) => {
        commit("updatePhone",payload)
    },
    commitAddress: ({commit},payload) => {
        commit("updateAddress",payload)
    },
    commitService: ({commit},payload) => {
        commit("updateService",payload)
    },
    commitTimeBooking: ({commit},payload) =>
    {
        commit("updateTimeBooking",payload)
    },
    commitDateBooking: ({commit},payload) => {
        commit("updateDateBooking",payload)
    },
    commitLocation: ({commit},payload) => {
        commit("updateLocation",payload)
    },
    commitStore: ({commit},payload) => {
        commit("updateStore",payload)
    },
    commitCode: ({commit},payload) => {
        commit("updateCode",payload)
    },
    commitTimes: ({commit},times) => {
        commit("updateTimes",times)
    },
    commitNow: ({commit},now) => {
        commit("updateNow",now)
    },
    commitStylist: ({commit},stylist) => {
        commit("updateStylist",stylist)
    },
    commitUUID: ({commit},payload) => {
        commit("updateUUID",payload)
    },
    commitDataFirebase: ({commit},payload) => {
        commit("addDataFirebase",payload)
    },
    commitUUID_ROOM: ({commit},payload) => {
        commit("updateUUID_ROOM",payload)
    },
    commitStep: ({commit},payload) => {
        commit("updateStep",payload)
    },
    commitCheckBooking: ({commit},payload) => {
        commit("updateCheckBooking",payload)
    },
    commitTodayRoom: ({commit},payload) => {
        commit("updateTodayRoom",payload)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}