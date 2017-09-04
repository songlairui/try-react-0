import React from 'react'
import './topNav.css'

class TopNav extends React.Component {
  constructor() {
    super()
    this.toggleView = this.toggleView.bind(this)
    this.state = {
      someKey: 'someValue',
      expanded: false
    }
  }

  toggleView(boolean) {
    this.setState((prevState, props) => ({
      expanded: typeof boolean === 'boolean' ? boolean : !prevState.expanded 
    }))
  }

  render() {
    return (
      <div className={this.state.expanded? 'top-bar expanded':'top-bar'}>
        <div className="sticky" onClick={this.toggleView}>
          <div className="title">
            {this.state.someKey || 'Resume'}
          </div>
        </div>
        <nav>
          <ul>
            <li>Personal Info</li>
            <li onClick={()=>this.toggleView(false)}>Protoinfo</li>
            <li onClick={()=>this.toggleView(true)}>Works</li>
            <li>Wished</li>
          </ul>
        </nav>
      </div>
    )
  }

  componentDidMount() {
    this.setState({ someKey: '' })
  }
}

export default TopNav
