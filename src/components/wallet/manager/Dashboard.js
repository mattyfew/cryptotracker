import React, { Component } from 'react'
import { connect } from 'react-redux'

import { AssetActions, UserActions } from '../../../actions'
const { getAssetInformation } = AssetActions
const { getUserInfo } = UserActions



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
        user: state.user
    }
}


export default connect(mapStateToProps, {
  getAssetInformation, getUserInfo
})(Dashboard)
