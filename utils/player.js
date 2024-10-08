import request from "../../requestV2";
import config from "../config";
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
            networth: { total: null, soulbound: null, purse: null, bank: null },
            dungeons: {
                best_runs: { catacombs: {f1: 0, f2: 0, f3: 0, f4: 0, f5: 0, f6: 0, f7: 0}, master_catacombs: {m1: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0, m7: 0} },
                completions: { catacombs: {f1: 0, f2: 0, f3: 0, f4: 0, f5: 0, f6: 0, f7: 0}, master_catacombs: {m1: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0, m7: 0}, total: null },
                experience: { catacombs: {experience: null, level: null, rank: null}, classes: {Mage: {experience: null, level: null}, Archer: {experience: null, level: null}, Berserk: {experience: null, level: null}, Tank: {experience: null, level: null}, Healer: {experience: null, level: null}} },
                secrets: null,
                selected_class: null,
            },
            accessories: { magical_power: null, reforge: null },
            level: { experience: null, level: null, rank: null },
            slayer: { spider: {level: null, experience: null, kills: {t1: null, t2: null, t3: null, t4: null, total: null}}, zombie: {level: null, experience: null, kills: {t1: null, t2: null, t3: null, t4: null, total: null}}, wolf: {level: null, experience: null, kills: {t1: null, t2: null, t3: null, t4: null, total: null}}, enderman: {level: null, experience: null, kills: {t1: null, t2: null, t3: null, t4: null, total: null}}, blaze: {level: null, experience: null, kills: {t1: null, t2: null, t3: null, t4: null, total: null}}, vampire: {level: null, experience: null, kills: {t1: null, t2: null, t3: null, t4: null, t5: null, total: null}} },
        };
    }

    init() {
        return request({url: `https://api.mojang.com/users/profiles/minecraft/${this.player.username}`, headers: {'User-Agent': ' Mozilla/5.0', 'Content-Type': 'application/json'}, json: true}).then(data => {
            if (!data.id) return chat(`&cError at &7api.mojang.com&c: ${data.errorMessage}`);
            this.player.uuid = data.id;
            this.player.username = data.name;
            return;
        }).catch(e => chat(`&cError at &7api.mojang.com&c: ${e}`))
    }

    getData() {
        return request({url: `https://sky.shiiyu.moe/api/v2/profile/${this.player.uuid}`, headers: {'User-Agent': ' Mozilla/5.0', 'Content-Type': 'application/json'}, json: true}).then(data => {
            if (data.error) return chat(`&cError at &7sky.shiiyu.moe&c: ${data.error}`);
            const profile = Object.values(data.profiles).find(profile => profile.current === true)
            
            this.data.apiStatus = profile?.data?.networth?.noInventory;
            if (this.data.apiStatus) {
                this.data.networth = {
                    total: profile?.data?.networth?.networth,
                    soulbound: profile?.data?.networth?.soulbound,
                    purse: profile?.data?.networth?.purse,
                    bank: profile?.data?.networth?.bank
                };
                this.data.accessories = {
                    magical_power: profile?.data?.accessories?.magical_power?.total,
                    reforge: profile?.raw?.accessory_bag_storage?.selected_power
                };
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
                        t1: profile?.data?.slayer?.slayers?.spider?.level?.kills["1"],
                        t2: profile?.data?.slayer?.slayers?.spider?.level?.kills["2"],
                        t3: profile?.data?.slayer?.slayers?.spider?.level?.kills["3"],
                        t4: profile?.data?.slayer?.slayers?.spider?.level?.kills["4"],
                        total: profile?.data?.slayer?.slayers?.spider?.level?.kills["total"],
                    }
                },
                zombie: {
                    level: profile?.data?.slayer?.slayers?.zombie?.level?.currentLevel,
                    experience: profile?.data?.slayer?.slayers?.zombie?.level?.xp,
                    kills: {
                        t1: profile?.data?.slayer?.slayers?.zombie?.level?.kills["1"],
                        t2: profile?.data?.slayer?.slayers?.zombie?.level?.kills["2"],
                        t3: profile?.data?.slayer?.slayers?.zombie?.level?.kills["3"],
                        t4: profile?.data?.slayer?.slayers?.zombie?.level?.kills["4"],
                        total: profile?.data?.slayer?.slayers?.zombie?.level?.kills["total"],
                    }
                },
                wolf: {
                    level: profile?.data?.slayer?.slayers?.wolf?.level?.currentLevel,
                    experience: profile?.data?.slayer?.slayers?.wolf?.level?.xp,
                    kills: {
                        t1: profile?.data?.slayer?.slayers?.wolf?.level?.kills["1"],
                        t2: profile?.data?.slayer?.slayers?.wolf?.level?.kills["2"],
                        t3: profile?.data?.slayer?.slayers?.wolf?.level?.kills["3"],
                        t4: profile?.data?.slayer?.slayers?.wolf?.level?.kills["4"],
                        total: profile?.data?.slayer?.slayers?.wolf?.level?.kills["total"],
                    }
                },
                enderman: {
                    level: profile?.data?.slayer?.slayers?.enderman?.level?.currentLevel,
                    experience: profile?.data?.slayer?.slayers?.enderman?.level?.xp,
                    kills: {
                        t1: profile?.data?.slayer?.slayers?.enderman?.level?.kills["1"],
                        t2: profile?.data?.slayer?.slayers?.enderman?.level?.kills["2"],
                        t3: profile?.data?.slayer?.slayers?.enderman?.level?.kills["3"],
                        t4: profile?.data?.slayer?.slayers?.enderman?.level?.kills["4"],
                        total: profile?.data?.slayer?.slayers?.enderman?.level?.kills["total"],
                    }
                },
                blaze: {
                    level: profile?.data?.slayer?.slayers?.blaze?.level?.currentLevel,
                    experience: profile?.data?.slayer?.slayers?.blaze?.level?.xp,
                    kills: {
                        t1: profile?.data?.slayer?.slayers?.blaze?.level?.kills["1"],
                        t2: profile?.data?.slayer?.slayers?.blaze?.level?.kills["2"],
                        t3: profile?.data?.slayer?.slayers?.blaze?.level?.kills["3"],
                        t4: profile?.data?.slayer?.slayers?.blaze?.level?.kills["4"],
                        total: profile?.data?.slayer?.slayers?.blaze?.level?.kills["total"],
                    }
                },
                vampire: {
                    level: profile?.data?.slayer?.slayers?.vampire?.level?.currentLevel,
                    experience: profile?.data?.slayer?.slayers?.vampire?.level?.xp,
                    kills: {
                        t1: profile?.data?.slayer?.slayers?.vampire?.level?.kills["1"],
                        t2: profile?.data?.slayer?.slayers?.vampire?.level?.kills["2"],
                        t3: profile?.data?.slayer?.slayers?.vampire?.level?.kills["3"],
                        t4: profile?.data?.slayer?.slayers?.vampire?.level?.kills["4"],
                        total: profile?.data?.slayer?.slayers?.vampire?.level?.kills["total"],
                    }
                }
            }
            this.data.dungeons = {
                completions: {
                    catacombs: {
                        f1: profile?.data?.dungeons?.catacombs?.floors["1"]?.stats?.tier_completions,
                        f2: profile?.data?.dungeons?.catacombs?.floors["2"]?.stats?.tier_completions,
                        f3: profile?.data?.dungeons?.catacombs?.floors["3"]?.stats?.tier_completions,
                        f4: profile?.data?.dungeons?.catacombs?.floors["4"]?.stats?.tier_completions,
                        f5: profile?.data?.dungeons?.catacombs?.floors["5"]?.stats?.tier_completions,
                        f6: profile?.data?.dungeons?.catacombs?.floors["6"]?.stats?.tier_completions,
                        f7: profile?.data?.dungeons?.catacombs?.floors["7"]?.stats?.tier_completions
                    },
                    master_catacombs: {
                        m1: profile?.data?.dungeons?.master_catacombs?.floors["1"]?.stats?.tier_completions,
                        m2: profile?.data?.dungeons?.master_catacombs?.floors["2"]?.stats?.tier_completions,
                        m3: profile?.data?.dungeons?.master_catacombs?.floors["3"]?.stats?.tier_completions,
                        m4: profile?.data?.dungeons?.master_catacombs?.floors["4"]?.stats?.tier_completions,
                        m5: profile?.data?.dungeons?.master_catacombs?.floors["5"]?.stats?.tier_completions,
                        m6: profile?.data?.dungeons?.master_catacombs?.floors["6"]?.stats?.tier_completions,
                        m7: profile?.data?.dungeons?.master_catacombs?.floors["7"]?.stats?.tier_completions
                    },
                    total: profile?.data?.dungeons?.floor_completions
                },
                best_runs: {
                    catacombs: {
                        f1: profile?.data?.dungeons?.catacombs?.floors["1"]?.stats?.fastest_time_s,
                        f2: profile?.data?.dungeons?.catacombs?.floors["2"]?.stats?.fastest_time_s,
                        f3: profile?.data?.dungeons?.catacombs?.floors["3"]?.stats?.fastest_time_s,
                        f4: profile?.data?.dungeons?.catacombs?.floors["4"]?.stats?.fastest_time_s,
                        f5: profile?.data?.dungeons?.catacombs?.floors["5"]?.stats?.fastest_time_s,
                        f6: profile?.data?.dungeons?.catacombs?.floors["6"]?.stats?.fastest_time_s,
                        f7: profile?.data?.dungeons?.catacombs?.floors["7"]?.stats?.fastest_time_s
                    },
                    master_catacombs: {
                        m1: profile?.data?.dungeons?.master_catacombs?.floors["1"]?.stats?.fastest_time_s,
                        m2: profile?.data?.dungeons?.master_catacombs?.floors["2"]?.stats?.fastest_time_s,
                        m3: profile?.data?.dungeons?.master_catacombs?.floors["3"]?.stats?.fastest_time_s,
                        m4: profile?.data?.dungeons?.master_catacombs?.floors["4"]?.stats?.fastest_time_s,
                        m5: profile?.data?.dungeons?.master_catacombs?.floors["5"]?.stats?.fastest_time_s,
                        m6: profile?.data?.dungeons?.master_catacombs?.floors["6"]?.stats?.fastest_time_s,
                        m7: profile?.data?.dungeons?.master_catacombs?.floors["7"]?.stats?.fastest_time_s
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
                        }
                    }
                },
                selected_class: profile?.data?.dungeons?.classes?.selected_class,
                secrets: profile?.data?.dungeons?.secrets_found
            };
        })
    }
}