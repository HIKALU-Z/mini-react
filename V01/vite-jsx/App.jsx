import React from "./core/React.js";
// const App = React.createElement("div", { id: "app" }, "app", "hello");
function Counter() {
  return <div>counter{num}</div>;
}
function App() {
  return (
    <div>
      Hello World
      <Counter num={10}></Counter>
    </div>
  );
}
export default App;
