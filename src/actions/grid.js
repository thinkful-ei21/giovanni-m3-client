


export const SWAP_BLOCKS = 'SWAP_BLOCKS';
export const swapBlocks  =(blockId, dir)=> ({
  type: SWAP_BLOCKS,
  blockId,
  dir
});

export const INSERT_BLOCK = 'INSERT_BLOCK';
export const insertBlock =(position)=>({
    type: INSERT_BLOCK,
    position
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