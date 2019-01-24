var MeetingView = require('../views/reference'),
    MeetingModel = require('../models/dataAccess'),
    moment = require('moment');
var nodemailer = require('nodemailer');

//configuración para el objeto meeting
var Meeting = function (conf) {
    this.conf = conf || {};

    this.view = new MeetingView();
    this.model = new MeetingModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

Meeting.prototype.post_alta = function (req, res, next) {
    var self = this;
    var params = [
        { name: 'idExiste', value: req.query.id, type: self.model.types.INT },
        { name: 'joinurl', value: req.query.joinurl, type: self.model.types.STRING },
        { name: 'hostURL', value: req.query.hostURL, type: self.model.types.STRING },
        { name: 'meetingid', value: req.query.meetingid, type: self.model.types.STRING },
        { name: 'maxParticipants', value: req.query.maxParticipants, type: self.model.types.INT },
        { name: 'uniqueMeetingId', value: req.query.uniqueMeetingId, type: self.model.types.STRING },
        { name: 'conferenceCallInfo', value: req.query.conferenceCallInfo, type: self.model.types.STRING },
        { name: 'estatus', value: req.query.estatus, type: self.model.types.STRING },
        { name: 'asunto', value: req.query.asunto, type: self.model.types.STRING },
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
        { name: 'jsonUsuariosSelected', value: req.query.jsonUsuariosSelected, type: self.model.types.STRING }
    ];
   //  console.log('params______________-INS_MEETING_SP') 
   // console.log(params) 

    this.model.query('INS_MEETING_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}



Meeting.prototype.get_empresas = function (req, res, next) {
    var self = this;
   

    this.model.query('SEL_EMPRESAS_SP', true, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Meeting.prototype.get_sucursales = function (req, res, next) {
    var self = this;
   
      var params = [
        { name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT },
      ];

    this.model.query('SEL_SUCURSALES_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Meeting.prototype.post_correo = function (req, res, next) {

    var destinatarios='';
    //console.log(req.query.destinatarios)
    sendMail('davidsoir@hotmail.com',req.query.motivo,req.query.url)
}

Meeting.prototype.post_correos = function (req, res, next) {

    var destinatarios='';
    sendMail('davidsoir@hotmail.com',req.query.motivo,req.query.url)
}

Meeting.prototype.post_cierra = function (req, res, next) {
    var self = this;
    var params = [
        { name: 'idMeeting', value: req.query.id, type: self.model.types.INT },
      
    ];

    this.model.query('UPD_MEETING_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

function sendMail(destinatarios,motivo,url) {
     // console.log('destinatarios___')
     //  console.log(destinatarios)
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
            subject: 'Nueva reunionpara  asistencia remota', //Asunto
            html:`<p>Se les hace la invitacion a la reunion por el motivo  `+motivo+`... para asistir solo hay que darle clic en la siguiente liga</p> <a href="`+url+`" > `+url+`</a>`
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



module.exports = Meeting;