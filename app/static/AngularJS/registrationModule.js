var registrationModule = angular.module("registrationModule", ["ngRoute", "LocalStorageModule", 'ui.grid', 'ui.grid.selection', 'ui.grid.grouping', 'ui.grid.pinning', 'ui.grid.edit', "angularUtils.directives.dirPagination", "dx", "thatisuday.dropzone", "ui.bootstrap"])
    .config(function ($routeProvider, $locationProvider, $sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            global_settings.urlDOCS + '/**'
        ]);
        /*change the routes*/
        //route /Login
        $routeProvider.when('/', {
            templateUrl: 'AngularJS/Templates/login.html',
            controller: 'loginController'
        });
        // //Route /Pedidos
        // $routeProvider.when('/Pedidos', {
        //     templateUrl: 'AngularJS/Templates/Pedidos.html'
        //     , controller: 'pedidosController'
        // });
        // //Route /Cotizaciones
        // $routeProvider.when('/Cotizaciones', {
        //     templateUrl: 'AngularJS/Templates/Cotizaciones.html'
        //     , controller: 'cotizacionesController'
        // });
        // //Route /Historico
        // $routeProvider.when('/Histórico', {
        //     templateUrl: 'AngularJS/Templates/historico.html'
        //     , controller: 'historicoController'
        // });
        // //Route /altadireeciones
        // $routeProvider.when('/Altadirecciones', {
        //     templateUrl: 'AngularJS/Templates/altaDirecciones.html'
        //     , controller: 'altaDireccionesController'
        // });
        // // $routeProvider.when('/AdministracionPrecios', {
        // //     templateUrl: 'AngularJS/Templates/administracionPrecios.html'
        // //     ,controller: 'administracionPreciosController'
        // // });
        // $routeProvider.when('/ConfiguracionPrecios', {
        //     templateUrl: 'AngularJS/Templates/ConfiguracionPrecios.html'
        //     , controller: 'configuracionPreciosController'
        // });
        // // $routeProvider.when('/AdministracionClientes', {
        // //     templateUrl: 'AngularJS/Templates/administracionClientes.html'
        // //     , controller: 'administracionClientesController'
        // // });

        // $routeProvider.when('/AdministracionUsuarios', {
        //     templateUrl: 'AngularJS/Templates/administracionUsuarios.html'
        //     , controller: 'administracionUsuariosController'
        // });
        // $routeProvider.when('/ConfiguradorGrupos', {
        //     templateUrl: 'AngularJS/Templates/configuradorGrupos.html'
        //     , controller: 'configuradorGruposController'
        // });

        // //Route /Carga Archivos
        // $routeProvider.when('/CargaArchivos', {
        //     templateUrl: 'AngularJS/Templates/cargaArchivos.html'
        //     , controller: 'cargaArchivosController'
        // });

        // //Route /Cotizacion Grafica
        // $routeProvider.when('/CotizacionGrafica', {
        //     templateUrl: 'AngularJS/Templates/cotizacionGrafica.html'
        //     , controller: 'cotizacionGraficaController'
        // });

        // //Route /Shipment DHL Capability Quote Booking Shipment
        // $routeProvider.when('/ShipmentDHL', {
        //     templateUrl: 'AngularJS/Templates/shipmentDhl.html'
        //     , controller: 'shipmentDHLController'
        // });

        // //Route /Siniestro SISCO
        // $routeProvider.when('/Siniestro', {
        //     templateUrl: 'AngularJS/Templates/siniestro.html'
        //     , controller: 'siniestroController'
        // });

        // //Route /Siniestro cotización
        // $routeProvider.when('/CotizacionSiniestro', {
        //     templateUrl: 'AngularJS/Templates/cotizacionSiniestro.html'
        //     , controller: 'cotizacionSiniestroController'
        // });

        // //Route /SiniestroGrid
        // $routeProvider.when('/SiniestroGrid', {
        //     templateUrl: 'AngularJS/Templates/siniestroGrid.html'
        //     , controller: 'siniestroGridController'
        // });

        // //Route /refacciones
        // $routeProvider.when('/refacciones', {
        //     templateUrl: 'AngularJS/Templates/refacciones.html'
        //     , controller: 'refaccionesController'
        // });

        // //Route /Reorder
        // $routeProvider.when('/Reorder', {
        //     templateUrl: 'AngularJS/Templates/reorder.html'
        //     , controller: 'ReorderController'
        // });

        // //Route /seguimiento
        // $routeProvider.when('/Seguimiento', {
        //     templateUrl: 'AngularJS/Templates/seguimiento.html'
        //     , controller: 'seguimientoController'
        // });

        // $routeProvider.when('/SiniestroCarga', {
        //     templateUrl: 'AngularJS/Templates/siniestroCarga.html',
        //     controller: 'siniestroCargaController'
        // });

        // $routeProvider.when('/SiniestroSurtido', {
        //     templateUrl: 'AngularJS/Templates/siniestroSurtido.html',
        //     controller: 'siniestroSurtidoController'
        // });

        // $routeProvider.when('/AltaDireccionesUsuario', {
        //     templateUrl: 'AngularJS/Templates/altaDireccionesUsuario.html',
        //     controller: 'altaDireccionesUsuarioController'
        // });
        // //Route /Carga Archivos
        // $routeProvider.when('/uploadFile', {
        //     templateUrl: 'AngularJS/Templates/cargaArchivosRadec.html'
        //     , controller: 'cargaArchivosRadecController'
        // });

        // //Route /Seguimiento Radec
        // $routeProvider.when('/SeguimientoRadec', {
        //     templateUrl: 'AngularJS/Templates/SeguimientoRadec.html'
        //     , controller: 'seguimientoRadecController'
        // });


         $routeProvider.when('/asistencia', {
            templateUrl: 'AngularJS/Templates/asistencia.html'
            , controller: 'asistenciaController'
        });


         $routeProvider.when('/solicitadas', {
            templateUrl: 'AngularJS/Templates/solicitadas.html'
            , controller: 'solicitadasController'
        });

         $routeProvider.when('/atendidas', {
            templateUrl: 'AngularJS/Templates/atendidas.html'
            , controller: 'atendidasController'
        });
        //Route /default
        $routeProvider.otherwise({ redirectTo: '/' });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });

registrationModule.directive('resize', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        var changeHeight = function () { element.css('height', (w.height() - 20) + 'px'); };
        w.bind('resize', function () {
            changeHeight(); // when window size gets changed
        });
        changeHeight(); // when page loads
    };
});

registrationModule.directive('fileChanged', function () {
    return {
        restrict: 'A',
        scope: { method: '&fileChanged' },
        link: function (scope, elem, attrs) {
            elem.bind('change', function (e) {
                var element = e.target;
                if (element.files.length > 0)
                    scope.method({ event: element.files[0] });
                e.target.value = '';
            });
        }
    }
});

registrationModule.run(function ($rootScope) {
    $rootScope.var = "full";
    $rootScope.docServer = global_settings.urlDOCS;
    $rootScope.vIpServer = global_settings.urlCORS;
    $rootScope.urlServer = global_settings.urlEvidencia;
})
