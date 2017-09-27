import React, {Component} from 'react';
import request from 'superagent';

class LoginRegister extends Component {
    constructor() {
      super();
      this.state = {
        loginEmail: '',
        loginPassword: '',
        registerEmail: '',
        registerPassword: '',
        registerName: '',
        token: '',
        error: ''
      }
    }

    updateFromField(stateKey) {
      return (event) => {
        this.setState({[stateKey]: event.target.value});
      }
    }

    login(event) {
      let setToken = this.props.setToken;

      event.preventDefault();
      request
        .post("https://desolate-harbor-53073.herokuapp.com/api/users/login/")
        .send({email: this.state.loginEmail, password: this.state.loginPassword})
        .end((err, res) => {
          if (err) {
            this.setState({error: res.body.error});
          } else {
            setToken(res.body.token);
          }
        })
    }

    render() {
        return (
            <div className="LoginRegister">
              {this.state.error && <div className="alert">{this.state.error}</div>}
                <h2>Login</h2>

                    <div className="input-field">
                        <label>Email</label>
                        <input type="email" onChange={this.updateFromField('loginEmail')} value={this.state.loginEmail} />
                    </div>
                    <div className="input-field">
                        <label>Password</label>
                        <input type="password" onChange={this.updateFromField('loginPassword')}
                        value={this.state.loginPassword} />
                    </div>
                    <button onClick={event => this.login(event)}>Login</button>
                <hr />

                <h2>Register</h2>

                    <div className="input-field">
                        <label>Email</label>
                        <input type="email"/>
                    </div>
                    <div className="input-field">
                        <label>Name</label>
                        <input type="text"/>
                    </div>
                    <div className="input-field">
                        <label>Password</label>
                        <input type="password"/>
                    </div>
                    <button>Register</button>

            </div>
        );
    }
}

export default LoginRegister;
