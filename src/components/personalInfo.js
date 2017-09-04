import React from 'react'
import './personalInfo.css'

function Avatar(props) {
  return (
    <div className="avatar">
      <div className="img">
        <img src={props.me.avatarUrl} alt={props.me.name} className="Avatar" />
      </div>
      <div className="meta">
        <div className="user-name">
          {props.me.name}
        </div>
        <div className="intro">
          {props.me.introduction}
        </div>
      </div>
    </div>
  )
}

class PersonalInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      someKey: 'someValue',
      me: {
        avatarUrl: './figure.jpg',
        name: 'Songlairui',
        introduction: '前端工程师'
      }
    }
  }

  render() {
    return (
      <div className="personal-info">
        <Avatar me={this.state.me} />
        <div className="detail">
          <dl>
            <dt>教育经历</dt>
            <dd>材料学硕士 福州大学 2013-2016</dd>
            <dt>个人经历</dt>
            <dd>CET6 477 </dd>
            <dd>较常阅读英文文档</dd>
            <dd><a href="http://gmcm.seu.edu.cn/00/bf/c24a191/page.htm">2014年全国研究生数学建模大赛 二等奖</a></dd>
          </dl>
          {this.state.someKey}
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' })
  }
}

export default PersonalInfo
