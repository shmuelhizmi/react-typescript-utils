import React, { ErrorInfo } from "react";
import { ValueWithCallback } from "../decorators/state";
export type OnCatch = (error: Error, errorInfo: ErrorInfo) => void;

export type OnUpdate<Props, State> = (
  prevProps: Props,
  prevState: State
) => void;

export type OnShouldUpdate<Props, State> = (
  nextProps: Props,
  nextState: State
) => boolean;

interface PreMountStates {
  name: keyof Component;
  defaultValue: any;
}

abstract class Component<Props = {}, State = {}> extends React.Component<
  Props,
  State
> {
  public statesToMount?: PreMountStates[];
  constructor(props: Props) {
    super(props);

    // mount all states
    if (this.statesToMount) {
      this.statesToMount.forEach((state) => {
        let value = state.defaultValue;
        type T = typeof state.defaultValue;
        Object.defineProperty(this, state.name, {
          get: () => value,
          set: (newValue: T | ValueWithCallback<T>) => {
            if (newValue instanceof ValueWithCallback) {
              value = newValue.value;
              this.forceUpdate(newValue.callback);
            } else {
              value = newValue;
              this.forceUpdate();
            }
          },
        });
      });
    }
  }
  public componentDidMountFunctions?: Function[];
  componentDidMount = () => {
    if (this.componentDidMountFunctions)
      this.componentDidMountFunctions.forEach((componentDidMount) =>
        componentDidMount.bind(this)()
      );
  };

  public componentDidCatchFunctions?: OnCatch[];
  componentDidCatch = (error: Error, errorInfo: ErrorInfo) => {
    if (this.componentDidCatchFunctions)
      this.componentDidCatchFunctions.forEach((componentDidCatch) =>
        componentDidCatch.bind(this)(error, errorInfo)
      );
  };

  public componentDidUpdateFunctions?: OnUpdate<Props, State>[];
  componentDidUpdate = (prevProps: Props, prevState: State) => {
    if (this.componentDidUpdateFunctions)
      this.componentDidUpdateFunctions.forEach((componentDidUpdate) =>
        componentDidUpdate.bind(this)(prevProps, prevState)
      );
  };

  public componentWillUnmountFunctions?: Function[];
  componentWillUnmount = () => {
    if (this.componentWillUnmountFunctions)
      this.componentWillUnmountFunctions.forEach((componentWillUnmount) =>
        componentWillUnmount.bind(this)()
      );
  };

  public shouldComponentUpdateFunctions?: OnShouldUpdate<Props, State>[];
  shouldComponentUpdate = (nextProps: Props, nextState: State) => {
    let shouldUpdate = true;
    if (this.shouldComponentUpdateFunctions)
      this.shouldComponentUpdateFunctions.forEach((shouldComponentUpdate) => {
        shouldUpdate =
          shouldComponentUpdate.bind(this)(nextProps, nextState) &&
          shouldUpdate;
      });
    return shouldUpdate;
  };
}

export default Component;
