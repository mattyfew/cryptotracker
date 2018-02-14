import React, { Component } from 'react'
import styles from '../../../styles'
import { Element, animateScroll as scroll, Link as ScrollLink } from 'react-scroll'
import { Button, Jumbotron } from 'react-bootstrap'
import { Link } from 'react-router'
import Radium from 'radium'
import Navigation from './Nav'

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
  jumboWhy: {
    margin: '0px',
    height: '110vh',
    backgroundColor: '#F77777'
  },
  jumboHow: {
    margin: '0px',
    height: '100vh',
    backgroundColor: '#3B4D55',
    position: 'relative'
  },
  jumboCallToAction: {
    position: 'absolute',
    top: '46%',
    left: '18%',
    width: '60%',
    color: 'blue',
    backgroundColor: '#3B4D55'
  },
  signUpBtn: {
    position: 'fixed',
    top: '8%',
    right: '3%'
  },
  backTop: {
    position: 'fixed',
    bottom: '15px',
    right: '5%',
    fontSize: '30px',
    color: '#fff',
    backgroundColor: 'transparent',
    border: 'none'
  },
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

class Welcome extends Component {

  scrollToTop() {
    scroll.scrollToTop()
  }

  render() {
    return (
      <div>
        <Navigation />
        <div>
          <Jumbotron style={STYLES.jumbotron}>
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
          </Jumbotron>
        </div>

        <div>
          <Jumbotron style={STYLES.jumboWhy}>
            <Element name="navWhy" className="element">
              <p>this is why....</p>
            </Element>
          </Jumbotron>
        </div>
        <div>
          <Jumbotron style={STYLES.jumboHow}>
            <Element name="navHow" className="element">
              <p>blablabla</p>
            </Element>
          </Jumbotron>
        </div>
        <Button bsSize="large" bsStyle="danger" style={STYLES.signUpBtn}>
          <Link to={'/login'} style={{textDecoration: 'none', color: '#fff'}}>Sign In</Link>
        </Button>
        <Button onClick={() => this.scrollToTop()} style={STYLES.backTop}>
          <span className="glyphicon glyphicon-menu-up"></span>
        </Button>
      </div>
    )
  }
}

export default Radium(Welcome)
