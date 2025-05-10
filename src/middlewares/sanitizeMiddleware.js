const mongoSanitize = require('express-mongo-sanitize');


const sanitize = (req, _res, next) => {
    mongoSanitize.sanitize(req.body);
    mongoSanitize.sanitize(req.params);

    const cleanQ = mongoSanitize.sanitize({ ...req.query });
    Object.keys(cleanQ).forEach(key => {
      req.query[key] = cleanQ[key];
    });
  
    next();
  }
module.exports =  sanitize ;