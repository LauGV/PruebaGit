var loginURL = global_settings.urlCORS + 'api/login/';
var seguridadURL = global_settings.urlSeguridad + 'auth/';

registrationModule.factory('loginRepository', function ($http) {
    return {
        getUsuario: function(idUsuario) {
            return $http({
                url: loginURL + 'empleado/',
                method: "GET",
                params: {
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getIdUsuario: function (rfc, contrasena) {
            return $http({
                url: loginURL + 'Usuario/',
                method: "GET",
                params: {
                    rfc: rfc,
                    Pwd: contrasena
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },

        loginSeguridad: function (login) {
            return $http({
                url: seguridadURL + 'login',
                method: 'POST',
                data: login,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        relacionUsuarios: function(params){
            return $http({
                url: loginURL + 'DatosUsuario/',
                method: "GET",
                params: params,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
         getCredencialesMeeting: function(idUsuario) {
         return $http({
            url: loginURL + 'consultaCredencialUsuario/',
            method: 'GET',
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
