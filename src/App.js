import React, {Component} from 'react';
import "shoelace-css/dist/shoelace.css";
import './App.css';
import cookie from 'react-cookies';
import request from 'superagent';
import LoginRegister from "./components/LoginRegister";

class App extends Component {
    constructor() {
      super();
      this.state = {
        token: null
      }
    }

    componentWillMount() {
      this.setState({token: cookie.load('token')});
    }

    setToken(token) {
      this.setState({token: token});
      cookie.save('token', token);
    }

    createBook(event) {
      event.preventDefault();
      request
        .post("https://desolate-harbor-53073.herokuapp.com/api/books/")
        .send({title: "The Name of the Wind"})
        .set('Authorization', `Token token=${this.state.token}`)
        .end((err, res) => {
          console.log(res.body);
        })
    }

    render() {
        let userToken = this.state.token;
        return (
            <div className="App">
              {userToken ?
                (
                  <div>
                    <h1>Token: {userToken}</h1>
                    <button onClick={this.createBook.bind(this)}>Make a book</button>
                  </div>
                )
                  :
                <LoginRegister setToken={this.setToken.bind(this)} />}
            </div>
        );
    }
}

export default App;
