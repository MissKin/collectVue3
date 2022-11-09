export const timmerOneAnim = (echartInstance, datalength = 5, delay = 5000) => {
  let count = 0
  const timer = setInterval(() => {
    echartInstance.dispatchAction({
      type: 'showTip',
      seriesIndex: 1,
      dataIndex: count
    })
    count++
    if (count > datalength) {
      count = 0
    }
  }, delay)
  return timer
}