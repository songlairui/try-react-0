import React from 'react'

// import { Button } from 'antd'
// import Button from 'antd/lib/button'

import './addWork.css'

// import api from '~/api/request.js'
import * as api from '~/api/request.js'
// import * as api from '../../api/request.js'

class AddWork extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '标题',
      description: '描述',
      someKey: 'someValue'
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.clickBg = this.clickBg.bind(this)
    this.addNewWork = this.addNewWork.bind(this)
    this.timer = null
  }
  clickBg(e) {
    if (e.target === e.currentTarget) {
      // console.info('bg clicked')
      this.props.onToggle()
    }
  }
  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  addNewWork() {
      const parent = this._reactInternalInstance._currentElement._owner._instance
      // console.log(parent, this._reactInternalInstance._currentElement)
    // return
      api.addNewWork(this.state).then(({ err, result, state }) => {
      if (err) {
        console.error(err)
      } else {
        parent.addOne(state)
        console.info(state, result, parent)
      }
    })
  }
  render() {
    return (
      <div className="addNewModal" onClick={this.clickBg}>
        <div className="addNewForm">
          <span className="thumb">图片</span>
          <div className="input-group">
            <input
              type="text"
              name="title"
              className="title"
              placeholder={this.state.title}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="input-group">
            <textarea
              type="text"
              name="description"
              className="description"
              placeholder={this.state.description}
              onChange={this.handleInputChange}
            />
          </div>
          <button className="add" onClick={this.addNewWork}>
            Add
          </button>
          <div className="closeBtn" onClick={this.props.onToggle} />
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.setState({ someKey: '添加一个work' })
    // this.timer = setInterval(() => {
    //   console.info(this.state)
    // }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    console.info('已消除计时器')
  }
}

export default AddWork
