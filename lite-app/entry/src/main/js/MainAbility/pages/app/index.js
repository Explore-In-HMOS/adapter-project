import { app } from '@hwbundle/app'
import { router } from '@hwbundle/router'

export default {
    data: {
        appinfo: ''
    },
    onInit() {
        const info = app.getInfo();
        this.appinfo = `${JSON.stringify(info)}`;
    },
    goHome(e) {
        if(e.direction === 'right') {
            router.replace({ uri: "pages/index/index" })
        }
    },
    onTerminate() {
        app.terminate();
    },
};
