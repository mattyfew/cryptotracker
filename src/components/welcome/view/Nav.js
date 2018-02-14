import React, { Component } from 'react'
import { Element, animateScroll as scroll, Link as ScrollLink } from 'react-scroll'
import { Navbar, Nav, NavItem, Button, Jumbotron } from 'react-bootstrap'
import Radium from 'radium'

const STYLES = {
  nav: {
    backgroundColor: 'transparent',
    width: '100%',
    border: 'none',
    textDecoration: 'none'
  },
  navText: {
    color: 'white',
    textDecoration: 'none',
    ':hover': {
      color: '#f3f3f3',
      textDecoration: 'none !important'
    }
  }
}

class Navigation extends Component {
  render() {
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
      </div>
    )
  }
}

export default Radium(Navigation)
