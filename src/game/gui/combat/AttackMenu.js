import VBox from "../../../core/gui_system/container/VBox";
import Text from "../../../core/gui_system/info/Text";
import Scene from "../../../core/scene_system/Scene";
import Global from "../../Global";
import ItemWeapon from "../../items/weapons/ItemWeapon";
import SpecialButton from "../SpecialButton";

export default class AttackMenu extends Scene {
    constructor(entity) {
        super();
        this.entity = entity;
        this.global = new Global();
        this.box = new VBox(this.p, 200, 200);
    }

    setup() {
        this.refresh();
    }

    refresh() {
        this.box.content = [];
        this.box.addObject(new Text(this.p, "Life: ", 200, 20).setId("life"));

        const inventoryItems = this.entity.getItemsOf(ItemWeapon);
        inventoryItems.forEach(item => this.addWeaponButton(item));
    }

    addWeaponButton(item) {
        if (item?.item instanceof ItemWeapon) {
            this.box.addObject(
                new SpecialButton(this.p, new Text(this.p, item.item.name), 200, 20)
                    .setOnClick(() => this.handleAttack(item.item))
            );
        }
    }

    handleAttack(weapon) {
        if (!this.entity.currentEnemy) return;
        
        
        const pDamage = this.entity.useAttack(weapon.name).item.damage;
                

        const result = this.entity.currentEnemy.hurt(pDamage);
        this.entity.combatMode = result !== "dead";
        
        this.entity.hurt(this.entity.currentEnemy.useAttack());

        if (result === "dead") {            
            this.entity.currentEnemy = null;
        }
    }

    update() {
        this.box.x = this.x;
        this.box.y = this.y;
        
        if (this.entity.currentEnemy && this.box.hasObjectWithId("life")) {
            this.box.getById("life").setText(`Life: ${this.entity.currentEnemy.life}`);
        }
    }

    draw() {
        this.box.draw();
    }
}