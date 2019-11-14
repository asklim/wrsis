/* */
const dbName = {
  rsiscfg: "rsiscfg",
  rsistmp: "rsistmp",
  rsissum: "rsissum",
  rsiswp: "rsiswp",
  rsiswc: "rsiswc",
  rsiswn: "rsiswn"
};

const mongoURI = {
  DEV1 : "mongodb://192.168.0.240:27017",
  DEV2 : "mongodb://192.168.0.240:27016",
  CLOUDDB_TEMPLATE : "mongodb://%s@rsis-shard-00-00-jjwdj.mongodb.net:27017,rsis-shard-00-01-jjwdj.mongodb.net:27017,rsis-shard-00-02-jjwdj.mongodb.net:27017/%s?ssl=true&replicaSet=rsis-shard-0&authSource=admin&retryWrites=true",
};


module.exports = {
  dbName,
  mongoURI,
};
