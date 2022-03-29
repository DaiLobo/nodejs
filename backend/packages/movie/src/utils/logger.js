import winston from "winston"
import WinstonDailyRotateFile from "winston-daily-rotate-file"

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.colorize()
    ),
    level: "debug",
    transports: [
        new WinstonDailyRotateFile({
            auditFile: "/log/audit.json",
            datePattern: "YYYY-MM-DD",
            filename: "./log/app-%DATE%.log",
            maxFiles: "3d", //tempo de armazenamento
            maxSize: "10m"
        })
    ]
})

//If we're not in production then log to the console with the format:
//`${info.level}: ${info.message} JSON.stringify({...rest})`
if (process.env.NODE_ENV != "production") {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }))
}

export default logger