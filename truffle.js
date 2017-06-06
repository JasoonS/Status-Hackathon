module.exports = {
  migrations_directory: "./migrations",
  networks: {
    remote: {
      host: "172.18.150.167",
      port: 8546,
      network_id: "*" // Match any network id
    },
    local: {
      host: "localhost",
      port: 8546,
      network_id: "*"
    }
  }
};
