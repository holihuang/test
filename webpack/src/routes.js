import Main from './containers/Main'
import Index from './containers/Index'

const routes = {
    path: '/',
    component: Main,
    indexRoute: {
        component: Index,
        onEnter: () => {}
    },
    childRoutes: [{

    }]
}

export default routes