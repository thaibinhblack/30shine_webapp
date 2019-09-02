import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

function loadView(view) {
    return () => import(/* webpackChunkName: "view-[request]" */ `@/page/${view}.vue`)
}
function loadComponent(view) {
    return () => import(/* webpackChunkName: "view-[request]" */ `@/components/${view}.vue`)
}

const routes = [
    {
        path: '/',
        component:  loadView('Index')
    },
    {
        path: '/form-booking',
        component: loadView('FormBooking')
    },
    {
        path: '/booking-done',
        component: loadView('StepDone')
    },
    {
        path: '/manager',
        component: loadView('Manager'),
        children: [
            {
                path: 'bookings',
                component: loadComponent('manager/Bookings')
            },
            {
                path: 'add-store',
                component: loadComponent('manager/AddStore')
            },
            {
                path: 'services',
                component: loadComponent('manager/Services')
            },
            {
                path: 'questions',
                component: loadComponent('manager/question/DataQuestion')
            },
            {
                path: 'booking/:uuid',
                component: loadView('Manager/booking/DetailBooking')
            },
            {
                path: 'users',
                component: loadView('Manager/user/ListUser')
            },
            {
                path: 'add-user',
                component: loadView('Manager/user/AddUser')
            },
            {
                path: 'user/:uuid',
                component: loadView('Manager/user/DetailUser')
            }
        ]
    },
    {
        path: '/login',
        component: loadView('Login')
    }
]

export default new VueRouter({
    routes: routes,
    mode: 'history'
})