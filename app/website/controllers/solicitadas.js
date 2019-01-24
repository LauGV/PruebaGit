var SolicitadasView = require('../views/reference'),
    SolicitadasModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');
var nodemailer = require('nodemailer');


var Solicitadas = function(conf) {
    this.conf = conf || {};

    this.view = new SolicitadasView();
    this.model = new SolicitadasModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};



// Solicitadas.prototype.get_consultaCredencialUsuario = function (req, res, next) {
//     var self = this
//     var params = [
//         { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
//     ];

//     this.model.query('SEL_USUARIOMEETINGCREDENCIALES_BY_USUARIO_SP', params, function (error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });

//     });
// };

Solicitadas.prototype.get_asisAdmin = function (req, res, next) {
    var self = this
    var params = [
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
    ];

    this.model.query('SEL_PETICIONES_ADMIN_MEETING_SP', true, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });

    });
};

Solicitadas.prototype.get_users = function(req, res, next) {

    var self = this;

      var params = [
        { name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT },
          { name: 'idSucursal', value: req.query.idSucursal, type: self.model.types.INT }
    ];
        
    this.model.query('SEL_USUARIOS_ADMIN_GO_SP', params, function(error, result) {
        
        self.view.expositor(res, {
            error: error,
            result: result
        });

    });
};

// Solicitadas.prototype.get_petAsisUser = function (req, res, next) {
//     var self = this
//     var params = [
//         { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
//     ];

//     this.model.query('SEL_PETICIONES_USUARIO_MEETING_SP', params, function (error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });

//     });
// };
Solicitadas.prototype.get_asisAdminAten = function (req, res, next) {
    var self = this
    var params = [
        { name: 'idOperador', value: req.query.idUsuario, type: self.model.types.INT }
    ];

    this.model.query('SEL_MEETING_ATENDIDO_OPERADOR_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });

    });
};

Solicitadas.prototype.get_asisAdminXope = function (req, res, next) {
    var self = this
    var params = [
        { name: 'idOperador', value: req.query.idUsuario, type: self.model.types.INT }
    ];

    this.model.query('SEL_PETICION_POR_OPERADOR_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });

    });
};




module.exports = Solicitadas;
