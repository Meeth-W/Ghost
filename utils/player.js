import request from "../../requestV2";
import { chat } from "./utils";

export default class playerData {
    constructor(username) {
        this.player = {
            username: username,
            uuid: null,
            rank: null
        }
        this.data = {
            apiStatus: false,
            networth: { total: null, unsoulbound: null, purse: null, bank: null },
            dungeons: {
                best_runs: { catacombs: {f1: 0, f2: 0, f3: 0, f4: 0, f5: 0, f6: 0, f7: 0}, master_catacombs: {m1: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0, m7: 0} },
                completions: { catacombs: {f1: 0, f2: 0, f3: 0, f4: 0, f5: 0, f6: 0, f7: 0}, master_catacombs: {m1: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0, m7: 0}, total: null },
                experience: { catacombs: {experience: null, level: null, rank: null}, classes: {Mage: {experience: null, level: null}, Archer: {experience: null, level: null}, Berserk: {experience: null, level: null}, Tank: {experience: null, level: null}, Healer: {experience: null, level: null}, Average: {experience: null, level: null} }},
                secrets: null,
                selected_class: null,
            },
            accessories: { magical_power: null, reforge: null },
            level: { experience: null, level: null, rank: null },
            slayer: { spider: {level: null, experience: null, kills: {t1: null, t2: null, t3: null, t4: null, total: null}}, zombie: {level: null, experience: null, kills: {t1: null, t2: null, t3: null, t4: null, total: null}}, wolf: {level: null, experience: null, kills: {t1: null, t2: null, t3: null, t4: null, total: null}}, enderman: {level: null, experience: null, kills: {t1: null, t2: null, t3: null, t4: null, total: null}}, blaze: {level: null, experience: null, kills: {t1: null, t2: null, t3: null, t4: null, total: null}}, vampire: {level: null, experience: null, kills: {t1: null, t2: null, t3: null, t4: null, t5: null, total: null}} },
            gear: {armour: []}
        };
    }

    init() {
        return request({url: `https://api.mojang.com/users/profiles/minecraft/${this.player.username}`, headers: {'User-Agent': ' Mozilla/5.0', 'Content-Type': 'application/json'}, json: true}).then(data => {
            if (!data.id) return chat(`&cError at api.mojang.com&c: ${data.errorMessage}`);
            this.player.uuid = data.id;
            this.player.username = data.name;
            return;
        }).catch(e => chat(`&cError at api.mojang.com&c: ${e}`))
    }

    getData() {
        return request({url: `https://sky.shiiyu.moe/api/v2/profile/${this.player.uuid}`, headers: {'User-Agent': ' Mozilla/5.0', 'Content-Type': 'application/json'}, json: true}).then(data => {
            if (data.error) return chat(`&cError at sky.shiiyu.moe&c: ${data.error}`);
            const profile = Object.values(data.profiles).find(profile => profile.current === true)
            
            this.data.apiStatus = profile?.data?.networth?.noInventory;
            if (!this.data.apiStatus) {
                this.data.networth = {
                    total: profile?.data?.networth?.networth,
                    unsoulbound: profile?.data?.networth?.unsoulboundNetworth,
                    purse: profile?.data?.networth?.purse,
                    bank: profile?.data?.networth?.bank
                };
                this.data.accessories = {
                    magical_power: profile?.data?.accessories?.magical_power?.total,
                    reforge: profile?.raw?.accessory_bag_storage?.selected_power
                };
                this.data.gear = {
                    armour: profile?.data?.items?.armor?.armor
                }
            };
            this.data.level = {
                experience: profile?.data?.skyblock_level?.xp,
                level: profile?.data?.skyblock_level?.level,
                rank: profile?.data?.skyblock_level?.rank
            };
            this.data.slayer = {
                spider: {
                    level: profile?.data?.slayer?.slayers?.spider?.level?.currentLevel,
                    experience: profile?.data?.slayer?.slayers?.spider?.level?.xp,
                    kills: {
                        t1: profile?.data?.slayer?.slayers?.spider?.kills?.["1"] ?? 0,
                        t2: profile?.data?.slayer?.slayers?.spider?.kills?.["2"] ?? 0,
                        t3: profile?.data?.slayer?.slayers?.spider?.kills?.["3"] ?? 0,
                        t4: profile?.data?.slayer?.slayers?.spider?.kills?.["4"] ?? 0,
                        total: profile?.data?.slayer?.slayers?.spider?.kills?.["total"] ?? 0,
                    }
                },
                zombie: {
                    level: profile?.data?.slayer?.slayers?.zombie?.level?.currentLevel,
                    experience: profile?.data?.slayer?.slayers?.zombie?.level?.xp,
                    kills: {
                        t1: profile?.data?.slayer?.slayers?.zombie?.kills?.["1"] ?? 0,
                        t2: profile?.data?.slayer?.slayers?.zombie?.kills?.["2"] ?? 0,
                        t3: profile?.data?.slayer?.slayers?.zombie?.kills?.["3"] ?? 0,
                        t4: profile?.data?.slayer?.slayers?.zombie?.kills?.["4"] ?? 0,
                        total: profile?.data?.slayer?.slayers?.zombie?.kills?.["total"] ?? 0,
                    }
                },
                wolf: {
                    level: profile?.data?.slayer?.slayers?.wolf?.level?.currentLevel,
                    experience: profile?.data?.slayer?.slayers?.wolf?.level?.xp,
                    kills: {
                        t1: profile?.data?.slayer?.slayers?.wolf?.kills?.["1"] ?? 0,
                        t2: profile?.data?.slayer?.slayers?.wolf?.kills?.["2"] ?? 0,
                        t3: profile?.data?.slayer?.slayers?.wolf?.kills?.["3"] ?? 0,
                        t4: profile?.data?.slayer?.slayers?.wolf?.kills?.["4"] ?? 0,
                        total: profile?.data?.slayer?.slayers?.wolf?.kills?.["total"] ?? 0,
                    }
                },
                enderman: {
                    level: profile?.data?.slayer?.slayers?.enderman?.level?.currentLevel,
                    experience: profile?.data?.slayer?.slayers?.enderman?.level?.xp,
                    kills: {
                        t1: profile?.data?.slayer?.slayers?.enderman?.kills?.["1"] ?? 0,
                        t2: profile?.data?.slayer?.slayers?.enderman?.kills?.["2"] ?? 0,
                        t3: profile?.data?.slayer?.slayers?.enderman?.kills?.["3"] ?? 0,
                        t4: profile?.data?.slayer?.slayers?.enderman?.kills?.["4"] ?? 0,
                        total: profile?.data?.slayer?.slayers?.enderman?.kills?.["total"] ?? 0,
                    }
                },
                blaze: {
                    level: profile?.data?.slayer?.slayers?.blaze?.level?.currentLevel,
                    experience: profile?.data?.slayer?.slayers?.blaze?.level?.xp,
                    kills: {
                        t1: profile?.data?.slayer?.slayers?.blaze?.kills?.["1"] ?? 0,
                        t2: profile?.data?.slayer?.slayers?.blaze?.kills?.["2"] ?? 0,
                        t3: profile?.data?.slayer?.slayers?.blaze?.kills?.["3"] ?? 0,
                        t4: profile?.data?.slayer?.slayers?.blaze?.kills?.["4"] ?? 0,
                        total: profile?.data?.slayer?.slayers?.blaze?.kills?.["total"] ?? 0,
                    }
                },
                vampire: {
                    level: profile?.data?.slayer?.slayers?.vampire?.level?.currentLevel,
                    experience: profile?.data?.slayer?.slayers?.vampire?.level?.xp,
                    kills: {
                        t1: profile?.data?.slayer?.slayers?.vampire?.kills?.["1"] ?? 0,
                        t2: profile?.data?.slayer?.slayers?.vampire?.kills?.["2"] ?? 0,
                        t3: profile?.data?.slayer?.slayers?.vampire?.kills?.["3"] ?? 0,
                        t4: profile?.data?.slayer?.slayers?.vampire?.kills?.["4"] ?? 0,
                        total: profile?.data?.slayer?.slayers?.vampire?.kills?.["total"] ?? 0,
                    }
                }
            }
            this.data.dungeons = {
                completions: {
                    catacombs: {
                        f1: profile?.data?.dungeons?.catacombs?.floors?.["1"]?.stats?.tier_completions,
                        f2: profile?.data?.dungeons?.catacombs?.floors?.["2"]?.stats?.tier_completions,
                        f3: profile?.data?.dungeons?.catacombs?.floors?.["3"]?.stats?.tier_completions,
                        f4: profile?.data?.dungeons?.catacombs?.floors?.["4"]?.stats?.tier_completions,
                        f5: profile?.data?.dungeons?.catacombs?.floors?.["5"]?.stats?.tier_completions,
                        f6: profile?.data?.dungeons?.catacombs?.floors?.["6"]?.stats?.tier_completions,
                        f7: profile?.data?.dungeons?.catacombs?.floors?.["7"]?.stats?.tier_completions
                    },
                    master_catacombs: {
                        m1: profile?.data?.dungeons?.master_catacombs?.floors?.["1"]?.stats?.tier_completions,
                        m2: profile?.data?.dungeons?.master_catacombs?.floors?.["2"]?.stats?.tier_completions,
                        m3: profile?.data?.dungeons?.master_catacombs?.floors?.["3"]?.stats?.tier_completions,
                        m4: profile?.data?.dungeons?.master_catacombs?.floors?.["4"]?.stats?.tier_completions,
                        m5: profile?.data?.dungeons?.master_catacombs?.floors?.["5"]?.stats?.tier_completions,
                        m6: profile?.data?.dungeons?.master_catacombs?.floors?.["6"]?.stats?.tier_completions,
                        m7: profile?.data?.dungeons?.master_catacombs?.floors?.["7"]?.stats?.tier_completions
                    },
                    total: profile?.data?.dungeons?.floor_completions
                },
                best_runs: {
                    catacombs: {
                        f1: profile?.data?.dungeons?.catacombs?.floors?.["1"]?.stats?.fastest_time_s_plus,
                        f2: profile?.data?.dungeons?.catacombs?.floors?.["2"]?.stats?.fastest_time_s_plus,
                        f3: profile?.data?.dungeons?.catacombs?.floors?.["3"]?.stats?.fastest_time_s_plus,
                        f4: profile?.data?.dungeons?.catacombs?.floors?.["4"]?.stats?.fastest_time_s_plus,
                        f5: profile?.data?.dungeons?.catacombs?.floors?.["5"]?.stats?.fastest_time_s_plus,
                        f6: profile?.data?.dungeons?.catacombs?.floors?.["6"]?.stats?.fastest_time_s_plus,
                        f7: profile?.data?.dungeons?.catacombs?.floors?.["7"]?.stats?.fastest_time_s_plus
                    },
                    master_catacombs: {
                        m1: profile?.data?.dungeons?.master_catacombs?.floors?.["1"]?.stats?.fastest_time_s_plus,
                        m2: profile?.data?.dungeons?.master_catacombs?.floors?.["2"]?.stats?.fastest_time_s_plus,
                        m3: profile?.data?.dungeons?.master_catacombs?.floors?.["3"]?.stats?.fastest_time_s_plus,
                        m4: profile?.data?.dungeons?.master_catacombs?.floors?.["4"]?.stats?.fastest_time_s_plus,
                        m5: profile?.data?.dungeons?.master_catacombs?.floors?.["5"]?.stats?.fastest_time_s_plus,
                        m6: profile?.data?.dungeons?.master_catacombs?.floors?.["6"]?.stats?.fastest_time_s_plus,
                        m7: profile?.data?.dungeons?.master_catacombs?.floors?.["7"]?.stats?.fastest_time_s_plus
                    },
                },
                experience: {
                    catacombs: {
                        experience: profile?.data?.dungeons?.catacombs?.level?.xp,
                        level: profile?.data?.dungeons?.catacombs?.level?.level,
                        rank: profile?.data?.dungeons?.catacombs?.level?.rank
                    },
                    classes: {
                        Mage: {
                            experience: profile?.data?.dungeons?.classes?.classes?.mage?.level?.xp, 
                            level: profile?.data?.dungeons?.classes?.classes?.mage?.level?.level
                        }, 
                        Archer: {
                            experience: profile?.data?.dungeons?.classes?.classes?.archer?.level?.xp, 
                            level: profile?.data?.dungeons?.classes?.classes?.archer?.level?.level
                        }, 
                        Berserk: {
                            experience: profile?.data?.dungeons?.classes?.classes?.berserk?.level?.xp, 
                            level: profile?.data?.dungeons?.classes?.classes?.berserk?.level?.level
                        }, 
                        Tank: {
                            experience: profile?.data?.dungeons?.classes?.classes?.tank?.level?.xp, 
                            level: profile?.data?.dungeons?.classes?.classes?.tank?.level?.level
                        }, 
                        Healer: {
                            experience: profile?.data?.dungeons?.classes?.classes?.healer?.level?.xp, 
                            level: profile?.data?.dungeons?.classes?.classes?.healer?.level?.level
                        },
                        Average: {
                            experience: profile?.data?.dungeons?.classes?.experience,
                            level: parseFloat(profile?.data?.dungeons?.classes?.average_level_with_progress).toFixed(2)
                        }
                    }
                },
                selected_class: profile?.data?.dungeons?.classes?.selected_class,
                secrets: profile?.data?.dungeons?.secrets_found
            };
        }).catch(e => chat(`&cError at sky.shiiyu.moe&c: ${e}`))
    }
}