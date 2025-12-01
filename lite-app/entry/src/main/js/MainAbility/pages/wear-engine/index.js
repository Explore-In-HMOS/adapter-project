import { Builder, Message, P2pClient } from '@hwbundle/wearengine'
import { router } from '@hwbundle/router'

let PHONE_APP_FINGERPRINT = "" // Mobile Fingerprint
let PHONE_APP_PACKAGE_NAME = "" // Mobile PackageName

let p2pClient = new P2pClient();
let MessageClient = new Message();
let builderClient = new Builder();

export default {
    data: {
        receiveMessage: '',
        receivedMessage: '',
        infoMessage: ''
    },
    onInit() {
        p2pClient.setPeerPkgName(PHONE_APP_PACKAGE_NAME);
        p2pClient.setPeerFingerPrint(PHONE_APP_FINGERPRINT);
        this.registerMessage()
    },
    registerMessage() {
        let that = this;
        p2pClient.registerReceiver({
            onSuccess: function () {
                that.receiveMessage = "Message receive success";
            },
            onFailure: function () {
                that.receiveMessage = "Message receive fail";
            },
            onReceiveMessage: function (data) {
                if (data && data.isFileType) {
                    that.receiveMessage = "Receive file name:" + data.name;
                } else {
                    that.receiveMessage = "Receive message:" + data;
                    that.receivedMessage = data;
                }
            },
        });
    },
    unregisterMessage() {
        let that = this;
        p2pClient.unregisterReceiver({
            onSuccess: function () {
                that.infoMessage = "Stop receiving messages is sent";
            },
        });
    },
    sendMessage() {
        builderClient.setDescription("hello wearEngine");
        MessageClient.builder = builderClient;
        this.infoMessage = "Send message button click";
        let that = this;
        p2pClient.send(MessageClient, {
            onSuccess: function () {
                that.infoMessage = "Message sent successfully";
            },
            onFailure: function () {
                that.infoMessage = "Failed to send message";
            },
            onSendResult: function (resultCode) {
                that.infoMessage = "On send result:" + resultCode.data + resultCode.code;
            },
            onSendProgress: function (progressNum) {
                that.infoMessage = "Send Progress:" + progressNum;
            },
        });
    },

    sendFile() {
        this.infoMessage = "Send file button click";
        let testFile = {
            // Test file path => resources/rawfile/file.txt
            // File path. If the file fails to be sent and the result code is 208,
            // it indicates that the wearable version is too early. In this case, instruct users to update the version.
            "name": "internal://app/rawfile/file.txt",
            "mode": "text", // File type, 'text' or 'binary'
            "mode2": "RW", // File attribute, "R", "W", or "RW"
        };
        let that = this;

        builderClient.setPayload(testFile);
        MessageClient.builder = builderClient;
        p2pClient.send(MessageClient, {
            onSuccess: function () {
                that.infoMessage = "File sent successfully";
            },
            onFailure: function () {
                that.infoMessage = "Failed to send file";
            },
            onSendResult: function (resultCode) {
                if (resultCode.code === 207) {
                    that.infoMessage = "Success sent file"
                    return
                }
                that.infoMessage = resultCode.code;
            },
            onSendProgress: function (count) {
                that.infoMessage = "Progress" + count;
            },
        });
    },
    ping() {
        let that = this;
        that.infoMessage = "Ping correct APP";
        p2pClient.ping({
            onSuccess: function () {
                that.infoMessage = that.infoMessage + "success";
            },
            onFailure: function () {
                that.infoMessage = that.infoMessage + "fail";
            },
            onPingResult: function (resultCode) {
                that.infoMessage = "result code:" + resultCode.code + ", the app already have installed";
            },
        });
    },
    goHome(e) {
        if(e.direction === 'right') {
            router.replace({ uri: "pages/index/index" })
        }
    }
}