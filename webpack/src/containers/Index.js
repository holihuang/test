import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

function Index(props) {
    return (
        <div>hello world</div>
    )
}

const getState = state => state
const selectors = createSelector([getState], state => state)

export default connect(selectors)(Index)