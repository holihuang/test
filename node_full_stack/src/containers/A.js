import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

function A(props) {
    return (
        <div>A: sf</div>
    )
}

const getState = state => state
const selectors = createSelector([getState], state => state)

export default connect(selectors)(A)