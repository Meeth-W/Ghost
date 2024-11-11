import config from "../../config";
import { renderBoxOutline, renderFilledBox } from "../../../BloomCore/RenderUtils"
import { chat, isInDungeon } from "../../utils/utils";

// Credit: IllegalMap - UnclaimedBloom6
// const starMobRegex = /^§6✯ (?:§.)*(.+)§r.+§c❤$|^(Shadow Assassin)$/

const starMobRegex = /^§6✯ (?:§.)*(.+)§r.+§c❤$|^(Shadow Assassin|Wither.*)$/

class StarMob {
    constructor(entity) {
        this.entity = entity;
        this.id = entity.getUUID();
        this.name = entity.getName();
        this.icon = null;
        this.wither = false;
        // this.updateHeight()
        this.update()
    }

    // updateHeight() {
    //     const [_, mobName, specialMob] = this.name.match(starMobRegex);

    //     this.height = 1.9;

    //     if (specialMob) return;
    //     if (/^(?:\w+ )*Fels$/.test(mobName)) this.height = 2.8;
    //     else if (/^(?:\w+ )*Withermancer$/.test(mobName)) this.height = 2.8;
    //     else if (/Wither/.test(mobName)) this.height = 1;  // Matches any mob with "Wither" in its name
    // }

    update() {
        this.name = this.entity.getName();

        this.x = this.entity.getX();
        this.y = this.entity.getY();
        this.z = this.entity.getZ();

        this.yaw = this.entity.getYaw() - 180;
    }
}

let starMobs = [];
const scanMobs = register('tick', () => {
    if (!isInDungeon()) return;
    let star = [];
    World.getAllEntities().forEach(entity => {
        const match = entity.getName().match(starMobRegex);
        if (!match) return false;

        const mob = new StarMob(entity);
        const [_, mobName, specialMob] = match;
        let height = 1.9;

        if (!specialMob) {
            if (/^(?:\w+ )*Fels$/.test(mobName)) height = 2.8;
            else if (/^(?:\w+ )*Withermancer$/.test(mobName)) height = 2.8;
        }
        if (/Wither/.test(specialMob)) height = 3;  // Matches any mob with "Wither" in its name
        mob.height = height;
        star.push(mob);
    });

    starMobs = star;
}).unregister();

const renderESP = register('renderWorld', () => {
    if (!starMobs.length) return;
    const color = config().mobESPColor;
    const r = color[0] / 255;
    const g = color[1] / 255;
    const b = color[2] / 255;

    starMobs.forEach(mob => {
        if (mob.height == 3) {
            renderBoxOutline(mob.x, mob.y, mob.z, 1, mob.height, r, g, b, 1, 2, true); renderFilledBox(mob.x, mob.y, mob.z, 1, mob.height, r, g, b, 0.2, 2, true);
        } else {
            renderBoxOutline(mob.x, mob.y - Math.ceil(mob.height), mob.z, 0.6, mob.height, r, g, b, 1, 2, true); renderFilledBox(mob.x, mob.y - Math.ceil(mob.height), mob.z, 0.6, mob.height, r, g, b, 0.2, 2, true);
        }
        
    });
}).unregister();

export function toggle() {
    if (config().mobESP && config().toggle) {
        scanMobs.register();
        renderESP.register();
        return
    }
    scanMobs.unregister();
    renderESP.unregister();
    return
}
export default { toggle };