import { router } from '@hwbundle/router'
import { storage } from '@hwbundle/storage'

export default {
    data: {
        title: 'data',
        status: '',
    },
    goHome(e) {
        if(e.direction === 'right') {
            router.replace({ uri: "pages/index/index" })
        }
    },
    onset(e) {
        const that = this;
        const date = Date.now();
        storage.set({
            key: 'myValue',
            value: `${date}`,
            success: function (data) {
                that.title = `value set: ${date}`;
                that.status = 'success'
                console.log(`console: success ${data}`);
            },
            fail: function (data, code) {
                that.title = '';
                that.status = `Err: set ${code}: ${data}`;
                console.log(`console: fail ${data} ${code}`);
            }
        })
    },
    onget(e) {
        const that = this;
        storage.get({
            key: 'myValue',
            success: function (data) {
                that.title = `get: ${data}`;
                that.status = 'success';
            },
            fail: function (data, code) {
                that.title = '';
                that.status = `Err: get ${code}: ${data}`;
                console.log(`console: fail ${data} ${code}`);
            }
        })
    },
    ondelete(e) {
        const that = this;
        storage.delete({
            key: 'myValue',
            success: function () {
                that.title = '';
                that.status = 'value successfully deleted';
                console.log('myValue deleted')
            },
            fail: function (data, code) {
                that.title = '';
                that.status = `Err: delete ${code}: ${data}`;
                console.error(`Error: ${code} ${data}`)
            }
        })
    },
    onclear(e) {
        const that = this;
        storage.clear({
            success: function () {
                that.title = '';
                that.status = 'storage cleared.'
                console.log('all values are cleared')
            },
            fail: function (data, code) {
                that.title = '';
                that.status = `Err: clear ${code}: ${data}`;
                console.error(`Error: ${code} ${data}`)
            }
        })
    },
    onInit() {
    }
};
