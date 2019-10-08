const { createLogger, transports, format } = require("winston");
const path = require("path");

const logger = createLogger({
  transports: [
    new transports.File({
      filename: path.join(__dirname, "../assets/log.txt"),
      format: format.simple()
    })
  ]
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple()
    })
  );
}

module.exports = logger;
