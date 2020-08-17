import Component, {
  OnCatch,
  OnUpdate,
  OnShouldUpdate,
} from "../components/component";

type GetState<C extends Component<any, any>> = C extends Component<infer S, any>
  ? S
  : any;
type GetProps<C extends Component<any, any>> = C extends Component<any, infer P>
  ? P
  : any;

type Function = () => void;

export function onMount<C extends Component<any, any>>() {
  return function (
    target: C,
    key: string,
    descriptor: TypedPropertyDescriptor<Function>
  ): any {
    const handler = descriptor.value;
    if (handler) {
      if (!target.componentDidMountFunctions)
        target.componentDidMountFunctions = [];
      target.componentDidMountFunctions.push(handler);
	}
  };
}
export function onCatch() {
  return function <C extends Component<any, any>>(
    target: C,
    key: string,
    descriptor: TypedPropertyDescriptor<OnCatch>
  ) {
    const handler = descriptor.value;
    if (handler) {
		if (!target.componentDidCatchFunctions)
        target.componentDidCatchFunctions = [];
      target.componentDidCatchFunctions.push(handler);
    }
  };
}
export function onUpdate() {
  return function <C extends Component<any, any>>(
    target: C,
    key: string,
    descriptor: TypedPropertyDescriptor<OnUpdate<GetProps<C>, GetState<C>>>
  ) {
    const handler = descriptor.value;
    if (handler) {
		if (!target.componentDidUpdateFunctions)
        target.componentDidUpdateFunctions = [];
      target.componentDidUpdateFunctions.push(handler);
    }
  };
}
export function onWillUnmount() {
  return function <C extends Component<any, any>>(
    target: C,
    key: string,
    descriptor: TypedPropertyDescriptor<Function>
  ) {
    const handler = descriptor.value;
    if (handler) {
		if (!target.componentWillUnmountFunctions)
        target.componentWillUnmountFunctions = [];
      target.componentWillUnmountFunctions.push(handler);
    }
  };
}
export function onShouldUpdate() {
  return function <C extends Component<any, any>>(
    target: C,
    key: string,
    descriptor: TypedPropertyDescriptor<
      OnShouldUpdate<GetProps<C>, GetState<C>>
    >
  ) {
    const handler = descriptor.value;
    if (handler) {
		if (!target.componentWillUnmountFunctions)
        target.componentWillUnmountFunctions = [];
      target.componentWillUnmountFunctions.push(handler);
    }
  };
}
