module.exports = {
  apps: [
    {
      name: "backend",
      script: "index.js",
      env: {
        PORT: process.env.PORT || 5001,
        NODE_ENV: "production",
      },
    },
  ],
};

