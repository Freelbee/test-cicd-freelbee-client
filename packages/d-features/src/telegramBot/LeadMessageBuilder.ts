export class LeadMessageBuilder {
    private _title: string;
    private _message?: string;
    private _phone?: string;
    private _name?: string;
    private _email?: string;
    private _company?: string;
    private _source?: string;
    private _env = process.env.NEXT_PUBLIC_MODE;

    constructor (title: string) {
        this._title = title;
    }

    public name (name?: string) {
        this._name = name;
        return this;
    }

    public email (email?: string) {
        this._email = email;
        return this;
    }

    public company (company?: string) {
        this._company = company;
        return this;
    }

    public message (message?: string) {
        this._message = message;
        return this;
    }

    public phone (phone?: string) {
        this._phone = phone;
        return this;
    }

    public source (source?: string) {
        this._source = source;
        return this;
    }

    public build () {

        const msg = `
        ❗ <b>${this._title}</b>
    
        User name: <b>${this._name || '--'}</b>
        Company name: <b>${this._company || '--'}</b>
        Phone: <b>${this._phone || '--'}</b>
        Email: <b>${this._email || '--'}</b>

        Message: <i>${this._message || '--'}</i>
        ______________

        Source: <i>${this._source || '--'}</i>
        From environment: <i>${this._env}</i>`;

        console.log(msg);

        return msg;
    }
}