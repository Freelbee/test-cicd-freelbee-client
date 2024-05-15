import { Dispatch, SetStateAction } from 'react';
import StateUpdaterBuilder from './StateUpdaterBuilder';

type SetData<A> = Dispatch<SetStateAction<A>>;
type Updater<A, B> = (data: A, key: keyof B, value: any) => A;
type OnUpdate<A> = (key: keyof A, value: any) => void;

export class StateUpdater<StateType, ModelType = StateType> {
  private readonly setData: SetData<StateType>;
  private readonly updater?: Updater<StateType, ModelType>;
  private readonly onUpdate?: OnUpdate<ModelType>;

  /**
   *
   * @param {React.Dispatch<React.SetStateAction<StateType>>} setData
   * @param {(data: StateType, key: keyof ModelType, value: any) => StateType} updater
   * @param {(key: keyof ModelType, value: any) => void} onUpdate
   */
  constructor(
    setData: SetData<StateType>,
    updater?: Updater<StateType, ModelType>,
    onUpdate?: OnUpdate<ModelType>
  ) {
    this.setData = setData;
    this.updater = updater;
    this.onUpdate = onUpdate;
  }

  public static builder<StateType, ModelType = StateType>(setData: SetData<StateType>)
    : StateUpdaterBuilder<StateType, ModelType> {
    return new StateUpdaterBuilder<StateType, ModelType>(
      setData
    );
  }

  /**
   *
   * @return {(key: keyof ModelType, value: any) => void}
   */
  public get() {
    return (key: keyof ModelType, value: any) => {
      this.setData((prev) => {
        const newState = { ...prev };
        if (!!this.updater) {
          return this.updater(newState, key, value);
        } else {
          newState[key as unknown as keyof StateType] = value;
          return newState;
        }
      });
      if (!!this.onUpdate) {
        this.onUpdate(key, value);
      }
    };
  }
}
