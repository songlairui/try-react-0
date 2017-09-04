// 启用Server Worker, 缓存静态资源。

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
)

export default function register() {
  const publicUrl = new URL(process.env.PUBLICURL, window.location)
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    if (publicUrl.origin !== window.location.origin) {
      return
    }

    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLICURL}/server-worker.js`

      isLocalhost ? checkValidServerWorker(swUrl) : registerValidSW(swUrl)
    })
  }
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing
        installingWorker.onstateChange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              console.info("缓存内容有更新，请刷新")
            } else {
              console.info("已将内容缓存")
            }
          }
        }
      }
    })
    .catch(error => {
      console.error("注册server worker时出错:", error)
    })
}

function checkValidServerWorker(swUrl) {
  fetch(swUrl)
    .then(response => {
      if (
        response.status === 404 ||
        response.headers.get("content-type").indexOf("javascript") === -1
      ) {
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload()
          })
        })
      } else {
        registerValidSW(swUrl)
      }
    })
    .catch(error => {
      console.info("no internet connection")
    })
}


export function unregister () {
  if('serverWorker' in navigator){
    navigator.serviceWorker.ready.then(registration=>{
      registration.unregister()
    })
  }
}