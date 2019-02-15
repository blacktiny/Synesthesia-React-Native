export const checkSkipable = (item) => {
  let isSkipable = false
  item.arguments.map(argument => {
    if (argument.name === 'button' && argument.value === 'cancel') {
      isSkipable = true
    }  
  })
  return isSkipable
}