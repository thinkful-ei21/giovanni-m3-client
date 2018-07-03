
import {SWAP_BLOCKS, DROP_BLOCK, INSERT_BLOCK} from '../actions/grid'


const initialState = {
    // positions: {
    //     11:'11', 12:'12', 13:'13', 14:'14',
    //     21:'21', 22:'22', 23:'23', 24:'24',
    //     31:'31', 32:'32', 33:'33', 34:'34'
    // },
    positions:{
        11:null, 12:null, 13:null, 14:null,
        21:null, 22:null, 23:null, 24:null,
        31:null, 32:null, 33:null, 34:null
    },
    latestId: 99

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
        { console.log('out of bounds', y,x)
            return 'out of bounds'}
        else {return `${y}${x}`}
    }

    if(action.type === SWAP_BLOCKS){
        // console.log('blockId:', action.blockId, action.dir)
        let position1 = findPos(parseInt(action.blockId),10)
        // console.log (position1)
        let position2 = findAdjacentPos(position1, action.dir)
        
        if(position2 ==='out of bounds'){return {...state}}
        else{return {...state, positions: 
               {...state.positions, [position1]: state.positions[position2], [position2] : state.positions[position1] }
            }
        }
    }

    if(action.type === DROP_BLOCK){
        let position1 = action.position
        let position2 = findAdjacentPos(position1, 'up')
        return {...state, positions: 
            {...state.positions, [position1]: state.positions[position2], [position2] : state.positions[position1] }
        }
    }

    if(action.type === INSERT_BLOCK){
        //takes cell id, maybe block value
        let newId = state.latestId + 1
        console.log('inserting', newId, 'at', action.position )
        return {...state, latestId: newId, positions: {...state.positions , [action.position]: newId}}

    }



    return state
}
