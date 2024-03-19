export class CookieHelper {
    static parseAll (cookies: string) {
        const entries = cookies.split('; ');
        const result = new Map<string, string>();

        entries.forEach(e => {
            const [key, value] = e.split('=');
            result.set(key, value);
        });
        return result;
    }

    static getAllFromDocument () {
        if(!document) return null;

        return CookieHelper.parseAll(document.cookie);
    }

    static get (key: string) {
        const cookies = CookieHelper.getAllFromDocument();        
        if(cookies && cookies.has(key)) {
            return cookies.get(key);
        } else {
            return null;
        }
    }
}