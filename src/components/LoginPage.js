import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import {login, register} from '../actions/auth'



export class LoginPage extends React.Component {
    constructor(){
        super();
        this.state = {redirect : false }
       }
       
    componentDidUpdate(prevProps) {
        if (this.props.currentUser !== prevProps.currentUser) {
            this.setState({redirect: true})
        }
    }

    render(){

        if(this.state.redirect){return <Redirect to='/'/>} else {
        return(
            <div className="login-fields">
                    
                <form onSubmit={e => this.onSubmit(e)}>

                    <input   name="userName" id="userName" onChange={e => this.state.name=e.currentTarget.value} required />
                    <input   name="password" id="password" type="password" onChange={e => this.state.password=e.currentTarget.value} min="10" required />
                </form>
                <button  name="LogIn" id="LogIn" className="button"
                 onClick={()=>this.props.dispatch(login(this.state.name,this.state.password))}
                 >
                    LogIn
                </button>
                <button  name="register" id="register" className="button"
                onClick={()=>{
                    console.log(this.state.name)
                    this.props.dispatch(register(this.state.name,this.state.password))}
                }>
                    New User
                </button>
            </div>
        )
        }
    }
}

const mapStateToProps = state => {

    return {
        currentUser: state.auth.currentUser
    };
  };

export default (connect(mapStateToProps)(LoginPage));