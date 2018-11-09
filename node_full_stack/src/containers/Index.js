import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import App from '../components/demo/App'

function Index(props) {
    const { dispatch } = props
    const appProps = {
        dispatch
    }

    return (
        <div style={{ padding: '30px' }}>
            hello world
            <App {...appProps} />
        </div>
    )
}

const getState = state => state
const selectors = createSelector([getState], state => state)

export default connect(selectors)(Index)