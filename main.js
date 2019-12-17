/*

0. Have a flag that keeps track of player turn
1. Add a click handler for each column
2. Make a function that places 1 red chip (in that column)

*/

let turn = 0
const column = document.querySelectorAll(".column")

column.forEach((element) => {
    element.addEventListener("click", function() {


        turn = turn === 1 ? 0 : 1
    })
})