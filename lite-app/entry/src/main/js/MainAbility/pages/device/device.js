import {device} from '@hwbundle/device';
import { router } from '@hwbundle/router'

export default {
    data: {
        result: ""
    },

    getInfo() {
        device.getInfo({
            success: (data) => {
                this.result = "Device Info:\n" + JSON.stringify(data, null, 2);
                console.info(`Device info success: ${JSON.stringify(data)}`);
            },
            fail: (data, code) => {
                this.result = `Error getting device info:\nCode: ${code}\nData: ${data}`;
                console.error(`Device info failed. Code: ${code}, Data: ${data}`);
            }
        });
    },

    goHome(e) {
        if(e.direction === 'right') {
            router.replace({ uri: "pages/index/index" })
        }
    }
};