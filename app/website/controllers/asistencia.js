var AsistenciaView = require('../views/reference'),
    AsistenciaModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');
var nodemailer = require('nodemailer');


var Asistencia = function(conf) {
    this.conf = conf || {};

    this.view = new AsistenciaView();
    this.model = new AsistenciaModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};



Asistencia.prototype.get_consultaCredencialUsuario = function (req, res, next) {
    var self = this
    var params = [
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
    ];

    this.model.query('SEL_USUARIOMEETINGCREDENCIALES_BY_USUARIO_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });

    });
};

Asistencia.prototype.get_petAsisUser = function (req, res, next) {
    var self = this
    var params = [
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
    ];

    this.model.query('SEL_PETICIONES_USUARIO_MEETING_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });

    });
};

Asistencia.prototype.post_nuevaPeticionAsistencia = function(req, res, next) {

    var self = this;

    var destinatarios='';

     var params = [
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT},
        { name: 'motivo', value: req.query.motivo, type: self.model.types.STRING }
    ];
console.log(params)
       this.model.query('INS_PETICION_USUARIO_MEETING', params, function(error, result) {

                self.view.expositor(res, {
                    error: error,
                    result: result
                });
                console.log(result)
                result.forEach(function(value, k) {
                    destinatarios += value.emailMeeting+','
                })
                sendMail(destinatarios,req.query.nombre,req.query.idUsuario,req.query.motivo)
            });
};

function sendMail(destinatarios,nombre,idUsuario,motivo) {
     console.log('destinatarios___')
      console.log(destinatarios)
    return new Promise(function(resolve, reject) {
        var transporter = nodemailer.createTransport({
            host: '192.168.20.17',
            port: 25,
            secure: false,
            ignoreTLS: true,
            auth: {
                user: 'noreply',
                pass: 'P4n4m4!'
            }
        });

         var message = {
            from: '"Grupo Andrade"<grupoandrade.reportes@grupoandrade.com.mx>', //De
            to: destinatarios, //Para
            subject: 'Nueva peticion de asistencia remota / usuario '+ idUsuario, //Asunto
            html:`<p>El usuario <strong>`+nombre+`</strong>  con el id <strong>`+idUsuario+`</strong> a solicitado una asistencia remota</p><br>por el siguente motivo: <strong>`+motivo+`</strong>`
        }

           //Enviamos el Email
        transporter.sendMail(message, function(err) {
            if (!err) {
                console.log('¡Email enviado!');
                object = {
                    estatus: 1,
                    mensaje: "¡Email enviado!"
                }
         
            } else {
                console.log('Error en el Envio!!!!!!');
                object = {
                    estatus: 0,
                    mensaje: "¡Error en el Envio!!!!!"
                }
            }
            res.json(object);
        });

        transporter.close;
        //req.body = [];
        
 
       });
};


module.exports = Asistencia;
