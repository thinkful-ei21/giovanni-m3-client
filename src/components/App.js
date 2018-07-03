import React, { Component } from 'react';
import { connect } from 'react-redux';
import Block from './Block';
import Row from './Row';

import {toggleHidden} from '../actions/block'

class App extends Component {
  constructor(){
   super();
   this.state = {}
  
  }


 

  handleMouse(event){
   
      let  currentDroppable = null; // potential droppable that we're flying over right now
      // moveAt(event.pageX, event.pageY);
    

      // console.log(this.props.isHidden)
      // this.props.dispatch(toggleHidden())
      // let elemBelow

      // const waitForStore =()=>{
      //   let found
      //   try {
      //     found = this.props.isHidden
      //   } catch (error) {
      //   }

      //   if(found !== true){
      //     setTimeout(waitForStore, 25)
      //   }
      //   else{
      //     console.log(this.props.isHidden)
      //     elemBelow = document.elementFromPoint(event.clientX, event.clientY)}
      //     this.props.dispatch(toggleHidden())
      // }

      // waitForStore()

      //let elemBelow = document.elementFromPoint(event.clientX, event.clientY);

    
    //here I have to hide and unhide the dragged obj



    
      // console.log(elemBelow)
      // if (!elemBelow) return;
    
      // potential droppables are labeled with the class "droppable" (can be other logic)
      // let droppableBelow = elemBelow.closest('.droppable');
    
      // if (currentDroppable != droppableBelow) { // if there are any changes
      //   // we're flying in or out...
      //   // note: both values can be null
      //   //   currentDroppable=null if we were not over a droppable (e.g over an empty space)
      //   //   droppableBelow=null if we're not over a droppable now, during this event
    
      //   if (currentDroppable) {
      //     // the logic to process "flying out" of the droppable (remove highlight)
      //     leaveDroppable(currentDroppable);
      //   }
      //   currentDroppable = droppableBelow;
      //   if (currentDroppable) {
      //     // the logic to process "flying in" of the droppable
      //     enterDroppable(currentDroppable);
      //   }
 
  }

  rows = [1,2,3].map(n =>{
    return(
      <Row id={`${n}`}/>
    )
  })
  
  render(){

    return (
      <main onMouseUp={e => this.handleMouse(e)}>
        {this.rows}
      </main>

    );
  }
}

const mapStateToProps = state => {
  return {
   isHidden: state.block.isHidden
  };
};

export default (connect(mapStateToProps)(App));