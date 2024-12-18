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

function convertExpression(expression) {
    expression = expression.replace(/,/g, '').replace(/b/g, '*1e9').replace(/m/g, '*1e6').replace(/k/g, '*1e3');
    return eval(expression);
}


/**
 * Checks whether a player meets the requirements
 * @param {playerData} player 
 */
function checkKick(player) {
    if (!config().partyFinderAutoKick) return [false, 'Auto Kick Disabled!']
    const uuid = player.player.uuid;

    if (config().partyFinderListing) {
        if (uuid in data.partyFinder.whitelist) return [false, `Whitelisted Player: ${data.partyFinder.whitelist[uuid].reason}`];

        if (uuid in data.partyFinder.blacklist) return [true, `Blacklisted Player: ${data.partyFinder.blacklist[uuid].reason}`];
    }

    if (mmssToMillis(config().partyFinderPB) < getPB(player)[1]) {
        return [true, `PB: ${convertToPBTime(getPB(player)[1])} > ${config().partyFinderPB}`];
    }
    if (parseInt(config().partyFinderMP) > parseInt(player.data.accessories.magical_power)) {
        return [true, `MP: ${formatNumber(parseInt(config().partyFinderMP))} > ${formatNumber(player.data.accessories.magical_power)}`];
    }
    if (parseInt(convertExpression(config().partyFinderminSecrets)) > parseInt(player.data.dungeons.secrets)) {
        return [true, `Secrets: ${(config().partyFinderminSecrets)} > ${formatNumber(parseInt(player.data.dungeons.secrets))}`];
    }
    if (parseInt(config().partyFinderSBLevel) > parseInt(player.data.level.level)) {
        return [true, `SB Level: ${config().partyFinderSBLevel} > ${player.data.level.level}`];
    }

    return [false, 'Requirements met!'];
}


function handleWhitelist(args) {
    if (args.length === 1) {
        const whitelist = data.partyFinder.whitelist || {};
        if (Object.keys(whitelist).length === 0) return chat('&cWhitelist is empty.');
        const message = new Message(
            new TextComponent(`§8[&6Ghost&8]§7 `).setHover('show_text', '&7BooOo'),
            new TextComponent(`&6Whitelist: `)
        );
        const entries = Object.entries(whitelist);
        entries.forEach(([uuid, entry], index) => {
            const textComponent = new TextComponent(`§a${entry.username}`)
                .setHover(
                    'show_text',
                    `§7UUID: §e${uuid}\n§7Date: §d${entry.date}\n§7Reason: §b${entry.reason}\n\n§cClick to remove from whitelist!`
                )
                .setClick('suggest_command', `/ak whitelist remove ${entry.username}`);
            message.addTextComponent(textComponent);

            if (index < entries.length - 1) { message.addTextComponent(new TextComponent(' §7| ')); }
        })
        return message.chat();
    }

    const action = args[1].toLowerCase();

    switch (action) {
        case 'add': {
            const username = args[2];
            const reason = args.slice(3).join(' ') || 'No reason provided';

            if (!username) return chat('&cUsage: /autokick whitelist add <username> <reason...>');

            const player = new playerData(username);
            player.init().then(() => {
                const uuid = player.player.uuid;
                const caseSensitiveUsername = player.player.username;

                if (!data.partyFinder.whitelist) data.partyFinder.whitelist = {};
                if (data.partyFinder.whitelist[uuid]) return chat(`&c${caseSensitiveUsername} is already in the whitelist.`);

                if (data.partyFinder.blacklist && data.partyFinder.blacklist[uuid]) delete data.partyFinder.blacklist[uuid];

                data.partyFinder.whitelist[uuid] = {
                    username: caseSensitiveUsername,
                    reason,
                    date: getCurrentDate(),
                };
                data.save();
                chat(`&a${caseSensitiveUsername} has been added to the whitelist. &7Reason: &b${reason}`);
            }).catch(() => {
                chat(`&cFailed to fetch data for &e${username}&c.`);
            });
            break;
        }

        case 'remove': {
            const username = args[2];
            if (!username) return chat('&cUsage: /autokick whitelist remove <username>');

            const player = new playerData(username);
            player.init().then(() => {
                const uuid = player.player.uuid;

                if (!data.partyFinder.whitelist || !data.partyFinder.whitelist[uuid]) {
                    return chat(`&c${username} is not in the whitelist.`);
                }

                delete data.partyFinder.whitelist[uuid];
                data.save();
                chat(`&a${username} has been removed from the whitelist.`);
            }).catch(() => {
                chat(`&cFailed to fetch data for &e${username}&c.`);
            });
            break;
        }

        default: chat('&cUnknown whitelist action. Use "&eadd&c" or "&eremove&c".');
    }
}

function handleBlacklist(args) {
    if (args.length === 1) {
        const blacklist = data.partyFinder.blacklist || {};
        if (Object.keys(blacklist).length === 0) return chat('&cBlacklist is empty.');
        const message = new Message(
            new TextComponent(`§8[&6Ghost&8]§7 `).setHover('show_text', '&7BooOo'),
            new TextComponent(`&6Blacklist: `)
        );
        const entries = Object.entries(blacklist);
        entries.forEach(([uuid, entry], index) => {
            const textComponent = new TextComponent(`§a${entry.username}`)
                .setHover(
                    'show_text',
                    `§7UUID: §e${uuid}\n§7Date: §d${entry.date}\n§7Reason: §b${entry.reason}\n\n§cClick to remove from blacklist!`
                )
                .setClick('suggest_command', `/ak blacklist remove ${entry.username}`);
            message.addTextComponent(textComponent);

            if (index < entries.length - 1) { message.addTextComponent(new TextComponent(' §7| ')); }
        })
        return message.chat();
    }

    const action = args[1].toLowerCase();

    switch (action) {
        case 'add': {
            const username = args[2];
            const reason = args.slice(3).join(' ') || 'No reason provided';

            if (!username) return chat('&cUsage: /autokick blacklist add <username> <reason...>');

            const player = new playerData(username);
            player.init().then(() => {
                const uuid = player.player.uuid;
                const caseSensitiveUsername = player.player.username;

                if (!data.partyFinder.blacklist) data.partyFinder.blacklist = {};
                if (data.partyFinder.blacklist[uuid]) return chat(`&c${caseSensitiveUsername} is already in the blacklist.`);

                if (data.partyFinder.whitelist && data.partyFinder.whitelist[uuid]) delete data.partyFinder.whitelist[uuid];

                data.partyFinder.blacklist[uuid] = {
                    username: caseSensitiveUsername,
                    reason,
                    date: getCurrentDate(),
                };
                data.save();
                chat(`&c${caseSensitiveUsername} has been added to the blacklist. &7Reason: &b${reason}`);
            }).catch(() => {
                chat(`&cFailed to fetch data for &e${username}&c.`);
            });
            break;
        }

        case 'remove': {
            const username = args[2];
            if (!username) return chat('&cUsage: /autokick blacklist remove <username>');

            const player = new playerData(username);
            player.init().then(() => {
                const uuid = player.player.uuid;

                if (!data.partyFinder.blacklist || !data.partyFinder.blacklist[uuid]) return chat(`&c${username} is not in the blacklist.`);

                delete data.partyFinder.blacklist[uuid];
                data.save();
                chat(`&a${username} has been removed from the blacklist.`);
            }).catch(() => {
                chat(`&cFailed to fetch data for &e${username}&c.`);
            });
            break;
        }

        default: chat('&cUnknown blacklist action. Use "&eadd&c" or "&eremove&c".');
    }
}

function getCurrentDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
}

register('command', (...args) => {
    if (args.length === 0 || !args[0]) {
        chat('&6/autokick Commands:');
        chat('&e/autokick whitelist &7- Displays the whitelist.');
        chat('&e/autokick blacklist &7- Displays the blacklist.');
        chat('&e/autokick whitelist add <username> <reason...> &7- Adds a user to the whitelist.');
        chat('&e/autokick whitelist remove <username> &7- Removes a user from the whitelist.');
        chat('&e/autokick blacklist add <username> <reason...> &7- Adds a user to the blacklist.');
        chat('&e/autokick blacklist remove <username> &7- Removes a user from the blacklist.');
        return;
    }

    const subCommand = args[0]?.toLowerCase();

    switch (subCommand) {
        case 'whitelist':
            handleWhitelist(args);
            break;

        case 'blacklist':
            handleBlacklist(args);
            break;

        default:
            chat(`&cUnknown subcommand: &e${subCommand}`);
            chat('&6Use &e/autokick &6to view the list of available commands.');
    }
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
            const [kick, reason] = checkKick(player);
            if (config().partyFinderAutoKick) {
                if (kick) {
                    ChatLib.chat(`/party chat Kicking ${username} » ${reason}`);
                    setTimeout(() => { ChatLib.command(`/party kick ${username}`); }, 300);
                    return;
                }
            }
            if (config().partyFinderChat) {
                try {
                    let joinMessage = config().partyFinderJoinMsg || "Welcome <username>!";
                    joinMessage = joinMessage.replace('<username>', player.player.username)
                                            .replace('<pb>', convertToPBTime(getPB(player)[1]) || "No PB")
                                            .replace('<mp>', player.data.accessories.magical_power? formatNumber(player.data.accessories.magical_power) : "NO API")
                                            .replace('<secrets>', formatNumber(parseInt(player.data.secrets)) || "0")
                                            .replace('<sblvl>', player.data.level.level);
                    ChatLib.command(`/party chat ${joinMessage}`);
                } catch (error) {
                    console.error("Error while formatting the join message:", error);
                    chat("An error occurred while generating the join message.");
                }
            }
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
            if (config().partyFinderAutoKick) {
                toKick = checkKick(player);
                chat(`&7Kick Check: &a${toKick[0]} &7, Reason: &a${toKick[1]}`);
            }
        })
    })
}).setName('nicepb').setAliases('stats')

register('command', (username) => {
    if (!username) username = Player.getName();
    const player = new playerData(username);
    
    player.init().then(() => {
        player.getData().then(() => {
            try {
                let joinMessage = config().partyFinderJoinMsg || "Welcome <username>!";
                joinMessage = joinMessage.replace('<username>', player.player.username)
                                        .replace('<pb>', convertToPBTime(getPB(player)[1]) || "No PB")
                                        .replace('<mp>', player.data.accessories.magical_power? formatNumber(player.data.accessories.magical_power) : "NO API")
                                        .replace('<secrets>', formatNumber(parseInt(player.data.secrets)) || "0")
                                        .replace('<sblvl>', player.data.level.level);                
                chat(joinMessage);
            } catch (error) {
                console.error("Error while formatting the join message:", error);
                chat("An error occurred while generating the join message.");
            }
        });
    });
}).setName('testjoinmsg');


register('command', (username) => {
    if (!username) username = Player.getName();
    const player = new playerData(username);
    player.init().then(() => {
        player.getData().then(() => {
            if (!player.data.apiStatus) {
                chat(`${player.player.username}'s Armour:`)
                player.data.gear.armour.forEach(item => {
                    chat(item.tag.display.Name.replace(/¿/g, '✿').replace(/ª/g, '✪').replace(/[^a-z0-9§& ✿✪]/gi, ''))
                })
            } else {
                World.playSound('note.pling', '2', '1');
                new Message(
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