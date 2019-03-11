export default (itemset) => {
  let main = null
  let completion = null
  let triggers = []
  itemset.map(item => {
    let added = false
    if (item.arguments.length !== 0)
    {
      if (item.item.type === 'picture') {
        added = true
        triggers.push({item, startTime: getStartTime(item)});
      }
      item.arguments.some((argument, index) => {
        if (argument.name === 'main' && !added) {
          main = item
          added = true
          return
        }
        if (argument.name === 'completed' && !added) {
          completion = item
          added = true
          return
        }
      })
      if (!added) {
        triggers.push({ item, startTime: getStartTime(item)});
      }
    }
  })
  triggers.sort((a, b) => {
    return a.startTime - b.startTime;
  })
  const sortedTriggers = []
  triggers.map(trigger => {
    sortedTriggers.push(trigger.item)
  })
  return { main, completion, triggers: sortedTriggers }
}

getStartTime = (item) => {
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

parseTimeString = time => {
  timeArg = time.split(':')
  const minutes = parseInt(timeArg[0], 10)
  const seconds = parseInt(timeArg[1], 10)
  const miliseconds = parseInt(timeArg[2], 10)
  return (minutes * 60) + seconds + (miliseconds/100)
}