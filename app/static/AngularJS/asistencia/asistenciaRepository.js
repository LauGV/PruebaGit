var asistenciaURL = global_settings.urlCORS + 'api/asistencia/';


registrationModule.factory('asistenciaRepository', function ($http) {
    return {
      getCredencialesMeeting: function(idUsuario) {
         return $http({
            url: asistenciaURL + 'consultaCredencialUsuario/',
            method: 'GET',
            params: {
               idUsuario: idUsuario
            },
            headers: {
               'Content-Type': 'application/json'
            }
         });
      },
      getPetAsisUser: function(idUsuario) {
      return $http({
          url: asistenciaURL  + 'petAsisUser/',
          method: "GET",
            params: {
            idUsuario: idUsuario
          },
          headers: {
              'Content-Type': 'application/json'
          }
      });
    }, 
     postNuevaPeticionAsistencia: function(idUsuario,nombre,motivo) {
            return $http({
                url: asistenciaURL  + 'nuevaPeticionAsistencia/',
                method: "POST",
                params: {
                  idUsuario: idUsuario,
                  nombre:nombre,
                  motivo:motivo
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, 
    };
});
