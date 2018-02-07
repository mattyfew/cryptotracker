import React, { Component } from 'react'
import styles from '../../../styles'
import { Element, animateScroll as scroll } from 'react-scroll'
import { Navbar, Nav, NavItem, Button, Jumbotron } from 'react-bootstrap'


const STYLES = {
  jumbotron: {
    height: '100vh',
    backgroundImage: 'url(/berlin.jpg)',
    backgroundPosition: 'center',
    filter: 'grayscale(0.8)',
    marginBottom: '0px'
  },
  container: {
    marginTop: '20%'
  },
  jumboHow: {
    margin: '0px',
    height: '100vh',
    backgroundColor: '#F77777'
  },
  jumboContact: {
    margin: '0px',
    height: '90vh',
    backgroundColor: '#3B4D55',
    position: 'relative'
  },
  signUpBtn: {
    position: 'absolute',
    top: '50%',
    left: '48.7%'
  },
  backTop: {
    position: 'absolute',
    bottom: '10px',
    right: '5%',
    color: '#fff',
    borderRadius: '48%',
    backgroundColor: 'grey',
    border: 'none',
    opacity: '0.3'
  }
}
class Welcome extends Component {
  scrollToTop() {
    scroll.scrollToTop()
  }

  render() {
    return (
      <div>
        <div>
          <div className="jumbotron" style={STYLES.jumbotron}>
            <div className="container-fluid" style={STYLES.container}>
              <div className="row">
                <div className="col-md-12 col-xs-12">
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-xs-12">
                </div>
              </div>
            </div>
          </div>
          <Button bsSize="large" bsStyle="danger" style={STYLES.signUpBtn}>Sign In</Button>
        </div>

        <div>
          <div className="jumbotron" style={STYLES.jumboHow}>
            <Element name="navWhy" className="element">HOW</Element>
            <div className="container">How it works.....</div>

          </div>

        </div>
        <Jumbotron style={STYLES.jumboContact}>
          <Element name="navHow" className="element">
            <p>sene</p>
          </Element>
          <Button onClick={() => this.scrollToTop()} style={STYLES.backTop}>
            <span class="glyphicon glyphicon-menu-up"></span>
          </Button>
        </Jumbotron>
      </div>
    )
  }
}

// <div className="jumbotron" style={STYLES.jumboContact}>
//   <div className="container">Get in touch .... </div>
// </div>

export default Welcome
