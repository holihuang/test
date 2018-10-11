import React from 'react'
import { Router } from 'react-router'
import routes from './routes'

const AppRouter = props => (<Router routes={routes} history={props.history} />)

export default AppRouter