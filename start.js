module.exports = async (kernel) => {
  let script =  {
    daemon: true,
    run: [{
      method: "shell.run",
      params: {
        path: "app",
        conda: "env",
        message: [
          // (kernel.platform === 'win32' ? 'start-ui.bat' : 'bash start-ui.sh -f')
          "python scripts/train_ui.py"
        ],
        on: [{ "event": "/http:\/\/[0-9.:]+/", "done": true }]
      }
    }, {
      method: "local.set",
      params: {
        "url": "{{input.event[0]}}",
      }
    }, {
      "method": "proxy.start",
      "params": {
        "uri": "{{local.url}}",
        "name": "Local Sharing"
      }
    }]
  }
  return script
}
