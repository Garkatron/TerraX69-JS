export default class GObject {
    constructor(p, w, h, x=0, y=0) {
        this.id = "";
        this.p = p;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.content = [];
    }

    addContent(...content) {
        this.content = content;
        return this;
    }

    setId(id) {
        this.id=id;
        return this;
    }

    getById(id) {
        return this.content.find(c => c.id === id);
    }

    draw() {
        this.content.forEach(c=>{
            c.draw();
        })
    }

    update() {

    }


}