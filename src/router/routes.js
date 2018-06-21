import Routes from 'vue-routisan'
import store from './../store/'

// resolver

Routes.setViewResolver(path => () => import(`./../${path}`))

// guards
const guest = (to, from, next) => {

    const user = store.getters['user/user']

    if(user === null) {
        next()
    } else {
        next('/profile')
    }

}

const authenticated = (to, from, next) => {

    const user = store.getters['user/user']

    if(user === null) {
        next('/auth')
    } else {
        next()
    }

}

// redirects
Routes.redirect('/home', '/')

// routes
Routes.view('/', 'pages/home').name('home')

Routes.view('/event/:id', 'pages/event').name('event')

Routes.view('/auth', 'pages/auth').options({
    name: 'auth',
    guard: guest
})

Routes.group({ beforeEnter: authenticated }, () => {
    Routes.view('/profile', 'pages/profile').name('profile')
    Routes.view('/events', 'pages/events').name('events')
})

Routes.view('/profile', 'pages/profile').options({
    name: 'profile',
    guard: authenticated
})

export default Routes.all()
