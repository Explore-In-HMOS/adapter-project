import { fileManagement } from '@hwbundle/file';

export default {
    data: {
        result: "",
        uri: 'internal://app/myNotes',
    },

    createDirectory() {
        const that = this

        fileManagement.fileMkdir(this.uri, function (status) {
            if (status) {
                that.result = 'Created myNotes directory.'
            } else {
                this.result = 'Failed to create directory.'
            }
        })
    },

    writeText() {
        const that = this

        fileManagement.fileWriteText(this.uri + '/notes.txt', 'Show-Off', function (status) {
            if (status) {
                that.result = 'Show-Off text writed succesfully.'
            } else {
                that.result = 'Something went wrong.'
            }
        })
    },

    readText() {
        const that = this

        fileManagement.fileReadText(this.uri + '/notes.txt', function ({ success, text }) {
            if (success) {
                that.result = JSON.stringify(text)
            } else {
                that.result = 'Something went wrong.'
            }
        })
    },
    goHome(e) {
        if(e.direction === 'right') {
            router.replace({ uri: "pages/index/index" })
        }
    }
};
