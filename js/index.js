touchBanner();
setWidth();
// 触屏开始 记录起始位置 停止定时器
// 触屏移动 记录移动后位置 计算距离差值
// 触屏结束 判断用户滑动方向 切换轮播图
function touchBanner(){
    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    var banner = $('.wjs-banner');
    banner.on('touchstart',function(e){    // 触屏开始
        // console.log(e)    // 在这里e是jQuery对象 是jQ封装过的对象 否则是TouchEvent对象
        // 用jQuery的语法绑定事件得到事件对象是jq的事件对象 jq会在原始DOM事件基础上进行包装 如果需要获取原始DOM事件对象通过originalEvent获取
        startX = e.originalEvent.targetTouches[0].clientX;
        // console.log(startX)
        $('.carousel').carousel('pause')    // 停止定时器
    })
    banner.on('touchmove',function(e){     // 触屏移动
        moveX = e.originalEvent.targetTouches[0].clientX;
        distanceX = moveX-startX;
        console.log(distanceX)
    })
    banner.on('touchend',function(){      // 触屏结束
        if(distanceX>0){
            // 上一张 右滑
            $('.carousel').carousel('prev')
        }
        if(distanceX<0){
            // 下一张 左滑
            $('.carousel').carousel('next')
        }
        // 数据重置
        startX = 0;
        moveX = 0;
        distanceX = 0;
        $('.carousel').carousel('cycle')
    })
}
function setWidth(){
    var w = 0;
    $('.wjs-tabs li').each(function(index,ele){
        // jq获取各种宽度
        // width()  content
        // innerWidth() content + padding
        // outerWidth() content + padding +border
        // outerWidth(true) content + padding + border + margin
        w += $(ele).outerWidth(true)
    })
    console.log(w)
    $('.wjs-tabs').width(w)
}
// 栅格系统实现响应式:
//   媒体查询 + 百分比布局 + 浮动