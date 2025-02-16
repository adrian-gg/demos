$(document).ready(function () {
  const listNumsBox = $("#listNums")
  const currentNumBox = $("#current-num")
  const scoreBox = $("#score")
  const resetBtn = $(".reset")
  let listNumsBase = []
  let numsPlayedBase = []
  let nextNum

  const getRandomNumber = (min = 0, max = 1000) => {
    return Math.round(Math.random() * (max - min) + min)
  }

  const isRepeated = (numsPlayed, num) => {
    const numRepeated = numsPlayed.filter((numPlayed) => numPlayed === num)
    return numRepeated.length !== 0
  }

  const isPlayable = (lowerIndex, largerIndex) => {
    return lowerIndex + 1 !== largerIndex
  }

  const classNames = (...classes) => {
    return classes.filter((className) => className).join(" ")
  }

  const getNextNum = () => {
    const newNum = getRandomNumber()
    return isRepeated(numsPlayedBase, newNum) ? getNextNum() : newNum
  }

  const getLowerAndLargerIndex = (num) => {
    const playedNums = [...new Set(listNumsBase)].sort((a, b) => a - b)
    let prevLowerNum = null
    let nextLargerNum = null

    for (let i = 0; i < playedNums.length; i++) {
      const numPlayedForLow = playedNums[playedNums.length - 1 - i]
      const numPlayedForLarge = playedNums[i]
      if (prevLowerNum === null && numPlayedForLow < num) {
        prevLowerNum = listNumsBase.indexOf(numPlayedForLow)
      }
      if (nextLargerNum === null && numPlayedForLarge > num) {
        nextLargerNum = listNumsBase.indexOf(numPlayedForLarge)
      }
    }

    if (prevLowerNum === null || prevLowerNum === 0) {
      prevLowerNum = -1
    }
    if (nextLargerNum === null) {
      nextLargerNum = listNumsBase.length
    }

    return { lower: prevLowerNum, larger: nextLargerNum }
  }

  const renderListNums = (numIndex) => {
    listNumsBox.empty()

    listNumsBase.forEach((num, index) => {
      const isPlayed = num && "item-played"
      const idSelected =
        index >= numIndex?.lower && index <= numIndex?.larger && "item-selected"
      listNumsBox.append(`
    <li id="${index}" class="${classNames("item", isPlayed, idSelected)}">
      <span class="order-num">${(index + 1).toString().padStart(2, 0)}.</span>
      <span class="num">${num ? num : ""}</span>
    </li>
    `)
    })
  }

  const renderNextNum = (num) => {
    currentNumBox.empty().append(num)
  }

  const renderScore = () => {
    scoreBox.empty().append(`${numsPlayedBase.length}/${listNumsBase.length}`)
  }

  const nextStep = () => {
    nextNum = getNextNum()
    numsPlayedBase.push(nextNum)
    renderNextNum(nextNum)
    const numIndex = getLowerAndLargerIndex(nextNum)

    isPlayable(numIndex.lower, numIndex.larger)
      ? renderListNums(numIndex)
      : gameOver()
  }

  const startGame = () => {
    resetGame()
    renderScore()
    nextStep()
  }

  const gameOver = () => {}

  const resetGame = () => {
    listNumsBase = new Array(20).fill(0)
    numsPlayedBase = []
  }

  listNumsBox.on("click", ".item", function () {
    const order = $(this).attr("id")
    listNumsBase[order] = nextNum
    renderListNums()
    renderScore()
    nextStep()
  })

  resetBtn.click(() => {
    startGame()
  })

  renderListNums()
  startGame()
})
