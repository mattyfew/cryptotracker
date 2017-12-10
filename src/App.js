import React, { Component } from 'react';
import { Link } from 'react-router'

class App extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const children = React.cloneElement(this.props.children)

        return (
            <div className="app-container">
                <header id="nav-container">
                    <nav className="bar">
                        <Link to="/"><img id="nav-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/500px-Bitcoin.svg.png" alt="logo" /></Link>
                        <ul>
                            <li><Link to="/login">Login w/ MetaMask</Link></li>
                            <li><Link to="/accounts">Accounts</Link></li>
                            <li><Link to="/prices">Prices</Link></li>
                        </ul>
                    </nav>
                </header>

                <main>
                    { children }
                </main>
            </div>
        )
    }
}

export default App
