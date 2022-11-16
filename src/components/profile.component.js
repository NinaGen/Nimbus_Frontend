import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { toast } from 'react-toastify';
import { withRouter } from '../common/with-router';
import Content from "../common/content";
import UserService from "../services/user.service";
import Button from 'react-bootstrap/Button';
class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: { username: "" },
            userProfile: {},
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true }, () => {this.getUserDetail()});
    }

    getUserDetail = () => {
        UserService.getSelfProfileContent().then(
            (response) => {
                console.log(response.data)
                this.setState({
                    userProfile: response.data
                })
                console.log(this.state.userProfile)
            },
            (error) => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString(),
                });
            }
        );
    }
    selfProfile = () => {
        const { currentUser } = this.state;
        return (
            <div>
                <header className="jumbotron">
                     <img 
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card2"
                    />  
                    
                </header>
                
                <div>
                <h3 class ="profile-name-pic-align">
                    <strong>{currentUser.username}</strong> Profile
                    </h3>
                </div>
                <div>
                <Button variant="outline-secondary">Setting</Button>
                <Button variant="outline-secondary">Edit Profile</Button>
                </div>
                
                
                <div>
                        {/* for debug only */}
                <p>
                    <strong>Token:</strong>{" "}
                    {currentUser.accessToken.substring(0, 20)} ...{" "}
                    {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                </p>
                <p>
                    <strong>Id:</strong>{" "}
                    {currentUser.id}
                </p>
                <p>
                    <strong>Email:</strong>{" "}
                    {currentUser.email}
                </p>

                </div>
                <div className="container">
                    <div class="row">
                    <div class="col-md-3">
                    <header className="jumbotron ">.1</header>
                    
                    </div>
                    <div class="col-md-8 col-md-offset-3">
                    <header className="jumbotron ">.2</header>
                    
                    </div>
                    </div>
			    </div>
                
            
               
            </div>)
    }

    render() {
        if (this.state.redirect) {
            toast.error("You need to login to view that page")
            return <Navigate to={this.state.redirect} />
        }



        return (
            <div className="container">
                {(this.state.userReady) ?
                    <div>
                        {this.selfProfile()}
                        <Content pageType="profile" />
                    </div>
                    : null}
            </div>
        );

        
    }
    
}
export default withRouter(Profile);
