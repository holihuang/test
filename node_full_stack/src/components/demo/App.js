import React from 'react'
import { Button, Table } from 'antd'

import Request from '../../common/request'
import Constants, {ON_GET_INFO_LIST_REQUESTED} from '../../constants/home'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
        }
    }

    handleClick = async () => {
        // const opt = {}
        // const result = await Request.post({
        //     url: 'http://localhost:3000/api/btn/btnJson.json',
        //     data: opt,
        // })
        //
        // const { data } = result
        //
        // this.setState({
        //     list: data
        // })
        console.log(this.props, 'props')
        const { dispatch } = this.props
        dispatch({
            type: Constants.ON_GET_INFO_LIST_REQUESTED,
            payload: {
                params: {}
            }
        })
    }

    render() {
        const { list } = this.state
console.log(this.props, 'app_props')
        const btnProps = {
            onClick: this.handleClick,
        }

        const tableProps = {
            dataSource: list,
            columns: [{
                title: '代码',
                dataIndex: 'code',
                key: 'code',
            }, {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            }, {
                title: '日期',
                dataIndex: 'date',
                key: 'date',
            }],
        }

        return (
            <div>
                <Button {...btnProps}>点击一下</Button>
                <Table {...tableProps}/>
            </div>
        )
    }
}

export default App