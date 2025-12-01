import { router } from '@hwbundle/router'
import { cryptoFramework } from '@hwbundle/cryptoframework'

export default {
    data: {
        result: "",
    },

    sha256() {
        const that = this;
        const md = cryptoFramework.createMd('SHA256');
        md.update({ data: stringToUint8Array("@hwbundle!") }, function (err) {
            md.digest(function (err, digestOutput) {
                if (err) {
                    that.result = "SHA256 Error:\n" + err.code
                    return;
                }
                that.result = "SHA256 Result:\n" + digestOutput.data.toString()
            });
        });

    },
    createRandom() {
        this.result =
            "Random Result:\n" +
            cryptoFramework
                .createRandom()
                .generateRandomSync(16)
                .data
                .toString()
    },

    goHome(e) {
        if(e.direction === 'right') {
            router.replace({ uri: "pages/index/index" })
        }
    }
};

function stringToUint8Array(string) {
    const buffer = [];
    for (let i = 0; i < string.length; i++) {
        buffer.push(string[i].charCodeAt(0))
    }
    return new Uint8Array(buffer);
}
