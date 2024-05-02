export abstract class FileDownloadHelper {
    static downloadFileFromOctetStreamByRtkQuery = async (response: Response) => {
        if (!process.browser) {
            return;
        }
        const headers = response.headers;
        const fileName = headers.get('File-Name');
        const bytesString = Buffer.from(JSON.parse(fileName ?? '[]'), 'base64').toString('utf-8');
        const link = document.createElement('a');

        link.href = window.URL.createObjectURL(await response.blob());
        link.setAttribute('download', bytesString);
        link.click();
        link.remove();
    };

    public static hasNotInvalidSymbols (text: string) {
        const regex = new RegExp(/^[\u0020-\u007E\u0410-\u044F\u0451\u0401\u00AB\u00BB]+$/);
        console.log(regex.test(text));
        return (regex.test(text) || text === '');
    }
}
