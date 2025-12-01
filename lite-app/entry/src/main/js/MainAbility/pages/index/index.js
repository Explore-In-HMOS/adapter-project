import { router } from '@hwbundle/router';

export default {
    data: {
        title: ''
    },
    onInit() {
        this.title = this.$t('strings.world');
    },
    goCrypto() {
        router.replace({ uri: "pages/crypto/index" })
    },
    goScreenLock() {
        router.replace({ uri: "pages/screenlock/index" })
    },
    goStorage() {
        router.replace({ uri: "pages/storage/index" })
    },
    goGeolocaton() {
        router.replace({ uri: "pages/geolocation/index" })
    },
    goApp() {
        router.replace({ uri: "pages/app/index" })
    },
    goBattery() {
        router.replace({ uri: "pages/battery/battery" })
    },
    goFile() {
        router.replace({ uri: "pages/file/file" })
    },
    goSensor() {
        router.replace({ uri: "pages/sensor/sensor" })
    },
    goDevice() {
        router.replace({ uri: "pages/device/device" })
    },
    goConfiguration() {
        router.replace({ uri: "pages/configuration/configuration" })
    },
    goToBrightness() {
        router.replace({ uri: "pages/brightness/brightness" })
    },
    goToVibrator() {
        router.replace({ uri: "pages/vibrator/vibrator" })
    },
    goWearEngine() {
        router.replace({ uri: "pages/wear-engine/index" })
    }
};
