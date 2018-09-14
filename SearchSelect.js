/*
* @file: SearchSelect
* @author: huanghaolei
* @date: 2018-09-06
* */
import React from 'react'
import { Icon } from 'antd'

class SearchSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showDropdown: false,
            searchIptValue: '',
            selected: '',
            searchedList: [],
            iptBorder: '1px solid #bfbfbf',
            searchIptBorder: '1px solid #bfbfbf',
            liBackgroundColor: '',
            liColor: '#333',
            liIndex: 0,
        }
        this.hasClickedIpt = false
    }

    recursion = (...args) => {
        const [component, target] = args

        // 适配childNodes为input，i的标签
        const node = component[0] ? component[0] : component

        if (!node.tagName) return

        if(node === target) {
            this.inComponent = true
        }
        if(node.childNodes) {
            if (node.childNodes.length > 1) {
                Object.keys(node.childNodes).forEach(item => {
                    this.recursion(node.childNodes[item], target)
                })
            } else {
                this.recursion(node.childNodes, target)
            }
        }
    }


    // 区分点击的dom节点是在组件内还是在组件外
    diff = (...args) => {
        const [componentDom, target] = args
        this.inComponent = false  // 默认点击的节点在组件内

        // check in component or out of component
        this.recursion(componentDom, target)

        this.showOrHideDropdowm(target)
    }

    showOrHideDropdowm = target => {
        if (!this.inComponent) {
            this.closeDropDown()
            this.hasClickedIpt = false
        } else {
            const { input, li } = target.dataset
            const { value } = target
            if (input === 'showSelectedOption') {
                if (this.hasClickedIpt) {
                    this.closeDropDown()
                    this.hasClickedIpt = false
                } else {
                    this.showDropDown()
                    this.hasClickedIpt = true
                }
            } else if (li === 'li') {
                if (+value === -1) {
                    return
                }
                this.closeDropDown()
                this.hasClickedIpt = false
                this.select({ value, label: target.innerText })
            }
        }
    }

    select = opt => {
        const { value, label } = opt
        this.setState({
            selected: label,
        })
        this.emit(value, label)
    }

    emit = (...args) => {
        const [value, label] = args
        const { onSelect } = this.props
        console.log({ label, value }, 'selected')
        onSelect({ label, value })
    }

    handlClick = e => {
        this.diff(this.refs.searchSelect, e.target)
    }

    componentDidMount() {
        document.body.addEventListener('click', e => {
            this.handlClick(e)
        })
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', () => {})
    }

    showDropDown = () => {
        this.setState({ showDropdown: true })
    }

    closeDropDown = () => {
        this.setState({ showDropdown: false })
    }

    handlSearched = e => {
        const inputValue = e.target.value.trim()
        const { list } = this.props
        let searchedList = []
        let isHave = false
        if(inputValue.length) {
            list.forEach(item => {
                const { label } = item
                if (label.includes(inputValue)) {
                    isHave = true
                    searchedList.push(item)
                }
            })
            if (!isHave) {
                searchedList = [{
                    label: '无查询结果',
                    value: '-1',
                }]
            }
        } else {
            searchedList = []
        }

        this.setState({
            searchedList,
            searchIptValue: inputValue,
            isHave,
        })
    }

    generateOptionList = () => {
        const { list = [] } = this.props
        const { searchedList = [], isHave, liBackgroundColor, liColor, liIndex } = this.state
        const arr = searchedList.length ? searchedList : list
        return arr.map((item, index) => {
            const { label, value } = item
            const liProps = {
                value: value,
                title: label,
                'data-index': index,
                'data-li': 'li',
                style: {
                    cursor: 'pointer',
                    height: '26px',
                    width: '100%',
                    lineHeight: '26px',
                    disabled: !isHave,
                    borderRadius: '4px',
                    padding: '3px 5px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    backgroundColor: +liIndex === +index ? liBackgroundColor: '',
                    color: +liIndex === +index ? liColor: '#333',
                },
                onMouseEnter: (e) => {
                    const { index } = e.target.dataset
                    this.handleEnter({ isLi: true, liIndex: index })
                },
                onMouseLeave: (e) => {
                    const { index } = e.target.dataset
                    this.handleLeave({ isLi: true, liIndex: index })
                },
            }
            return <li { ...liProps }>{ label }</li>
        })
    }

    handleEnter = opt => {
        const { isSearchIpt = false, isIpt = false, isLi = false, liIndex = 0 } = opt
        let { iptBorder, searchIptBorder, liBackgroundColor, liColor } = this.state
        const { style: { skinColor = '#1890ff' } } = this.props
        if (isIpt) {
            iptBorder = `1px solid ${skinColor}`
        }
        if (isSearchIpt) {
            searchIptBorder = `1px solid ${skinColor}`
        }
        if (isLi) {
            liBackgroundColor = skinColor
            liColor = '#fff'
        }
        this.setState({
            iptBorder,
            searchIptBorder,
            liBackgroundColor,
            liColor,
            liIndex,
        })
    }

    handleLeave = opt => {
        const { isSearchIpt = false, isIpt = false, isLi = false, liIndex = 0 } = opt
        let { iptBorder, searchIptBorder, liBackgroundColor, liColor } = this.state
        if (isIpt) {
            iptBorder = '1px solid #bfbfbf'
        }
        if (isSearchIpt) {
            searchIptBorder = '1px solid #bfbfbf'
        }
        if (isLi) {
            liBackgroundColor = ''
            liColor = '#333'
        }

        this.setState({
            iptBorder,
            searchIptBorder,
            liBackgroundColor,
            liColor,
            liIndex,
        })
    }

    render() {
        const { style: { width = '320px', height = '32px' } } = this.props
        const { showDropdown, searchIptValue, selected, iptBorder, searchIptBorder } = this.state
        const searchIptStyle = {
            display: 'inline-block',
            width: 'calc(100% - 40px)',
            height: height,
            border: 'none',
            outline: 'none',
        }

        const iptProps = {
            'data-specialdom': 1,
            'data-input': 'showSelectedOption',
            placeholder: '请选择',
            value: selected,
            style: {
                ...searchIptStyle,
                width,
                border: iptBorder,
                borderRadius: '4px',
                textIndent: '15px',
                cursor: 'pointer',
            },
            readOnly: true,
            onMouseEnter: () => {
                this.handleEnter({ isIpt: true })
            },
            onMouseLeave: () => {
                this.handleLeave({ isIpt: true })
            }
        }

        const dropDownStyle = {
            width: '100%',
            maxHeight: '300px',
            padding: '10px',
            border: '1px solid #d9d9d9',
            position: 'absolute',
            top: `${height}px`,
            zIndex: '100',
            backgroundColor: '#fff',
            boxShadow: '0 6px 12px rgba(0,0,0,.175)',
            transition: '0.3s ease',
        }

        const searchIptWrapperStyle = {
            height: '100%',
            width: '100%',
            fontSize: '12px',
            lineHeight: 1.5,
            color: 'rgba(0, 0, 0, 0.65)',
            backgroundColor: '#fff',
            position: 'relative',
            border: searchIptBorder,
            borderRadius: '4px',
        }

        const searchIconStyle = {
            display: 'inline-block',
            width: '20px',
            height: '100%',
            position: 'relative',
            left: '4px',
        }



        const searchIptProps = {
            onChange: e => {
                this.handlSearched(e)
            },
            onMouseEnter: () => {
                this.handleEnter({ isSearchIpt: true })
            },
            onMouseLeave: () => {
                this.handleLeave({ isSearchIpt: true })
            },
            value: searchIptValue,
            style: searchIptStyle,
            'data-specialdom': 1,
        }

        const deleteIconStyle = {
            display: 'inline-block',
            width: '20px',
            height: '100%',
            cursor: 'pointer',
        }

        const deleteIconProps = {
            onClick:() => {
                // clear searchIpt, searchedList
                this.setState({
                    searchIptValue: '',
                    searchedList: [],
                })
            },
            style: deleteIconStyle,
        }

        const ulStyle = {
            marginTop: '5px',
        }

        const dropdownIconProps = {
            type: showDropdown ? 'up' : 'down',
            theme: 'outlined',
        }

        const dropDownIconTop = (+height.replace(/\D/g, '') - 21) / 2

        return (
            <div style={{ width: width, height: height, position: 'relative' }} ref="searchSelect">
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <input { ...iptProps } />
                    <span style={{ position: 'absolute', top: `${dropDownIconTop}px`, right: '8px' }}>
                        <Icon {  ...dropdownIconProps } />
                    </span>
                </div>
                {
                    showDropdown ? (
                        <div style={dropDownStyle}>
                            <div style={searchIptWrapperStyle}>
                                <span style={searchIconStyle}>
                                    <Icon type="search" theme="outlined" data-specialdom="1" />
                                </span>
                                <input { ...searchIptProps }  />
                                {
                                    searchIptValue.length ? (
                                        <span { ...deleteIconProps }>
                                            <Icon type="close" theme="outlined" />
                                        </span>
                                    ) : null
                                }
                            </div>
                            <ul style={ulStyle}>{ this.generateOptionList() }</ul>
                        </div>
                    ) : null
                }
            </div>
        )
    }
}

SearchSelect.defaultProps = {
    style: {
        width: '320px',
        height: '32px',
        skinColor: '#1890ff',
    },
    onSelect: () => {},
}

export default SearchSelect
