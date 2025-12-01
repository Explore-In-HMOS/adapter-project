import { screenLock } from '@hwbundle/screenlock'
import { router } from '@hwbundle/router'

export default {
    data: {
        result: "",
    },
    isLocked() {
        const that = this;
        screenLock.isScreenLocked(function (err, data) {
            if (err) {
                that.result =
                    `Failed to obtain whether the screen is locked, Code: ${err.code}, message: ${err.message}`;
                return;
            }
            that.result = `Succeeded in Obtaining whether the screen is locked. result: ${data}`;
        });
    },

    isSecureMode() {
        const that = this;
        screenLock.isSecureMode(function (err, data) {
            that.result = "Inside callback";
            if (err) {
                that.result =
                    `Failed to obtain whether the device is in secure mode, Code: ${err.code}, message: ${err.message}`;
                return;
            }
            that.result = `Succeeded in Obtaining whether the device is in secure mode. result: ${data}`;
        });
    },
    unlockScreen() {
        const that = this;
        screenLock.unlockScreen(function (err) {
            if (err) {
                that.result = `Failed to unlock the screen, Code: ${err.code}, message: ${err.message}`;
                return;
            }
            that.result = `Succeeded unlocking the screen.`;
        });
    },
    goHome(e) {
        if(e.direction === 'right') {
            router.replace({ uri: "pages/index/index" })
        }
    }
};
