import React, {Component} from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/userActions';
import GoogleLogin from 'react-google-login';
//import './index.css'

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    responseGoogle = async (res) => {
        this.props.login(res.tokenId);
    }
    render(){
        return(    
            <div className="limiter">
                    <GoogleLogin
                    clientId="955747415605-uk2u238n84shljl7urt9hro9s7vm0bti.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    isSignedIn={true}
                    cookiePolicy={'single_host_origin'}
                    >
                    </GoogleLogin>
            </div>
        );
    }
}
const mapState = state => {
    return { };
};

export default connect(mapState, {login})(Login);