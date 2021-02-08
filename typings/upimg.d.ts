declare module 'upimg' {

    interface Response {
        success: boolean
        message: string
        url: string
        type: {
            ext: string
            mime: string
        }
    }

    namespace toutiao {
        function upload(path: string): Promise<Response>
    }
}
