var coor = null

function getClosestCoordinate(head, targetCoordinates) {
    let closestCoordinate = null
    let distanceToClosestCoordinate = null
    targetCoordinates.forEach(tempTarget => {
        const distanceFromheadToTempTarget = distanceToCoordinate(head, tempTarget)
        if (distanceToClosestCoordinate == null || distanceToClosestCoordinate > distanceFromheadToTempTarget) {
            closestCoordinate = tempTarget
            distanceToClosestCoordinate = distanceFromheadToTempTarget
        }
    })
    return closestCoordinate
}

function distanceToCoordinate(head, target) {
    return Math.sqrt(Math.pow(target.y - head.y, 2) + Math.pow(target.x - head.x, 2))
}

function info() {
    console.log("INFO")
    const response = {
        apiversion: "1",
        author: "lokis-crew",
        color: "#32A852",
        head: "tiger-king",
        tail: "coffee"
    }
    return response
}

function start(gameState) {
    console.log(`${gameState.game.id} START`)
}

function end(gameState) {
    console.log(`${gameState.game.id} END\n`)
}

function move(gameState) {
    let possibleMoves = {
        up: true,
        down: true,
        left: true,
        right: true
    }

    // Step 0: Don't let your Battlesnake move back on its own neck
    const myHead = gameState.you.head
    const myNeck = gameState.you.body[1]
    if (myNeck.x < myHead.x) {
        possibleMoves.left = false
    } else if (myNeck.x > myHead.x) {
        possibleMoves.right = false
    } else if (myNeck.y < myHead.y) {
        possibleMoves.down = false
    } else if (myNeck.y > myHead.y) {
        possibleMoves.up = false
    }

    // TODO: Step 1 - Don't hit walls.
    // Use information in gameState to prevent your Battlesnake from moving beyond the boundaries of the board.
    // const boardWidth = gameState.board.width
    // const boardHeight = gameState.board.height

    if(myHead.x === gameState.board.width - 1) {
      possibleMoves.right = false
    }
    if(myHead.x === 0) {
      possibleMoves.left = false
    }
    if(myHead.y === gameState.board.height - 1) {
      possibleMoves.up = false
    }
    if(myHead.y === 0) {
      possibleMoves.down = false
    }

    // TODO: Step 2 - Don't hit yourself.
    // Use information in gameState to prevent your Battlesnake from colliding with itself.
    const mybody = gameState.you.body
    for(let i = 2; i < mybody.length - 1; i++) {
      const seg = mybody[i]
      if(myHead.x + 1 === seg.x && myHead.y === seg.y) {
        possibleMoves.right = false
      }
      if(myHead.x - 1 === seg.x && myHead.y === seg.y) {
        possibleMoves.left = false
      }
      if(myHead.y + 1 === seg.y && myHead.x === seg.x) {
        possibleMoves.up = false
      }
      if(myHead.y - 1 === seg.y && myHead.x === seg.x) {
        possibleMoves.down = false
      }
    }

    // TODO: Step 3 - Don't collide with others.
    // Use information in gameState to prevent your Battlesnake from colliding with others.
    const snakes = gameState.board.snakes
    for(let j = 0; j < snakes.length; j++) {
        const snake = snakes[j]
        for(let i = 0; i < snake.body.length - 1; i++) {
        const seg = snake.body[i]
        if(myHead.x + 1 === seg.x && myHead.y === seg.y) {
          possibleMoves.right = false
        }
        if(myHead.x - 1 === seg.x && myHead.y === seg.y) {
          possibleMoves.left = false
        }
        if(myHead.y + 1 === seg.y && myHead.x === seg.x) {
          possibleMoves.up = false
        }
        if(myHead.y - 1 === seg.y && myHead.x === seg.x) {
          possibleMoves.down = false
        }
      }

      //Avoid head on head collisions
      if(myHead.x + 2 === snake.head.x && myHead.y == snake.head.y){
        possibleMoves.right = false
      }
      if(myHead.x - 2 === snake.head.x && myHead.y == snake.head.y){
        possibleMoves.left = false
      }
      if(myHead.y + 2 === snake.head.y && myHead.x == snake.head.x){
        possibleMoves.up == false
      }
      if(myHead.y - 2 === snake.head.y && myHead.x == snake.head.x){
        possibleMoves.down = false
      }
      //Avoid head on head collisions
      if(myHead.x + 1 === snake.head.x - 1 && myHead.y === snake.head.y){
        possibleMoves.right = false
      }
      if(myHead.x + 1 === snake.head.x && myHead.y === snake.head.y + 1){
        possibleMoves.right = false
      }
      if(myHead.x + 1 === snake.head.x && myHead.y === snake.head.y - 1){
        possibleMoves.right = false
      }
      if(myHead.x - 1 === snake.head.x + 1 && myHead.y === snake.head.y){
        possibleMoves.left = false
      }
      if(myHead.x - 1 === snake.head.x && myHead.y === snake.head.y + 1){
        possibleMoves.left = false
      }
      if(myHead.x - 1 === snake.head.x && myHead.y === snake.head.y - 1){
        possibleMoves.left = false
      }
      if(myHead.y + 1 === snake.head.y - 1 && myHead.x === snake.head.x){
        possibleMoves.up == false
      }
      if(myHead.y + 1 === snake.head.y && myHead.x === snake.head.x + 1){
        possibleMoves.up == false
      }
      if(myHead.y + 1 === snake.head.y && myHead.x === snake.head.x - 1){
        possibleMoves.up == false
      }
      if(myHead.y - 1 === snake.head.y + 1 && myHead.x === snake.head.x){
        possibleMoves.down = false
      }
      if(myHead.y - 1 === snake.head.y && myHead.x === snake.head.x + 1){
        possibleMoves.down = false
      }
      if(myHead.y - 1 === snake.head.y && myHead.x === snake.head.x - 1){
        possibleMoves.down = false
      }
    }

    // TODO: Step 4 - Find food.
    // Use information in gameState to seek out and find food.
    if(coor !== null && myHead.x === coor.x && myHead.y === coor.y) {
      coor = null
    }
    if(!gameState.board.food.find(food => JSON.stringify(food) === JSON.stringify(coor))) {
      coor = null
    }
    if(coor === null) {
      coor = getClosestCoordinate(myHead, gameState.board.food)
    }
    if(coor) {
      if(possibleMoves.right === true && coor.x - myHead.x > 0 ) {
        console.log("right")
        return {
          move: "right"
        }
      }
      if(possibleMoves.left === true && coor.x - myHead.x < 0 ) {
        console.log("left")
        return {
          move: "left"
        }
      }
      if(possibleMoves.up === true && coor.y - myHead.y > 0 ) {
        console.log("up")
        return {
          move: "up"
        }
      }
      if(possibleMoves.down === true && coor.y - myHead.y < 0 ) {
        console.log("down")
        return {
          move: "down"
        }
      }
    }
    // Finally, choose a move from the available safe moves.
    // TODO: Step 5 - Select a move to make based on strategy, rather than random.
  console.log("possible moves", possibleMoves)
    const safeMoves = Object.keys(possibleMoves).filter(key => possibleMoves[key])
    const response = {
        move: safeMoves[Math.floor(Math.random() * safeMoves.length)],
    }

    console.log(`${gameState.game.id} MOVE ${gameState.turn}: ${response.move}`)
    return response

}

module.exports = {
    info: info,
    start: start,
    move: move,
    end: end
}
