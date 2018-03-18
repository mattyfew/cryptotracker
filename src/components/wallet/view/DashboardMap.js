import React, { Component } from 'react'
import { Button, Jumbotron } from 'react-bootstrap'
import DashboardLineChart from './DashboardLineChart'

const STYLES = {
  jumbotron: {
    margin: '24px',
    height: '60vh',
    backgroundColor: '#F3F3F3'
  },
  container: {
    marginTop: '20%'
  }
}

class DashboardMap extends Component {
    render() {
        return (
          <div>
            <Jumbotron style={STYLES.jumbotron}>
              <DashboardLineChart selector={'year'}/>
              <div className="container-fluid" style={STYLES.container}>
                Map of trend
              </div>
            </Jumbotron>
          </div>
        )
    }
}

export default DashboardMap
