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

export const getTriggerStopMain = item => {
  let stop = false
  item.arguments.map(argument => {
    if (argument.name === 'start_trigger' && (argument.value === 'b' || argument.value === 'break')) {
      stop = true
    }
  })
  return stop
}
export const getTriggerPeriod = (item, noStartTime, endOfOldTrigger) => {
  let startAt, endAt, fadeIn, fadeOut, endAfter

  item.arguments.map(argument => {
    switch (argument.name) {
      case 'start_at': startAt = parseTimeString(argument.value)
        break
      case 'end_at': endAt = parseTimeString(argument.value)
        break
      case 'end_after': if (noStartTime) {
          endAt = endOfOldTrigger + parseInt(argument.value)
        } else {
          endAt = startAt + parseInt(argument.value)
        }
        break
      case 'fade_out': fadeOut = parseInt(argument.value)
        break
      case 'fade_in': fadeIn = parseInt(argument.value)
        break
      default: 
        break
    }
  })

  return { startAt, endAt, fadeIn, fadeOut, endAfter }
}

export const isYoutube = (item) => {
  if (item.item.file.includes('youtube')) {
    return true
  }
  return false
} 

export const getVideoID = (item) => {
  const array = item.item.file.split('/')
  return array.pop()
} 

export const getTriggerFontStyle = (item) => {
  let color = "#ffffff", fontFamily = 'Raleway-Regular', fontSize = 18

  item.arguments.map(argument => {
    switch (argument.name) {
      case 'color': color = argument.value
        break
      case 'size': fontSize = parseInt(argument.value, 10)
        break
      default: 
        break
    }
  })

  return { color, fontFamily, fontSize }
}

export const getTriggersNextTrigger = (item) => {
  let triggersNext = false
  item.arguments.map(argument => {
    if (argument.name === "end_trigger" && argument.value.includes('end')) {
      triggersNext = true
    }
  })
  return triggersNext
}

export const getNextTrigger = (item, triggers) => {
  let endType = false, nextTrigger
  item.arguments.map(argument => {
    if (argument.name === "end_trigger") {
      endType = argument.value
    }
  })
  triggers.map(trigger => {
    trigger.arguments.map(argument => {
      if (argument.name === "start_on") {
        if (argument.value === endType) {
          nextTrigger = trigger
        }
      }
    })
  })
  return nextTrigger
}