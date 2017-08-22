/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function() {
    'use strict';

    angular
        .module('app.routes')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper){
        
        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // defaults to dashboard
        $urlRouterProvider.otherwise('/app/dash');

        // 
        // Application Routes
        // -----------------------------------   
        $stateProvider
          .state('app', {
              url: '/app',
              abstract: true,
              templateUrl: helper.basepath('app.html'),
              resolve: helper.resolveFor('modernizr', 'icons'),
              controller:function(oAuth,$state){
                //if(!oAuth.AuthState)
                   // $state.go('page.login');
                oAuth.on('onAuthStateChanged',function(state){
                  if(!state)
                    $state.go('page.login');
                });
              }
          }) 
          .state('canva', {
              url:          '/canva',
              title:        'Canva editor',
              resolve: helper.resolveFor('modernizr', 'icons'),
              template:  '<canva-editor></canva-editor>'
          })
          .state('app.dash', {
              url:          '/dash',
              title:        'Single View',
              templateUrl:  helper.basepath('singleview.html'),
              controller:   'dashBoardCtrl'
          })
          .state('app.entitys', {
              url:          '/entity',
              title:        'Entidades',
              templateUrl:  'app/sections/entity.html',
              controller:   'entityListCtrl'
          })
          .state('app.orders', {
              url:         '/ordenes',
              title:       'Ordenes',
              templateUrl: 'app/sections/orders.html',
              controller:  'orderListCtrl'
          })
          .state('app.orderForm', {
              url:          '/ordenes/form/:order_key',
              title:        'Ordener form',
              params:       { order_key:'0' },
              templateUrl:  'app/sections/order_form.html',
              controller:   'orderFormCtrl'
          })
          .state('app.submenu', {
              url:         '/submenu',
              title:       'Submenu',
              templateUrl: helper.basepath('submenu.html')
          })


          // ROUTES OF PAGES oAuth

          .state('privatePage', {
              url: '/private-page',
              abstract: true,
              templateUrl: helper.basepath('page.html'),
              resolve: helper.resolveFor('modernizr', 'icons'),
              controller:function(oAuth,$state){
                oAuth.on('onAuthStateChanged',function(state){
                  if(!state)
                    $state.go('page.login');
                });
              }

          })
          .state('privatePage.print', {
              url: '/print/:id',
              params:{id:0},
              title: 'Print Page',
              templateUrl: 'app/pages/print.html'
          })


          // ROUTES OF PAGES

          .state('page', {
              url: '/page',
              abstract: true,
              templateUrl: helper.basepath('page.html'),
              resolve: helper.resolveFor('modernizr', 'icons'),
              controller:function(oAuth,$state){
                oAuth.on('onAuthStateChanged',function(state){
                  if(state)
                    $state.go('app.dash');
                });
              }

          })
          .state('page.login', {
              url: '/login',
              title: 'Login',
              templateUrl: 'app/pages/login.html'
          })
          .state('page.register', {
              url: '/register',
              title: 'Register',
              templateUrl: 'app/pages/register.html'
          })
          ;

    } // routesConfig

})();

