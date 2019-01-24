registrationModule.controller('asistenciaController', function ($scope, $rootScope, $location, $sce, loginRepository,asistenciaRepository, userFactory, alertFactory, $window) {

    $scope.motivo = '';
  
    $scope.init = function() {
   
        $scope.Usuario = userFactory.getUserData();
         $scope.permisosConexionUsuario();
        $scope.asistenciasSolicitadas();
       
    };

  

  $scope.asistenciasSolicitadas=function(){
         asistenciaRepository.getPetAsisUser($scope.Usuario.idUsuario).then(function(result){
            if (result.data.length > 0) {
               $scope.sesiones = result.data;
                $scope.unaActiva = true;
               console.log('llena grid usuario'); 
             }         
        });
    }

    $scope.nuevaAsistencia=function(){
      swal({
            title: 'Asistencia',
            text: 'La peticion se enviara y uno de nuestros operadores la atendera ',
            type: 'info',
           showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
            
        }, function (isConfirm) {
            if (isConfirm) {
                console.log('parametros')
                console.log($scope.Usuario.idUsuario)
                console.log($scope.Usuario.nombre)
                console.log($scope.motivo)
               asistenciaRepository.postNuevaPeticionAsistencia($scope.Usuario.idUsuario,$scope.Usuario.nombre,$scope.motivo).then(function(result){
               //  console.log(result);
                    $scope.motivo = "";
                    $scope.asistenciasSolicitadas();
                    $('#myModalNuevaAsietencia').modal('hide');
                });
               
            }
        })
    }


        $scope.permisosConexionUsuario = function(){

            //usuario
                var today = new Date(), lastDay, hi, hf

                if($scope.Usuario.dia == undefined){
                    lastDay  = new Date(today.getFullYear(), today.getMonth() + 1 , 0);
                    lastDay =lastDay.getDate();
                }                   
                else {
                    lastDay = $scope.Usuario.dia;
                }
                hi = $scope.Usuario.hora_inicial;
                hf = $scope.Usuario.hora_final;

                var seconds = today.getSeconds();
                var minutes = today.getMinutes();
                var hour = today.getHours();
                var day = today.getDate();

                var hrActual = hour + ':'+ minutes + ':'+seconds
               
                if( day != lastDay)
                   $scope.unaActiva = false;
                else{
                    if(hrActual >= hi && hrActual<= hf)
                      $scope.unaActiva = true;
                    else
                      $scope.unaActiva = false;
                }
          
   
    }

});
