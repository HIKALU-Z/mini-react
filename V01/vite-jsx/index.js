let taskId = 1;
function workLoop(deadLine) {
  taskId++;
  let shouldYield = false;
  while (!shouldYield) {
    // run the task
    console.log("taskId:", taskId);
    shouldYield = deadLine.timeRemaining() < -1;
  }
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop);
