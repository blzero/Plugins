/**
 * @author [bizhenyu]
 * @email 
 * @create date 2018-05-30 02:59:46
 * @modify date 2018-05-31 05:58:27
 * @desc [description]
 */
// offsetWidth 包括 padding /border, 不包括margin 

// 是否是 HTML 元素
function isHtmlControl(obj) {
    var d = document.createElement("div");
    try {
        d.appendChild(obj.cloneNode(true));
        return obj.nodeType == 1 ? true : false;
    } catch (e) {
        return obj == window || obj == document;
    }
}

// 给dom 添加鼠标进入离开事件
function addStopEvent(dom,enterCallback,leaveCallBack){
    dom.addEventListener('mouseenter', function () {
       enterCallback && enterCallback();
    });
    dom.addEventListener('mouseover', function () {
        enterCallback && enterCallback();
    });
    dom.addEventListener('mouseleave', function () {
        leaveCallBack && leaveCallBack();
    });
}

var animationUp = function(heigth){
    var str = `transition:all 0.5s; transform:translateY(${-heigth}px);`;
    return str;
}
var animationLeft = function(width){
    var str = `transition:all 0.5s; transform:translateX(${-width}px);`;
    return str;
}

// 默认设置
var defaultOption = {
    speed: 30, //
    hoverStop: false, // 是否hover停止滚动
    pageScroll: false, // 是否分页滚动
}

// 滚动对象
let yzMarquee = function (dom, option) {

    for (let k in defaultOption) {
        this[k] = option && option[k] || defaultOption[k];
    }

    // this.speed = option.speed || 30;
    // this.hoverStop = option.hoverStop || false;
    // this.pageScroll = option.pageScroll || false;
    this.dom = dom;
}

// 向左 滚动
yzMarquee.prototype.scrollLeft = function () {
    var dom = this.dom;
    var speed = this.speed;
    var pageScroll = this.pageScroll;
    var hoverStop = this.hoverStop;

    var dis = 0;
    var child = dom.children;
    var childsLength = child.length;
    var timer = '';
    var pageTimer = '';
    var canScroll = true;

    for (let i = 0; i < childsLength; i++) {
        let c = child[i];
        c.style.display = 'inline';
        console.log(c.style);
    }

    if (childsLength == 1) {
        let clone = child[0].cloneNode();
        clone.innerHTML = child[0].innerHTML;
        dom.appendChild(clone);
    }
    if (hoverStop) {
        addStopEvent(dom,function hover(){
            canScroll = false;
            clearTimeout(timer);
            clearTimeout(pageTimer);
        },function leave(){
            canScroll = true;
            timer = setTimeout(scroll, speed);
        });
        
    }

    function scroll() {
        if (!canScroll) {
            return;
        }
        let fC = dom.children[0];
        let second = dom.children[1];
        
        let fW = fC.offsetWidth;

        if (pageScroll) {

            let ss = animationLeft(fW);
            fC.style = ss;
           
            second.style = ss;


            pageTimer = setTimeout(function () {

                fC.style = '';
                second.style = ''
                
                dom.scrollLeft = fW;
                fC.remove();
                dom.appendChild(fC);
                dom.scrollLeft = 0;

                timer = setTimeout(scroll, speed);
            }, 500);

        } else {
            dis++;
            // 滚动完 first
            if (dis >= fW) {
                console.log(dis,fW);
                fC.remove();
                dom.appendChild(fC);
                dis = dis-fW;
            }

            dom.scrollLeft = dis;
            timer = setTimeout(scroll, speed);
        }

    }
    timer = setTimeout(scroll, speed);

    return this;
}
// 向上滚动
yzMarquee.prototype.scrollUp = function () {
    var dom = this.dom;
    var speed = this.speed;
    var pageScroll = this.pageScroll;
    var hoverStop = this.hoverStop;

    var dis = 0;
    var child = dom.children;
    var childsLength = child.length;
    var timer = '';
    var pageTimer = '';
    var canScroll = true;

    if (childsLength == 1) {
        let clone = child[0].cloneNode();
        clone.innerHTML = child[0].innerHTML;
        dom.appendChild(clone);
    }

    if (hoverStop) {
        addStopEvent(dom,function hover(){
            canScroll = false;
            clearTimeout(timer);
            clearTimeout(pageTimer);
        },function leave(){
            canScroll = true;
            timer = setTimeout(scroll, speed);
        });
    }

    function scroll() {
        let fC = dom.children[0];
        let fH = fC.offsetHeight;
        let second = dom.children[1];
        let sH = second.offsetHeight;
        
     
        if (pageScroll) {
            let ss = animationUp(fH);
            fC.style = ss;
            second.style = ss;


            pageTimer = setTimeout(function () {
                fC.style = '';
                second.style = '';

                dom.scrollTop = fH;
                fC.remove();
                dom.appendChild(fC);
                dom.scrollTop = 0;

                timer = setTimeout(scroll, speed);
            }, 500);

        } else {
            dis++;
            // 滚动完 first
            if (dis >= fH) {
                console.log(dis,fH);
                fC.remove();
                dom.appendChild(fC);
                dis = dis-fH;
            }
            dom.scrollTop = dis;
            timer = setTimeout(scroll, speed);
        }
    }
    timer = setTimeout(scroll, speed);
    return this;
}


var zyMarquee = function (selector, option) {
    var doc = document.documentElement;
    var isDom = isHtmlControl(selector);
    let dom = '';
    if (!isDom) {
        dom = doc.querySelector(selector);
        if (!dom) {
            throw new Error('check selector');
            return
        }
    } else {
        dom = selector;
    }

    return new yzMarquee(dom, option);
}