import React, { Component } from 'react'
import { Button, Jumbotron } from 'react-bootstrap'

const STYLES = {
  jumbotron: {
    margin: '24px',
    height: '60vh',
    backgroundColor: '#F77777'
  },
  container: {
    marginTop: '20%'
  }
}

class DashboardPortfolio extends Component {
    render() {
        return (
          <div>
            <div style={STYLES.jumbotron}>
              Dashboard Portfolio
            </div>
          </div>
        )
    }
}

export default DashboardPortfolio
