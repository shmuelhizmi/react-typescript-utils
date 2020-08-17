# React TypeScript decorators

typescript decorators for react components state and lifcycle

## install

- `npm install @react-typescript-utils/decorators`

## code example -

```tsx
import React from "react";
import "./App.css";
import {
  Component,
  onMount,
  useState,
} from "@react-typescript-utils/decorators";

class App extends Component {
  private header = React.createRef<HTMLHeadingElement>();

  @onMount()
  setHeadlineText() {
    console.log("mount");
    if (this.header.current) this.header.current.innerHTML = "hello world";
  }

  @onMount()
  setBackground() {
    document.body.style.backgroundColor = "#f00";
  }

  @useState(5) count!: number;

  render = () => {
    console.log(this.count);
    return (
      <div>
        <h1 ref={this.header}></h1>
        <p
          onClick={() => {
            this.count++;
          }}
        >
          {this.count}
        </p>
      </div>
    );
  };
}
console.log(new App({}).count);

export default App;
```

## Lifesycle decorators

- onMount ( componentDidMout )

```ts
class App {
  ...

  private div = React.createRef<HTMLElement>();

  @onMount()
  setDivContent() {
    if (this.header.current) this.header.current.innerHTML = "hello world";
  }

  ...
}
```

- onWillUnmount ( componentWillUnmount )

```ts
class App {
  ...

  private instance = runSomeThing();

  @onWillUnmount()
  stopInstace() {
    this.instance.stop();
  }

  ...
}
```

- onShouldUpdate ( shouldComponentUpdate )

```ts
class App {
  ...

  @onShouldUpdate()
  update(nextProps: App["props"], nextState: App["state"]) {
    if (nextProps.stuff === nextState.that) {
      return true;
    } else {
      return false;
    }
  }

  ...
}
```

## state

- useState ( shouldComponentUpdate )

```tsx
class App {
  ...

  @useState(5) count!: number;

  render() {
    console.log(this.count)
    return (
      <div>
        <h1 ref={this.header}></h1>
        <p onClick={() => {
          this.count++; // automatic rerender
          }}>{this.count}</p>
      </div>
    );
  };

  ...
}
```
