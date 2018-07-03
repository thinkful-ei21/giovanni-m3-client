import React from 'react';
import Block from './Block';

export default function Cell(props){


    
      return (
        <div id={props.id} className={props.className}>
             <Block id='a' className='block'/>
        </div>
    )
}