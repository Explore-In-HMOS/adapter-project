import { brightness} from '@hwbundle/brightness'
import { router } from '@hwbundle/router'


export default {
    data: {
        title: ""
    },
    onInit() {
        this.title = "Brightness";
    },

    getVal() {
        brightness.getValue({
            success: (data) => this.title  =  'Brightness:' + data.value,
            fail: (err, code) => console.error('Failed to get brightness' + err + code),
        });
    },

    setVal() {
        const val= 10
        brightness.setValue({
            value: val,
            success: (data) => this.title  =  'Brightness:' +  val ,
            fail: (err, code) => console.error('Failed to get brightness' + err + code),
        });
    },

    setKeepScreenOn(){
        brightness.setKeepScreenOn({
            keepScreenOn: true,
            success: () => this.title = 'Screen will stay on',
            fail: (err, code) => console.error('Failed to setKeepScreenOn'+ err + code),
        });
    },

    setKeepScreenOff(){
        brightness.setKeepScreenOn({
            keepScreenOn: false,
            success: () => this.title = 'Screen will stay off',
            fail: (err, code) => console.error('Failed to setKeepScreenOff'+ err + code),
        });
    },

    goHome(e) {
        if(e.direction === 'right') {
            router.replace({ uri: "pages/index/index" })
        }
    }
};
