import React from "./core/React.js";
// const App = React.createElement("div", { id: "app" }, "app", "hello");
function Counter(props) {
  return <div>counter{props.num}</div>;
}
function CounterContainer(props) {
  return (
    <div>
      Container {props.id}
      <Counter num={10}></Counter>
    </div>
  );
}
function App() {
  return (
    <div>
      Hello World
      <CounterContainer id={123}></CounterContainer>
    </div>
  );
}
export default App;
