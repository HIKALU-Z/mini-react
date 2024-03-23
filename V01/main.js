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

function createTextNode(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function createElement(type, props, ...children) {
  return {
    type: type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "string" ? createTextNode(child) : child
      ),
    },
  };
}

function render(el, container) {
  const dom =
    el.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(el.type);
  Object.keys(el.props).forEach((key) => {
    if (key !== "children") {
      dom[key] = el.props[key];
    }
  });
  const children = el.props.children;
  children.forEach((child) => render(child, dom));
  container.append(dom);
}
const textEl = createTextNode("app");
const App = createElement("div", { id: "app" }, "app", "123123");

render(App, document.querySelector("#root"));
