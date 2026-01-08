module.exports = {
  apps: [
    {
      name: "frontend",
      cwd: "/home/ubuntu/frontend",
      script: "./node_modules/.bin/serve",
      args: "-s build -l tcp://0.0.0.0:3001",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};

