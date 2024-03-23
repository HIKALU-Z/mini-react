// const root = document.querySelector("#root");
// const el = document.createElement("div");
// const tn = document.createTextNode("app");
// el.append(tn);
// root.append(el);

// ---- v2 ----

// function createTextNode(text) {
//   return {
//     type: "TEXT_ELEMENT",
//     props: {
//       nodeValue: text,
//       children: [],
//     },
//   };
// }

// function createElement(type, props, ...children) {
//   return {
//     type: type,
//     props: {
//       ...props,
//       children: children,
//     },
//   };
// }
// const textEl = createTextNode("app");
// const App = createElement("div", { id: "app" }, textEl);

// const dom = document.createElement(App.type);
// dom.id = App.props.id;
// document.querySelector("#root").append(dom);

// const textNode = document.createTextNode("");
// textNode.nodeValue = textEl.props.nodeValue;
// dom.append(textNode);
// ---------- v3 ---------

// const textEl = createTextNode("app");
// const App = createElement("div", { id: "app" }, "app", "123123");

// render(App, document.querySelector("#root"));

// ----  v4  ----
import ReactDOM from "./core/ReactDOM.js";
import App from "./App.js";
ReactDOM.createRoot(document.querySelector("#root")).render(App);
