export class MessageBuilder {
    private _title: string = '';
    private _body: string = '';
    private _phone: string = '';
    private _source: string = '';
    private _target: string = '';

    private constructor () {}

    private notEmpty (value?: string): boolean {
        return !!value;
    }

    public static builder () {
        return new MessageBuilder();
    }

    public title (title?: string) {
        if(this.notEmpty(title)) {
            this._title = `<b>${title}</b>`;
        }
        return this;
    }

    public body (body?: string) {
        if(this.notEmpty(body)) {
            this._body = `<i>${body}</i>`;
        }
        return this;
    }

    public phone (phone?: string) {
        if(this.notEmpty(phone)) {
            this._phone = `<b><a href="tel:${phone}">${phone}</a></b>`;
        }
        return this;
    }

    public env (env?: string) {
        if(this.notEmpty(env)) {
            this._source = `<u>Sent from the environment: ${env}</u>`;
        }
        return this;
    }

    public target (target?: string) {
        if(this.notEmpty(target)) {
            this._target = `Sent from form: ${target}`;
        }
        return this;
    }

    public build () {
        return `

            ${this._title}

            ${this._phone}

            ${this._body}


            ${this._source}
            
            ${this._target}`;
    }
}