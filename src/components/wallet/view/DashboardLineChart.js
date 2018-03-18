import React, { Component } from 'react'
import { Button, Jumbotron } from 'react-bootstrap'
import { LineChart } from 'react-easy-chart'

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

class DashboardLineChart extends Component {
  // TODO: generate x axis accordung to
  renderSelectedPeriod() {
    if (this.props.selector === 'week') {
      return <LineChart
        axes={true}
        xType={'text'}
        interpolate={'cardinal'}
        margin={{top: 10, right: 10, bottom: 50, left: 50}}
        axisLabels={{x: 'time', y: 'value'}}
        width={800}
        height={400}
        data={  [
            [
              { x: 'Mon', y: 20 },
              { x: 'Tue', y: 10 },
              { x: 'Wed', y: 25 },
              { x: 'Thu', y: 20 },
              { x: 'Fri', y: 10 },
              { x: 'Sat', y: 25 },
              { x: 'Sun', y: 20 }
            ], [
              { x: 'Mon', y: 10 },
              { x: 'Tue', y: 12 },
              { x: 'Wed', y: 0 },
              { x: 'Thu', y: 10 },
              { x: 'Fri', y: 20 },
              { x: 'Sat', y: 5 },
              { x: 'Sun', y: 12 }
            ]
          ]} />
    } else if (this.props.selector === 'year') {
      return <LineChart
        axes={true}
        xType={'text'}
        interpolate={'cardinal'}
        margin={{top: 10, right: 10, bottom: 50, left: 50}}
        axisLabels={{x: 'time', y: 'value'}}
        width={800}
        height={400}
        data={  [
            [
              { x: 'Jan', y: 20 },
              { x: 'Feb', y: 10 },
              { x: 'Mar', y: 25 },
              { x: 'Apr', y: 20 },
              { x: 'May', y: 10 },
              { x: 'Jun', y: 25 },
              { x: 'Jul', y: 20 },
              { x: 'Aug', y: 20 },
              { x: 'Sep', y: 10 },
              { x: 'Oct', y: 25 },
              { x: 'Nov', y: 20 },
              { x: 'Dec', y: 10 }
            ], [
              { x: 'Jan', y: 10 },
              { x: 'Feb', y: 20 },
              { x: 'Mar', y: 15 },
              { x: 'Apr', y: 10 },
              { x: 'May', y: 20 },
              { x: 'Jun', y: 15 },
              { x: 'Jul', y: 10 },
              { x: 'Aug', y: 25 },
              { x: 'Sep', y: 10 },
              { x: 'Oct', y: 0 },
              { x: 'Nov', y: 10 },
              { x: 'Dec', y: 20 }
            ]
          ]} />
    }
  }

  render() {

    return (
      <div>
        test linechart
        {this.renderSelectedPeriod()}
      </div>
    )
  }
}

export default DashboardLineChart
