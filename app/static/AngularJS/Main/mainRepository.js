var meetingUrl = global_settings.urlCORS + 'api/meeting/';
//var configuradorUrl = global_settings.urlCORS + 'api/configurador/';

registrationModule.factory('mainRepository', function($http) {
   return {
      postCreateMeeting: function(accesToken, objetivo, jsonParticipantes) {
         var params = {
            subject: objetivo,
            starttime: new Date().toISOString(),
            endtime: new Date().toISOString(),
            passwordrequired: false,
            conferencecallinfo: 'VoIP',
            timezonekey: 'string',
            meetingtype: 'immediate'
         };

         return $http({
            url: 'https://api.getgo.com/G2M/rest/meetings',
            method: 'POST',
            data: params,
            headers: {
               'Content-Type': 'application/json',
               Authorization: accesToken
            }
         });
      },
      getStartMeeting: function(accesToken, meetingId) {
         var params = {
            meetingId: meetingId
         };

         return $http({
            url:
               'https://api.getgo.com/G2M/rest/meetings/' +
               meetingId +
               '/start',
            method: 'GET',
            data: params,
            headers: {
               'Content-Type': 'application/json',
               Authorization: accesToken
            }
         });
      },
      saveMeeting: function(
         id,
         joinurl,
         hostURL,
         meetingid,
         maxParticipants,
         uniqueMeetingId,
         conferenceCallInfo,
         estatus,
         asunto,
         jsonUsuariosSelected,
         idUsuario
      ) {
         return $http({
            url: meetingUrl + 'alta/',
            method: 'POST',
            params: {
               id:id,
               joinurl: joinurl,
               hostURL: hostURL,
               meetingid: meetingid,
               maxParticipants: maxParticipants,
               uniqueMeetingId: uniqueMeetingId,
               conferenceCallInfo: conferenceCallInfo,
               estatus: estatus,
               asunto: asunto,
               idUsuario: idUsuario,
               jsonUsuariosSelected: jsonUsuariosSelected
            },
            headers: {
               'Content-Type': 'application/json'
            }
         });
      },

      correo: function(destinatario,motivo,url) {
         return $http({
            url: meetingUrl + 'correo/',
            method: 'POST',
            params: {
               destinatario: destinatario,
               motivo:motivo,
               url:url
            },
            headers: {
               'Content-Type': 'application/json'
            }
         });
      },
      correos: function(destinatarios,motivo,url) {
         return $http({
            url: meetingUrl + 'correos/',
            method: 'POST',
            params: {
               destinatario: destinatario,
               motivo:motivo,
               url:url
            },
            headers: {
               'Content-Type': 'application/json'
            }
         });
      },
         cierra: function(id) {
         return $http({
            url: meetingUrl + 'cierra/',
            method: 'POST',
            params: {
               id: id
            },
            headers: {
               'Content-Type': 'application/json'
            }
         });
      },
      getEmpresas: function() {
         return $http({
            url: meetingUrl + 'empresas/',
            method: 'GET',
            headers: {
               'Content-Type': 'application/json'
            }
         });
      },
       getSucursales: function(idEmpresa) {
         return $http({
            url: meetingUrl + 'sucursales/',
            method: 'GET',
             params: {
               idEmpresa: idEmpresa
            },
            headers: {
               'Content-Type': 'application/json'
            }
         });
      }
   };
});
