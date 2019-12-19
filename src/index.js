const turnIndicator = document.querySelector("#turn-indicator")
const grid = document.querySelector("main#grid")
let turn = 0

function initalGrid() {
	grid.innerHTML = null
	const gridArr = []

	for (let columnIndex = 0; columnIndex < 7; columnIndex++) {

		const column = document.createElement("div")
		column.className = "column"
		column.setAttribute("tabindex", columnIndex + 1)
		grid.appendChild(column)

		gridArr.push([])

		for (let cellIndex = 0; cellIndex < 6; cellIndex++) {
			const cell = document.createElement("div")
			cell.className = "cell center"
			column.appendChild(cell)

			gridArr[columnIndex].push(cell)
		}

		column.onclick = () => {
			for (let [index, cell] of Array.from(column.children).entries()) {
				if (!cell.querySelector(".chip")) {
					const chip = document.createElement("div")
					chip.className = `chip p${turn}`
					cell.appendChild(chip)
					const chipCoords = { y: index, x: columnIndex }

					if (checkWin(chipCoords)) {
						alert(`Player ${turn + 1} Won!`)
						gameGrid = initalGrid()
					} else turn = turn === 0 ? 1 : 0

					turnIndicator.className = `chip p${turn}`
					break
				}
			}
		}
		column.onkeyup = (event) => {
			if (event.key === "Enter") column.onclick()
		}
	}
	turnIndicator.className = `chip p${turn}`
	return gridArr
}
let gameGrid = initalGrid();

document.querySelector(".close").onclick = function () {
	document.querySelectorAll(".info").forEach(element => element.classList.toggle("hidden"))
}

function checkWin(coordinates) {
	const checkVert = function () {
		let vertStr = ""

		let yIndex = coordinates.y
		while (yIndex >= 0) {
			let currentChip = gameGrid[coordinates.x][yIndex].querySelector(".chip")

			if (currentChip.classList.contains("p0")) currentChip = "0"
			else currentChip = "1"

			vertStr += currentChip
			yIndex--
		}

		if (vertStr.includes("0000") || vertStr.includes("1111"))
			return true
	}()

	const checkHorz = function () {
		let horzStr = ""

		let yIndex = coordinates.y
		while (yIndex >= 0) {
			let currentChip = gameGrid[coordinates.x][yIndex].querySelector(".chip")

			if (currentChip.classList.contains("p0")) currentChip = "0"
			else currentChip = "1"

			horzStr += currentChip
			yIndex--
		}

		if (horzStr.includes("0000") || horzStr.includes("1111"))
			return true
	}()

	const checkNegDiag = function () {
		let negDiagStr = ""
		
		down: {
			let xIndex = coordinates.x,
				yIndex = coordinates.y
			while (yIndex >= 0 && xIndex < gameGrid.length) {
				let currentChip = gameGrid[xIndex][yIndex].querySelector(".chip")

				if (!currentChip) currentChip = "N"
				else if (currentChip.classList.contains("p0")) currentChip = "0"
				else currentChip = "1"

				negDiagStr += currentChip

				yIndex--
				xIndex++
			}
		}
		up: {
			let xIndex = coordinates.x - 1,
				yIndex = coordinates.y + 1
			while (yIndex < gameGrid[0].length && xIndex >= 0 ) {
				let currentChip = gameGrid[xIndex][yIndex].querySelector(".chip")

				if (!currentChip) currentChip = "N"
				else if (currentChip.classList.contains("p0")) currentChip = "0"
				else currentChip = "1"

				negDiagStr = currentChip + negDiagStr

				yIndex++
				xIndex--
			}
		}

		if (negDiagStr.includes("0000") || negDiagStr.includes("1111"))
			return true
	}()

	const checkPosDiag = function () {
		let posDiagStr = ""
		
		down: {
			let xIndex = coordinates.x,
				yIndex = coordinates.y
			while (yIndex >= 0 && xIndex >= 0) {
				let currentChip = gameGrid[xIndex][yIndex].querySelector(".chip")

				if (!currentChip) currentChip = "N"
				else if (currentChip.classList.contains("p0")) currentChip = "0"
				else currentChip = "1"

				posDiagStr += currentChip

				yIndex--
				xIndex--
			}
		}
		up: {
			let xIndex = coordinates.x + 1,
				yIndex = coordinates.y + 1
			while (yIndex < gameGrid[0].length && xIndex < gameGrid.length ) {
				let currentChip = gameGrid[xIndex][yIndex].querySelector(".chip")

				if (!currentChip) currentChip = "N"
				else if (currentChip.classList.contains("p0")) currentChip = "0"
				else currentChip = "1"

				posDiagStr = currentChip + posDiagStr

				yIndex++
				xIndex++
			}
		}

		if (posDiagStr.includes("0000") || posDiagStr.includes("1111"))
			return true
	}()

	if (checkVert || checkHorz || checkNegDiag || checkPosDiag)
		return true
}