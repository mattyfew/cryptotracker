import React, { Component } from 'react'
// import { Link } from 'react-router'

class App extends Component {

  render() {
    const children = React.cloneElement(this.props.children)
    return (
      <div>
        <main>
          { children }
        </main>
      </div>
    )
  }
}

export default App
