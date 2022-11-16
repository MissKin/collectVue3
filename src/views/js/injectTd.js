export default function injectTd(tk) {
    return new Promise((resolve, reject) => {
      let load = false
      // 如果已加载直接返回
      if (typeof T !== 'undefined') {
        resolve(T)
        return true
      }
      // 异步加载回调处理
      window.onload = () => {
        load = true
        resolve(T)
      }
  
      // 注入script脚本
      const script = document.createElement('script')
      script.src = `http://api.tianditu.gov.cn/api?v=4.0&tk=${tk}`
      script.doneState = { loaded: true, complete: true }
     
      document.body.appendChild(script)
      // 避免未触发window.onload方法
    //   setTimeout(() => {
    //     if (!load) {
    //       if (T) {
    //         resolve(T)
    //       }
    //     }
    //   }, 10000)
      script.onload = () => {
        console.log('script onload')
        load = true
        resolve(T)
      }
    })
  }