import Signal from "../../util/Signal";
import GObject from "../GObject";
import TextureButton from './../interaction/TextureButton';

export default class ItemStackGrid extends GObject {
    constructor(p, w = 200, h = 200, player, textureList, callback=(id, x, y, fi)=>{}, x = 0, y = 0) {
        super(p, w, h, x, y);
        this.textureList = textureList;
        this.contentList = {}
        this.callback = callback;
        this.flatIndex = {}
        this.currentSelected = 0;
        player.inventory.onContentModified.connect(
            (content)=>{
                this.addContent(content);
            }
        );
    }

    addContent(content) {
        const newContent = [];
        let fi = 0;
        for (let i = 0; i < content.length; i++) {
            const newCellArray = [];
            
            for (let j = 0; j < content[i].length; j++) {
                const cell = content[i][j];
                if (cell) {
                    this.contentList[cell.item.id] = { x: j, y: i };
                    newCellArray.push(new TextureButton(this.p, this.textureList[cell.item.id], 32, 32, cell.quantity).setOnClick(() => {
                        this.callback(cell, j, i, this.flatIndex[`x${j}:y${i}`]);
                    }));
                    this.flatIndex[`x${j}:y${i}`] = fi
                    fi++;
                }
            }
            newContent.push(newCellArray);
        }
        this.content = newContent;
    }
    

    draw() {
        this.p.strokeWeight(2);
        this.p.stroke("black");
        this.p.fill(this.p.color(0, 0, 0, 128));
        this.p.rect(this.x, this.y, this.w, this.h, 10);
        this.p.noStroke();

        let startY = this.y;

        this.content.forEach(row => {
            let currentX = this.x;
            let maxHeight = 0;
            row.forEach(cell => {
                cell.x = currentX;
                cell.y = startY;
                cell.draw();
                currentX += cell.w;
                if (cell.h > maxHeight) {
                    maxHeight = cell.h;
                }
            });
            startY += maxHeight;
        });
    }
}
