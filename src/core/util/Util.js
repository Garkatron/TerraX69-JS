export default class Util {
    static createMapFilledWith(width, height, id) {
        return Array(width).fill().map(() => Array(height).fill(id));
    }


    static posGlobalToChunkLocal(x, y, chunk) {        
        const localX = x - chunk.x * chunk.size;
        const localY = y - chunk.y * chunk.size;        

        let rx = localX;
        let ry = localY;

        if (rx<0) {
            rx+=chunk.size;
        } else if(rx>15) {
            rx-=chunk.size;
        }
        if (ry<0) {
            ry+=chunk.size;
        } else if(ry>15) {
            ry-=chunk.size;
        }

        return {x: rx, y: ry}
    }
}
