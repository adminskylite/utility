module.exports = {
  apps: [
    {
      name: "util",
      cwd: "/home/administrator/business/utility/utility/internal", // <-- apne project ka path
      script: "npm",
      args: "start",
      interpreter: "none",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3030
      }
    }
  ]
};