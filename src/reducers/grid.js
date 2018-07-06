
import {SWAP_BLOCKS, DROP_BLOCK, INSERT_BLOCK, DELETE_BLOCK, CHECK_GRID,} from '../actions/grid'


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
    values:{
        
    },
    groups:[

    ],
    latestId: 99,
    score: 0,
    highScore: -1 

}



export default function reducer(state = initialState, action){

    function findPos(block){
        return Object.entries(state.positions).find(pair=> pair[1]===block)[0]
    }

    function getVal(pos){
        return state.values[state.positions[pos]]
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

        if( x<1 || y<1 || x>4 || y>3 ){
            return 'out of bounds'}
        else {return `${y}${x}`}
    }

    function checkDir(pos, val, dir){
        // console.log(pos, val, dir)
        let posArr =[pos]
        for (var i = 0; i < posArr.length; i++) {
            let nextPose = findAdjacentPos(posArr[i], dir)
            if(getVal(nextPose)===val){posArr.push(nextPose)}
        }
        // console.log(posArr)
        return posArr
    }





    function checkGrid(){
        //returns false if block grid still updating, returns an array of match groups if matches found, otherwise returns empty array
        
        if(Object.values(state.positions).includes(null)){return false}

        let posList = Object.keys({...state.positions})
        let groups = []

        for (let i = 0; i < posList.length; i++) {
            let group = [posList[i]]
            let val = getVal(posList[i])

            
            for (let n  = 0; n < group.length; n++) {
                let left = checkDir(group[n], val, 'left')
                let right = checkDir(group[n], val, 'right')
                let up = checkDir(group[n], val, 'up')
                let down = checkDir(group[n], val, 'down')

                // console.log(group[n], val, left.length, right.length, up.length, down.length)
                if (left.length -1 + right.length -1 < 2 && up.length -1 + down.length -1 < 2 && n===0){
                    
                    group.splice(n,1)
                    
                }
                else{
                    if(left.length -1 + right.length -1 >= 2){
                        left.forEach(p => group.includes(p)? {} : group.push(p))
                        right.forEach(p => group.includes(p)? {} : group.push(p))
                    }
                    else if(up.length -1 + down.length -1 >= 2){
                        up.forEach(p => group.includes(p)? {} : group.push(p))
                        down.forEach(p => group.includes(p)? {} : group.push(p))
                    }
                }
        
            }
            group.forEach(p => posList.includes(p)? posList.splice(posList.indexOf(p),1) : {} )
            
            // group.length > 1 ?  console.log(val, group) : {}      
            groups.push(group)

        }
        return groups
    }


    function getSurrounding(pos){
        // checkDir(pos, getVal(pos), 'left') remove this, it's for teting checkDir
        
        let y = parseInt(pos[0],10)
        let x = parseInt(pos[1],10)

        function outOfBounds(p){
            // console.log(p, Object.keys(state.positions).includes(p) )
            return Object.keys(state.positions).includes(p)
        }

        let xArr = [`${y}${x-2}`,`${y}${x-1}`,`${y}${x}`,`${y}${x+1}`,`${y}${x+2}`].filter(outOfBounds)
        let yArr = [`${y-2}${x}`,`${y-1}${x}`,`${y}${x}`,`${y+1}${x}`,`${y+2}${x}`].filter(outOfBounds)

        return [xArr, yArr]
    }

    function didMatch(pos1, pos2, newState){

        const sur1 = getSurrounding(pos1)
            .map(lArr =>{
                return lArr.map(pos =>{
                    return newState.values[newState.positions[pos]]
                })
            })
        // console.log('surrounding:', sur1)
        const sur2 = getSurrounding(pos2)
            .map(lArr =>{
                return lArr.map(pos =>{
                    return newState.values[newState.positions[pos]]
                })
            })

        let result = false

        let testList = sur1[0].concat(['']).concat(sur1[1]).concat(['']).concat(sur2[0]).concat(['']).concat(sur2[1])
        let v = ''
        let count = 1
        for (var i = 0; i < testList.length; i++) {
            if(testList[i] === v){
                count ++
                // console.log(count)
                count === 3 ? result = true : {}
            }
            else{
                v = testList[i]
                count = 1
            }
        }
        
        return result
    }

    if(action.type === SWAP_BLOCKS){
        // console.log('blockId:', action.blockId, action.dir)
        let position1 = findPos(parseInt(action.blockId),10)
        // console.log (position1)
        let position2 = findAdjacentPos(position1, action.dir)
        
        let newState = {...state, positions: 
            {...state.positions, [position1]: state.positions[position2], [position2] : state.positions[position1] }
            }

        if(position2 ==='out of bounds'){return state}
        else if(didMatch(position1, position2, newState)===false){

            return state}
        else{ 
            return newState}
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
        const val = Math.floor(Math.random() * (4 - 1 + 1)) + 1
        // console.log('inserting', newId, 'at', action.position )
        return {...state, latestId: newId, 
            positions: {...state.positions , [action.position]: newId},
            values: {...state.values, [newId]:val}
        }

    }

    if (action.type === CHECK_GRID){

        // console.log('checking', state)
        const groups = checkGrid()
        if(groups === false || groups.length === 0){ return state}
        else{

            //temp score tracking
            let tot = 0
            groups.forEach(group => {
                let points = 1
                for (let n = 1; n <= group.length; n++) {
                    points = points * n
                }
                tot = tot + points
            })
            return {...state, groups: groups, score: state.score+tot}

        }
    }

    if(action.type === DELETE_BLOCK){

        return {...state, positions: {...state.positions, [action.position]: null}}
    }


    return state
}
