import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import Game from './Game';
import LoginPage from './LoginPage';

export class App extends React.Component {
    constructor(){
        super();
        this.state = { }
       }
       
    render(){

        return(
            <div className="app">
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