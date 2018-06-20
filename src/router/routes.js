import Routes from 'vue-routisan'
import store from './../store/'

// resolver

Routes.setViewResolver(path => () => import(`./../${path}`))

// routes
Routes.view('/', 'pages/home')

Routes.view('/profile', 'pages/profile')

export default Routes.all()
