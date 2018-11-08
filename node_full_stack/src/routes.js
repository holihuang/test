import Main from './containers/Main'
import Index from './containers/Index'
import A from './containers/A'

const routes = {
    path: '/',
    component: Main,
    indexRoute: {
        component: Index,
        onEnter: () => {}
    },
    childRoutes: [{
        path: 'a',
        component: A,
    }]
}

export default routes