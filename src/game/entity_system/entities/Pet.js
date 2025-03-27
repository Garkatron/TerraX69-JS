import ItemStackContainer from '../../../core/item_system/ItemStackContainer';
import Entity from '../Entity';
export default class Pet extends Entity {
    constructor(world, id, name, shiftManager) {
        super(world, id, name, shiftManager);
        this.follow = null;
        this.owner = null;
        this.inventory = new ItemStackContainer(1);
    }

    domesticate(owner, lastPet) {
        if (this.owner && this.follow) return false;
        this.follow = lastPet || owner;    
        this.owner = owner;
        console.log(this.follow);
        
        return true;
        
    }

    update() {
        if (this.owner && this.follow) {
            if (this.follow.px !== undefined && this.follow.py !== undefined) {
                
                if (this.x !== this.follow.px || this.y !== this.follow.py) {
                    let prevX = this.x;
                    let prevY = this.y;
    
                    this.x = this.follow.px;
                    this.y = this.follow.py;
    
                    this.px = prevX;
                    this.py = prevY;
                }
            }
        }
    }
    
    
    

}