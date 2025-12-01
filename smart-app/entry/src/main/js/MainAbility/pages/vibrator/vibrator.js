import { vibrate } from '@hwbundle/vibrator'
import { router } from '@hwbundle/router'

export default {
    data: {
        title: ""
    },
    onInit() {
        this.title = "Vibrator";
    },

    vibrateTest() {
        let that = this;

        vibrate( {
            mode: 'short',
            success: function() {
                that.title = 'success';
            },
            fail: function(data, code) {
                that.title = `Err: ${JSON.stringify(data)} ${code}`;
            },
            complete: function() {
                that.title = 'complete';
            },
        })
        // this.title = 'vibration testing'
    },
    goHome(e) {
        if(e.direction === 'right') {
            router.replace({ uri: "pages/index/index" })
        }
    }
};
