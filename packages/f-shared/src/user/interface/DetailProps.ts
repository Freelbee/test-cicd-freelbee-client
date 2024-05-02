export interface Prop<T> {
    id: number, 
    type: T,
    value: string
}

export type DetailProps<T> = Array<Prop<T>>;