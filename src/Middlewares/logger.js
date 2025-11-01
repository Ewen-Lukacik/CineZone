export const logger = (req, res, next) => {
    const method = req.method;
    const url = req.originalUrl;

    const dateISO= new Date().toISOString()
    res.set("date", dateISO)

    const log = dateISO + ' ' + method + ' ' + url
    console.log(log)
    next();
}