import React from "react";
import "./App.css";
import { Component, onMount, useState } from "@react-typescript-utils/decorators";

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
    console.log(this.count)
    return (
      <div>
        <h1 ref={this.header}></h1>
        <p onClick={() => {
          this.count++
          }}>{this.count}</p>
      </div>
    );
  };
}
console.log(new App({}).count);

export default App;
