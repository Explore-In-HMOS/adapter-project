import { sensor } from '@hwbundle/sensor'
import { router } from '@hwbundle/router'

export default {
    data: {
        result: ""
    },


    subscribeStepCounter() {
        const subscribeOptions = {
            success: (ret) => {
                console.info(`Step counter data: steps=${ret.steps}`);
                this.result = `Steps: ${ret.steps}`;
            },
            fail: (data, code) => {
                console.error(`Step counter failed. Code: ${code}, data: ${data}`);
                this.result = `Error: ${code} - ${data}`;
            }
        };
        sensor.subscribeStepCounter(subscribeOptions);
    },

    subscribeHeartRate() {
        const subscribeOptions = {
            success: (ret) => {
                console.info(`Heart rate data: heartRate=${ret.heartRate}`);
                this.result = `Heart Rate: ${ret.heartRate}`;
            },
            fail: (data, code) => {
                console.error(`Heart rate failed. Code: ${code}, data: ${data}`);
                this.result = `Error: ${code} - ${data}`;
            }
        };
        sensor.subscribeHeartRate(subscribeOptions);
    },

    subscribeOnBodyState() {
        const subscribeOptions = {
            success: (ret) => {
                console.info(`On body state data: value=${ret.value}`);
                this.result = `On Body: ${ret.value}`;
            },
            fail: (data, code) => {
                console.error(`On body state failed. Code: ${code}, data: ${data}`);
                this.result = `Error: ${code} - ${data}`;
            }
        };
        sensor.subscribeOnBodyState(subscribeOptions);
    },

    getOnBodyState() {
        const getOptions = {
            success: (ret) => {
                console.info(`Get on body state: value=${ret.value}`);
                this.result = `On Body: ${ret.value}`;
            },
            fail: (data, code) => {
                console.error(`Get on body state failed. Code: ${code}, data: ${data}`);
                this.result = `Error: ${code} - ${data}`;
            }
        };
        sensor.getOnBodyState(getOptions);
    },

    unsubscribeStepCounter() {
        this.result = "Step counter unsubscribed";
        sensor.unsubscribeStepCounter();
    },

    unsubscribeHeartRate() {
        this.result = "Heart rate unsubscribed";
        sensor.unsubscribeHeartRate();
    },

    unsubscribeOnBodyState() {
        this.result = "On body state unsubscribed";
        sensor.unsubscribeOnBodyState();
    },

    goHome(e) {
        if (e.direction === 'right') {
            router.replace({ uri: "pages/index/index" })
        }
    }
};