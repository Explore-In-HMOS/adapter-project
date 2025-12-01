import {configuration} from '@hwbundle/configuration';
import { router } from '@hwbundle/router'

export default {
    data: {
        result: ""
    },
    getLocale() {
        this.result = JSON.stringify(configuration.getLocale(), null, 2);
    },
    goHome(e) {
        if(e.direction === 'right') {
            router.replace({ uri: "pages/index/index" })
        }
    }
};