import { calcSkillLevel, convertToPBTime } from '../../../BloomCore/utils/Utils';
import config from '../../config';
import { data } from '../../utils/data';
import playerData from '../../utils/player';
import { abbreviateNumber, capitalize, chat, formatNumber, getSbLevelPrefix } from '../../utils/utils';


/**
 * Gets the PB of the player based on select floor in the config.
 * @param {playerData} player 
 */
function getPB(player) {
    if (config().partyFinderDungeonType == 0) {
        switch (config().partyFinderDungeonFloor) {
            case 0: return ['F1', player.data.dungeons.best_runs.catacombs.f1]
            case 1: return ['F2', player.data.dungeons.best_runs.catacombs.f2]
            case 2: return ['F3', player.data.dungeons.best_runs.catacombs.f3]
            case 3: return ['F4', player.data.dungeons.best_runs.catacombs.f4]
            case 4: return ['F5', player.data.dungeons.best_runs.catacombs.f5]
            case 5: return ['F6', player.data.dungeons.best_runs.catacombs.f6]
            case 6: return ['F7', player.data.dungeons.best_runs.catacombs.f7]
        }
    } else {
        switch (config().partyFinderDungeonFloor) {
            case 0: return ['M1', player.data.dungeons.best_runs.master_catacombs.m1]
            case 1: return ['M2', player.data.dungeons.best_runs.master_catacombs.m2]
            case 2: return ['M3', player.data.dungeons.best_runs.master_catacombs.m3]
            case 3: return ['M4', player.data.dungeons.best_runs.master_catacombs.m4]
            case 4: return ['M5', player.data.dungeons.best_runs.master_catacombs.m5]
            case 5: return ['M6', player.data.dungeons.best_runs.master_catacombs.m6]
            case 6: return ['M7', player.data.dungeons.best_runs.master_catacombs.m7]
        }
    }
}

/**
 * Gets the completions of the player based on select floor in the config.
 * @param {playerData} player 
 */
function getCompletions(player) {
    if (config().partyFinderDungeonType == 0) {
        switch (config().partyFinderDungeonFloor) {
            case 0: return ['F1', player.data.dungeons.completions.catacombs.f1]
            case 1: return ['F2', player.data.dungeons.completions.catacombs.f2]
            case 2: return ['F3', player.data.dungeons.completions.catacombs.f3]
            case 3: return ['F4', player.data.dungeons.completions.catacombs.f4]
            case 4: return ['F5', player.data.dungeons.completions.catacombs.f5]
            case 5: return ['F6', player.data.dungeons.completions.catacombs.f6]
            case 6: return ['F7', player.data.dungeons.completions.catacombs.f7]
        }
    } else {
        switch (config().partyFinderDungeonFloor) {
            case 0: return ['M1', player.data.dungeons.completions.master_catacombs.m1]
            case 1: return ['M2', player.data.dungeons.completions.master_catacombs.m2]
            case 2: return ['M3', player.data.dungeons.completions.master_catacombs.m3]
            case 3: return ['M4', player.data.dungeons.completions.master_catacombs.m4]
            case 4: return ['M5', player.data.dungeons.completions.master_catacombs.m5]
            case 5: return ['M6', player.data.dungeons.completions.master_catacombs.m6]
            case 6: return ['M7', player.data.dungeons.completions.master_catacombs.m7]
        }
    }
}

function mmssToMillis(mmss) {
	const match = mmss.match(/^(\d+):(\d+)$/);
	if (match === null) return;
	const [mm, ss] = match.splice(1).map(t => parseInt(t));
	return (mm * 60 + ss) * 1000;
}


/**
 * Checks wether a player meets the requirements
 * @param {playerData} player 
 */
function checkKick(player) {
    // Pb, completions, cata, class, magical power, sb level, secrets, whitelist/blacklist
    if (config().partyFinderListing && Object.keys(data.partyFinder.whitelist).find(player.player.uuid) != undefined) return [false, `Whitelisted Player: ${data.partyFinder.whitelist[player.player.uuid].reason}`]
    if (config().partyFinderListing && Object.keys(data.partyFinder.blacklist).find(player.player.uuid) != undefined) return [true, `Blacklisted Player: ${data.partyFinder.blacklist[player.player.uuid].reason}`]

    if (mmssToMillis(config().partyFinderPB) < getPB(player)) return [true, `PB: ${convertToPBTime(getPB(player))} > ${config().partyFinderPB}`]
    if (parseInt(config().partyFinderMP) > parseInt(player.data.accessories.magical_power)) return [true, `MP: ${formatNumber(parseInt(config().partyFinderMP))} > ${formatNumber(player.data.accessories.magical_power)}`]
    if (parseInt(config().partyFinderSecrets) > parseInt(player.data.dungeons.secrets)) return [true, `Secrets: ${formatNumber(parseInt(config().partyFinderSecrets))} > ${formatNumber(parseInt(player.data.dungeons.secrets))}`]
    if (parseInt(config().partyFinderSBLevel) > parseInt(player.data.level.level)) return [true, `SB Level: ${config().partyfinderSBLevel} > ${player.data.level.level}`]

    // TODO: Cata, Class
}


register('command', () => {
    // TODO: Setup Whitelist
}).setName('autokick').setAliases('ak');


const chatTrigger = register('chat', (username, _, __) => {
    if (username == Player.getName()) return;
    const player = new playerData(username);
    player.init().then(() => {
        World.playSound('note.pling', '2', '1');
        player.getData().then(() => {
            let msg = null;
            if (!player.data.apiStatus) {
                msg = new Message(
                    new TextComponent(`§8[&6Ghost&8]§7 `).setHover('show_text', '&7BooOo'),
                    new TextComponent(`&8[${getSbLevelPrefix(player.data.level.level)}${player.data.level.level}&8] &6${player.player.username} `).setHover('show_text', `&6Experience\n&7${formatNumber(player.data.level.experience)} &8#${player.data.level.rank}`),
                    new TextComponent(`&c${player.data.dungeons.experience.catacombs.level} &f| `).setHover('show_text', `&6Catacombs Experience\n&7${formatNumber(parseInt(player.data.dungeons.experience.catacombs.experience).toFixed(2))} &8#${player.data.dungeons.experience.catacombs.rank}`),
                    new TextComponent(`&a${convertToPBTime(getPB(player)[1])} &f| `).setHover('show_text', `&6Bonzo: &7${convertToPBTime(player.data.dungeons.best_runs.catacombs.f1)} | ${convertToPBTime(player.data.dungeons.best_runs.master_catacombs.m1)}\n&6Scarf: &7${convertToPBTime(player.data.dungeons.best_runs.catacombs.f2)} | ${convertToPBTime(player.data.dungeons.best_runs.master_catacombs.m2)}\n&6Professor: &7${convertToPBTime(player.data.dungeons.best_runs.catacombs.f3)} | ${convertToPBTime(player.data.dungeons.best_runs.master_catacombs.m3)}\n&6Thorn: &7${convertToPBTime(player.data.dungeons.best_runs.catacombs.f4)} | ${convertToPBTime(player.data.dungeons.best_runs.master_catacombs.m4)}\n&6Livid: &7${convertToPBTime(player.data.dungeons.best_runs.catacombs.f5)} | ${convertToPBTime(player.data.dungeons.best_runs.master_catacombs.m5)}\n&6Sadan: &7${convertToPBTime(player.data.dungeons.best_runs.catacombs.f6)} | ${convertToPBTime(player.data.dungeons.best_runs.master_catacombs.m6)}\n&6Necron: &7${convertToPBTime(player.data.dungeons.best_runs.catacombs.f7)} | ${convertToPBTime(player.data.dungeons.best_runs.master_catacombs.m7)}`),
                    new TextComponent(`&5${abbreviateNumber(getCompletions(player)[1])} &f| `).setHover('show_text', `&6Bonzo: &7${abbreviateNumber(player.data.dungeons.completions.catacombs.f1)} | ${abbreviateNumber(player.data.dungeons.completions.master_catacombs.m1)}\n&6Scarf: &7${abbreviateNumber(player.data.dungeons.completions.catacombs.f2)} | ${abbreviateNumber(player.data.dungeons.completions.master_catacombs.m2)}\n&6Professor: &7${abbreviateNumber(player.data.dungeons.completions.catacombs.f3)} | ${abbreviateNumber(player.data.dungeons.completions.master_catacombs.m3)}\n&6Thorn: &7${abbreviateNumber(player.data.dungeons.completions.catacombs.f4)} | ${abbreviateNumber(player.data.dungeons.completions.master_catacombs.m4)}\n&6Livid: &7${abbreviateNumber(player.data.dungeons.completions.catacombs.f5)} | ${abbreviateNumber(player.data.dungeons.completions.master_catacombs.m5)}\n&6Sadan: &7${abbreviateNumber(player.data.dungeons.completions.catacombs.f6)} | ${abbreviateNumber(player.data.dungeons.completions.master_catacombs.m6)}\n&6Necron: &7${abbreviateNumber(player.data.dungeons.completions.catacombs.f7)} | ${abbreviateNumber(player.data.dungeons.completions.master_catacombs.m7)}`),
                    new TextComponent(`&7${abbreviateNumber(parseInt(player.data.dungeons.secrets))} &f| `).setHover(`show_text`, `&6Secret Count\n&7${parseFloat(parseFloat(player.data.dungeons.secrets)/parseInt(player.data.dungeons.completions.total)).toFixed(2)} &8SPR`),
                    new TextComponent(`&b${capitalize(player.data.dungeons.selected_class)} &f| `).setHover(`show_text`, `&6Class Experience\n&6${calcSkillLevel('catacombs', player.data.dungeons.experience.classes.Archer.experience)} | ➶\n&c${calcSkillLevel('catacombs', player.data.dungeons.experience.classes.Berserk.experience)} | ☄\n&a${calcSkillLevel('catacombs', player.data.dungeons.experience.classes.Tank.experience)} | ⚓\n&b${calcSkillLevel('catacombs', player.data.dungeons.experience.classes.Mage.experience)} | ⚡\n&d${calcSkillLevel('catacombs', player.data.dungeons.experience.classes.Healer.experience)} | ⚚\n&6Class Average: &7${player.data.dungeons.experience.classes.Average.level}`),
                    new TextComponent(`&6${abbreviateNumber(parseInt(player.data.networth.total))} &f| `).setHover(`show_text`, `&6Unsoulbound: &7${abbreviateNumber(parseInt(player.data.networth.unsoulbound))}\n&6Purse: &7${abbreviateNumber(parseInt(player.data.networth.purse))}\n&6Bank: &7${abbreviateNumber(parseInt(player.data.networth.bank))}`),
                    new TextComponent(`&e${formatNumber(player.data.accessories.magical_power)} &f| `).setHover(`show_text`, `&6Magical Power\n&7${capitalize(player.data.accessories.reforge)}`),
                    new TextComponent(`&d⚔`).setHover('show_text', `&6Revenant: &7${player.data.slayer.zombie.level} &8${formatNumber(player.data.slayer.zombie.experience)}\n&6Tarantula: &7${player.data.slayer.spider.level} &8${formatNumber(player.data.slayer.spider.experience)}\n&6Sven: &7${player.data.slayer.wolf.level} &8${formatNumber(player.data.slayer.wolf.experience)}\n&6Voidgloom: &7${player.data.slayer.enderman.level} &8${formatNumber(player.data.slayer.enderman.experience)}\n&6Inferno Demonlord: &7${player.data.slayer.blaze.level} &8${formatNumber(player.data.slayer.blaze.experience)}\n&6Riftstalker: &7${player.data.slayer.vampire.level} &8${formatNumber(player.data.slayer.vampire.experience)}`)
                );
            } else {
                msg = new Message(
                    new TextComponent(`§8[&6Ghost&8]§7 `).setHover('show_text', '&7BooOo'),
                    new TextComponent(`&8[${getSbLevelPrefix(player.data.level.level)}${player.data.level.level}&8] &6${player.player.username} `).setHover('show_text', `&6Experience\n&7${formatNumber(player.data.level.experience)} &8#${player.data.level.rank}`),
                    new TextComponent(`&c${player.data.dungeons.experience.catacombs.level} &f| `).setHover('show_text', `&6Catacombs Experience\n&7${formatNumber(parseInt(player.data.dungeons.experience.catacombs.experience).toFixed(2))} &8#${player.data.dungeons.experience.catacombs.rank}`),
                    new TextComponent(`&a${convertToPBTime(getPB(player)[1])} &f| `).setHover('show_text', `&6Bonzo: &7${convertToPBTime(player.data.dungeons.best_runs.catacombs.f1)} | ${convertToPBTime(player.data.dungeons.best_runs.master_catacombs.m1)}\n&6Scarf: &7${convertToPBTime(player.data.dungeons.best_runs.catacombs.f2)} | ${convertToPBTime(player.data.dungeons.best_runs.master_catacombs.m2)}\n&6Professor: &7${convertToPBTime(player.data.dungeons.best_runs.catacombs.f3)} | ${convertToPBTime(player.data.dungeons.best_runs.master_catacombs.m3)}\n&6Thorn: &7${convertToPBTime(player.data.dungeons.best_runs.catacombs.f4)} | ${convertToPBTime(player.data.dungeons.best_runs.master_catacombs.m4)}\n&6Livid: &7${convertToPBTime(player.data.dungeons.best_runs.catacombs.f5)} | ${convertToPBTime(player.data.dungeons.best_runs.master_catacombs.m5)}\n&6Sadan: &7${convertToPBTime(player.data.dungeons.best_runs.catacombs.f6)} | ${convertToPBTime(player.data.dungeons.best_runs.master_catacombs.m6)}\n&6Necron: &7${convertToPBTime(player.data.dungeons.best_runs.catacombs.f7)} | ${convertToPBTime(player.data.dungeons.best_runs.master_catacombs.m7)}`),
                    new TextComponent(`&5${abbreviateNumber(getCompletions(player)[1])} &f| `).setHover('show_text', `&6Bonzo: &7${abbreviateNumber(player.data.dungeons.completions.catacombs.f1)} | ${abbreviateNumber(player.data.dungeons.completions.master_catacombs.m1)}\n&6Scarf: &7${abbreviateNumber(player.data.dungeons.completions.catacombs.f2)} | ${abbreviateNumber(player.data.dungeons.completions.master_catacombs.m2)}\n&6Professor: &7${abbreviateNumber(player.data.dungeons.completions.catacombs.f3)} | ${abbreviateNumber(player.data.dungeons.completions.master_catacombs.m3)}\n&6Thorn: &7${abbreviateNumber(player.data.dungeons.completions.catacombs.f4)} | ${abbreviateNumber(player.data.dungeons.completions.master_catacombs.m4)}\n&6Livid: &7${abbreviateNumber(player.data.dungeons.completions.catacombs.f5)} | ${abbreviateNumber(player.data.dungeons.completions.master_catacombs.m5)}\n&6Sadan: &7${abbreviateNumber(player.data.dungeons.completions.catacombs.f6)} | ${abbreviateNumber(player.data.dungeons.completions.master_catacombs.m6)}\n&6Necron: &7${abbreviateNumber(player.data.dungeons.completions.catacombs.f7)} | ${abbreviateNumber(player.data.dungeons.completions.master_catacombs.m7)}`),
                    new TextComponent(`&7${abbreviateNumber(parseInt(player.data.dungeons.secrets))} &f| `).setHover(`show_text`, `&6Secret Count\n&7${parseFloat(parseFloat(player.data.dungeons.secrets)/parseInt(player.data.dungeons.completions.total)).toFixed(2)} &8SPR`),
                    new TextComponent(`&b${capitalize(player.data.dungeons.selected_class)} &f| `).setHover(`show_text`, `&6Class Experience\n&6${calcSkillLevel('catacombs', player.data.dungeons.experience.classes.Archer.experience)} | ➶\n&c${calcSkillLevel('catacombs', player.data.dungeons.experience.classes.Berserk.experience)} | ☄\n&a${calcSkillLevel('catacombs', player.data.dungeons.experience.classes.Tank.experience)} | ⚓\n&b${calcSkillLevel('catacombs', player.data.dungeons.experience.classes.Mage.experience)} | ⚡\n&d${calcSkillLevel('catacombs', player.data.dungeons.experience.classes.Healer.experience)} | ⚚\n&6Class Average: &7${player.data.dungeons.experience.classes.Average.level}`),
                    new TextComponent(`&cNO API &f| `).setHover(`show_text`, `&7No Networth | Magical Power Data.`),
                    new TextComponent(`&d⚔`).setHover('show_text', `&6Revenant: &7${player.data.slayer.zombie.level} &8${formatNumber(player.data.slayer.zombie.experience)}\n&6Tarantula: &7${player.data.slayer.spider.level} &8${formatNumber(player.data.slayer.spider.experience)}\n&6Sven: &7${player.data.slayer.wolf.level} &8${formatNumber(player.data.slayer.wolf.experience)}\n&6Voidgloom: &7${player.data.slayer.enderman.level} &8${formatNumber(player.data.slayer.enderman.experience)}\n&6Inferno Demonlord: &7${player.data.slayer.blaze.level} &8${formatNumber(player.data.slayer.blaze.experience)}\n&6Riftstalker: &7${player.data.slayer.vampire.level} &8${formatNumber(player.data.slayer.vampire.experience)}`)
                );
            };
            msg.chat()
        })
    })
}).setCriteria("Party Finder > ${username} joined the dungeon group! (${_} Level ${__})").unregister();

register('command', (username) => {
    if (!username) username = Player.getName();
    const player = new playerData(username);
    player.init().then(() => {
        player.getData().then(() => {
            let msg = null;
            if (!player.data.apiStatus) {
                msg = new Message(
                    new TextComponent(`§8[&6Ghost&8]§7 `).setHover('show_text', '&7BooOo'),
                    new TextComponent(`&8[${getSbLevelPrefix(player.data.level.level)}${player.data.level.level}&8] &6${player.player.username} `).setHover('show_text', `&6Experience\n&7${formatNumber(player.data.level.experience)} &8#${player.data.level.rank}`),
                    new TextComponent(`&c${player.data.dungeons.experience.catacombs.level} &f| `).setHover('show_text', `&6Catacombs Experience\n&7${formatNumber(parseInt(player.data.dungeons.experience.catacombs.experience).toFixed(2))} &8#${player.data.dungeons.experience.catacombs.rank}`),
                    new TextComponent(`&a${convertToPBTime(getPB(player)[1])} &f| `).setHover('show_text', `&6Bonzo: &7${convertToPBTime(player.data.dungeons.best_runs.catacombs.f1)} | ${convertToPBTime(player.data.dungeons.best_runs.master_catacombs.m1)}\n&6Scarf: &7${convertToPBTime(player.data.dungeons.best_runs.catacombs.f2)} | ${convertToPBTime(player.data.dungeons.best_runs.master_catacombs.m2)}\n&6Professor: &7${convertToPBTime(player.data.dungeons.best_runs.catacombs.f3)} | ${convertToPBTime(player.data.dungeons.best_runs.master_catacombs.m3)}\n&6Thorn: &7${convertToPBTime(player.data.dungeons.best_runs.catacombs.f4)} | ${convertToPBTime(player.data.dungeons.best_runs.master_catacombs.m4)}\n&6Livid: &7${convertToPBTime(player.data.dungeons.best_runs.catacombs.f5)} | ${convertToPBTime(player.data.dungeons.best_runs.master_catacombs.m5)}\n&6Sadan: &7${convertToPBTime(player.data.dungeons.best_runs.catacombs.f6)} | ${convertToPBTime(player.data.dungeons.best_runs.master_catacombs.m6)}\n&6Necron: &7${convertToPBTime(player.data.dungeons.best_runs.catacombs.f7)} | ${convertToPBTime(player.data.dungeons.best_runs.master_catacombs.m7)}`),
                    new TextComponent(`&5${abbreviateNumber(getCompletions(player)[1])} &f| `).setHover('show_text', `&6Bonzo: &7${abbreviateNumber(player.data.dungeons.completions.catacombs.f1)} | ${abbreviateNumber(player.data.dungeons.completions.master_catacombs.m1)}\n&6Scarf: &7${abbreviateNumber(player.data.dungeons.completions.catacombs.f2)} | ${abbreviateNumber(player.data.dungeons.completions.master_catacombs.m2)}\n&6Professor: &7${abbreviateNumber(player.data.dungeons.completions.catacombs.f3)} | ${abbreviateNumber(player.data.dungeons.completions.master_catacombs.m3)}\n&6Thorn: &7${abbreviateNumber(player.data.dungeons.completions.catacombs.f4)} | ${abbreviateNumber(player.data.dungeons.completions.master_catacombs.m4)}\n&6Livid: &7${abbreviateNumber(player.data.dungeons.completions.catacombs.f5)} | ${abbreviateNumber(player.data.dungeons.completions.master_catacombs.m5)}\n&6Sadan: &7${abbreviateNumber(player.data.dungeons.completions.catacombs.f6)} | ${abbreviateNumber(player.data.dungeons.completions.master_catacombs.m6)}\n&6Necron: &7${abbreviateNumber(player.data.dungeons.completions.catacombs.f7)} | ${abbreviateNumber(player.data.dungeons.completions.master_catacombs.m7)}`),
                    new TextComponent(`&7${abbreviateNumber(parseInt(player.data.dungeons.secrets))} &f| `).setHover(`show_text`, `&6Secret Count\n&7${parseFloat(parseFloat(player.data.dungeons.secrets)/parseInt(player.data.dungeons.completions.total)).toFixed(2)} &8SPR`),
                    new TextComponent(`&b${capitalize(player.data.dungeons.selected_class)} &f| `).setHover(`show_text`, `&6Class Experience\n&6${calcSkillLevel('catacombs', player.data.dungeons.experience.classes.Archer.experience)} | ➶\n&c${calcSkillLevel('catacombs', player.data.dungeons.experience.classes.Berserk.experience)} | ☄\n&a${calcSkillLevel('catacombs', player.data.dungeons.experience.classes.Tank.experience)} | ⚓\n&b${calcSkillLevel('catacombs', player.data.dungeons.experience.classes.Mage.experience)} | ⚡\n&d${calcSkillLevel('catacombs', player.data.dungeons.experience.classes.Healer.experience)} | ⚚\n&6Class Average: &7${player.data.dungeons.experience.classes.Average.level}`),
                    new TextComponent(`&6${abbreviateNumber(parseInt(player.data.networth.total))} &f| `).setHover(`show_text`, `&6Unsoulbound: &7${abbreviateNumber(parseInt(player.data.networth.unsoulbound))}\n&6Purse: &7${abbreviateNumber(parseInt(player.data.networth.purse))}\n&6Bank: &7${abbreviateNumber(parseInt(player.data.networth.bank))}`),
                    new TextComponent(`&e${formatNumber(player.data.accessories.magical_power)} &f| `).setHover(`show_text`, `&6Magical Power\n&7${capitalize(player.data.accessories.reforge)}`),
                    new TextComponent(`&d⚔`).setHover('show_text', `&6Revenant: &7${player.data.slayer.zombie.level} &8${formatNumber(player.data.slayer.zombie.experience)}\n&6Tarantula: &7${player.data.slayer.spider.level} &8${formatNumber(player.data.slayer.spider.experience)}\n&6Sven: &7${player.data.slayer.wolf.level} &8${formatNumber(player.data.slayer.wolf.experience)}\n&6Voidgloom: &7${player.data.slayer.enderman.level} &8${formatNumber(player.data.slayer.enderman.experience)}\n&6Inferno Demonlord: &7${player.data.slayer.blaze.level} &8${formatNumber(player.data.slayer.blaze.experience)}\n&6Riftstalker: &7${player.data.slayer.vampire.level} &8${formatNumber(player.data.slayer.vampire.experience)}`)
                );
            } else {
                msg = new Message(
                    new TextComponent(`§8[&6Ghost&8]§7 `).setHover('show_text', '&7BooOo'),
                    new TextComponent(`&8[${getSbLevelPrefix(player.data.level.level)}${player.data.level.level}&8] &6${player.player.username} `).setHover('show_text', `&6Experience\n&7${formatNumber(player.data.level.experience)} &8#${player.data.level.rank}`),
                    new TextComponent(`&c${player.data.dungeons.experience.catacombs.level} &f| `).setHover('show_text', `&6Catacombs Experience\n&7${formatNumber(parseInt(player.data.dungeons.experience.catacombs.experience).toFixed(2))} &8#${player.data.dungeons.experience.catacombs.rank}`),
                    new TextComponent(`&a${convertToPBTime(getPB(player)[1])} &f| `).setHover('show_text', `&6Bonzo: &7${convertToPBTime(player.data.dungeons.best_runs.catacombs.f1)} | ${convertToPBTime(player.data.dungeons.best_runs.master_catacombs.m1)}\n&6Scarf: &7${convertToPBTime(player.data.dungeons.best_runs.catacombs.f2)} | ${convertToPBTime(player.data.dungeons.best_runs.master_catacombs.m2)}\n&6Professor: &7${convertToPBTime(player.data.dungeons.best_runs.catacombs.f3)} | ${convertToPBTime(player.data.dungeons.best_runs.master_catacombs.m3)}\n&6Thorn: &7${convertToPBTime(player.data.dungeons.best_runs.catacombs.f4)} | ${convertToPBTime(player.data.dungeons.best_runs.master_catacombs.m4)}\n&6Livid: &7${convertToPBTime(player.data.dungeons.best_runs.catacombs.f5)} | ${convertToPBTime(player.data.dungeons.best_runs.master_catacombs.m5)}\n&6Sadan: &7${convertToPBTime(player.data.dungeons.best_runs.catacombs.f6)} | ${convertToPBTime(player.data.dungeons.best_runs.master_catacombs.m6)}\n&6Necron: &7${convertToPBTime(player.data.dungeons.best_runs.catacombs.f7)} | ${convertToPBTime(player.data.dungeons.best_runs.master_catacombs.m7)}`),
                    new TextComponent(`&5${abbreviateNumber(getCompletions(player)[1])} &f| `).setHover('show_text', `&6Bonzo: &7${abbreviateNumber(player.data.dungeons.completions.catacombs.f1)} | ${abbreviateNumber(player.data.dungeons.completions.master_catacombs.m1)}\n&6Scarf: &7${abbreviateNumber(player.data.dungeons.completions.catacombs.f2)} | ${abbreviateNumber(player.data.dungeons.completions.master_catacombs.m2)}\n&6Professor: &7${abbreviateNumber(player.data.dungeons.completions.catacombs.f3)} | ${abbreviateNumber(player.data.dungeons.completions.master_catacombs.m3)}\n&6Thorn: &7${abbreviateNumber(player.data.dungeons.completions.catacombs.f4)} | ${abbreviateNumber(player.data.dungeons.completions.master_catacombs.m4)}\n&6Livid: &7${abbreviateNumber(player.data.dungeons.completions.catacombs.f5)} | ${abbreviateNumber(player.data.dungeons.completions.master_catacombs.m5)}\n&6Sadan: &7${abbreviateNumber(player.data.dungeons.completions.catacombs.f6)} | ${abbreviateNumber(player.data.dungeons.completions.master_catacombs.m6)}\n&6Necron: &7${abbreviateNumber(player.data.dungeons.completions.catacombs.f7)} | ${abbreviateNumber(player.data.dungeons.completions.master_catacombs.m7)}`),
                    new TextComponent(`&7${abbreviateNumber(parseInt(player.data.dungeons.secrets))} &f| `).setHover(`show_text`, `&6Secret Count\n&7${parseFloat(parseFloat(player.data.dungeons.secrets)/parseInt(player.data.dungeons.completions.total)).toFixed(2)} &8SPR`),
                    new TextComponent(`&b${capitalize(player.data.dungeons.selected_class)} &f| `).setHover(`show_text`, `&6Class Experience\n&6${calcSkillLevel('catacombs', player.data.dungeons.experience.classes.Archer.experience)} | ➶\n&c${calcSkillLevel('catacombs', player.data.dungeons.experience.classes.Berserk.experience)} | ☄\n&a${calcSkillLevel('catacombs', player.data.dungeons.experience.classes.Tank.experience)} | ⚓\n&b${calcSkillLevel('catacombs', player.data.dungeons.experience.classes.Mage.experience)} | ⚡\n&d${calcSkillLevel('catacombs', player.data.dungeons.experience.classes.Healer.experience)} | ⚚\n&6Class Average: &7${player.data.dungeons.experience.classes.Average.level}`),
                    new TextComponent(`&cNO API &f| `).setHover(`show_text`, `&7No Networth | Magical Power Data.`),
                    new TextComponent(`&d⚔`).setHover('show_text', `&6Revenant: &7${player.data.slayer.zombie.level} &8${formatNumber(player.data.slayer.zombie.experience)}\n&6Tarantula: &7${player.data.slayer.spider.level} &8${formatNumber(player.data.slayer.spider.experience)}\n&6Sven: &7${player.data.slayer.wolf.level} &8${formatNumber(player.data.slayer.wolf.experience)}\n&6Voidgloom: &7${player.data.slayer.enderman.level} &8${formatNumber(player.data.slayer.enderman.experience)}\n&6Inferno Demonlord: &7${player.data.slayer.blaze.level} &8${formatNumber(player.data.slayer.blaze.experience)}\n&6Riftstalker: &7${player.data.slayer.vampire.level} &8${formatNumber(player.data.slayer.vampire.experience)}`)
                );
            };
            World.playSound('note.pling', '2', '1');
            msg.chat()
        })
    })
}).setName('nicepb').setAliases('stats')

register('command', (username) => {
    if (!username) username = Player.getName();
    const player = new playerData(username);
    player.init().then(() => {
        player.getData().then(() => {
            let msg = null;
            if (!player.data.apiStatus) {
                player.data.gear.armour.forEach(item => {
                    chat(item.tag.display.Name.replace(/¿/g, '✿').replace(/ª/g, '✪').replace(/[^a-z0-9§& ✿✪]/gi, ''))
                })
                msg = new Message( ...newList );
            } else {
                World.playSound('note.pling', '2', '1');
                msg = new Message(
                    new TextComponent(`§8[&6Ghost&8]§7 &cAPI Disabled.`).setHover('show_text', '&7BooOo'),
                ).chat();
            };
        })
    })
}).setName('armour')

export function toggle() {
    if (config().partyFinderToggle && config().toggle) {
        chatTrigger.register();
        return
    }
    chatTrigger.unregister()
    return
}
export default { toggle };