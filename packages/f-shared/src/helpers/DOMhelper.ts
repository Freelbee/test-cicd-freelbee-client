export class DOMHelper {
    static isNotChildOfElem (e: React.MouseEvent<HTMLElement>) {
        return e.target === e.currentTarget;
    }

    static handleEnterKeydown<T extends HTMLElement> (e: React.KeyboardEvent<T>, callback: () => void) {
        if (e.key === 'Enter') {
            callback();
        }
    }
}