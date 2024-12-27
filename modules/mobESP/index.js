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

        this.color = {
            r: 0,
            g: 0,
            b: 0
        };
        
        this.update()
    }
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
        let color = config().mobESPStarred;

        if (!specialMob) {
            if (/^(?:\w+ )*Fels$/.test(mobName)) {
                height = 2.8;
                color = config().mobESPFels;
            } else if (/^(?:\w+ )*Withermancer$/.test(mobName)) {
                height = 2.8;
            }
        }
        if (/Wither/.test(specialMob)) {
            height = 3;
            color = config().mobESPWithers;
        }

        if (/Shadow Assassin/.test(specialMob)) {
            height = 1.8;
            color = config().mobESPShadowAssassins;
        }

        mob.color = color;
        mob.height = height;
        
        star.push(mob);
    });

    starMobs = star;
}).unregister();

const renderESP = register('renderWorld', () => {
    if (!starMobs.length) return;

    starMobs.forEach(mob => {
        const r = mob.color[0]/255;
        const g = mob.color[1]/255;
        const b = mob.color[2]/255;
        
        if (mob.height == 3 || mob.height == 1.8) {
            renderBoxOutline(mob.x, mob.y, mob.z, 0.7, mob.height, r, g, b, 1, 2, true); renderFilledBox(mob.x, mob.y, mob.z, 0.7, mob.height, r, g, b, 0.2, 2, true);
        } else {
            renderBoxOutline(mob.x, mob.y - Math.ceil(mob.height), mob.z, 0.6, mob.height, r, g, b, 1, 2, true); renderFilledBox(mob.x, mob.y - Math.ceil(mob.height), mob.z, 0.6, mob.height, r, g, b, 0.2, 2, true);
        }
        
    });
}).unregister();

export function toggle() {
    if (config().mobESP && config().toggle && config().toggleCheat) {
        scanMobs.register();
        renderESP.register();
        return
    }
    scanMobs.unregister();
    renderESP.unregister();
    return
}
export default { toggle };