interface Prop<T> {
    type: T,
    value: string
}

export class PropsHelper {
    static MapFieldsToProps<T extends object, K = keyof T> (data: T): Array<{type: K, value: string}> {
        const props = Object.entries(data).map(e => ({
            type: e[0] as K, 
            value: e[1]
        }))

        return props;
    }

    static MapPropsToFields<T extends string> (props: Array<Prop<T>>): Record<T, string> {
        const fields = {} as Record<T, string>;
        props.forEach(({type, value}) => {
            fields[type] = value;
        })

        return fields;
    }
}