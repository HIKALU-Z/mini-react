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

function createDom(type) {
  return type === "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(type);
}

function updateProps(dom, props) {
  Object.keys(props).forEach((key) => {
    if (key !== "children") {
      dom[key] = props[key];
    }
  });
}

function initChildren(fiber) {
  const children = fiber.props.children;
  let prevChild = null;
  children.forEach((child, index) => {
    const newFiber = {
      type: child.type,
      props: child.props,
      child: null,
      parent: fiber,
      sibling: null,
      dom: null,
    };
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevChild.sibling = newFiber;
    }
    prevChild = newFiber;
  });
}

let root = null;
let nextUnitOfWork = null;

function workLoop(deadline) {
  let shouldYield = false;
  // console.log("root:", root);

  while (!shouldYield && nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  // 确保当前指针是最后一个指针，并且 root 不为空;
  if (!nextUnitOfWork && root) {
    commitRoot();
  }
  requestIdleCallback(workLoop);
}

function commitRoot() {
  // Implement
  console.log("123:", 123);

  commitWork(root.child);
  root = null;
}

function commitWork(fiber) {
  // Implement
  if (!fiber) return;
  fiber.parent.dom.append(fiber.dom);
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    // 1. 创建 dom
    const dom = (fiber.dom = createDom(fiber.type));
    // 之所以注释这里。是应为最后统一使用 commiRoot 来进行 dom 的挂载
    //   fiber.parent.dom.append(dom);

    // 2. 处理 props
    updateProps(dom, fiber.props);
  }
  // 3.转换链表，处理好指针
  initChildren(fiber);

  // 4.返回下一个要执行的任务
  if (fiber.child) {
    return fiber.child;
  }
  if (fiber.sibling) {
    return fiber.sibling;
  }
  return fiber.parent?.sibling;
  // let nextFiber = fiber;
  // while (nextFiber) {
  //   if (nextFiber.sibling) {
  //     return nextFiber.sibling;
  //   }
  //   nextFiber = nextFiber.parent;
  // }
}
/**
 * render方法默认调用的时候采用fiber的形式，将根节点当做第一个 work fiber
 * @param {*} el
 * @param {*} container
 */

function render(el, container) {
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [el],
    },
  };
  // 第一次初始化的时候 需要在最后挂载的根节点就是一开始传进来的这个 unit
  root = nextUnitOfWork;
  requestIdleCallback(workLoop);
}

const React = {
  render,
  createElement,
};

export default React;
