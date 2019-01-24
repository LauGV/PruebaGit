registrationModule.controller('mainController', function ($scope, $rootScope, $location, localStorageService,loginRepository ,solicitadasRepository , alertFactory, userFactory, mainRepository) {
    $scope.isVideoOpen = false;
    // Gestiona la conexión con el socket
    $scope.socket = null
    $scope.connected = false
    $scope.btn_editarVersion = false
    $scope.btnSwitch = {}
    // MEETING
    $scope.selectedUsuariosMeeting = []
    $scope.selectionMode = 'all'
    $scope.selectAllMode = 'page'
    $scope.meetingObjetivo = ''

    // $scope.accessToken='cXKyHbnqg4GiyG3S2NrApUNxR94s';
    // $scope.usuarioGrid='';
    // $scope.empresas=[];
    // $scope.sucursales=[];
    // $scope.unaActiva = false;
   

     

    $scope.init = function () {    
        $scope.userData = userFactory.getUserData();    
        //SocketConnect();
        loginRepository.getCredencialesMeeting($scope.userData.idUsuario).then(function(resultado) {
            if(resultado.data.length > 0) {
                 $('.uno').hide()
                    $('.dos').show()
            }else {
                  $('.dos').hide()
                     $('.uno').show()
             }
        });
       // $scope.getEmpresas();                      
    }

//     $scope.getEmpresas=function(){
//         mainRepository.getEmpresas().then(function (result) {
//             $scope.empresas = result.data;
//             $scope.empresas.unshift({ nombre: "Seleccioné empresa..." });
//             $scope.sucursales.unshift({ nombre: "Seleccioné sucursal..." });
//             $scope.empresaActual = $scope.empresas[0];
//             $scope.sucursalActual = $scope.sucursales[0];
//             // console.log($scope.empresas)
//         });
       
//     }

// $scope.cambioEmpresa=function(){
//         mainRepository.getSucursales($scope.empresaActual.idEmpresa).then(function (result) {
//             $scope.sucursales = result.data;
//                $scope.sucursales.unshift({ nombre: "Seleccioné sucursal..." });
//             $scope.sucursalActual = $scope.sucursales[0];
//             // console.log($scope.sucursales)
//         });

//     }

//     $scope.cambioSucursal=function(){
//         $scope.getUsuariosGoAdmin();
//     };


//     $scope.createMeetingSelUsuarioGrid = function(asitenciaUsuario){
//         $scope.usuarioGrid = asitenciaUsuario
//         $("#myModalNuevaAsisAdminUser").modal('show');
//     };


//     $scope.createMeetingSelUsuario = function(){
//       // console.log('asitencia_a_Usuario________que acaba de seleccionar')
//         if($scope.motivo != undefined ){
//             if($scope.motivo != "" ){

//             if($scope.selectedUsuariosMeeting.length > 0){
//                 //$scope.createMeeting($scope.motivo,0,0);
//                       swal({
//                             title: 'Iniciar Asistencia',
//                             text: 'Esta Seguro de iniciar ...',
//                             type: 'info',
//                             showCancelButton: true,
//                             confirmButtonColor: '#3085d6',
//                             cancelButtonColor: '#d33',
//                             confirmButtonText: 'Aceptar',
//                             cancelButtonText: 'Cancelar'
//                         }, function (isConfirm) {
//                             if (isConfirm) {
//                                 $scope.createMeeting($scope.motivo,0,0);                                
//                             }
//                         })
//             }else{
//                 alert('Seleccione un usuario para asistir')
//             }
//              }else{
//             alert('Indique el motivo de la reunion')
//         }
//         }else{
//             alert('Indique el motivo de la reunion')
//         }
        

//     };
    
//     $scope.createMeetingUsuario = function(){
//         $scope.createMeeting($scope.usuarioGrid.motivo,$scope.usuarioGrid.id,$scope.usuarioGrid.correo);
//     };

    
//     $scope.cierra = function(asitenciaUsuario){

//           swal({
//                 title: 'Cerrar Asistencia',
//                 text: 'La Asistencia sera cerrada',
//                 type: 'info',
//                 showCancelButton: true,
//                 confirmButtonColor: '#3085d6',
//                 cancelButtonColor: '#d33',
//                 confirmButtonText: 'Cerrar Asistencia',
//                 cancelButtonText: 'Cancelar'
//             }, function (isConfirm) {
//                 if (isConfirm) {
//                      mainRepository.cierra(asitenciaUsuario.idGoto).then(function (result) {
//                         solicitadasRepository.getAsisAdmin($scope.userData.idUsuario).then(function(resultado){
//                                $scope.asistenciasPedidas = resultado.data; 
//                                location.reload();                                     
//                         });
//                      });
//                 }
//             })
  
//     }



//     $scope.createMeeting = function (motivo,id,correo) {
//         var joinurl, hostURL, meetingid, maxParticipants, uniqueMeetingId, conferenceCallInfo, estatus
   
            
//                 mainRepository.postCreateMeeting($scope.accessToken, motivo).then(function (result) {
//                     joinurl = result.data[0].joinURL
//                     meetingid = result.data[0].meetingid
//                     maxParticipants = result.data[0].maxParticipants
//                     uniqueMeetingId = result.data[0].uniqueMeetingId
//                     conferenceCallInfo = result.data[0].conferenceCallInfo
//                     estatus = 'Activa'

//                     //mainRepository.getStartMeeting('CTDHpgp4ArTRsQp35yUr1iKelcEN', result.data[0].meetingid).then(function(result)
//                     // YA QUE TENEMOS EL MEETING LO INICIAMOS
//                     mainRepository.getStartMeeting($scope.accessToken, result.data[0].meetingid).then(function (result) {
//                         hostURL = result.data.hostURL
//                         mainRepository.saveMeeting(id,joinurl, hostURL, meetingid, maxParticipants, uniqueMeetingId, conferenceCallInfo, estatus, motivo, JSON.stringify($scope.selectedUsuariosMeeting), $scope.userData.idUsuario).then(function (result) {
//                             //$scope.selectedUsuariosMeeting = []
//                             for (let user of $scope.selectedUsuariosMeeting) {
//                                 if (user.id == $scope.userData.idUsuario) {
//                                     $scope.selectedUsuariosMeeting.splice($scope.selectedUsuariosMeeting.indexOf(user), 1)
//                                     break;
//                                 }
//                             }
//                             if($scope.userData.usuario == undefined)
//                             $scope.userData.usuario=$scope.userData.nombre



//                             if(id > 0 )
//                                 mainRepository.correo(correo,motivo,joinurl);
//                             else
//                                  mainRepository.correo($scope.selectedUsuariosMeeting,motivo,joinurl);
                                
        
//                             $("#myModalNuevaAsietenciaAdmin").modal('hide');

//                                 solicitadasRepository.getAsisAdmin($scope.userData.idUsuario).then(function(resultado){
//                                     $scope.asistenciasPedidas = resultado.data;
           
//                                 });

//                             llamarMeeting(joinurl, $scope.userData.idUsuario, $scope.userData.usuario, JSON.stringify($scope.selectedUsuariosMeeting), meetingid, motivo)
//                             swal({
//                                 title: 'Asistencia',
//                                 text: 'La Asistencia se creó de forma correcta con el siguiente ID: ' + uniqueMeetingId,
//                                 type: 'success',
//                                 //showCancelButton: true,
//                                 confirmButtonColor: '#3085d6',
//                                 cancelButtonColor: '#d33',
//                                 confirmButtonText: 'Iniciar Asistencia',
//                                 //cancelButtonText: 'Cerrar esta ventana'
//                             }, function (isConfirm) {
//                                 if (isConfirm) {
//                                     window.open(hostURL, '_blank', '', false)
//                                        location.reload(); 
//                                 }
//                             })
//                         })
//                     })
//                 })
//     };
    // //////////////////////////////////////////////////////////////////
    // Funciones de socket
    // //////////////////////////////////////////////////////////////////

    // Conecta el socket
    var SocketConnect = function () {
        // Inicio sesión en el socket para recibir actualizaciones
        $scope.socket = io(global_settings.urlCORS, { transports: ['websocket'], upgrade: false });
        if ($scope.socket != null) {
            SocketJoin()
        }
    }

    // Declara los mensajes principales del socket
    var SocketJoin = function () {
        $scope.socket.on('connect', function (data) {
            if ($scope.userData && $scope.userData.idUsuario) {
                $scope.socket.emit('login', { user: { idUsuario: $scope.userData.idUsuario } });
            }
        });

        $scope.socket.on('hello', function (data) {
            $scope.connected = true
        });

        //Recibir notificacion meeting
        $scope.socket.on('message', function (data) {
            // Obtiene Notificaciones
            swal({
                title: 'Videoconferencia: ' + data.asunto,
                text: 'Has sido invitado a una videoconferencia con el siguiente ID: ' + data.meetingId + '.',
                type: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Unirme',
                cancelButtonText: 'Cerrar esta ventana'
            }, function (isConfirm) {
                if (isConfirm) {
                    window.open(data.meeting, '_blank', '', false)
                }
            });
        });

        $scope.socket.on('disconnect', function () {
            $scope.connected = false
        });

        $scope.socket.connect();
    }

    function llamarMeeting(joinurl, idUsuario, nombre, UsersInMeeting, meetingId, asunto) {
        if ($scope.socket == null) {
            SocketConnect();
        }

        $scope.socket.emit('createMeeting', { meeting: joinurl, idUsuario: idUsuario, nombre: nombre, users: UsersInMeeting, meetingId: meetingId, asunto: asunto })
    }

    // $scope.limpia = function(){
    //     $scope.meetingObjetivo = '';
    //      $('#myModalNuevaAsietenciaAdmin').modal('hide');
    // };


    $scope.salir = function () {
        userFactory.logOut();
    }


  // $scope.getUsuariosGoAdmin = function () {
  //       solicitadasRepository.getUsuariosGo($scope.empresaActual.idEmpresa,$scope.sucursalActual.idSucursal)
  //           .then(function successCallback(response) {
        
  //               var dataSourceUsuarios = new DevExpress.data.DataSource({
  //                   store: response.data,
  //                   searchOperation: 'contains',
  //                   searchExpr: 'nombreCompleto'
  //               })
              
  //               $scope.listOptionsUsuarios = {
  //                   dataSource: dataSourceUsuarios,
                   
  //                   itemTemplate: function (data) {
  //                       return $('<div>').text(data.nombreCompleto)
  //                   },
  //                   height: 'auto',
  //                   showSelectionControls: true,
  //                   bindingOptions: {
  //                       selectedItemKeys: 'selectedUsuariosMeeting',
  //                       selectionMode: 'selectionMode',
  //                       selectAllMode: 'selectAllMode'
  //                   }
  //               },

  //               $scope.searchOptionsUsuarios = {
  //                   valueChangeEvent: 'keyup',
  //                   placeholder: 'Buscar...',
  //                   mode: 'search',
  //                   onValueChanged: function (args) {
  //                       dataSourceUsuarios.searchValue(args.value)
  //                       dataSourceUsuarios.load()
  //                   }
  //               }
  //              // $scope.listOptionsUsuarios.dataSource.load();


            

  //           }, function errorCallback(response) { })
  //   };
});
