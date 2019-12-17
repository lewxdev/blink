/*

0. Have a flag that keeps track of player turn
1. Add a click handler for each column
2. Make a function that places 1 red chip (in that column)

*/

let turn = 0
const column = document.querySelectorAll(".column")

column.forEach((element) => {
	element.addEventListener("click", function () {
		const chip = document.createElement("div")
		chip.classList.add("chip")
		chip.classList.add(turn === 0 ? "redchip" : "blackchip") // .redchip is 0, .blackchip is 1

		for (let cell of Array.from(element.children)) {
			if (!cell.querySelector(".chip")) {
				cell.appendChild(chip)
				turn = turn === 0 ? 1 : 0
				break
			}
		}
    })
})