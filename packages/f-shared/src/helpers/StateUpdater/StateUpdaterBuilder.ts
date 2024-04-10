/* eslint-disable @typescript-eslint/no-explicit-any */
import {Dispatch, SetStateAction} from 'react';
import StateUpdater from './StateUpdater';

/**
 *
 */
export default class StateUpdaterBuilder<StateType, ModelType = StateType>
{
    private readonly setData : Dispatch<SetStateAction<StateType>>;
    private updater? : (data: StateType, key: keyof ModelType, value: any) => StateType;
    private onUpdate?: (key: keyof ModelType, value: any) => void;

    /**
     *
     * @param {React.Dispatch<React.SetStateAction<StateType>>} setData
     */
    constructor (setData : Dispatch<SetStateAction<StateType>>) {
        this.setData = setData;
    }

    /**
     *
     * @param {(data: StateType, key: keyof ModelType, value: any) => StateType} updater
     * @return {StateUpdaterBuilder<StateType, ModelType>}
     */
    public setUpdater (updater: (data: StateType, key: keyof ModelType, value: any) => StateType)
        : StateUpdaterBuilder<StateType, ModelType>
    {
        this.updater = updater;
        return this;
    }

    /**
     *
     * @param {(key: keyof ModelType, value: any) => void} onUpdate
     * @return {StateUpdaterBuilder<StateType, ModelType>}
     */
    public setOnUpdate (onUpdate: (key: keyof ModelType, value: any) => void)
        : StateUpdaterBuilder<StateType, ModelType>
    {
        this.onUpdate = onUpdate;
        return this;
    }

    /**
     *
     * @return {StateUpdater<StateType, ModelType>}
     */
    public build () : StateUpdater<StateType, ModelType>
    {
        return new StateUpdater(this.setData, this.updater, this.onUpdate);
    }
}