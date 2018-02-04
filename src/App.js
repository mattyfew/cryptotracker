import React, { Component } from 'react';
import { Link } from 'react-router'
import Radium from 'radium'


const STYLES = {
  nav: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: '8px'
  },
  signIn: {
    backgroundColor: '#fb5e6d',
    borderRadius: '5px',
    color: 'white'
  },
  navText: {
    color: 'white',
    ':hover': {
      color: 'black'
    }
  }
}
// TODO: adapt nav bar to bootstrap 4
// check mobile version
// log in status -> should display more menu items

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const children = React.cloneElement(this.props.children)
    return (
      <div>
        <div className="navbar navbar-default navbar-fixed-top navbar-inverse" style={STYLES.nav}>
          <div className="container-fluid">
            <ul className="nav nav-pills navbar-right">
              <li style={STYLES.signIn}><Link to="/login"><span style={STYLES.navText}>Sign In</span></Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/accounts">Accounts</Link></li>
              <li><Link to="/prices">Prices</Link></li>
            </ul>
          </div>
        </div>
        <main>
          { children }
        </main>
      </div>
    )
  }
}

export default Radium(App)



// <header id="nav-container">
//     <nav className="bar">
//         <Link to="/"><img id="nav-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/500px-Bitcoin.svg.png" alt="logo" /></Link>
//         <ul>
//             <li><Link to="/login">Login w/ MetaMask</Link></li>
//             <li><Link to="/accounts">Accounts</Link></li>
//             <li><Link to="/prices">Prices</Link></li>
//         </ul>
//     </nav>
// </header>
