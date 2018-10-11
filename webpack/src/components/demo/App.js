import React from 'react'
import SearchSelect from '../../commom/SearchSelect'

import flower from '../../images/Tulips.jpg'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {

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

        return (
            <div>
                <SearchSelect { ...searchProps } />
                <img src={flower} />
            </div>
        )
    }
}

export default App