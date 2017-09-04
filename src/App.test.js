import React from 'react'
import ReactDom from 'react-dom'
import App from './App'

it('无错误渲染', () => {
  const div = document.createElement('div')
  ReactDom.render(<App />, div)
})
