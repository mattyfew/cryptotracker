import React, { Component } from 'react'
import { Link } from 'react-router'


class Welcome extends Component {
    render() {
        const { center, container, loginButton, introSection, contactSection, featuresSection } = styles

        return (
            <div>
                <h1 style={center}>Welcome to CryptoTracker</h1>
                <Link to="login" ><button type="button" className="btn btn-outline-primary" style={ loginButton }>Login Now</button></Link>


                <section id="intro" className="container" style={{ ...introSection, ...container }}>
                    <h2>Cryptotrackr is the ultimate cryptocurrency portfolio tracker tool for the web*.</h2>
                    <p>* mobile and desktop apps coming soon</p>

                    <div className="row">
                        <div className="col">
                            <p>Manage all your assets in one place</p>
                        </div>
                        <div className="col">
                            <p>Beautiful UI for you to enjoy</p>
                        </div>
                        <div className="col">
                            <p>All you need is a MetaMask login</p>
                        </div>
                    </div>
                </section>

                <section id="features" className="container" style={{ ...featuresSection, ...container }}>
                    <div className="row">
                        <div className="col">
                            <h4>Manage all your assets in one place</h4>
                        </div>
                        <div className="col">
                            <h4>Beautiful UI for you to enjoy</h4>
                        </div>
                        <div className="col">
                            <h4>All you need is a MetaMask login</h4>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <h4>Manage all your assets in one place</h4>
                        </div>
                        <div className="col">
                            <h4>Beautiful UI for you to enjoy</h4>
                        </div>
                        <div className="col">
                            <h4>All you need is a MetaMask login</h4>
                        </div>
                    </div>
                </section>


                <section id="contact" className="container" style={{ ...contactSection, ...container }}>
                    <h2>Contact Us</h2>

                    <p>Tell us your app suggestions & chat with the Cryptotrackr team and other crytocurrency / altcoin traders on telegram! Join our telegram group at telegram.cryptotrackr.com</p>
                    <p>We can also be reached via email at support@cryptotrackr.com.</p>
                </section>
            </div>
        )
    }
}

const styles = {
    center: {
        textAlign: 'center'
    },

    container: {
        marginBottom: 32,
        padding: 32
    },

    loginButton: {
        display: 'block',
        margin: '30px auto'
    },

    introSection: {
        backgroundColor: '#d1d8e0'
    },

    featuresSection: {
        backgroundColor: '#d1d8e0'
    },

    contactSection: {
        backgroundColor: '#45aaf2'
    }
}

export default Welcome
