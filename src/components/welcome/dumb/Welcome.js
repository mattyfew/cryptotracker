import React, { Component } from 'react'
import styles from '../../../styles'

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
    height: '50vh',
    backgroundColor: '#F77777'
  },
  jumboContact: {
    margin: '0px',
    height: '50vh',
    backgroundColor: '#3B4D55'
  }
}
class Welcome extends Component {
  render() {
    return (
      <div>
        <div className="jumbotron" style={STYLES.jumbotron}>
          <div className="container-fluid" style={STYLES.container}>
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <h1 style={styles.textStyles.header}>Welcome to CryptoTracker</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <h1 style={styles.textStyles.subHeader}>A new way to track your crypto movements.</h1>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="jumbotron" style={STYLES.jumboHow}>
            <div className="container">How it works.....</div>
          </div>
        </div>
        <div>
          <div className="jumbotron" style={STYLES.jumboContact}>
            <div className="container">Get in touch .... </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Welcome
