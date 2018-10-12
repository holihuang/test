import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import Demo from '../components/ui/Index';

function Index(props) {

    const demoProps = {

    }

    return (
        <div>
            hello world
            <Demo { ...demoProps } />
        </div>
    )
}

const getState = state => state
const selectors = createSelector([getState], state => state)

export default connect(selectors)(Index)