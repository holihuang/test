import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

function Main({ children }) {
    return (
        <div style={{ height: '100%'}}>
            { children }
        </div>
    )
}

Main.defaultProps = {}

const getState = state => state
const selectors = createSelector([getState], state => state)

export default connect(selectors)(Main)
