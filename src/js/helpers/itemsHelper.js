export default (itemset) => {
  let main = null
  let completion = null
  let triggers = []
  itemset.map(item => {
    if (item.arguments.length !== 0)
    {
      item.arguments.some((argument, index) => {
        if (argument.name === 'main') {
          main = item
          return
        }
        if (argument.name === 'completed') {
          completion = item
          return
        }
        if (argument.name.includes('start_trigger')) {
          triggers.push(item);
          return
        }
      })
    } else {
      main = item
    }
  })
  
  return { main, completion, triggers }
}