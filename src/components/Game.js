import React, { Component } from 'react';
import { connect } from 'react-redux';
import Block from './Block';
import Row from './Row';
import Score from './score'

import { checkGrid, deleteBlock, resetGame, incrimentVal, calcScore } from '../actions/grid';
import { submitScore, clearAuth } from '../actions/auth';

class Game extends Component {
  constructor(){
   super();
   this.state = {}
  
  }

  mergeBlocks(group){
    if(group.length > 0){
       const by = group.length -2
       const index = Math.floor(Math.random() * (group.length))
       for (let i = 0; i < group.length; i++) {
        //  console.log('randInd:', index, group[i], group)
         if(i=== index){  this.props.dispatch(incrimentVal(group[i],by))  }
         else{ this.props.dispatch(deleteBlock(group[i])) }
       }
      }
  }

  componentDidUpdate(prevProps) {
    // console.log('updated')
    if (this.props.grid !== prevProps.grid) {
        // console.log('firing')
        this.props.dispatch(checkGrid());
        this.props.dispatch(calcScore())
    }
    if (this.props.gameOver !== prevProps.gameOver && this.props.gameOver=== true){
      console.log('game over', this.props.points)
        this.props.dispatch(submitScore(this.props.points))
    }
    if (this.props.groups !== prevProps.groups && !Object.values(this.props.grid).includes(null) ){
      // console.log('deleting')
      this.props.groups.forEach(g => this.mergeBlocks(g))
      // this.props.groups.forEach(g=> g.forEach(pos => this.props.dispatch(deleteBlock(pos))))
    }
    if (this.props.userName !== prevProps.userName && this.props.userName !== null){
      // console.log('something',this.props.userName.username)
      this.props.dispatch(submitScore(this.props.points))
    }
}



  rows = [1,2,3,4,5].map(n =>{
    return(
      <Row id={`${n}`}/>
    )
  })
  
  render(){

    return (
      <main>
        <div>
          {this.rows}
        </div>
        {this.props.userName === null ? 
          (<button onClick={()=>this.props.history.push('/login')}>
            Log in to save high score
          </button>)  :
          (<Score />)
        }

        {this.props.gameOver === true ?
        (<div>Game over
            <button onClick={()=>{this.props.dispatch(resetGame())}}>
            Try Again?
          </button>
        </div>)
        : (<div> </div>)
      }

        <button onClick={()=>this.props.dispatch(clearAuth())}>
            log out
        </button>

      </main>

    );
  }
}

const mapStateToProps = state => {
  return {
   grid: state.grid.positions,
   groups: state.grid.groups,
   points: state.grid.score,
   gameOver: state.grid.gameOver,
   userName: state.auth.currentUser
  };
};

export default (connect(mapStateToProps)(Game));
