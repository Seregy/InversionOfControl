// Example showing us how the framework creates an environment (sandbox) for
// appication runtime, load an application code and passes a sandbox into app
// as a global context and receives exported application interface

// The framework can require core libraries
var fs = require('fs'),
    vm = require('vm'),
    util = require('util')

// Create a hash and turn it into the sandboxed context which will be
// the global context of an application
function createSandboxContext(appName) {
  var context = {
    module: {},
    console: createConsole(appName),
    setTimeout: setTimeout,
    setInterval: setInterval,
    util: util
  };
  context.global = context;
  return vm.createContext(context);
}

function createConsole(appName) {
  var sandboxedConsole = {
    log: function(message) {
      var d = new Date();
      console.log(util.format("[%s] [%s] %s", appName, d.toLocaleString(), message));
    }
  };
  return sandboxedConsole;
}

// Read an application source code from the file
function runApp(appName) {
  var fileName = appName;

  if (!fileName.endsWith('.js')) {
    fileName += '.js';
  }

  fs.readFile(fileName, function(err, src) {
    // We need to handle errors here
    if (err) {
      console.error(err);
      return;
    }

    //Create sandbox
    var sandbox = createSandboxContext(appName);

    // Run an application in sandboxed context
    var script = vm.createScript(src, fileName);
    script.runInNewContext(sandbox);

    // We can access a link to exported interface from sandbox.module.exports
    // to execute, save to the cache, print to console, etc.
  });
}

var app = process.argv[2] || 'application';
runApp(app);