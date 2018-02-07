import React, { Component } from 'react'
import { Link } from 'react-router'
import Radium from 'radium'
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap'
import { Link as ScrollLink, Element } from 'react-scroll'
const STYLES = {
  nav: {
    backgroundColor: 'transparent',
    width: '100%',
    border: 'none',
    textDecoration: 'none'
  },
  navText: {
    color: 'white',
    ':hover': {
      color: '#f3f3f3',
      textDecoration: 'none !important'
    }
  }
}

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const children = React.cloneElement(this.props.children)
    return (
      <div>
        <Navbar fixedTop fluid collapseOnSelect style={STYLES.nav}>
          <Navbar.Header>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse style={STYLES.nav}>
            <Nav>
              <NavItem eventKey={1} href="/"><span style={STYLES.navText}>Home</span></NavItem>
              <NavItem eventKey={2} href="#">
                <ScrollLink
                  style={STYLES.navText}
                  className="navWhy"
                  to="navWhy"
                  smooth={true}
                  spy={true}
                  duration={900}>
                    Why
                  </ScrollLink>
              </NavItem>
              <NavItem eventKey={3} href="#">
                <ScrollLink
                  style={STYLES.navText}
                  className="navHow"
                  to="navHow"
                  spy={true}
                  smooth={true}
                  duration={900}>
                    How
                  </ScrollLink>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <main>
          { children }
        </main>
      </div>
    )
  }
}



export default Radium(App)
