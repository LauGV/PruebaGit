registrationModule.controller('solicitadasController', function($scope, $rootScope, $location, $sce, solicitadasRepository, mainRepository, userFactory, alertFactory, $window) {

    $scope.verAsis = false;
    $scope.totalpn = 0;
    $scope.accessToken = 'cXKyHbnqg4GiyG3S2NrApUNxR94s';
    $scope.usuarioGrid = '';
    $scope.empresas = [];
    $scope.sucursales = [];
    $scope.unaActiva = false;


    $scope.init = function() {

        $scope.Usuario = userFactory.getUserData();
        $scope.verAsistencias();
        $scope.getEmpresas();

    };

    $scope.verAsistencias = function() {

        solicitadasRepository.getAsisAdmin($scope.Usuario.idUsuario).then(function(result) {

            solicitadasRepository.getAsisAdminXope($scope.Usuario.idUsuario).then(function(resultADO) {

                $scope.totalpn = result.data.length;
                if (resultADO.data.length > 0) {
                    $scope.verAsis = true;
                }
                $scope.asistenciasPedidas = result.data;
                $scope.asistenciasPedidasXope = resultADO.data;
            });

        });
    }
    $scope.getEmpresas = function() {
        mainRepository.getEmpresas().then(function(result) {
            $scope.empresas = result.data;
            $scope.empresas.unshift({ nombre: "Seleccioné empresa..." });
            $scope.sucursales.unshift({ nombre: "Seleccioné sucursal..." });
            $scope.empresaActual = $scope.empresas[0];
            $scope.sucursalActual = $scope.sucursales[0];
            // console.log($scope.empresas)
        });

    }

    $scope.cambioEmpresa = function() {
        mainRepository.getSucursales($scope.empresaActual.idEmpresa).then(function(result) {
            $scope.sucursales = result.data;
            $scope.sucursales.unshift({ nombre: "Seleccioné sucursal..." });
            $scope.sucursalActual = $scope.sucursales[0];
            // console.log($scope.sucursales)
        });


    }

    $scope.cambioSucursal = function() {
        $scope.getUsuariosGoAdmin();
    };


    $scope.createMeetingSelUsuarioGrid = function(asitenciaUsuario) {
        $scope.usuarioGrid = asitenciaUsuario
        $("#myModalNuevaAsisAdminUser").modal('show');
    };


    $scope.createMeetingSelUsuario = function() {
        // console.log('asitencia_a_Usuario________que acaba de seleccionar')
        if ($scope.motivo != undefined) {
            if ($scope.motivo != "") {

                if ($scope.selectedUsuariosMeeting.length > 0) {
                    //$scope.createMeeting($scope.motivo,0,0);
                    swal({
                        title: 'Iniciar Asistencia',
                        text: 'Esta Seguro de iniciar ...',
                        type: 'info',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Aceptar',
                        cancelButtonText: 'Cancelar'
                    }, function(isConfirm) {
                        if (isConfirm) {
                            $scope.createMeeting($scope.motivo, 0, 0);
                        }
                    })
                } else {
                    alert('Seleccione un usuario para asistir')
                }
            } else {
                alert('Indique el motivo de la reunion')
            }
        } else {
            alert('Indique el motivo de la reunion')
        }


    };

    $scope.createMeetingUsuario = function() {
        $scope.createMeeting($scope.usuarioGrid.motivo, $scope.usuarioGrid.id, $scope.usuarioGrid.correo);
    };


    $scope.cierra = function(asitenciaUsuario) {

        swal({
            title: 'Cerrar Asistencia',
            text: 'La Asistencia sera cerrada',
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Cerrar Asistencia',
            cancelButtonText: 'Cancelar'
        }, function(isConfirm) {
            if (isConfirm) {
                mainRepository.cierra(asitenciaUsuario.idGoto).then(function(result) {
                    solicitadasRepository.getAsisAdmin($scope.userData.idUsuario).then(function(resultado) {
                        $scope.asistenciasPedidas = resultado.data;
                        $scope.verAsistencias();
                        $scope.verAsis = false;
                    });
                });
            }
        })

    }



    $scope.createMeeting = function(motivo, id, correo) {
        var joinurl, hostURL, meetingid, maxParticipants, uniqueMeetingId, conferenceCallInfo, estatus


        mainRepository.postCreateMeeting($scope.accessToken, motivo).then(function(result) {
            joinurl = result.data[0].joinURL
            meetingid = result.data[0].meetingid
            maxParticipants = result.data[0].maxParticipants
            uniqueMeetingId = result.data[0].uniqueMeetingId
            conferenceCallInfo = result.data[0].conferenceCallInfo
            estatus = 'Activa'

            //mainRepository.getStartMeeting('CTDHpgp4ArTRsQp35yUr1iKelcEN', result.data[0].meetingid).then(function(result)
            // YA QUE TENEMOS EL MEETING LO INICIAMOS
            mainRepository.getStartMeeting($scope.accessToken, result.data[0].meetingid).then(function(result) {
                hostURL = result.data.hostURL
                mainRepository.saveMeeting(id, joinurl, hostURL, meetingid, maxParticipants, uniqueMeetingId, conferenceCallInfo, estatus, motivo, JSON.stringify($scope.selectedUsuariosMeeting), $scope.userData.idUsuario).then(function(result) {
                    //$scope.selectedUsuariosMeeting = []
                    for (let user of $scope.selectedUsuariosMeeting) {
                        if (user.id == $scope.userData.idUsuario) {
                            $scope.selectedUsuariosMeeting.splice($scope.selectedUsuariosMeeting.indexOf(user), 1)
                            break;
                        }
                    }
                    if ($scope.userData.usuario == undefined)
                        $scope.userData.usuario = $scope.userData.nombre



                    if (id > 0)
                        mainRepository.correo(correo, motivo, joinurl);
                    else
                        mainRepository.correo($scope.selectedUsuariosMeeting, motivo, joinurl);


                    $("#myModalNuevaAsietenciaAdmin").modal('hide');
                    $("#myModalNuevaAsisAdminUser").modal('hide');

                    solicitadasRepository.getAsisAdmin($scope.userData.idUsuario).then(function(resultado) {
                        $scope.asistenciasPedidas = resultado.data;

                    });

                    //llamarMeeting(joinurl, $scope.userData.idUsuario, $scope.userData.usuario, JSON.stringify($scope.selectedUsuariosMeeting), meetingid, motivo)
                    swal({
                        title: 'Asistencia',
                        text: 'La Asistencia se creó de forma correcta con el siguiente ID: ' + uniqueMeetingId,
                        type: 'success',
                        //showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Iniciar Asistencia',
                        //cancelButtonText: 'Cerrar esta ventana'
                    }, function(isConfirm) {
                        if (isConfirm) {
                            window.open(hostURL, '_blank', '', false)
                            $scope.verAsistencias();
                            $scope.verAsis = false;
                        }
                    })
                })
            })
        })
    };

    $scope.getUsuariosGoAdmin = function() {
        // $scope.listOptionsUsuarios=[];
        solicitadasRepository.getUsuariosGo($scope.empresaActual.idEmpresa, $scope.sucursalActual.idSucursal)
            .then(function successCallback(response) {

                $("#lx").dxList("instance").repaint();

                var dataSourceUsuarios = new DevExpress.data.DataSource({
                    store: response.data,
                    searchOperation: 'contains',
                    searchExpr: 'nombreCompleto'
                })
                // dataSourceUsuarios.clearRawDataCache();
                // dataSourceUsuarios.pageIndex(0);
                // dataSourceUsuarios.load();
                // dataSourceUsuarios.clear();
                //  $scope.listOptionsUsuarios.dataSourceUsuarios.pageIndex(0);
                // $scope.listOptionsUsuarios.load();
                $scope.listOptionsUsuarios = {
                    dataSource: dataSourceUsuarios,

                    itemTemplate: function(data) {
                        return $('<div>').text(data.nombreCompleto)
                    },
                    height: 'auto',
                    showSelectionControls: true,
                    bindingOptions: {
                        selectedItemKeys: 'selectedUsuariosMeeting',
                        selectionMode: 'selectionMode',
                        selectAllMode: 'selectAllMode'
                    },
                    reloadData: function() {
                        dataSource.pageIndex(0);
                        dataSource.load().done(function() {
                            var list = $("#lx").dxList("instance");

                            list.update();
                            list.scrollTo(0);
                        });
                    }
                }
                // $scope.listOptionsUsuarios.dataSource.pageIndex(0);
                // $scope.listOptionsUsuarios.dataSource.pageIndex(0);
                // $scope.listOptionsUsuarios.load();

                $scope.searchOptionsUsuarios = {
                    valueChangeEvent: 'keyup',
                    placeholder: 'Buscar...',
                    mode: 'search',
                    onValueChanged: function(args) {
                        dataSourceUsuarios.searchValue(args.value)
                        dataSourceUsuarios.load()
                    }
                }
                // $scope.listOptionsUsuarios.dataSource.load();

                //  $scope.listOptionsUsuarios.dataSource.pageIndex(0);
                // $scope.listOptionsUsuarios.repaint();

            }, function errorCallback(response) {})
    };


    $scope.limpia = function() {
        $scope.meetingObjetivo = '';
        $('#myModalNuevaAsietenciaAdmin').modal('hide');
    };

});