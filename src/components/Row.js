import React from 'react';
import Cell from './cell';

export default function Row(props){

    // function drop(ev) {
    //     ev.preventDefault();
    //     console.log(ev)
    //     var data = ev.dataTransfer.getData("text");
    //     ev.target.appendChild(document.getElementById(data));
    //     console.log(data)
    //   }

    let columns = [1,2,3,4].map(n =>{
        return(
        //   <div id={`${props.id}${n}`} className='cell'/>
          <Cell id={`${props.id}${n}`} className='cell'/>
        )
      })
    
      return (

        <div className='row'>
          {[...columns]}
        </div>

    )
}