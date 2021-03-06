import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from './Row';
import Score from './score'


import { checkGrid, deleteBlock, resetGame, incrimentVal, calcScore } from '../actions/grid';
import { submitScore, logOut } from '../actions/auth';



class Game extends Component {
  constructor(){
   super();
   this.state = { blocklist:[]}
  
  }

  mergeBlocks(group){
    if(group.length > 0){
       const by = group.length -3
       const index = Math.floor(Math.random() * (group.length))
       for (let i = 0; i < group.length; i++) {
        //  console.log('randInd:', index, group[i], group)
         if(i=== index && by > 0){  this.props.dispatch(incrimentVal(group[i],by))  }
         else{ this.props.dispatch(deleteBlock(group[i])) }
       }
      }
  }



  componentDidUpdate(prevProps) {
    if (this.props.grid !== prevProps.grid) {

        this.props.dispatch(checkGrid());
        this.props.dispatch(calcScore())
    }
    if (this.props.gameOver !== prevProps.gameOver && this.props.gameOver=== true){
      console.log('game over', this.props.points)
        this.props.dispatch(submitScore(this.props.points))
    }
    if (this.props.groups !== prevProps.groups && !Object.values(this.props.grid).includes(null) ){
      this.props.groups.forEach(g => this.mergeBlocks(g))
    }
    if (this.props.userName !== prevProps.userName && this.props.userName !== null){
      this.props.dispatch(submitScore(this.props.points))
    }
}



  rows = [1,2,3,4,5].map(n =>{
    return(
      <Row id={`${n}`} key={`row-${n}`}/>
    )
  })
  
  

  render(){


    return (
      <main>
        <div>
          {this.rows}
        </div>
        <div className="info">
          <Score key="score-component"/>
          {this.props.userName === null ? 
            (<button className="btn btn-lg btn-info login" onClick={()=>this.props.history.push('/login')}>
              Log in
            </button>)  :
            (<button className="btn btn-lg btn-info login" onClick={()=>this.props.dispatch(logOut())}>
              log out
            </button>)
          }
        </div>
        {this.props.gameOver === true ?
        (<div className="game-over">Game over
            <button className="game-over-button" onClick={()=>{this.props.dispatch(resetGame())}}>
            Try Again?
          </button>
        </div>)
        : (<div> </div>)
      }

        {/* <Container className='container'>
          <PoseGroup>
            {Object.entries(this.props.grid).map((pair,index) => {
                if(pair[1]===null){
                   // return <Block  value={null} id={pair[0]} data-key={index} key={pair[index]} />
                }
                else{
                  return <Block id = {pair[1]} value={this.props.values[pair[1]]} data-key={index} key={index}    /> 
                }
              })}
          </PoseGroup>
        </Container> */}
      </main>

    );
  }
}

const mapStateToProps = state => {
  return {
   grid: state.grid.positions,
   values: state.grid.values,
   groups: state.grid.groups,
   points: state.grid.score,
   gameOver: state.grid.gameOver,
   userName: state.auth.currentUser,
   blocklist:[]
  };
};

export default (connect(mapStateToProps)(Game));
