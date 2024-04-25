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
}
