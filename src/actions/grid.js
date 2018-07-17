


// const storeAuthInfo = (authToken, dispatch) => {
//     const decodedToken = jwtDecode(authToken);
//     dispatch(setAuthToken(authToken));
//     dispatch(authSuccess(decodedToken.user));
//     saveAuthToken(authToken);
//   };

// export const logOut = () => dispatch => {
//   dispatch(clearAuth());
//   dispatch(resetGame());
//   clearAuthToken();
// }

export const SWAP_BLOCKS = 'SWAP_BLOCKS';

export const swapBlocks = (blockId, dir) => dispatch =>{
    dispatch(animateSwap(blockId,dir))

    const trigger = () => {dispatch(swap(blockId, dir))}
    setTimeout( trigger , 150)
}


export const swap  =(blockId, dir)=> ({
  type: SWAP_BLOCKS,
  blockId,
  dir
});

export const ANIMATE_SWAP = 'ANIMATE_SWAP';
export const animateSwap =(blockId, dir)=> ({
    type: ANIMATE_SWAP,
    blockId,
    dir
})

export const INSERT_BLOCK = 'INSERT_BLOCK';
export const insertBlock =(position)=>({
    type: INSERT_BLOCK,
    position
})

export const SET_VALUE = 'SET_VALUE';
export const setValue = (position, value)=>({
    type: SET_VALUE,
    position,
    value
})

export const INC_VALUE = 'INC_VALUE'
export const incrimentVal = (position, by) => ({
    type: INC_VALUE,
    position,
    by
})

export const DROP_BLOCK = 'DROP_BLOCK';
export const dropBlock  =(position)=> ({
  type: DROP_BLOCK,
  position
  
});

export const DELETE_BLOCK = 'DELETE_BLOCK';
export const deleteBlock =(position)=> ({
    type: DELETE_BLOCK,
    position
})

export const CHECK_GRID = 'CHECK_GRID'
export const checkGrid =()=>({
    type: CHECK_GRID
})

export const RESET_GAME = 'RESET_GAME'
export const resetGame =()=> ({
    type: RESET_GAME
})

export const SET_HIGH = 'SET_HIGH'
export const setHigh =(score)=> ({
    type: SET_HIGH,
    score: score
})

export const CALC_SCORE = 'CALC_SCORE'
export const calcScore =()=> ({
    type: CALC_SCORE
})
