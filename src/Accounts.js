import React, {Component} from 'react';
import axios from 'axios';

class Accounts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            key: '',
            secret: '',
            customerId: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => console.log("new state", this.state) )
    }

    handleSubmit(e) {
        e.preventDefault()

        // console.log("merp", this.state);

        axios.post('/add-new-exchange', this.state)
            .then(res => {
                console.log("we got something back", res)
            })
            .catch(err => console.log("there was an error in POST /add-new-exchange", err) ) 
    }

    render() {
        return (
            <div>
                <h1>Linking up exchanges to accounts will go here</h1>

                <h2>Link Bitstamp account here</h2>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="key" onChange={this.handleChange} placeholder="API Key" />
                    <input type="text" name="secret" onChange={this.handleChange} placeholder="API Secret" />
                    <input type="text" name="customerId" onChange={this.handleChange} placeholder="Customer ID" />
                    <button>Add Exchange API Access</button>
                </form>

            </div>
        )
    }
}

export default Accounts
