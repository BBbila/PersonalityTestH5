import ReactDOM from 'react-dom'
import STATIC from '../static'

export default {
  trimEnd (str) {
    let ret = ''
    try {
      if (str.indexOf('.') > -1) {
        let arr = str.split('.')
        ret = arr[0] + '.' + arr[1].replace(/0+$/, '')
      } else {
        ret = str
      }
    } catch (error) {
      ret = str
    }
    return Number(ret)
  },
  getQueryString (key) {
    let reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
    let r = window.location.search.substr(1).match(reg)
    if (r != null) return decodeURIComponent(r[2])
    return null
  },
  // 让首屏图展示在正中位置计算住应该偏移距离
  calculateWidth () {
    let unit = window.document.documentElement.clientHeight / 12.06
    let diff = 7.50 * unit - window.document.documentElement.clientWidth
    console.log(window.document.documentElement.clientHeight, unit, 7.50 * unit, window.document.documentElement.clientWidth, diff)
    return (diff > 0) ? diff/2 : 0
  },
  initRequestAnimationFrame () {
    if(window.requestAnimationFrame) {
      return
    }
    if (window.webkitRequestAnimationFrame) {
      window.requestAnimationFrame = window.webkitRequestAnimationFrame
      window.cancelAnimationFrame = window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame
      return
    }
    if (window.mozRequestAnimationFrame) {
      window.requestAnimationFrame = window.mozRequestAnimationFrame
      window.cancelAnimationFrame = window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame
      return
    }
    let lastTime = 0
    if (!window.requestAnimationFrame){
      window.requestAnimationFrame = function(callback) {
        let currTime = new Date().getTime()
        let timeToCall = Math.max(0, 16 - (currTime - lastTime))
        let id = window.setTimeout(function() { callback(currTime + timeToCall) }, timeToCall)
        lastTime = currTime + timeToCall
        return id
      }
    }
    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(id) { clearTimeout(id) }
    }
  },
  scrollLeftDom (dom, to) {
    if (!dom || !to) {
      return
    }
    this.initRequestAnimationFrame()
    let scrollLeft = function() {
      let index = window.requestAnimationFrame(() => {
        dom.scrollLeft = dom.scrollLeft + 3
        if (dom.scrollLeft < to) {
          scrollLeft()
        }
        window.cancelAnimationFrame(index)
      })
    }
    scrollLeft()
  },
  isStopScroll: false,
  stopScrollDom () {
    this.isStopScroll = true
  },
  scrollDom (dom, toNum = 0, speed = 5, callback = () => {}) {
    if (!dom) {
      return
    }
    this.isStopScroll = false
    !window.requestAnimationFrame && this.initRequestAnimationFrame()
    let fromNum = dom.scrollLeft
    let bodyWidth = document.body.offsetWidth
    let scroll

    toNum < 0 && (toNum = 0)
    if (dom.scrollWidth - bodyWidth < toNum) {
      toNum = dom.scrollWidth - bodyWidth
    }

    if (fromNum > toNum) {
      scroll = () => {
        let index = window.requestAnimationFrame(() => {
          window.cancelAnimationFrame(index)
          if (this.isStopScroll) {
            return
          }
          if (dom.scrollLeft - speed > toNum) {
            scroll()
            dom.scrollLeft = dom.scrollLeft - speed
          } else {
            callback()
          }
        })
      }
    } else {
      scroll = () => {
        let index = window.requestAnimationFrame(() => {
          window.cancelAnimationFrame(index)
          if (!this.isStopScroll) {
            if (dom.scrollLeft + speed < toNum) {
              scroll()
              dom.scrollLeft = dom.scrollLeft + speed
            } else {
              callback()
            }
          }
        })
      }
    }
    scroll()
  },


  getSessionStorage (str = 'appstoreActivity',flag) {
    let dataStr = sessionStorage.getItem(str)
    let data = null
    let total = 0
    try {
      data = JSON.parse(dataStr)
      if (!flag) {
        for(let i in data) {
          data[i] && ++total
        }
        data.total = total
      }
    } catch {
      data = null
    }
    return data
  },
  setSessionStorage (str = 'appstoreActivity', obj) {
    let data = this.getSessionStorage(str, true) || {}
    let dataNew = Object.assign(data, obj)//新的值覆盖旧的值
    sessionStorage.setItem(str, JSON.stringify(dataNew))//JSON.stringify() 方法是将一个JavaScript值(对象或者数组)转换为一个 JSON字符串
  },
  //改变按钮颜色的方法
  changeBtnColor (el,d) {
    //ReactDOM.findDOMNode(el).style.backgroundImage = `url("${STATIC.imgs.btn_blue}")`;
    let i = 0
    let len = el.length
    for(i;i<len;i++){
      ReactDOM.findDOMNode(el[i]).style.backgroundImage = `url("${STATIC.imgs.btn_blue}")`;
    }
    ReactDOM.findDOMNode(d).style.backgroundImage = `url("${STATIC.imgs.btn_pink}")`;
  },
  //改变class
  changeClass(el,newClassName,oldClassName){
    this.addClass(el,newClassName);
    this.removeClass(el,oldClassName);
  },
  //增加class
  addClass(el, className) {
    if (!el || this.hasClass(el, className)) {
      return
    }
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
  },
  removeClass(el, className) {
    if (!el || !this.hasClass(el, className)) {
      return
    }
    let newClass = el.className.split(' ')
    newClass.splice(newClass.indexOf(className), 1)
    el.className = newClass.join(' ')
  },
  hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return el && reg.test(el.className)
  },

  // H5网页调起app的方法
  callApp (schemaUrl, downloadUrl) {
    let aLink = document.createElement('a')
    aLink.style.cssText = 'display:none;width:0px;height:0px;'
    aLink.href = schemaUrl
    document.body.appendChild(aLink)
    aLink.click()

    let _clickTime = new Date().getTime()
    let _count = 0
    let intHandle = setInterval(() => {
      _count++
      let elsTime = new Date().getTime() - _clickTime
      if (_count >= 150 || elsTime > 3000 ) {
        clearInterval(intHandle)
        //检查app是否打开
        if ( document.hidden || document.webkitHidden) {
          window.close()
        } else {
          window.location.href = downloadUrl
        }
      }
    }, 20);

    //检查app是否打开
    let visibilitychange = function () {
      let isHidden = document.hidden || document.webkitHidden
      isHidden && clearInterval(intHandle)
    }
    document.addEventListener('visibilitychange', visibilitychange, false)
    document.addEventListener('webkitvisibilitychange', visibilitychange, false)
    //检查app是否打开 pagehide 必须绑定到window
    window.addEventListener('pagehide', function () {
      clearInterval(intHandle)
    }, false)
  },
}