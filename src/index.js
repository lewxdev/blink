const turnIndicator = document.querySelector("#turn-indicator")
const grid = document.querySelector("main#grid")
let turn = 0,
	turns = 0

function blinkElement(element = document.body, instances = 3, duration = 1000) {
	const totalDuration = instances * duration
	const blink = setInterval(() => element.classList.toggle("hidden"), duration / 2)
	setTimeout(() => clearInterval(blink), totalDuration)
	return totalDuration
}

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
						document.querySelectorAll(".column").forEach(column => column.onclick = null)
						
						setTimeout(() => {
							gameGrid = initalGrid()
							turns = 0
						}, 3000)
                    } else {
						turn = turn === 0 ? 1 : 0
						turns++
					}

					if (turns === gameGrid.length * gameGrid[0].length) {
						alert("It's a draw!")
						
						setTimeout(() => {
							gameGrid = initalGrid()
						}, blinkElement(document.querySelector(".content-wrapper"), 4, 750))
					}

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
	
	document.body.onkeyup = (event) => {
		document.querySelectorAll(".column").forEach((column, index) => {
			if (event.key === `${index + 1}`) column.onclick()
		})
	}

    return gridArr
}
let gameGrid = initalGrid();

document.querySelector(".close").onclick = function() {
    document.querySelectorAll(".info, .modal-container:nth-child(2)").forEach(element => element.classList.toggle("hidden"))
}

function checkWin(coordinates) {

    const checkVert = function() {
		let vertStr = "",
			vertArr = []

        let yIndex = coordinates.y
        while (yIndex >= 0) {
			let currentChip = gameGrid[coordinates.x][yIndex].querySelector(".chip")
			vertArr.push(currentChip)

            if (currentChip.classList.contains("p0")) currentChip = "0"
            else currentChip = "1"

            vertStr += currentChip
            yIndex--
		}

		["0000", "1111"].forEach(condition => {
			if (vertStr.includes(condition)) {
				const firstTileIndex = vertStr.indexOf(condition)
				
				for (let winTileIndex = firstTileIndex; winTileIndex < firstTileIndex + 4; winTileIndex++)
					vertArr[winTileIndex].classList.add("glow")
			}
		})
    }()

    const checkHorz = function() {
		let horzStr = "",
			horzArr = []

        let xIndex = 0
        while (xIndex < gameGrid.length) {
			let currentChip = gameGrid[xIndex][coordinates.y].querySelector(".chip")
			horzArr.push(currentChip)

            if (!currentChip) currentChip = "N"
            else if (currentChip.classList.contains("p0")) currentChip = "0"
            else currentChip = "1"

            horzStr += currentChip
            xIndex++
		}

        ["0000", "1111"].forEach(condition => {
			if (horzStr.includes(condition)) {
				const firstTileIndex = horzStr.indexOf(condition)
				
				for (let winTileIndex = firstTileIndex; winTileIndex < firstTileIndex + 4; winTileIndex++)
					horzArr[winTileIndex].classList.add("glow")
			}
		})
    }()

    const checkNegDiag = function() {
		let negDiagStr = "",
			negDiagArr = []

        down: {
            let xIndex = coordinates.x,
                yIndex = coordinates.y
            while (yIndex >= 0 && xIndex < gameGrid.length) {
				let currentChip = gameGrid[xIndex][yIndex].querySelector(".chip")
				negDiagArr.push(currentChip)

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
            while (yIndex < gameGrid[0].length && xIndex >= 0) {
				let currentChip = gameGrid[xIndex][yIndex].querySelector(".chip")
				negDiagArr.unshift(currentChip)

                if (!currentChip) currentChip = "N"
                else if (currentChip.classList.contains("p0")) currentChip = "0"
                else currentChip = "1"

                negDiagStr = currentChip + negDiagStr

                yIndex++
                xIndex--
            }
		}

        ["0000", "1111"].forEach(condition => {
			if (negDiagStr.includes(condition)) {
				const firstTileIndex = negDiagStr.indexOf(condition)
				
				for (let winTileIndex = firstTileIndex; winTileIndex < firstTileIndex + 4; winTileIndex++)
					negDiagArr[winTileIndex].classList.add("glow")
			}
		})
    }()

    const checkPosDiag = function() {
		let posDiagStr = "",
			posDiagArr = []

        down: {
            let xIndex = coordinates.x,
                yIndex = coordinates.y
            while (yIndex >= 0 && xIndex >= 0) {
				let currentChip = gameGrid[xIndex][yIndex].querySelector(".chip")
				posDiagArr.push(currentChip)

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
            while (yIndex < gameGrid[0].length && xIndex < gameGrid.length) {
				let currentChip = gameGrid[xIndex][yIndex].querySelector(".chip")
				posDiagArr.unshift(currentChip)

                if (!currentChip) currentChip = "N"
                else if (currentChip.classList.contains("p0")) currentChip = "0"
                else currentChip = "1"

                posDiagStr = currentChip + posDiagStr

                yIndex++
                xIndex++
            }
		}

        ["0000", "1111"].forEach(condition => {
			if (posDiagStr.includes(condition)) {
				const firstTileIndex = posDiagStr.indexOf(condition)
				
				for (let winTileIndex = firstTileIndex; winTileIndex < firstTileIndex + 4; winTileIndex++)
					posDiagArr[winTileIndex].classList.add("glow")
			}
		})
    }()

    if (document.querySelector(".glow"))
        return true
}