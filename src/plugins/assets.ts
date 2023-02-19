import '../styles/css/global.css'

const setNaiveUIMate = () => {
  // https://www.naiveui.com/zh-CN/os-theme/docs/style-conflict
  const meta = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.appendChild(meta)
}

const disabledTouchZoom = () => {
  // 禁止 iOS 缩放
  document.addEventListener(
    'touchstart',
    (event) => {
      if (event.touches.length > 1) {
        event.preventDefault()
      }
    },
    { passive: false }
  )
  let lastTouchEnd = 0
  document.addEventListener(
    'touchend',
    (event) => {
      const now = Date.now()
      if (now - lastTouchEnd <= 300) {
        event.preventDefault()
      }
      lastTouchEnd = now
    },
    false
  )
}

/** import static assets: css, js , font and so on. - [引入静态资源，css、js和字体文件等] */
export default function setupAssets() {
  setNaiveUIMate()
  disabledTouchZoom()
}
