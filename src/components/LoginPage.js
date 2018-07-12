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

    onSubmit(e){
        e.preventDefault()
        this.props.dispatch(login(this.state.name,this.state.password))
    }

    render(){

        if(this.state.redirect){return <Redirect to='/'/>} else {
        return(
            <main>
                <div className="login-fields">
                        
                    <form onSubmit={e => this.onSubmit(e)}>

                        <input  className="input-field" name="userName" id="userName"  type="text"
                        placeholder="User Name"                    
                        onChange={e => this.setState({name:e.currentTarget.value})} />
                        
                        <input className="input-field"  name="password" id="password" type="password"
                        placeholder="Password"
                        onChange={e => this.setState({password:e.currentTarget.value})} min="10" required />
                    </form>
                    
                    <button  name="LogIn" id="LogIn" className="login submit-button"
                    onClick={(e)=>this.onSubmit(e)}
                    >
                        Log In
                    </button>
                        OR
                    <button  name="register" id="register" className="login submit-button"
                    onClick={()=>{
                        console.log(this.state.name)
                        this.props.dispatch(register(this.state.name,this.state.password))}
                    }>
                        New User
                    </button>
                </div>
                { this.props.error ? <span className="error-message"> {`${this.props.error.location !== undefined ? this.props.error.location : ''} ${this.props.error.message}`} </span> : <div></div>}
            </main>    
            )
        }
    }
}

const mapStateToProps = state => {

    return {
        currentUser: state.auth.currentUser,
        error: state.auth.error
    };
  };

export default (connect(mapStateToProps)(LoginPage));