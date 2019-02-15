export default (itemset) => {
  let main = null
  let completion = null
  let triggers = []
  itemset.map(item => {
    let added = false
    if (item.item.type === 'picture') {
      added = true
      triggers.push(item);
    }
    if (item.arguments.length !== 0)
    {
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
        triggers.push(item);
      }
    } else {
      main = item
    }
  })
  
  return { main, completion, triggers }
}