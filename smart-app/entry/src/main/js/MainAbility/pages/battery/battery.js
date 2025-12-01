import { router } from '@hwbundle/router';
import { battery } from '@hwbundle/battery';

export default {
    data: {
        result: "",
    },

    batteryLevel() {
        let level = "";

        battery.batteryLevel(function (levelText) {
            level = "Battery Level:\n" + levelText;
        })

        this.result = level;
    },

    chargingStatus() {
        let charging = "";

        battery.charging(function (chargingStatus) {
            charging = "Charging:\n" + chargingStatus;
        })

        this.result = charging;
    },

    goHome(e) {
        if(e.direction === 'right') {
            router.replace({ uri: "pages/index/index" })
        }
    }


};
