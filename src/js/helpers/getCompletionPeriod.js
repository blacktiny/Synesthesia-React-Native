parseTimeString = time => {
  timeArg = time.split(':')
  const minutes = parseInt(timeArg[0], 10)
  const seconds = parseInt(timeArg[1], 10)
  const miliseconds = parseInt(timeArg[2], 10)
  return (minutes * 60) + seconds + (miliseconds/100)
}
 
export const getCompletionPeriod = (item_itemsets) => {
  let startAt, endAfter

  item_itemsets.map(item => {
    if (item.item.type === 'text') {
      item.arguments.map(argument => {
        switch (argument.name) {
          case 'start_at': startAt = parseTimeString(argument.value)
            break
          case 'end_after': endAfter = parseInt(argument.value, 10)
            break
          default: 
            break
        }
      })
    }
  })

  return { startAt, endAfter }
}