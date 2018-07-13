import React from 'react';
import Cell from './cell';

export default function Row(props){


    let columns = [1,2,3,4,5,6,7].map(n =>{
        
      return(
          <Cell id={`${props.id}${n}`} key={`${props.id}${n}`} className='cell'/>
        )
      })
    
      return (

        <div className='row'>
          {[...columns]}
        </div>

    )
}