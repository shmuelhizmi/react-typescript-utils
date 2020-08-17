import React from 'react'
import Component from '../components/component';

export class ValueWithCallback<T> {
  public value: T;
  public callback: () => void;
  constructor(value: T, callback: () => void) {
    this.value = value;
    this.callback = callback;
  }
}

export function valueWithCallback<T>(value: T, callback: () => void) {
  return new ValueWithCallback(value, callback);
}

export function useState<T>(defaultValue?: T) {
  return function <C extends Component<any, any>>(target: C, key: keyof C): any {
    if(!target.statesToMount) {
      target.statesToMount = [];
    }
    target.statesToMount.push({ defaultValue, name: key as keyof Component })
  };
}
