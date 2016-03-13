// File contains a small piece of the source to demonstrate main module
// of a sample application to be executed in the sandboxed context by
// another pice of code from `framework.js`. Read README.md for tasks.

// Print from the global context of application module
console.log('From application global context');

console.log(util.format('%s : %s', 'Application', 'Tesing util.format'));

module.exports = function() {
	// Print from the exported function context
  console.log('From application exported function');
};

setTimeout(function() {
  console.log('[Timeout] Hello');
}, 1500);

setInterval(function () {
  console.log('[Inverval] Again');
}, 2500);
