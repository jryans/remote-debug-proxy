const { DebuggerServer } = Cu.import("resource://gre/modules/devtools/dbg-server.jsm", {});

if (!DebuggerServer.initialized) {
  DebuggerServer.init();
  DebuggerServer.addBrowserActors();
}
var reply = DebuggerServer.openListener(6000);
