var env = process.env.NODE_ENV || 'production',
  express = require('express'),
  swig = require('swig'),
  bodyParser = require('body-parser'),
  middlewares = require('./middlewares/admin'),
  router = require('./website/router');
  // Variable Global Documentos
  dirname = require('../conf').publicDocumentos;

//Alta de opciones
var done = false;

var ExpressServer = function (config) {
  this.config = config || {};

  this.expressServer = express();

  // middlewares

  this.expressServer.use(function(req, res, next) {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5302')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,authorization,Lang,application/javascript,X-Requested-With,application/json,origin,X-Authentication')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
  })

  this.expressServer.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
  this.expressServer.use(bodyParser.json({ limit: '50mb' }));
  for (var middleware in middlewares) {
    this.expressServer.use(middlewares[middleware]);
  }

  this.expressServer.engine('html', swig.renderFile);
  this.expressServer.set('view engine', 'html');
  //this.expressServer.set('views', __dirname + '/website/views/templates');
  this.expressServer.set('views', __dirname + '/static/');
  swig.setDefaults({ varControls: ['[[', ']]'] });

  //////////////////////////////////////////////////////////////

  if (env == 'development') {
    console.log('OK NO HAY CACHE');
    this.expressServer.set('view cache', false);
    swig.setDefaults({ cache: false, varControls: ['[[', ']]'] });
  }

  //Inicia los APIs
  for (var controller in router) {
    for (var funcionalidad in router[controller].prototype) {
      var method = funcionalidad.split('_')[0];
      var entorno = funcionalidad.split('_')[1];
      var data = funcionalidad.split('_')[2];
      data = (method == 'get' && data !== undefined) ? ':data' : '';
      var url = '/api/' + controller + '/' + entorno + '/' + data;
      this.router(controller, funcionalidad, method, url);
    }
  }

  //Servimos el archivo angular
  this.expressServer.get('*', function (req, res) {
    res.sendfile('app/static/index.html');
  });

  //Servimos el archivo angular
  this.expressServer.get('/', function (req, res) {
    res.sendfile('app/static/index.html');
  });

  this.expressServer.post('*', function (req, res) {
    var user = { idUsuario: req.body.idUsuario };
    res.render('index', { user });
  });
};

ExpressServer.prototype.router = function (controller, funcionalidad, method, url) {
  console.log(url);
  var parameters = this.config.parameters;

  this.expressServer[method](url, function (req, res, next) {
    var conf = {
      'funcionalidad': funcionalidad,
      'req': req,
      'res': res,
      'next': next,
      'parameters': parameters
    }

    var Controller = new router[controller](conf);
    Controller.response();

  });
}
module.exports = ExpressServer;
