const express = require("express")

const helmet = require("helmet");
const hpp = require("hpp");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const csrf = require('csurf');

module.exports = (app) => {
  const SESSION_SECRET = process.env.SESSION_SECRET
  const COOKIE_SECRET = process.env.COOKIE_SECRET
  
  //const csrfProtect = csrf({cookie: true})
  const formParser = bodyParser.urlencoded({extended: false})
  
  app.use(cookieParser());

  //app.use(csrfProtect)
  app.use(formParser)

  app.set('trust proxy', 1);
  
  app.disable('x-powered-by');
  app.use(hpp());
  
  app.use(function(req, res, next) {
    res.header('X-XSS-Protection', '1; mode=block');
    res.header('X-Frame-Options', 'deny');
    res.header('X-Content-Type-Options', 'nosniff');
    next();
  });
  
  app.use(helmet.hidePoweredBy({ setTo: 'DummyServer 1.0' }))
  app.use(helmet.noSniff())
  app.use(helmet.frameguard())
  app.use(helmet.xssFilter())
  
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }))
  
  app.use(express.urlencoded({ extended: false }));
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(express.json())
}