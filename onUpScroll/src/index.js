import React, { Component, useState } from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
// import $ from 'jquery'

const PAGE_SIZE = 10
const PAGE_NO = 1

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            txt: '这是一个新的不同的哎哎哎啊沙发沙发上发顺丰所发生的',
            arrAll: [],
            arr: [],
            pageSize: PAGE_SIZE,
            pageNo: PAGE_NO
        }
    }

    handleChange = e => {
        this.setState({
            value: e.target.value.trim()
        })
    }

    handleClk = _ => {
        const { value, txt } = this.state

        const selectionColor = `background: yellow; border-radius: 2px`

        this.setState({
            txt: txt.replace(/<[^\>]*>/g, '')   // 选取消之前选中的
                    .replace(value, `<span style="${selectionColor}">${value}</span>`)
        })
    }

    handleScroll = _ => {
        const targetDom = this.refs.scroll
        const offsetTop = targetDom.scrollTop
        const offsetLeft = targetDom.scrollLeft
        console.log(offsetTop, 'top')
        // 距窗口div顶5px加载更多数据
        if (offsetTop <= 5) {
            this.fetchMore()
        }
    }

    fetchMore = _ => {
        let { pageNo, pageSize, arrAll } = this.state
        const scroll = this.refs.scroll
        console.log(pageNo, 'pageNo')
        if(pageNo === arrAll.length / pageSize) {
            return
        }
        
    }

    componentDidMount() {
        const arrAll = this.createRandomTxt()
        const { pageNo, pageSize } = this.state
        this.setState({ 
            arrAll,
            arr: arrAll.slice(0, pageNo * pageSize)
         }, () => {
             this.refs.scroll.scrollTop = this.refs.scroll.scrollHeight
         })
    }

    createRandomTxt = _ => {
        const l = 100
        const arrAll = []
        for(let i = 0; i < l; i++) {
            arrAll.push(`${l - i}: safas`)
        }
        return arrAll
    }

    renderRecordTxt = _ => {
        const { arr } = this.state
        if(!arr.length) {
            return
        }
        return arr.reverse().map(item => {
            return <div>{ item }</div>
        })
    }

    render() {
        console.log(this.state)
        const { txt } = this.state
        const scrollStyle = {
            border: '1px solid red',
            height: 100,
            // width: 200,
            overflowY: 'scroll',
            wordWrap: 'break-word'

        }
        const scrollProps = {
            id: 'scroll',
            ref: 'scroll',
            style: scrollStyle,
            onScroll: this.handleScroll,
        }
        return (
            <div>
                <div>
                    <input onChange={this.handleChange} />
                    <button onClick={this.handleClk}>查询</button>
                    <div dangerouslySetInnerHTML = {{ __html:txt }}>
                    </div>
                </div>
                <div {...scrollProps}>
                {
                    this.renderRecordTxt()
                }
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <AppContainer>
        <App />
    </AppContainer>
    ,
    document.getElementById('root')
)
if (module.hot) {
    module.hot.accept()
}