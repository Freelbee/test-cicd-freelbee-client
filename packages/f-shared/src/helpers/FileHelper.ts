export class FileHelper {
    static getFileName = (name: string) => {
        if(name.length < 14) {
            return name;
        }
        const firstSlice = name.substring(0, 9);
        const secondSlice = name.substring(name.indexOf('.') - 3, name.indexOf('.'));
        const extensionFile = name.substring(name.indexOf('.'), name.length);

        return `${firstSlice}...${secondSlice}${extensionFile}`;
    };
}