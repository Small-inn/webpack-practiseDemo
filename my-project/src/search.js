document.write('search')

import React from 'react'
import ReactDom from 'react-dom'
import './search.less'
import logo from './images/logo.jpg'

class Search extends React.Component {
  render() {
    return (
      <div className="search-text">
        Search Text <img src={logo} />
      </div>
    )
  }
}

ReactDom.render(<Search />, document.getElementById('root'))
