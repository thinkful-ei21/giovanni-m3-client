import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import Game from './Game';
import LoginPage from './LoginPage';
import Test from './test'

export class App extends React.Component {
    constructor(){
        super();
        this.state = { }
       }
       
    render(){

        return(
            <div className="app container">
                <Route exact path="/" component={Game} />
                <Route exact path="/login" component={LoginPage} />
            </div>
        )    
    }
}

const mapStateToProps = state => {

    return {

    };
  };

  export default withRouter(connect(mapStateToProps)(App));