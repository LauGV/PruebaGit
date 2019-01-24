var solicitadasURL = global_settings.urlCORS + 'api/solicitadas/';


registrationModule.factory('solicitadasRepository', function ($http) {
    return {
      // getCredencialesMeeting: function(idUsuario) {
      //    return $http({
      //       url: solicitadasURL + 'consultaCredencialUsuario/',
      //       method: 'GET',
      //       params: {
      //          idUsuario: idUsuario
      //       },
      //       headers: {
      //          'Content-Type': 'application/json'
      //       }
      //    });
      // },
       getAsisAdmin: function(idUsuario) {
            return $http({
                url: solicitadasURL  + 'asisAdmin/',
                method: "GET",
                  params: {
                  idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getUsuariosGo: function(idEmpresa,idSucursal) {
            return $http({
                url: solicitadasURL  + 'users/',
                method: "GET",
                 params: {
                  idEmpresa: idEmpresa,
                  idSucursal:idSucursal
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
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
 
      getAsisAdminAtendidas: function(idUsuario) {
                  return $http({
                      url: solicitadasURL  + 'asisAdminAten/',
                      method: "GET",
                        params: {
                        idUsuario: idUsuario
                      },
                      headers: {
                          'Content-Type': 'application/json'
                      }
                  });
              },
              getAsisAdminXope: function(idUsuario) {
                  return $http({
                      url: solicitadasURL  + 'asisAdminXope/',
                      method: "GET",
                        params: {
                        idUsuario: idUsuario
                      },
                      headers: {
                          'Content-Type': 'application/json'
                      }
                  });
              },
 
    };
});
