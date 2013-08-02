function search() {
  var result = []
  var feeds = document.getElementsByClassName("a-feed")
  for (var i = 0, feed; feed = feeds[i]; i++) {
    var replys = feed.getElementsByClassName("feed-replies")[0]
    if (replys!=undefined && replys.childElementCount > 0) {
      var sofa = replys.firstElementChild
      var sofa_name = sofa.getElementsByClassName("reply-content")[0].getElementsByTagName("a")[0].textContent
      var lz_name = feed.getElementsByTagName("h3")[0].getElementsByTagName("a")[0].textContent
      result.push({
        sofa: sofa_name,
        lz: lz_name,
        position: position(feed)
      }) //sofa：沙发名，lz：楼主名，position：状态在页面中的绝对坐标
    }
  }
  return result
}

function position(feed) {
  var x = feed.offsetLeft,
    y = feed.offsetTop
  while (feed = feed.offsetParent) {
    x += feed.offsetLeft
    y += feed.offsetTop
  }
  return {
    x: x,
    y: y
  }
}

//----------------main----------------------
console.log("监听器启动")
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.message) {
    case "sofas":
      sendResponse({
        result: search()
      })
      break
    case "focus":
      window.scrollTo(request.position.x, request.position.y - paddingTop)
      break
    default:
      sendResponse({
        result: "不告诉你"
      })
  }
})

//-----------------全局变量-------------------
var paddingTop = 20 //状态的CSS里找到的属性