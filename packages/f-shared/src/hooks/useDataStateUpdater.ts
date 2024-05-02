import { Dispatch, SetStateAction, useState} from 'react';
import StateUpdater from '../helpers/StateUpdater/StateUpdater';

export function useDataStateUpdater<T> (initialData: T, ownSetData?: Dispatch<SetStateAction<T>>): [T, (key: keyof T, value: unknown,) => void, Dispatch<SetStateAction<T>>] {


    const [ data, setData ] = useState<T>(initialData);

    if(ownSetData) return [initialData, StateUpdater.builder<T>(ownSetData).build().get(), ownSetData];

    return [data, StateUpdater.builder<T>(setData).build().get(), setData];
}