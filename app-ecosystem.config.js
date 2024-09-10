/* eslint-disable no-undef */
module.exports = {
    name: "app",
    script: "dist/server.js",
    instances: 2,
    exec_mode: "cluster",
    node_args: "--env-file=.env"
};
