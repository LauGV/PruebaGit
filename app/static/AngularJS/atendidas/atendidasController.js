registrationModule.controller('atendidasController', function ($scope, $rootScope, $location, $sce, solicitadasRepository, userFactory, alertFactory, $window) {

   $scope.init = function() {  
        $scope.Usuario = userFactory.getUserData();
        $scope.verAsistenciasAtendidas();       
    };

    $scope.verAsistenciasAtendidas = function(){
      solicitadasRepository.getAsisAdminAtendidas($scope.Usuario.idUsuario).then(function(result){
        $scope.asistenciasAtendidas = result.data;
      });
   }

});
