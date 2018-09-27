import React from 'react'
import ReactDOM from "react-dom"
// import App from './components/demo/App'
import SearchSelect from './commom/SearchSelect'

import style from "./index.css"

const searchProps = {
    list: [{
        label: 'label1',
        value: 1,
    }, {
        label: 'label2',
        value: 2,
    }, {
        label: 'label3',
        value: 3,
    }]
}

ReactDOM.render(<SearchSelect {...searchProps} />, document.getElementById("app"))