import React from 'react'
import './selectedWorks.css'

import AddWork from './dashboard/addWork'

import * as api from '~/api/request.js'

const displayWorks = (state = { works: [] }, action) => {
  switch (action.type) {
    case 'addOne':
      if (action.data) {
        state.works.push(action.data)
      }
      break
    case 'addBatch':
      if (action.data) {
        state.works.push(...action.data)
      }
      break
    case 'removeOne':
      if (action.data.title) {
        let idx = state.works
          .map(({ title }) => title)
          .indexOf(action.data.title)
        idx !== -1 && state.works.splice(idx, 1)
      }
      break
    case 'clear':
      state.works = []
      break
    case 'reload':
      break
    default:
  }

  return state
}

class SelectedWorks extends React.Component {
  constructor() {
    super()
    this.state = Object.assign(
      {
        someKey: 'someValue',
        addNew: false
      },
      displayWorks(undefined, {})
    )
    this.removeOne = this.removeOne.bind(this)
    this.toggleNew = this.toggleNew.bind(this)
  }

  dispatch(action) {
    this.setState(prevState => displayWorks(prevState, action))
  }
  addOne(work) {
    console.info('during dispatch', this)
    this.dispatch({
      type: 'addOne',
      data: work
    })
  }
  addBatch(works) {
    this.dispatch({
      type: 'addBatch',
      data: works
    })
  }
  removeOne() {
    this.dispatch({
      type: 'removeOne',
      data: {
        title: '第2'
      }
    })
  }

  toggleNew() {
    this.setState(prevState => ({
      addNew: !prevState.addNew
    }))
  }

  render() {
    return (
      <div className="works">
        <h1>
          Selected Works{' '}
          <span href="#" className="btn addNew" onClick={this.toggleNew}>
            {' '}+{' '}
          </span>
        </h1>
        <ul>
          {this.state.works.map((work, idx) => {
            return (
              <li key={idx}>
                <div className="thumb">
                  <img src={work.screenshot} alt="thumb" />
                </div>
                <div className="detail">
                  <div className="name">
                    {work.name}
                  </div>
                  <div className="time">
                    {[].concat(work.time).join('-')}
                  </div>
                  <div className="description">
                    {work.description}
                  </div>
                  <div className="admin">
                    <ul className="nav">
                      <li className="btn" onClick={this.removeOne}>
                        1
                      </li>
                      <li className="btn">2</li>
                      <li className="btn">3</li>
                      <li className="btn">4</li>
                    </ul>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        {this.state.addNew && <AddWork onToggle={this.toggleNew} />}
        <p>
          {this.state.someKey}
        </p>
      </div>
    )
  }

  componentDidMount() {
    this.addOne({
      title: '第一',
      id: 111,
      screenshot: './screenshot/amarpack.png',
      skills: ['react', 'es6'],
      time: [2016, 2017, 2016.6],
      description: '个人简历可以做成使用react',
      备注: '可以改进的地方，必须改进的地方。 个人项目中，添加test用例，或demo页面，能够在线演示。如，当需要后端执行node程序时怎么办？'
    })
    this.addOne({
      title: '第2',
      id: 222,
      screenshot: '',
      skills: ['js', 'es6'],
      time: [2016, 2017, 2016.6],
      description: '大脑中运行javascript，是写js快感的起点。 '
    })
    this.addOne({
      title: '第3',
      id: 333,
      screenshot: '',
      skills: ['db', 'es6'],
      time: [2016, 2017, 2016.6],
      description: '数据库，不仅仅是数据库。设计数据结构，是从0开始必然遇到的内容。'
    })
    // console.info('getWorkList', api.getWorkList)
    api.getWorkList().then(results => {
      console.info('didmount', results)
      this.addBatch(results)
    })
  }
}

export default SelectedWorks
