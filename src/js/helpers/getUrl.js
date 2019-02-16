export const getMusicUrl = (item_itemsets) => {
  let url

  item_itemsets.map(item => {
    item.arguments.map(argument => {
      if (argument.name === 'main') {
        url = item.item.file && item.item.file
      }
    })
    
  })

  return url
}