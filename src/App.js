import React, {Component} from 'react';

class App extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const children = React.cloneElement(this.props.children)

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">CryptoTracker Whatup</h1>
                </header>
                { children }
            </div>
        )
    }
}

export default App
