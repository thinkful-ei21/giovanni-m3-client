
import {SWAP_BLOCKS} from '../actions/grid'


const initialState = {
    positions: {
        11:'11', 12:'12', 13:'13', 14:'14',
        21:'21', 22:'22', 23:'23', 24:'24',
        31:'31', 32:'32', 33:'33', 34:'34'
    }

}



export default function reducer(state = initialState, action){

    function findPos(block){
        return Object.entries(state.positions).find(pair=> pair[1]===block)[0]
    }

    function findAdjacentPos(pos, dir){
        // these limits will need to change when we expand the grid
        let y = parseInt(pos[0],10)
        let x = parseInt(pos[1],10)

        switch(dir){
            case 'left': x = x-1
            break;
            case 'right': x = x+1
            break;
            case 'up': y= y-1
            break;
            case 'down': y = y+1
            break;
        }

        if( x<1 || y<1 || x>4 || y>3 )
        { console.log('out of bounds', y,x)}
        else {return `${y}${x}`}
    }

    if(action.type === SWAP_BLOCKS){
        let position1 = findPos(action.block)
        let position2 = findAdjacentPos(position1, action.dir)
        return {...state, positions: 
            {...state.positions, [position1]: state.positions[position2], [position2] : state.positions[position1] }
        }
    }
    return state
}
