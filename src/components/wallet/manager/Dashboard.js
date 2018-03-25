import React, { Component } from 'react'
import { connect } from 'react-redux'

import { AssetActions } from '../../../actions'
const { getAssetInformation } = AssetActions



class Dashboard extends Component {
  componentDidMount() {
    if (this.props.assets.assetInformation.length === 0) {
      this.props.getAssetInformation()
    }
  }

    render() {
        console.log('DASHBOARD PROPS: ', this.props)
        return (
          <div>
            <div>Dashboard Screen</div>
          </div>
        )
    }
}



function mapStateToProps(state) {
    return {
        assets: state.assets,
        auth: state.auth
    }
}


export default connect(mapStateToProps, {
  getAssetInformation
})(Dashboard)
