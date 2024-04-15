export class FormHelper {
    static MapFieldsToProps<T extends object, K = keyof T> (data: T): Array<{type: K, value: string}> {
        const props = Object.entries(data).map(e => ({
            type: e[0] as K, 
            value: e[1]
        }))

        return props;
    }
}