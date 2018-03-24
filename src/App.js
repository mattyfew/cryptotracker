import React, { Component } from 'react'

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
