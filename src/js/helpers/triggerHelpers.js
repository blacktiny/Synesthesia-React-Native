export const getShowButton = (item) => {
  showButton = false
  item.arguments.map(argument => {
    if (argument.name === 'button') {
      showButton = true
    }
  })

  return showButton
}

export const getLoop = (item) => {
  loopTimeout = null
  item.arguments.map(argument => {
    if (argument.name === 'loop') {
      loopTimeout = parseInt(argument.value, 10)
    }
  })

  return loopTimeout
}

parseTimeString = time => {
  timeArg = time.split(':')
  const minutes = parseInt(timeArg[0], 10)
  const seconds = parseInt(timeArg[1], 10)
  const miliseconds = parseInt(timeArg[2], 10)
  return (minutes * 60) + seconds + (miliseconds/100)
}
 
export const getTriggerPeriod = (item) => {
  let startAt

  item.arguments.map(argument => {
    switch (argument.name) {
      case 'start_at': startAt = parseTimeString(argument.value)
        break
      default: 
        break
    }
  })

  return startAt
}