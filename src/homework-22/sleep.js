function sleep(delay) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), delay);
  });
}

sleep(2000).then(() => {
  console.log(`I'am awake!`);
});
