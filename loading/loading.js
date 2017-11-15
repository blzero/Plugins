class loading {
    constructor(name=Math.random(),size = {width:15,height:15,name:''}) {
        this.width = size.width;
        this.heigth = size.height;

        this.timer = '';
        this.id = name;
        this.bgStyle = `position:relative;margin:0;padding:0; height:${this.heigth}px;width:${this.width}px;display:flex; justify-content:center;align-items:center;`
    }
    /**
     * 
     * @param {string|DOM} parentNode //eg.'#id'
     * @param {number} type  菊花/圆点
     */
    start(parentNode, type = null) {
        if (typeof parentNode == 'string') {
            parentNode = document.querySelector(parentNode);
        }
        let load = this.creatChrysanthemumLoading(type);
        parentNode.appendChild(load);

        let angle = 0;
        this.timer = setInterval(() => {
            if (angle == 360) {
                angle = 0;
            }
            angle += 30;
            load.style = this.bgStyle + `transform:rotate(${angle}deg);`
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
    /**
     * 创建 菊花 loading
     */
    creatChrysanthemumLoading(type) {
        let bg = document.createElement('div');
        bg.id = this.id;
        bg.style = this.bgStyle;

        let style = 'position:absolute;margin:0;padding:0; ';
        let r = this.getRandomIntInclusive(0, 1);
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

        for (let i = 0; i < 12; i++) {
            let item = document.createElement('p');
            let angle = i * 30;
            let alpha = angle / 360;

            item.style = style + `background:rgba(0,0,0,${alpha});
                                transform:rotate(${angle}deg) translateX(${radius}px);`;
            bg.appendChild(item);
        }
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