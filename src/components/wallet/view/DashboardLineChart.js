import React, { Component } from 'react'
import { Button, Jumbotron } from 'react-bootstrap'
// import { LineChart } from 'react-easy-chart'
import {
  XYPlot,
  XAxis,
  YAxis,
  AreaSeries,
  MarkSeries,
  Crosshair,
  LineSeries,
  LineMarkSeries,
  VerticalBarSeries,
  VerticalGridLines,
  HorizontalGridLines
} from 'react-vis'

const STYLES = {
}

class DashboardLineChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      crosshairValues: []
    }
    this._onMouseLeave = this._onMouseLeave.bind(this)
    this._onNearestX = this._onNearestX.bind(this)
  }

  _onNearestX(value, {index}) {
    const { data } = this.props
    this.setState({
      crosshairValues: [data[index]]
    })
  }


  _onMouseLeave() {
    this.setState({
      crosshairValues: []
    })
  }

  render() {
    const viewWidth = window.innerWidth
    return (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        test linechart
        <div style={{flex: 1}}>
        <XYPlot
          onMouseLeave={this._onMouseLeave}
          width={viewWidth * 0.7}
          height={300}>
          <XAxis/>
          <YAxis/>
          <AreaSeries
            data={this.props.data}
            style={{strokeWidth: "2"}} />
          <HorizontalGridLines />
          <LineSeries
            onNearestX={this._onNearestX}
            data={this.props.data} />
          <Crosshair
            values={this.state.crosshairValues}
            className={'test-class-name'} />
        </XYPlot>
        </div>
        <div style={{flex: 1}}>
        <XYPlot height={200} width={600}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalBarSeries data={this.props.data} />
        </XYPlot>
        </div>
      </div>
    )
  }
}

export default DashboardLineChart
