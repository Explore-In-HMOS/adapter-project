import { geolocation } from "@hwbundle/geolocation"
import { router } from "@hwbundle/router"

export default {
    data: {
        locationType: '',
        location: '',
        coordTypes: '',
        subscribed: '',
    },
    goHome(e) {
        if(e.direction === 'right') {
            router.replace({ uri: "pages/index/index" })
        }
    },
    onGetLocation() {
        const that = this;
        geolocation.getLocation({
            timeout: 2000,
            success: function (data) {
                that.location = JSON.stringify(data);
                console.log(`myconsole success ${JSON.stringify(data)}`)
            },
            fail: function (data, code) {
                console.log(`myconsole error: ${JSON.stringify(data)} ${code}`)
            },
            complete: function () {
                console.log('geolocation complete----------')
            }
        })
    },
    onGetLocationType() {
        const that = this;
        geolocation.getLocationType({
            timeout: 2000,
            success: function (data) {
                console.log(`myconsole locationType ${JSON.stringify(data)}`)
                that.locationType = JSON.stringify(data);
            },
            fail: function (data, code) {
                console.log(`myconsole error: ${JSON.stringify(data)} ${code}`)
            },
            complete: function () {
                console.log('geolocation complete----------')
            }
        })
    },
    onSubscribe() {
        const that = this;
        geolocation.subscribe({
            success: function (data) {
                console.log(`myconsole subscribe ${JSON.stringify(data)}`)
                that.subscribed = JSON.stringify(data);
            },
            fail: function (data, code) {
                that.subscribed = `Err: ${code} ${JSON.stringify(data)}`
                console.log(`myconsole error: ${JSON.stringify(data)} ${code}`)
            }
        })
    },
    onUnSubscribe() {
        geolocation.unsubscribe();
        this.subscribed = 'unsubscribed'
    },
    onCoordType() {
        this.coordTypes = geolocation.getSupportedCoordTypes();
    },
    onInit() {
    },
    onGetInfo() {
        this.onGetLocation();
        this.onGetLocationType();
        this.onCoordType();
    }
};
