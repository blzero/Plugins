
const loadingType = {
    circle:'circle',
    landscapeBubble:'landscapeBubble',
    length:2
}
class loading {
    constructor(name=Math.random(),size = {width:15,height:15}) {
        this.width = size.width;
        this.heigth = size.height;

        this.loadFlag = '';
        this.timer = '';
        this.id = name;
        this.type = '';
        this.bgStyle = `position:relative;margin:0;padding:0; height:${this.heigth}px;width:${this.width}px;display:flex; justify-content:center;align-items:center;`
    }

    /**
     * @param {string|DOM} parentNode //eg.'#id'
     */
    start(parentNode) {
        if (typeof parentNode == 'string') {
            parentNode = document.querySelector(parentNode);
        }
        if (!parentNode){
            throw new Error('need a parentNode');
        }

        if(!this.loadFlag){
            this.chrysanthemumLoading();
        }
        parentNode.appendChild(this.loadFlag);

        switch(this.type){
            case 'circle':this.circle();break;
            case 'landscapeBubble':this.landscapeBubble();break;
            default: this.circle();break;
        }
       
    }

    // action
    landscapeBubble(){
        let items = document.querySelectorAll(`#${this.id} p`);

        let i = 0;
        this.timer = setInterval(()=>{
            if(i==6){
                items.forEach(function(item){
                   
                    item.style.background = '#fff';
                });

                i=0;
            }

            items[i].style = `height:5px;width:5px;border-radius:100%;margin-left:2px;transition:all 0.3s ease;transform-origin:center;background:rgba(0,0,0,0.8);`;
            i++;
        },200);
        
        console.log(items);
    }
    // action 转圈
    circle(){
        let angle = 0;
        this.timer = setInterval(() => {
            if (angle == 360) {
                angle = 0;
            }
            angle += 30;
            this.loadFlag.style = this.bgStyle + `transform:rotate(${angle}deg);`
        }, 80);
    }

    /**
     * 停止loading ,移除dom
     */
    stop() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        let d = document.querySelector(`#${this.id}`);
        if (d) {
            d.remove();
        }
        d = null;
    }
    
    // 创建 dom
    landscapeBubbleLoading(){
        this.type = loadingType.landscapeBubble;
        let bg = document.createElement('div');
        bg.id = this.id;
        bg.style = `position:relative;margin:0;padding:0;display:flex;`;
        let domF = document.createDocumentFragment();
        for(let i = 0;i < 6 ;i++){
            let item = document.createElement('p');
            item.style = `width:5px;height:5px;border-radius:100%;margin-left:2px;background:#fff;`;
            domF.appendChild(item);
        }
        bg.appendChild(domF);

        this.loadFlag = bg;
        return bg;
    }

    /**
     * 创建 dom
     * 菊花 loading {number}:type 0-圆点 /1-菊花 defaul:null
     */
    chrysanthemumLoading(type = null) {

        this.type = loadingType.circle;

        let bg = document.createElement('div');
        bg.id = this.id;
        bg.style = this.bgStyle;

        let style = 'position:absolute;margin:0;padding:0; ';
        let r = this.getRandomIntInclusive(0, loadingType.length-1);
        if(type == 0){
            r = type;
        }
        if(type == 1){
            type == 1;
        }
        switch (r) {
            case 0:style += `width:2px;height:2px;border-radius:100%;`;break;
            case 1:style += `width:5px;height:2px;`;break;
            default:
                break;
        }
        
        let radius = this.width / 2;
        let frageM = document.createDocumentFragment();
        for (let i = 0; i < 12; i++) {
            let item = document.createElement('p');
            let angle = i * 30;
            let alpha = angle / 360;

            item.style = style + `background:rgba(0,0,0,${alpha});
                                transform:rotate(${angle}deg) translateX(${radius}px);`;
            frageM.appendChild(item);
        }
        bg.appendChild(frageM);
        
        this.loadFlag = bg;

        return bg;
    }

    /**
     * @param {number} min 随机范围 起 
     * @param {number} max 随机范围 end
     */
    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }
}