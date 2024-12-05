import { setPitch, setYaw } from "./utils";

export class Move {
    constructor() {
        this.KeyBinding = Java.type("net.minecraft.client.settings.KeyBinding")
    }
    stop() { 
        this.KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_74351_w.func_151463_i(), false);
        this.KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_151444_V.func_151463_i(), false);
        this.KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_74368_y.func_151463_i(), false);
        this.KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_74370_x.func_151463_i(), false);
        this.KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_74366_z.func_151463_i(), false);
    }
    sprint() {
        this.KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_74351_w.func_151463_i(), true);
        this.KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_151444_V.func_151463_i(), true);
    };
    back() {
        this.KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_74368_y.func_151463_i(), true);
    };
    left() {
        this.KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_74370_x.func_151463_i(), true);
    };
    right() {
        this.KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_74366_z.func_151463_i(), true);
    };

    cutVelocity() {
        Player.getPlayer().func_70016_h(0, Player.getPlayer().field_70181_x, 0);
    };

    jump() {
        Client.scheduleTask(() => { KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_74314_A.func_151463_i(), true) })
        Client.scheduleTask(2, () => { KeyBinding.func_74510_a(Client.getMinecraft().field_71474_y.field_74314_A.func_151463_i(), false) })
    };

    jumpEdge(delay = 0) {
        const scanner = register("renderOverlay", () => {
            if (World.getBlockAt(Player.getX(), Player.getY() - 0.5, Player.getZ()).type.getID() == 0) {
                this.jump(); scanner.unregister();
            }
        }).unregister();
        setTimeout(() => { scanner.register();}, delay);
    };

    rotate(yaw, pitch) {
        setYaw(yaw);
        setPitch(pitch);
    };


}