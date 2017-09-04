import React from 'react'

import TopNav from './components/topNav'
import PersonalInfo from './components/personalInfo'
import SelectedWorks from './components/selectedWorks'
import './App.css'

class App extends React.Component {
  render() {
    return (
      <div className="laryResume">
        <TopNav />
        <section className="main">
          <PersonalInfo />
        </section>
        <section className="works">
          <SelectedWorks />
        </section>
        <section className="skills">
          <h2>前端</h2>
          <ul>
            <li>express - </li>
            <li>mocha + chai 用例 - sql parser js</li>
          </ul>
          <h2>后端</h2>
          <h2>其他</h2>
        </section>
      </div>
    )
  }
}

export default App
