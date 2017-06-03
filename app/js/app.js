/*!
 * 
 * Angle - Bootstrap Admin App + AngularJS
 * 
 * Version: 3.2.0
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 * 
 */

// APP START
// ----------------------------------- 

(function() {
    'use strict';

    angular
        .module('angle', [
            'app.core',
            'app.routes',
            'app.sidebar',
            'app.navsearch',
            'app.preloader',
            'app.loadingbar',
            'app.translate',
            'app.settings',
            'app.utils',
            'app.firebase',
            'app.sections',
            'app.pages',
            'app.fac',
            'app.components',
        ]);
})();


(function() {
    'use strict';

    angular
        .module('app.colors', []);
})();
(function(){

	'use strict';

	angular.module('app.components',[])
	

})();

(function() {
    'use strict';

    angular
        .module('app.core', [
            'ngRoute',
            'ngAnimate',
            'ngStorage',
            'ngCookies',
            'pascalprecht.translate',
            'ui.bootstrap',
            'ui.router',
            'oc.lazyLoad',
            'cfp.loadingBar',
            'ngSanitize',
            'ngResource',
            'ui.utils'
        ]);
})();
(function(){

	'use strict';

	angular.module('app.fac',[])
	

})();

(function(){

	'use strict';

	angular.module('app.firebase',[])
	

})();

(function() {
    'use strict';

    angular
        .module('app.navsearch', []);
})();
(function(){

	'use strict';

	angular.module('app.pages',[])
	

})();

(function() {
    'use strict';

    angular
        .module('app.lazyload', []);
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar', []);
})();
(function() {
    'use strict';

    angular
        .module('app.preloader', []);
})();


(function() {
    'use strict';

    angular
        .module('app.routes', [
            'app.lazyload'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.settings', []);
})();
(function(){

	'use strict';

	angular.module('app.sections',[])
	

})();

(function() {
    'use strict';

    angular
        .module('app.utils', [
          'app.colors'
          ]);
})();

(function() {
    'use strict';

    angular
        .module('app.translate', []);
})();
(function() {
    'use strict';

    angular
        .module('app.sidebar', []);
})();
(function() {
    'use strict';

    angular
        .module('app.colors')
        .constant('APP_COLORS', {
          'primary':                '#5d9cec',
          'success':                '#27c24c',
          'info':                   '#23b7e5',
          'warning':                '#ff902b',
          'danger':                 '#f05050',
          'inverse':                '#131e26',
          'green':                  '#37bc9b',
          'pink':                   '#f532e5',
          'purple':                 '#7266ba',
          'dark':                   '#3a3f51',
          'yellow':                 '#fad732',
          'gray-darker':            '#232735',
          'gray-dark':              '#3a3f51',
          'gray':                   '#dde6e9',
          'gray-light':             '#e4eaec',
          'gray-lighter':           '#edf1f2'
        })
        ;
})();
/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.colors')
        .service('Colors', Colors);

    Colors.$inject = ['APP_COLORS'];
    function Colors(APP_COLORS) {
        this.byName = byName;

        ////////////////

        function byName(name) {
          return (APP_COLORS[name] || '#fff');
        }
    }

})();

	(function(){

		'use strict';

		angular.module('app.components')
		.directive('entityFilter', ['$entidades','entidad',function($entidades,entidad){
			
			return {
				// name: '',
				// priority: 1,
				// terminal: true,
				scope: { value:'=', onSelect:'=' }, // {} = isolate, true = child, false/undefined = no change
				// controller: function($scope, $element, $attrs, $transclude) {},
				// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
				// restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
				template: ''+
					'<div class="form-group">'+
						'<input type="text" placeholder="Seleccione una entidad" ng-model="ficha.dysplay_filter.value" uib-typeahead="address.dysplay_filter.value for address in getEntitys($viewValue)" typeahead-loading="loadingLocations" typeahead-no-results="noResults" typeahead-on-select="onSelectItem($item, $model, $label, $event)" class="form-control" />'+
						'<i ng-show="loadingLocations" class="fa fa-refresh"></i>'+
						'<div ng-show="noResults">'+
							'<i class="fa fa-remove">No Results Found</i>'+
                    	'</div>'+
                  	'</div>'+
				'',
				// templateUrl: '',
				// replace: true,
				// transclude: true,
				// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
				link: function($scope, iElm, iAttrs, controller) {
					
					$scope.ficha = new entidad();


					$entidades.get(function(entidades){
						setTimeout(function(){
							$scope.$apply(function(){
								$scope.entidades = entidades;
							});
						},1);
					});

					$scope.$watch('value',function(n){
						if(n != undefined){
							var ft = angular.copy(n);
								ft.set('dysplay_filter',ft.nombre.value+' '+ft.apellido.value);
							$scope.ficha = ft;
							console.log(ft,'ficha')
						}
						//console.log(n,'refresh')
					});

					$scope.onSelectItem = function($item, $model, $label, $event){
						//console.log($item, $model, $label, $event, 'onSelect');
						if(typeof $scope.onSelect == 'function')
							$scope.onSelect($item);
					};

					$scope.getEntitys = function(value){
						//console.log(value,$scope.entidades);
						return $scope.entidades.filter(function(it){
							return it.nombre.like(value) || it.apellido.like(value) || it.referencia.like(value);
						}).map(function(it){
							it.set('dysplay_filter',it.referencia.value+' - '+it.nombre.value+' '+it.apellido.value+' - '+it.direccion.value);
							return it;
						});
					};
				}
			};
		}]);;
		

	})();
	(function(){

		'use strict';

		angular.module('app.components')
		.directive('orderForm', [function(){
			
			return {
				// name: '',
				// priority: 1,
				// terminal: true,
				scope: {formOrder:'='}, // {} = isolate, true = child, false/undefined = no change
				// controller: function($scope, $element, $attrs, $transclude) {},
				// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
				// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
				   template: ''+
				   	'<table class="table table-hover">'+
				   		'<thead>'+
				   			'<tr>'+
								'<th class="text-center">'+
									'Device'+
								'</th>'+
								'<th class="text-center">'+
									'Referencia'+
								'</th>'+
								'<th class="text-center">'+
									'Serial'+
								'</th>'+
								'<th class="text-center">'+
									'Trabajo'+
								'</th>'+
								'<th class="text-center">'+
									'Notas'+
								'</th>'+
								'<th class="text-center">'+
									'Action'+
								'</th>'+
				   			'</tr>'+
				   		'</thead>'+
					   	'<tbody>'+
	                        '<tr>'+
	                        	'<td>'+
	                        		'<div class="form-group">'+
		                        		'<select ng-model="formOrder.type.value" class="form-control">'+
		                                    '<option value="phone">SmartPhone</option>'+
		                                    '<option value="tablet">Tablet</option>'+
		                                    '<option value="notebook">Notebook</option>'+
		                                    '<option value="otro">Otro</option>'+
		                                '</select>'+
	                            	'</div>'+
	                        	'</td>'+
	                        	'<td>'+
	                        		'<div class="form-group">'+
	                        			'<input type="text" placeholder="{{formOrder.reference.placeholder}}" ng-model="formOrder.reference.value" uib-typeahead="references for references in getReferences($viewValue)" typeahead-loading="loadingReferences" typeahead-no-results="noResults" class="form-control">'+
	                        		'</div>'+
	                    		'</td>'+
	                    		'<td>'+
	                    			'<div class="form-group">'+
	                    				'<input placeholder="{{formOrder.code.placeholder}}"  type="text" ng-model="formOrder.code.value" class="form-control" />'+
	                              	'</div>'+
	                          	'</td>'+
	                           	'<td>'+
	                           		'<div class="form-group">'+
	                                	'<select ng-model="formOrder.work.value" class="form-control">'+
		                                    '<option value="desbloqueo">Desbloqueo parcial</option>'+
		                                    '<option value="desbloqueo completo">Desbloqueo completo</option>'+
		                                    '<option value="servicio tecnico">Servicio Tecnico</option>'+
		                                    '<option value="software">Software</option>'+
		                                    '<option value="presupuesto">Presupuestar</option>'+
	                                 '</select>'+
	                              '</div>'+
	                           '</td>'+
	                           '<td>'+
	                              '<div class="form-group">'+
	                                 '<textarea placeholder="Nota de orden" ng-model="note" class="form-control no-resize"></textarea>'+
	                              '</div>'+
	                           '</td>'+
	                           '<td width="50px">'+
	                              '<div ng-click="pushOrder()" class="btn btn-primary">ADD</div>'+
	                           '</td>'+
	                    	'</tr>'+
	                   '</tbody>'+
                   '</table>'+
			   	'',
				// templateUrl: '',
				// replace: true,
				// transclude: true,
				// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
				link: function($scope, iElm, iAttrs, controller) {
					
				},
				controller:["$scope", "$orders", "order", function($scope, $orders, order){
					$scope.ordersListLoaded = [];
					$scope.note             = "";
					//$scope.formOrder        = new order();

					$orders.get(function(list){
						$scope.ordersListLoaded = list;
					});


					$scope.pushOrder = function(){
						var form = angular.copy($scope.formOrder);
						if($scope.note != '')
							form.pushNote($scope.note);
						$orders.push(form);
						$scope.formOrder = new order(form.fid.value);
						$scope.note      = "";
					};


					$scope.getReferences = function(value){
						return  $scope.ordersListLoaded.filter(function(it){
							return it.reference.like(value) && it.type.value == $scope.formOrder.type.value;
						})
						.map(function(it){
							return it.reference.value;
						})
						.filter(function(it, index, inputArray){
							return inputArray.indexOf(it) == index;
						});
					}
				}]
			};
		}]);;
		

	})();
(function() {
    'use strict';

    angular
        .module('app.core')
        .config(coreConfig);

    coreConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$animateProvider'];
    function coreConfig($controllerProvider, $compileProvider, $filterProvider, $provide, $animateProvider){

      var core = angular.module('app.core');
      // registering components after bootstrap
      core.controller = $controllerProvider.register;
      core.directive  = $compileProvider.directive;
      core.filter     = $filterProvider.register;
      core.factory    = $provide.factory;
      core.service    = $provide.service;
      core.constant   = $provide.constant;
      core.value      = $provide.value;

      // Disables animation on items with class .ng-no-animation
      $animateProvider.classNameFilter(/^((?!(ng-no-animation)).)*$/);

    }

})();
/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('APP_MEDIAQUERY', {
          'desktopLG':             1200,
          'desktop':                992,
          'tablet':                 768,
          'mobile':                 480
        })
      ;

})();
(function(){

	'use strict';

	angular.module('app.core')
	.config([function() {
		var config = {
		    apiKey: "AIzaSyDLJs4QVKMXGfIIYrnJjLUSRQ0uSfF4dVs",
		    authDomain: "rosario3g-f122a.firebaseapp.com",
		    databaseURL: "https://rosario3g-f122a.firebaseio.com",
		    projectId: "rosario3g-f122a",
		    storageBucket: "rosario3g-f122a.appspot.com",
		    messagingSenderId: "585519471429"
		  };
		  firebase.initializeApp(config);
	}]);

})();

(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', '$stateParams',  '$window', '$templateCache', 'Colors'];
    
    function appRun($rootScope, $state, $stateParams, $window, $templateCache, Colors) {
      
      // Set reference to access them from any scope
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.$storage = $window.localStorage;

      // Uncomment this to disable template cache
      /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          if (typeof(toState) !== 'undefined'){
            $templateCache.remove(toState.templateUrl);
          }
      });*/

      // Allows to use branding color with interpolation
      // {{ colorByName('primary') }}
      $rootScope.colorByName = Colors.byName;

      // cancel click event easily
      $rootScope.cancel = function($event) {
        $event.stopPropagation();
      };

      // Hooks Example
      // ----------------------------------- 

      // Hook not found
      $rootScope.$on('$stateNotFound',
        function(event, unfoundState/*, fromState, fromParams*/) {
            console.log(unfoundState.to); // "lazy.state"
            console.log(unfoundState.toParams); // {a:1, b:2}
            console.log(unfoundState.options); // {inherit:false} + default options
        });
      // Hook error
      $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error){
          console.log(error);
        });
      // Hook success
      $rootScope.$on('$stateChangeSuccess',
        function(/*event, toState, toParams, fromState, fromParams*/) {
          // display new view from top
          $window.scrollTo(0, 0);
          // Save the route title
          $rootScope.currTitle = $state.current.title;
        });

      // Load a title dynamically
      $rootScope.currTitle = $state.current.title;
      $rootScope.pageTitle = function() {
        var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
        document.title = title;
        return title;
      };      

    }

})();


(function(){

	'use strict';

	angular.module('app.fac')
	.factory('entidad', ['$http', 'inputItem',function($http, inputItem){
		return function(eid, referencia, nombre, apellido, telefono, direccion, email){
			var self = this;
				
				this.error = false;
				this.keys  = [
					'referencia',
					'nombre',
					'apellido',
					'email',
					'telefono',
					'direccion'
				];

				// declaracion de propiedades
				this.eid        = new inputItem('eid', eid, 'text', undefined, false, undefined, true);
				this.referencia = new inputItem('referencia', referencia, 'text', undefined, false, 'Referencia', true);
				this.nombre     = new inputItem('nombre', nombre, 'text', undefined, false, 'Nombre', true);
				this.apellido   = new inputItem('apellido', apellido, 'text', undefined, false, 'Apellido', true);
				this.telefono   = new inputItem('telefono', telefono, 'text', undefined, false, 'Telefono', true);
				this.direccion  = new inputItem('direccion', direccion, 'filter_selector', function(val){ return self.filterAddress(val);}, false, 'Direccion');
				this.email      = new inputItem('email', email, 'text', undefined, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/, 'E-mail', true);
				// end

				this.get = function(){
					var list = {};
					self.error = false;
					for(var p in self.keys){
						var key = self.keys[p],
						    val = self[key].get();
						if(!self[key].error)
							list[key] = val;
						else
							self.error = true;	
					}
					return list;
				}

				this.set = function(key,value){
					var ex = self.keys.filter(function(k) {
						return k == key;
					});
					if(ex[0] != undefined)
						self.keys.push(key);
					self[key] = new inputItem(key, value);
				};

				this.get_headers = function(){
					var headKeys =  [
						'referencia',
						'nombre',
						'apellido',
						'email',
						'telefono'
					],
					head = [];
					for(var h in headKeys){
						if(self[headKeys[h]] != undefined){
							head.push({
								key:   self[headKeys[h]].name,
								title: self[headKeys[h]].placeholder
							});
						}
					}
					return head;
				};


				this.filterAddress = function(val){
					return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
						params: {
							address: val,
							sensor: false
						}
				    })
				    .then(function(response){
				    	return response.data.results.map(function(item){
				    		return item.formatted_address;
				    	});
				    });
				};
		};
	}])

})();

	(function(){

		'use strict';

		angular.module('app.fac')
		.factory('ficha', ['inputItem','oAuth',function(inputItem,oAuth){
			return function(eid, fid, nro, date, state){
				var self = this;
				var uid     = oAuth.getCurrent().uid;

				this.params = ['nro', 'eid','owner', 'date', 'state'];
				
				this.fid    = new inputItem('fid', fid, 'text', undefined, false, undefined, true);
				this.nro    = new inputItem('nro', nro || new Date().getTime(), 'number', undefined, false, undefined, true);
				this.eid    = new inputItem('eid', eid, 'number', undefined, false, undefined, true);
				this.date   = new inputItem('date', date || new Date().toString(), 'date', undefined, false, undefined, true);
				this.state  = new inputItem('state', state || 'draft', 'text', undefined, false, undefined, true);;
				this.owner  = new inputItem('owner', uid, 'text', undefined, false, undefined, true);
				
				this.get = function(){
					var ficha = {};
					for(var p in this.params){
						var param = this.params[p];
						ficha[param] = this[param].get();
					}
					return ficha;
				};


			};
		}]);

	})();
(function(){

	'use strict';

	angular.module('app.fac')
	.factory('inputItem', [function(){
		return function(name, value, type, filter, pattern, placeholder, required){
			var self = this;
			this.error       = false;
			this.log         = '';

			// sets atributes
			this.name        = name != undefined?name:'text';
			this.value       = value == undefined?'':value;
			this.type        = type == undefined?'text':type;
			this.pattern     = pattern == undefined?'':pattern;
			this.placeholder = placeholder == undefined?'':placeholder;
			this.required    = required == undefined?false:required;
			this.filter      = filter;
			// end

			this.get = function(){
				self.error = false;
				self.error = !self.valid();
				if(self.error && self.log == '')
					self.log = self.required?'The '+self.name+' is invalid and is required':'The '+self.name+' is invalid';
				else
					self.log = '';
				return self.value;
			};

			this.valid = function(){
				self.log = '';
				if(typeof self.pattern == 'function')
					return self.pattern(self.value);
				if(typeof self.pattern == 'object')
					return self.pattern.test(self.value);
				return (self.required && self.value != '') || !self.required;
			}

			this.like = function(value){
				value = value.toLowerCase();
				var exp = this.value.toLowerCase() || '';
				if(value.indexOf(' ') != -1){
					var reg = value.split(' ');
					for(var i in reg){
						if(exp.indexOf(reg[i]) == -1){
							return false;
							break;
						}
					}
					return true;
				}
				return exp.indexOf(value) != -1;
			}

		};
	}]);
})();

(function(){

	'use strict';

	angular.module('app.fac')
	.factory('itemDevice', [function(){
		return function(){
			
		};
	}])

})();

(function(){

	'use strict';

	angular.module('app.fac')
	.factory('itemFicha', ['entidad',function(entidad){
		return function(ent, orders){
			var self = this;

			this.entidad = typeof ent != typeof entidad?new entidad():ent;
			this.nro     = new Date().getTime();
			this.orders  = Array.isArray(orders)?orders:[];

		};
	}])

})();
(function(){

	'use strict';

	angular.module('app.fac')
	.factory('itemModel', [function(){
		return function(){
			
		};
	}])

})();

	(function(){

		'use strict';

		angular.module('app.fac')
		.factory('order', ['inputItem','oAuth','$q',function(inputItem,oAuth,$q){
			return function (fid, oid, reference, type, code, work, date, note, state){
				var uid         = oAuth.getCurrent().uid;
				
				this.params     = ['fid','type', 'reference', 'code', 'work', 'notes','date', 'owner', 'state'];
				this.oid        = new inputItem('oid', oid, 'text', undefined, false, undefined, true);
				this.fid        = new inputItem('fid', fid, 'text', undefined, false, undefined, true);
				this.type       = new inputItem('type', type || 'otro', 'text', undefined, false, undefined, true);
				this.reference  = new inputItem('reference', reference || '', 'text', undefined, false, 'Referencia de la orden', true);
				this.code       = new inputItem('code', code || '', 'text', undefined, false, "0000-1111-AAAA", true);
				this.work       = new inputItem('work', work || 'presupuesto', 'text', undefined, false, undefined, true);
				this.owner      = new inputItem('owner', uid, 'text', undefined, false, undefined, true);
				this.date       = new inputItem('date', new Date().toString(), 'text', undefined, false, undefined, true);
				this.state      = new inputItem('state', state || 'draft', 'text', undefined, false, undefined, true);
				this.notes      = [];

				this.pushNote = function(note){
					this.notes.push({text:note,owner:uid,date: new Date().toString()});
				};

				if(Array.isArray(note))
					this.notes = note;
				else
					if(note != undefined)
						this.pushNote(note);



				this.get = function(){
					var order = {};
					for(var p in this.params){
						var param = this.params[p];
						order[param] = Array.isArray(this[param])?this[param]:this[param].get();
					}
					return order;
				};

				this.pop = function(){

				}

			};
		}]);


	})();	
(function(){

	'use strict';

	angular.module('app.firebase')
	.factory('$entidades', ['entidad','$q',function(entidad,$q){
		return new function(){
			var self = this;
			var db   = firebase.database().ref();
			var event = {};

			this.get = function(c, e){
				db.child('entidades')
				.on('value',
					function(snap){
						var list = snap.val();
						c(list == null?[]:self.encode_list_entidades(list));
					},
					function(err){
						e(err);
					}
				);
			};

			this.encode_list_entidades = function(list){
				var nlist = [];	
				for(var id in list){
					var ent = list[id];
						nlist.push(new entidad(id,ent.referencia,ent.nombre,ent.apellido,ent.telefono,ent.direccion,ent.email));
				}
				return nlist;
			}

			this.push = function(data_entity){
				return $q(function(resolve, reject){
					db.child('entidades')
					.push(data_entity)
					.then(
						function(data){
							console.log(data, 'on push entity');
							var eid = data.path.o[1] || 0;
							resolve(eid);
						},
						function(error){
							console.log(error,'onPush');
							reject();
						}
					);
				})
			};

			this.pop = function(id_entity){
				return $q(function(resolve, reject){
					db.child('entidades')
					.child(id_entity)
					.remove()
					.then(
						function(){
							resolve();
						},
						function(error){
							console.log(error,'onPop');
							reject();
						}
					)
				});
			};

			this.update = function(id_entity,data_entity){
				return $q(function(resolve, reject){
					db.child('entidades')
					.child(id_entity)
					.set(data_entity)
					.then(
						function(){
							resolve();
						},
						function(error){
							console.log(error,'onUpdate');
							reject();
						}
					)
				});
			};
		};
	}]);

})();
	(function(){

		'use strict';

		angular.module('app.firebase')
		.factory('$fichas', ['$q','$entidades','$orders', function($q,$entidades,$orders){
			return new function(){
				var self = this;

				var db   = firebase.database().ref();
				var event = {};



				this.push = function(data_ficha){
					return $q(function(resolve, reject){
						db.child('fichas')
						.push(data_ficha.get())
						.then(
							function(data){
								console.log(data, 'on push ficha');
								var fid = data.path.o[1] || 0;
								data_ficha.fid.value = fid;
								resolve(data_ficha);
							},
							function(error){
								console.log(error,'onPush');
								reject();
							}
						);
					})
				};

				this.pop = function(data_ficha){
					return $q(function(resolve, reject){
						db.child('fichas')
						.child(data_ficha.fid.value)
						.remove()
						.then(
							function(){
								$orders.popGroup(data_ficha.fid.value)
								.then(
									function(d){
										resolve();
									},
									function(e){
										reject(e);
									}
								)

							},
							function(){
								reject('Error on delete ficha nro '+data_ficha.nro.value);
							}
						)

					});
				}



			};
		}]);
		

	})();
(function(){

	'use strict';

	angular.module('app.firebase')
	.factory('oAuth', ['$q',function($q){
		return new function(){
			var self           = this;
			var defaultAuth    = firebase.auth();
				this.AuthState = false;
				this.events    = {
					'onAuthStateChanged':function(state){}
				};
				

			this.on = function(event,call){
				self.events[event] = call;
			};

			this.signOut = function(){
				defaultAuth.signOut();
			};

			this.getCurrent = function(){
				var current = defaultAuth.currentUser;
				if(current != null && current.providerData[0])
					return current.providerData[0];
				return {};
			};

			this.login = function(email, password){
				return $q(function(resolve, reject){
					firebase.auth().signInWithEmailAndPassword(email, password)
					.then(
						function(data){
							resolve(data);
						},
						function(error){
							if(error.message != undefined)
								reject(error.message);
							else
								reject('Service no avariable');
						}
					);
				});
			};

			this.register = function(email, password){
				return $q(function(resolve,reject){
					firebase.auth().createUserWithEmailAndPassword(email, password)
					.then(
						function(data){
							resolve(data);
						},
						function(error){
							if(error.message != undefined)
								reject(error.message);
							else
								reject('Service no avariable');
						}
					);
				})
			}




			defaultAuth.onAuthStateChanged(
				function(state){
					self.AuthState = state == null?false:state;
					self.events.onAuthStateChanged(state == null?false:state);
				},
				function(error){
					console.log(error);
					self.events.onAuthStateChanged(false);
				}
			);


			/*firebase.database().ref().child('usuarios').child('roles').on('value',function(snap){
				console.log(snap.val());
			});*/
		};
	}])

})();
	
	(function(){

		'use strict';

		angular.module('app.firebase')
		.factory('$orders', ['$q','order', function($q,order){
			return new function(){
				var self = this;

				var db    = firebase.database().ref();
				var event = {};

				db.child('fichas')
				.on('child_removed', function(childSnapshot, prevChildKey) {
					console.log(childSnapshot.val(), prevChildKey,' on fichas remove');
				});

				this.get = function(c, e){
					db.child('orders')
					.on('value',
						function(snap){
							var list = snap.val();
							c(list == null?[]:self.encode_list_orders(list));
						},
						function(err){
							e(err);
						}
					);
				};

				this.pop = function($idOrder){
					return $q(function(resolve, reject){
						db.child('orders')
						.child($idOrder)
						.remove()
						.then(
							function(){
								resolve(true);
							},
							function(){
								reject('Error on delet order')
							}
						);
					});
				}

				this.encode_list_orders = function(orders){
					var list = [];
					for(var id in orders){
						var or      = orders[id],
							nor     = new order(or.fid, id, or.reference, or.type, or.code, or.work, or.date, or.notes, or.state);
							nor.pop = function(){self.pop(id)};
						list.push(nor);
					}
					return list;
				};

				this.popGroup = function(fid){
					return $q(function(resolve, reject){
						db.child('orders')
						.once('value')
						.then(function(snap){
							var orders = snap.val();
							for(var p in orders)
								self.pop()
						},
						function(e){
							reject('Error on delet orders');
						})
					});
				};

				this.push = function(data_order){
					return $q(function(resolve, reject){
						db.child('orders')
						.push(data_order.get())
						.then(
							function(data){
								var oid = data.path.o[1] || 0;
								data_order.oid.value = oid;
								resolve(data_order);
							},
							function(error){
								console.log(error,'onPush');
								reject();
							}
						);
					})
				};

			};
		}]);
		

	})();
/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .directive('searchOpen', searchOpen)
        .directive('searchDismiss', searchDismiss);

    //
    // directives definition
    // 
    
    function searchOpen () {
        var directive = {
            controller: searchOpenController,
            restrict: 'A'
        };
        return directive;

    }

    function searchDismiss () {
        var directive = {
            controller: searchDismissController,
            restrict: 'A'
        };
        return directive;
        
    }

    //
    // Contrller definition
    // 
    
    searchOpenController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchOpenController ($scope, $element, NavSearch) {
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.toggle);
    }

    searchDismissController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchDismissController ($scope, $element, NavSearch) {
      
      var inputSelector = '.navbar-form input[type="text"]';

      $(inputSelector)
        .on('click', function (e) { e.stopPropagation(); })
        .on('keyup', function(e) {
          if (e.keyCode === 27) // ESC
            NavSearch.dismiss();
        });
        
      // click anywhere closes the search
      $(document).on('click', NavSearch.dismiss);
      // dismissable options
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.dismiss);
    }

})();


/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/
 
(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .service('NavSearch', NavSearch);

    function NavSearch() {
        this.toggle = toggle;
        this.dismiss = dismiss;

        ////////////////

        var navbarFormSelector = 'form.navbar-form';

        function toggle() {
          var navbarForm = $(navbarFormSelector);

          navbarForm.toggleClass('open');
          
          var isOpen = navbarForm.hasClass('open');
          
          navbarForm.find('input')[isOpen ? 'focus' : 'blur']();
        }

        function dismiss() {
          $(navbarFormSelector)
            .removeClass('open') // Close control
            .find('input[type="text"]').blur() // remove focus
            .val('') // Empty input
            ;
        }        
    }
})();

(function(){

	'use strict';

	angular.module('app.pages')
	.controller('LoginFormController', ['$scope','$state','oAuth', function($scope,$state,oAuth){
		var vm = this;

		activate();

		////////////////

		function activate() {
		  // bind here all data from the form
		  vm.account = {};
		  // place the message if something goes wrong
		  vm.authMsg = '';

		  vm.login = function() {
		    vm.authMsg = '';
		    if(vm.loginForm.$valid) {
		    	oAuth
		      	.login(vm.account.email,vm.account.password)
		      	.then(
		      		function(data){
		      			console.log(data);
		      		},
		      		function(error){
		      			console.log(error);
		      			vm.authMsg = error;
		      		}
	      		);
		    } else {
		      vm.loginForm.account_email.$dirty = true;
		      vm.loginForm.account_password.$dirty = true;
		    }
		  };
		}
	}])

})();

(function(){

	'use strict';

	angular.module('app.pages')
	.controller('RegisterFormController', ['$state','oAuth', function($state,oAuth){
		var vm = this;

		activate();

		////////////////

		function activate() {
		  // bind here all data from the form
		  vm.account = {};
		  // place the message if something goes wrong
		  vm.authMsg = '';
		    
		  vm.register = function() {
		    vm.authMsg = '';
		    if(vm.registerForm.$valid) {
		    	oAuth
		    	.register(vm.account.email,vm.account.password)
		    	.then(
		    		function(d){
		    			console.log(d,'success');
		    		},function(error){
		    			console.log(error);
		    			vm.authMsg = error;
		    		}
	      		)
		    } else {
		      vm.registerForm.account_email['$dirty'] = true;
		      vm.registerForm.account_password['$dirty'] = true;
		    }
		  };
		}
	}]);

})();

(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .config(lazyloadConfig);

    lazyloadConfig.$inject = ['$ocLazyLoadProvider', 'APP_REQUIRES'];
    function lazyloadConfig($ocLazyLoadProvider, APP_REQUIRES){

      // Lazy Load modules configuration
      $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: APP_REQUIRES.modules
      });

    }
})();
(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
          // jQuery based and standalone scripts
          scripts: {
            'whirl':              ['vendor/whirl/dist/whirl.css'],
            'classyloader':       ['vendor/jquery-classyloader/js/jquery.classyloader.min.js'],
            'animo':              ['vendor/animo.js/animo.js'],
            'fastclick':          ['vendor/fastclick/lib/fastclick.js'],
            'modernizr':          ['vendor/modernizr/modernizr.custom.js'],
            'animate':            ['vendor/animate.css/animate.min.css'],
            'skycons':            ['vendor/skycons/skycons.js'],
            'icons':              ['vendor/fontawesome/css/font-awesome.min.css',
                                   'vendor/simple-line-icons/css/simple-line-icons.css'],
            'weather-icons':      ['vendor/weather-icons/css/weather-icons.min.css',
                                   'vendor/weather-icons/css/weather-icons-wind.min.css'],
            'sparklines':         ['vendor/sparkline/index.js'],
            'wysiwyg':            ['vendor/bootstrap-wysiwyg/bootstrap-wysiwyg.js',
                                   'vendor/bootstrap-wysiwyg/external/jquery.hotkeys.js'],
            'slimscroll':         ['vendor/slimScroll/jquery.slimscroll.min.js'],
            'screenfull':         ['vendor/screenfull/dist/screenfull.js'],
            'vector-map':         ['vendor/ika.jvectormap/jquery-jvectormap-1.2.2.min.js',
                                   'vendor/ika.jvectormap/jquery-jvectormap-1.2.2.css'],
            'vector-map-maps':    ['vendor/ika.jvectormap/jquery-jvectormap-world-mill-en.js',
                                   'vendor/ika.jvectormap/jquery-jvectormap-us-mill-en.js'],
            'loadGoogleMapsJS':   ['vendor/load-google-maps/load-google-maps.js'],
            'flot-chart':         ['vendor/Flot/jquery.flot.js'],
            'flot-chart-plugins': ['vendor/flot.tooltip/js/jquery.flot.tooltip.min.js',
                                   'vendor/Flot/jquery.flot.resize.js',
                                   'vendor/Flot/jquery.flot.pie.js',
                                   'vendor/Flot/jquery.flot.time.js',
                                   'vendor/Flot/jquery.flot.categories.js',
                                   'vendor/flot-spline/js/jquery.flot.spline.min.js'],
                                  // jquery core and widgets
            'jquery-ui':          ['vendor/jquery-ui/ui/core.js',
                                   'vendor/jquery-ui/ui/widget.js'],
                                   // loads only jquery required modules and touch support
            'jquery-ui-widgets':  ['vendor/jquery-ui/ui/core.js',
                                   'vendor/jquery-ui/ui/widget.js',
                                   'vendor/jquery-ui/ui/mouse.js',
                                   'vendor/jquery-ui/ui/draggable.js',
                                   'vendor/jquery-ui/ui/droppable.js',
                                   'vendor/jquery-ui/ui/sortable.js',
                                   'vendor/jqueryui-touch-punch/jquery.ui.touch-punch.min.js'],
            'moment' :            ['vendor/moment/min/moment-with-locales.min.js'],
            'inputmask':          ['vendor/jquery.inputmask/dist/jquery.inputmask.bundle.js'],
            'flatdoc':            ['vendor/flatdoc/flatdoc.js'],
            'codemirror':         ['vendor/codemirror/lib/codemirror.js',
                                   'vendor/codemirror/lib/codemirror.css'],
            // modes for common web files
            'codemirror-modes-web': ['vendor/codemirror/mode/javascript/javascript.js',
                                     'vendor/codemirror/mode/xml/xml.js',
                                     'vendor/codemirror/mode/htmlmixed/htmlmixed.js',
                                     'vendor/codemirror/mode/css/css.js'],
            'taginput' :          ['vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
                                   'vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js'],
            'filestyle':          ['vendor/bootstrap-filestyle/src/bootstrap-filestyle.js'],
            'parsley':            ['vendor/parsleyjs/dist/parsley.min.js'],
            'fullcalendar':       ['vendor/fullcalendar/dist/fullcalendar.min.js',
                                   'vendor/fullcalendar/dist/fullcalendar.css'],
            'gcal':               ['vendor/fullcalendar/dist/gcal.js'],
            'chartjs':            ['vendor/Chart.js/Chart.js'],
            'morris':             ['vendor/raphael/raphael.js',
                                   'vendor/morris.js/morris.js',
                                   'vendor/morris.js/morris.css'],
            'loaders.css':          ['vendor/loaders.css/loaders.css'],
            'spinkit':              ['vendor/spinkit/css/spinkit.css']
          },
          // Angular based script (use the right module name)
          modules: [
            {name: 'toaster',                   files: ['vendor/angularjs-toaster/toaster.js',
                                                       'vendor/angularjs-toaster/toaster.css']},
            {name: 'localytics.directives',     files: ['vendor/chosen_v1.2.0/chosen.jquery.min.js',
                                                       'vendor/chosen_v1.2.0/chosen.min.css',
                                                       'vendor/angular-chosen-localytics/chosen.js']},
            {name: 'ngDialog',                  files: ['vendor/ngDialog/js/ngDialog.min.js',
                                                       'vendor/ngDialog/css/ngDialog.min.css',
                                                       'vendor/ngDialog/css/ngDialog-theme-default.min.css'] },
            {name: 'ngWig',                     files: ['vendor/ngWig/dist/ng-wig.min.js'] },
            {name: 'ngTable',                   files: ['vendor/ng-table/dist/ng-table.min.js',
                                                        'vendor/ng-table/dist/ng-table.min.css']},
            {name: 'ngTableExport',             files: ['vendor/ng-table-export/ng-table-export.js']},
            {name: 'angularBootstrapNavTree',   files: ['vendor/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                                                        'vendor/angular-bootstrap-nav-tree/dist/abn_tree.css']},
            {name: 'htmlSortable',              files: ['vendor/html.sortable/dist/html.sortable.js',
                                                        'vendor/html.sortable/dist/html.sortable.angular.js']},
            {name: 'xeditable',                 files: ['vendor/angular-xeditable/dist/js/xeditable.js',
                                                        'vendor/angular-xeditable/dist/css/xeditable.css']},
            {name: 'angularFileUpload',         files: ['vendor/angular-file-upload/dist/angular-file-upload.js']},
            {name: 'ngImgCrop',                 files: ['vendor/ng-img-crop/compile/unminified/ng-img-crop.js',
                                                        'vendor/ng-img-crop/compile/unminified/ng-img-crop.css']},
            {name: 'ui.select',                 files: ['vendor/angular-ui-select/dist/select.js',
                                                        'vendor/angular-ui-select/dist/select.css']},
            {name: 'ui.codemirror',             files: ['vendor/angular-ui-codemirror/ui-codemirror.js']},
            {name: 'angular-carousel',          files: ['vendor/angular-carousel/dist/angular-carousel.css',
                                                        'vendor/angular-carousel/dist/angular-carousel.js']},
            {name: 'infinite-scroll',           files: ['vendor/ngInfiniteScroll/build/ng-infinite-scroll.js']},
            {name: 'ui.bootstrap-slider',       files: ['vendor/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js',
                                                        'vendor/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css',
                                                        'vendor/angular-bootstrap-slider/slider.js']},
            {name: 'ui.grid',                   files: ['vendor/angular-ui-grid/ui-grid.min.css',
                                                        'vendor/angular-ui-grid/ui-grid.min.js']},
            {name: 'textAngular',               files: ['vendor/textAngular/dist/textAngular.css',
                                                        'vendor/textAngular/dist/textAngular-rangy.min.js',
                                                        'vendor/textAngular/dist/textAngular-sanitize.js',
                                                        'vendor/textAngular/src/globals.js',
                                                        'vendor/textAngular/src/factories.js',
                                                        'vendor/textAngular/src/DOM.js',
                                                        'vendor/textAngular/src/validators.js',
                                                        'vendor/textAngular/src/taBind.js',
                                                        'vendor/textAngular/src/main.js',
                                                        'vendor/textAngular/dist/textAngularSetup.js'
                                                        ], serie: true},
            {name: 'angular-rickshaw',          files: ['vendor/d3/d3.min.js',
                                                        'vendor/rickshaw/rickshaw.js',
                                                        'vendor/rickshaw/rickshaw.min.css',
                                                        'vendor/angular-rickshaw/rickshaw.js'], serie: true},
            {name: 'angular-chartist',          files: ['vendor/chartist/dist/chartist.min.css',
                                                        'vendor/chartist/dist/chartist.js',
                                                        'vendor/angular-chartist.js/dist/angular-chartist.js'], serie: true},
            {name: 'ui.map',                    files: ['vendor/angular-ui-map/ui-map.js']},
            {name: 'datatables',                files: ['vendor/datatables/media/css/jquery.dataTables.css',
                                                        'vendor/datatables/media/js/jquery.dataTables.js',
                                                        'vendor/angular-datatables/dist/angular-datatables.js'], serie: true},
            {name: 'angular-jqcloud',           files: ['vendor/jqcloud2/dist/jqcloud.css',
                                                        'vendor/jqcloud2/dist/jqcloud.js',
                                                        'vendor/angular-jqcloud/angular-jqcloud.js']},
            {name: 'angularGrid',               files: ['vendor/ag-grid/dist/ag-grid.css',
                                                        'vendor/ag-grid/dist/ag-grid.js',
                                                        'vendor/ag-grid/dist/theme-dark.css',
                                                        'vendor/ag-grid/dist/theme-fresh.css']},
            {name: 'ng-nestable',               files: ['vendor/ng-nestable/src/angular-nestable.js',
                                                        'vendor/nestable/jquery.nestable.js']},
            {name: 'akoenig.deckgrid',          files: ['vendor/angular-deckgrid/angular-deckgrid.js']},
            {name: 'oitozero.ngSweetAlert',     files: ['vendor/sweetalert/dist/sweetalert.css',
                                                        'vendor/sweetalert/dist/sweetalert.min.js',
                                                        'vendor/angular-sweetalert/SweetAlert.js']},
            {name: 'bm.bsTour',                 files: ['vendor/bootstrap-tour/build/css/bootstrap-tour.css',
                                                        'vendor/bootstrap-tour/build/js/bootstrap-tour-standalone.js',
                                                        'vendor/angular-bootstrap-tour/dist/angular-bootstrap-tour.js'], serie: true},
            {name: 'ui.knob',                   files: ['vendor/angular-knob/src/angular-knob.js',
                                                        'vendor/jquery-knob/dist/jquery.knob.min.js']},
            {name: 'easypiechart',              files: ['vendor/jquery.easy-pie-chart/dist/angular.easypiechart.min.js']},
            {name: 'colorpicker.module',        files: ['vendor/angular-bootstrap-colorpicker/css/colorpicker.css',
                                                        'vendor/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js']}
          ]
        })
        ;

})();

(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .config(loadingbarConfig)
        ;
    loadingbarConfig.$inject = ['cfpLoadingBarProvider'];
    function loadingbarConfig(cfpLoadingBarProvider){
      cfpLoadingBarProvider.includeBar = true;
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.latencyThreshold = 500;
      cfpLoadingBarProvider.parentSelector = '.wrapper > section';
    }
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .run(loadingbarRun)
        ;
    loadingbarRun.$inject = ['$rootScope', '$timeout', 'cfpLoadingBar'];
    function loadingbarRun($rootScope, $timeout, cfpLoadingBar){

      // Loading bar transition
      // ----------------------------------- 
      var thBar;
      $rootScope.$on('$stateChangeStart', function() {
          if($('.wrapper > section').length) // check if bar container exists
            thBar = $timeout(function() {
              cfpLoadingBar.start();
            }, 0); // sets a latency Threshold
      });
      $rootScope.$on('$stateChangeSuccess', function(event) {
          event.targetScope.$watch('$viewContentLoaded', function () {
            $timeout.cancel(thBar);
            cfpLoadingBar.complete();
          });
      });

    }

})();
(function() {
    'use strict';

    angular
        .module('app.preloader')
        .directive('preloader', preloader);

    preloader.$inject = ['$animate', '$timeout', '$q'];
    function preloader ($animate, $timeout, $q) {

        var directive = {
            restrict: 'EAC',
            template: 
              '<div class="preloader-progress">' +
                  '<div class="preloader-progress-bar" ' +
                       'ng-style="{width: loadCounter + \'%\'}"></div>' +
              '</div>'
            ,
            link: link
        };
        return directive;

        ///////

        function link(scope, el) {

          scope.loadCounter = 0;

          var counter  = 0,
              timeout;

          // disables scrollbar
          angular.element('body').css('overflow', 'hidden');
          // ensure class is present for styling
          el.addClass('preloader');

          appReady().then(endCounter);

          timeout = $timeout(startCounter);

          ///////

          function startCounter() {

            var remaining = 100 - counter;
            counter = counter + (0.015 * Math.pow(1 - Math.sqrt(remaining), 2));

            scope.loadCounter = parseInt(counter, 10);

            timeout = $timeout(startCounter, 20);
          }

          function endCounter() {

            $timeout.cancel(timeout);

            scope.loadCounter = 100;

            $timeout(function(){
              // animate preloader hiding
              $animate.addClass(el, 'preloader-hidden');
              // retore scrollbar
              angular.element('body').css('overflow', '');
            }, 300);
          }

          function appReady() {
            var deferred = $q.defer();
            var viewsLoaded = 0;
            // if this doesn't sync with the real app ready
            // a custom event must be used instead
            var off = scope.$on('$viewContentLoaded', function () {
              viewsLoaded ++;
              // we know there are at least two views to be loaded 
              // before the app is ready (1-index.html 2-app*.html)
              if ( viewsLoaded === 2) {
                // with resolve this fires only once
                $timeout(function(){
                  deferred.resolve();
                }, 3000);

                off();
              }

            });

            return deferred.promise;
          }

        } //link
    }

})();
/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.routes')
        .provider('RouteHelpers', RouteHelpersProvider)
        ;

    RouteHelpersProvider.$inject = ['APP_REQUIRES'];
    function RouteHelpersProvider(APP_REQUIRES) {

      /* jshint validthis:true */
      return {
        // provider access level
        basepath: basepath,
        resolveFor: resolveFor,
        // controller access level
        $get: function() {
          return {
            basepath: basepath,
            resolveFor: resolveFor
          };
        }
      };

      // Set here the base of the relative path
      // for all app views
      function basepath(uri) {
        return 'app/views/' + uri;
      }

      // Generates a resolve object by passing script names
      // previously configured in constant.APP_REQUIRES
      function resolveFor() {
        var _args = arguments;
        return {
          deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
            // Creates a promise chain for each argument
            var promise = $q.when(1); // empty promise
            for(var i=0, len=_args.length; i < len; i ++){
              promise = andThen(_args[i]);
            }
            return promise;

            // creates promise to chain dynamically
            function andThen(_arg) {
              // also support a function that returns a promise
              if(typeof _arg === 'function')
                  return promise.then(_arg);
              else
                  return promise.then(function() {
                    // if is a module, pass the name. If not, pass the array
                    var whatToLoad = getRequired(_arg);
                    // simple error check
                    if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                    // finally, return a promise
                    return $ocLL.load( whatToLoad );
                  });
            }
            // check and returns required data
            // analyze module items with the form [name: '', files: []]
            // and also simple array of script files (for not angular js)
            function getRequired(name) {
              if (APP_REQUIRES.modules)
                  for(var m in APP_REQUIRES.modules)
                      if(APP_REQUIRES.modules[m].name && APP_REQUIRES.modules[m].name === name)
                          return APP_REQUIRES.modules[m];
              return APP_REQUIRES.scripts && APP_REQUIRES.scripts[name];
            }

          }]};
      } // resolveFor

    }


})();


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
              controller:["oAuth", "$state", function(oAuth,$state){
                //if(!oAuth.AuthState)
                   // $state.go('page.login');
                oAuth.on('onAuthStateChanged',function(state){
                  if(!state)
                    $state.go('page.login');
                });
              }]
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


          // ROUTES OF PAGES

          .state('page', {
              url: '/page',
              abstract: true,
              templateUrl: helper.basepath('page.html'),
              resolve: helper.resolveFor('modernizr', 'icons'),
              controller:["oAuth", "$state", function(oAuth,$state){
                oAuth.on('onAuthStateChanged',function(state){
                  if(state)
                    $state.go('app.dash');
                });
              }]

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


(function() {
    'use strict';

    angular
        .module('app.settings')
        .run(settingsRun);

    settingsRun.$inject = ['$rootScope', '$localStorage'];

    function settingsRun($rootScope, $localStorage){

      // Global Settings
      // -----------------------------------
      $rootScope.app = {
        name: 'Angle',
        description: 'Angular Bootstrap Admin Template',
        year: ((new Date()).getFullYear()),
        layout: {
          isFixed: true,
          isCollapsed: false,
          isBoxed: false,
          isRTL: false,
          horizontal: false,
          isFloat: false,
          asideHover: false,
          theme: null,
          asideScrollbar: false
        },
        useFullLayout: false,
        hiddenFooter: false,
        offsidebarOpen: false,
        asideToggled: false,
        viewAnimation: 'ng-fadeInUp'
      };

      // Setup the layout mode
      $rootScope.app.layout.horizontal = ( $rootScope.$stateParams.layout === 'app-h') ;

      // Restore layout settings [*** UNCOMMENT TO ENABLE ***]
      // if( angular.isDefined($localStorage.layout) )
      //   $rootScope.app.layout = $localStorage.layout;
      // else
      //   $localStorage.layout = $rootScope.app.layout;
      //
      // $rootScope.$watch('app.layout', function () {
      //   $localStorage.layout = $rootScope.app.layout;
      // }, true);

      // Close submenu when sidebar change from collapsed to normal
      $rootScope.$watch('app.layout.isCollapsed', function(newValue) {
        if( newValue === false )
          $rootScope.$broadcast('closeSidebarMenu');
      });

    }

})();

(function(){

	'use strict';

	angular.module('app.sections')
	.controller('userSettingsCtrl', ['$scope','oAuth', function($scope,oAuth){
		
		$scope.logout = function(){
			oAuth.signOut();
			$scope.app.offsidebarOpen = !$scope.app.offsidebarOpen;
		};

		
	}]);

})();
(function(){

	'use strict';

	angular.module('app.sections')
	.controller('dashBoardCtrl', ['$uibModal','$scope', '$entidades', 'entidad', function($uibModal, $scope, $entidades, entidad){
		
	}]);

})();

(function(){

	'use strict';

	angular.module('app.sections')
	.controller('editionEntityModalCtrl', ['entidad','$entidades','$scope','ent','$uibModalInstance', function(entidad,$entidades,$scope,ent,$uibModalInstance){
		
		$scope.entity  = new entidad(ent.eid.value, ent.referencia.value, ent.nombre.value, ent.apellido.value, ent.telefono.value, ent.direccion.value, ent.email.value);
		$scope.keys    = angular.copy(ent.keys);

		$scope.close = function(){
			//console.log(angular.copy($scope.entity))
			$uibModalInstance.close($scope.entity);
		};

		$scope.save = function(){
			var promise;
			setTimeout(function(){
				$scope.$apply(function(){
					var data    = $scope.entity.get();
					if(!$scope.entity.error){
						if($scope.entity.eid.get() === '')
							promise = $entidades.push(data);
						else
							promise = $entidades.update($scope.entity.eid.get(),data);
						promise
						.then(
							function(eid){
								if($scope.entity.eid.get() === '')
									$scope.entity.set('eid',eid);
								$scope.close();
							},
							function(error){
								console.log(error);
							}
						)
					}else{
						//console.log($scope.entity.error, $scope.entity);
					}
				});
			},100);
		}

	}]);

})();

(function(){

	'use strict';

	angular.module('app.sections')
	.controller('entityListCtrl', ['$uibModal','$scope', '$entidades', 'entidad', function($uibModal, $scope, $entidades, entidad){
		$scope.list = [];
		$scope.cols = [];

		$entidades.get(function(list){
			$scope.list = list;
			if(Array.isArray($scope.list) && $scope.list[0] != undefined){
				$scope.cols = $scope.list[0].get_headers();
			}
		});

		$scope.new = function(){
			$scope.oepnModal();
		};

		$scope.edit = function(ent){
			$scope.oepnModal(ent);
		};

		$scope.oepnModal = function(ent){
			ent = ent == undefined?new entidad():ent;
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'app/views/editionEntityModal.html',
				controller: 'editionEntityModalCtrl',
				backdrop: 'static',
				resolve: {
			     	ent: function () {
			     		return ent;
			     	}
			    }
			});
		}
	}])

})();

(function(){

	'use strict';

	angular.module('app.sections')
	.controller('orderFormCtrl', ['$scope','order','$orders','ficha','$fichas','$uibModal','$state','$entidades','entidad', function($scope,order,$orders,ficha,$fichas,$uibModal,$state,$entidades,entidad){
		$scope.entidadFilter = new entidad();
		if($state.params.order_key == "0")
			$scope.ficha = new ficha();
		$scope.allOrders = [];
		$scope.ordersList = [];


		$scope.$watch('allOrders',function(n){
			if(n!= undefined){
				$scope.filterOrderList(n);
			}
		},true);


		$scope.filterOrderList = function(list){
			$scope.ordersList = list.filter(function(it){
				return it.fid.value == $scope.ficha.fid.value;
			});
		};

		$orders.get(function(list){
			$scope.allOrders = list;
		});


		$entidades.get(function(entidades){
			setTimeout(function(){
				$scope.$apply(function(){
					$scope.entidades = entidades;
				});
			},1);
		});

		$scope.selectEntity = function(){
			if($scope.entidadFilter.eid.get() !== ''){
				$scope.ficha.entidad = angular.copy($scope.entidadFilter);
				var nf = new ficha($scope.ficha.entidad.eid.get());
				$fichas.push(nf)
				.then(
					function(ficha){
						$scope.ficha.fid.value = ficha.fid.value;
						$scope.formOrder       = new order(ficha.fid.value);

						$scope.filterOrderList($scope.allOrders);
					}
				)
			}else{
				console.log('No se a seleccionado la entidad');
			}
		};

		$scope.setSelection = function($item){
			$scope.entidadFilter = $item;
		};


		$scope.getEntitys = function(value){
			console.log(value,$scope.entidades);
			return $scope.entidades.filter(function(it){
				return it.nombre.value.indexOf(value) !=-1;
			});
		};


		$scope.createEntity = function(ent){
			ent = ent == undefined?new entidad():ent;
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'app/views/editionEntityModal.html',
				controller:  'editionEntityModalCtrl',
				backdrop:    'static',
				resolve: {
			     	ent: function () {
			     		return ent;
			     	}
			    }
			});

			modalInstance.result
			.then(
				function(newEntity){
					if(newEntity.eid != undefined && newEntity.eid.get() != ''){
						console.log(newEntity,'if a new entity')
						$scope.entidadFilter = newEntity;
					}
				}
			);
		}

	}]);

})();

(function(){

	'use strict';

	angular.module('app.sections')
	.controller('orderListCtrl', ['$scope', function($scope){
		
	}])

})();

/**=========================================================
 * Module: animate-enabled.js
 * Enable or disables ngAnimate for element with directive
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('animateEnabled', animateEnabled);

    animateEnabled.$inject = ['$animate'];
    function animateEnabled ($animate) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          scope.$watch(function () {
            return scope.$eval(attrs.animateEnabled, scope);
          }, function (newValue) {
            $animate.enabled(!!newValue, element);
          });
        }
    }

})();

/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Browser', Browser);

    Browser.$inject = ['$window'];
    function Browser($window) {
      return $window.jQBrowser;
    }

})();

/**=========================================================
 * Module: clear-storage.js
 * Removes a key from the browser storage via element click
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('resetKey', resetKey);

    resetKey.$inject = ['$state', '$localStorage'];
    function resetKey ($state, $localStorage) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
              resetKey: '@'
            }
        };
        return directive;

        function link(scope, element) {
          element.on('click', function (e) {
              e.preventDefault();

              if(scope.resetKey) {
                delete $localStorage[scope.resetKey];
                $state.go($state.current, {}, {reload: true});
              }
              else {
                $.error('No storage key specified for reset.');
              }
          });
        }
    }

})();

/**=========================================================
 * Module: fullscreen.js
 * Toggle the fullscreen mode on/off
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('toggleFullscreen', toggleFullscreen);

    toggleFullscreen.$inject = ['Browser'];
    function toggleFullscreen (Browser) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          // Not supported under IE
          if( Browser.msie ) {
            element.addClass('hide');
          }
          else {
            element.on('click', function (e) {
                e.preventDefault();

                if (screenfull.enabled) {
                  
                  screenfull.toggle();
                  
                  // Switch icon indicator
                  if(screenfull.isFullscreen)
                    $(this).children('em').removeClass('fa-expand').addClass('fa-compress');
                  else
                    $(this).children('em').removeClass('fa-compress').addClass('fa-expand');

                } else {
                  $.error('Fullscreen not enabled');
                }

            });
          }
        }
    }


})();

/**=========================================================
 * Module: load-css.js
 * Request and load into the current page a css file
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('loadCss', loadCss);

    function loadCss () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          element.on('click', function (e) {
              if(element.is('a')) e.preventDefault();
              var uri = attrs.loadCss,
                  link;

              if(uri) {
                link = createLink(uri);
                if ( !link ) {
                  $.error('Error creating stylesheet link element.');
                }
              }
              else {
                $.error('No stylesheet location defined.');
              }

          });
        }
        
        function createLink(uri) {
          var linkId = 'autoloaded-stylesheet',
              oldLink = $('#'+linkId).attr('id', linkId + '-old');

          $('head').append($('<link/>').attr({
            'id':   linkId,
            'rel':  'stylesheet',
            'href': uri
          }));

          if( oldLink.length ) {
            oldLink.remove();
          }

          return $('#'+linkId);
        }
    }

})();

/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('now', now);

    now.$inject = ['dateFilter', '$interval'];
    function now (dateFilter, $interval) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
          var format = attrs.format;

          function updateTime() {
            var dt = dateFilter(new Date(), format);
            element.text(dt);
          }

          updateTime();
          var intervalPromise = $interval(updateTime, 1000);

          scope.$on('$destroy', function(){
            $interval.cancel(intervalPromise);
          });

        }
    }

})();

/**=========================================================
 * Module: table-checkall.js
 * Tables check all checkbox
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('checkAll', checkAll);

    function checkAll () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          element.on('change', function() {
            var $this = $(this),
                index= $this.index() + 1,
                checkbox = $this.find('input[type="checkbox"]'),
                table = $this.parents('table');
            // Make sure to affect only the correct checkbox column
            table.find('tbody > tr > td:nth-child('+index+') input[type="checkbox"]')
              .prop('checked', checkbox[0].checked);

          });
        }
    }

})();

/**=========================================================
 * Module: trigger-resize.js
 * Triggers a window resize event from any element
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('triggerResize', triggerResize);

    triggerResize.$inject = ['$window', '$timeout'];
    function triggerResize ($window, $timeout) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          element.on('click', function(){
            $timeout(function(){
              // all IE friendly dispatchEvent
              var evt = document.createEvent('UIEvents');
              evt.initUIEvent('resize', true, false, $window, 0);
              $window.dispatchEvent(evt);
              // modern dispatchEvent way
              // $window.dispatchEvent(new Event('resize'));
            });
          });
        }
    }

})();

/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Utils', Utils);

    Utils.$inject = ['$window', 'APP_MEDIAQUERY'];
    function Utils($window, APP_MEDIAQUERY) {

        var $html = angular.element('html'),
            $win  = angular.element($window),
            $body = angular.element('body');

        return {
          // DETECTION
          support: {
            transition: (function() {
                    var transitionEnd = (function() {

                        var element = document.body || document.documentElement,
                            transEndEventNames = {
                                WebkitTransition: 'webkitTransitionEnd',
                                MozTransition: 'transitionend',
                                OTransition: 'oTransitionEnd otransitionend',
                                transition: 'transitionend'
                            }, name;

                        for (name in transEndEventNames) {
                            if (element.style[name] !== undefined) return transEndEventNames[name];
                        }
                    }());

                    return transitionEnd && { end: transitionEnd };
                })(),
            animation: (function() {

                var animationEnd = (function() {

                    var element = document.body || document.documentElement,
                        animEndEventNames = {
                            WebkitAnimation: 'webkitAnimationEnd',
                            MozAnimation: 'animationend',
                            OAnimation: 'oAnimationEnd oanimationend',
                            animation: 'animationend'
                        }, name;

                    for (name in animEndEventNames) {
                        if (element.style[name] !== undefined) return animEndEventNames[name];
                    }
                }());

                return animationEnd && { end: animationEnd };
            })(),
            requestAnimationFrame: window.requestAnimationFrame ||
                                   window.webkitRequestAnimationFrame ||
                                   window.mozRequestAnimationFrame ||
                                   window.msRequestAnimationFrame ||
                                   window.oRequestAnimationFrame ||
                                   function(callback){ window.setTimeout(callback, 1000/60); },
            /*jshint -W069*/
            touch: (
                ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
                (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
                (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
                (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
                false
            ),
            mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
          },
          // UTILITIES
          isInView: function(element, options) {
              /*jshint -W106*/
              var $element = $(element);

              if (!$element.is(':visible')) {
                  return false;
              }

              var window_left = $win.scrollLeft(),
                  window_top  = $win.scrollTop(),
                  offset      = $element.offset(),
                  left        = offset.left,
                  top         = offset.top;

              options = $.extend({topoffset:0, leftoffset:0}, options);

              if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
                  left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
                return true;
              } else {
                return false;
              }
          },
          
          langdirection: $html.attr('dir') === 'rtl' ? 'right' : 'left',

          isTouch: function () {
            return $html.hasClass('touch');
          },

          isSidebarCollapsed: function () {
            return $body.hasClass('aside-collapsed');
          },

          isSidebarToggled: function () {
            return $body.hasClass('aside-toggled');
          },

          isMobile: function () {
            return $win.width() < APP_MEDIAQUERY.tablet;
          }

        };
    }
})();

(function() {
    'use strict';

    angular
        .module('app.translate')
        .config(translateConfig)
        ;
    translateConfig.$inject = ['$translateProvider'];
    function translateConfig($translateProvider){

      $translateProvider.useStaticFilesLoader({
          prefix : 'app/i18n/',
          suffix : '.json'
      });

      $translateProvider.preferredLanguage('en');
      $translateProvider.useLocalStorage();
      $translateProvider.usePostCompiling(true);
      $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

    }
})();
(function() {
    'use strict';

    angular
        .module('app.translate')
        .run(translateRun)
        ;
    translateRun.$inject = ['$rootScope', '$translate'];
    
    function translateRun($rootScope, $translate){

      // Internationalization
      // ----------------------

      $rootScope.language = {
        // Handles language dropdown
        listIsOpen: false,
        // list of available languages
        available: {
          'en':       'English',
          'es_AR':    'Español'
        },
        // display always the current ui language
        init: function () {
          var proposedLanguage = $translate.proposedLanguage() || $translate.use();
          var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
          $rootScope.language.selected = $rootScope.language.available[ (proposedLanguage || preferredLanguage) ];
        },
        set: function (localeId) {
          // Set the new idiom
          $translate.use(localeId);
          // save a reference for the current language
          $rootScope.language.selected = $rootScope.language.available[localeId];
          // finally toggle dropdown
          $rootScope.language.listIsOpen = ! $rootScope.language.listIsOpen;
        }
      };

      $rootScope.language.init();

    }
})();
/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$rootScope', '$scope', '$state', 'SidebarLoader', 'Utils'];
    function SidebarController($rootScope, $scope, $state, SidebarLoader,  Utils) {

        activate();

        ////////////////

        function activate() {
          var collapseList = [];

          // demo: when switch from collapse to hover, close all items
          $rootScope.$watch('app.layout.asideHover', function(oldVal, newVal){
            if ( newVal === false && oldVal === true) {
              closeAllBut(-1);
            }
          });


          // Load menu from json file
          // ----------------------------------- 

          SidebarLoader.getMenu(sidebarReady);
          
          function sidebarReady(items) {
            $scope.menuItems = items;
          }

          // Handle sidebar and collapse items
          // ----------------------------------
          
          $scope.getMenuItemPropClasses = function(item) {
            return (item.heading ? 'nav-heading' : '') +
                   (isActive(item) ? ' active' : '') ;
          };

          $scope.addCollapse = function($index, item) {
            collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
          };

          $scope.isCollapse = function($index) {
            return (collapseList[$index]);
          };

          $scope.toggleCollapse = function($index, isParentItem) {

            // collapsed sidebar doesn't toggle drodopwn
            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) return true;

            // make sure the item index exists
            if( angular.isDefined( collapseList[$index] ) ) {
              if ( ! $scope.lastEventFromChild ) {
                collapseList[$index] = !collapseList[$index];
                closeAllBut($index);
              }
            }
            else if ( isParentItem ) {
              closeAllBut(-1);
            }
            
            $scope.lastEventFromChild = isChild($index);

            return true;
          
          };

          // Controller helpers
          // ----------------------------------- 

            // Check item and children active state
            function isActive(item) {

              if(!item) return;

              if( !item.sref || item.sref === '#') {
                var foundActive = false;
                angular.forEach(item.submenu, function(value) {
                  if(isActive(value)) foundActive = true;
                });
                return foundActive;
              }
              else
                return $state.is(item.sref) || $state.includes(item.sref);
            }

            function closeAllBut(index) {
              index += '';
              for(var i in collapseList) {
                if(index < 0 || index.indexOf(i) < 0)
                  collapseList[i] = true;
              }
            }

            function isChild($index) {
              /*jshint -W018*/
              return (typeof $index === 'string') && !($index.indexOf('-') < 0);
            }
        
        } // activate
    }

})();

/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .directive('sidebar', sidebar);

    sidebar.$inject = ['$rootScope', '$timeout', '$window', 'Utils'];
    function sidebar ($rootScope, $timeout, $window, Utils) {
        var $win = angular.element($window);
        var directive = {
            // bindToController: true,
            // controller: Controller,
            // controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            template: '<nav class="sidebar" ng-transclude></nav>',
            transclude: true,
            replace: true
            // scope: {}
        };
        return directive;

        function link(scope, element, attrs) {

          var currentState = $rootScope.$state.current.name;
          var $sidebar = element;

          var eventName = Utils.isTouch() ? 'click' : 'mouseenter' ;
          var subNav = $();

          $sidebar.on( eventName, '.nav > li', function() {

            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) {

              subNav.trigger('mouseleave');
              subNav = toggleMenuItem( $(this), $sidebar);

              // Used to detect click and touch events outside the sidebar          
              sidebarAddBackdrop();

            }

          });

          scope.$on('closeSidebarMenu', function() {
            removeFloatingNav();
          });

          // Normalize state when resize to mobile
          $win.on('resize', function() {
            if( ! Utils.isMobile() )
          	asideToggleOff();
          });

          // Adjustment on route changes
          $rootScope.$on('$stateChangeStart', function(event, toState) {
            currentState = toState.name;
            // Hide sidebar automatically on mobile
            asideToggleOff();

            $rootScope.$broadcast('closeSidebarMenu');
          });

      	  // Autoclose when click outside the sidebar
          if ( angular.isDefined(attrs.sidebarAnyclickClose) ) {
            
            var wrapper = $('.wrapper');
            var sbclickEvent = 'click.sidebar';
            
            $rootScope.$watch('app.asideToggled', watchExternalClicks);

          }

          //////

          function watchExternalClicks(newVal) {
            // if sidebar becomes visible
            if ( newVal === true ) {
              $timeout(function(){ // render after current digest cycle
                wrapper.on(sbclickEvent, function(e){
                  // if not child of sidebar
                  if( ! $(e.target).parents('.aside').length ) {
                    asideToggleOff();
                  }
                });
              });
            }
            else {
              // dettach event
              wrapper.off(sbclickEvent);
            }
          }

          function asideToggleOff() {
            $rootScope.app.asideToggled = false;
            if(!scope.$$phase) scope.$apply(); // anti-pattern but sometimes necessary
      	  }
        }
        
        ///////

        function sidebarAddBackdrop() {
          var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop'} );
          $backdrop.insertAfter('.aside-inner').on('click mouseenter', function () {
            removeFloatingNav();
          });
        }

        // Open the collapse sidebar submenu items when on touch devices 
        // - desktop only opens on hover
        function toggleTouchItem($element){
          $element
            .siblings('li')
            .removeClass('open')
            .end()
            .toggleClass('open');
        }

        // Handles hover to open items under collapsed menu
        // ----------------------------------- 
        function toggleMenuItem($listItem, $sidebar) {

          removeFloatingNav();

          var ul = $listItem.children('ul');
          
          if( !ul.length ) return $();
          if( $listItem.hasClass('open') ) {
            toggleTouchItem($listItem);
            return $();
          }

          var $aside = $('.aside');
          var $asideInner = $('.aside-inner'); // for top offset calculation
          // float aside uses extra padding on aside
          var mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);
          var subNav = ul.clone().appendTo( $aside );
          
          toggleTouchItem($listItem);

          var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
          var vwHeight = $win.height();

          subNav
            .addClass('nav-floating')
            .css({
              position: $rootScope.app.layout.isFixed ? 'fixed' : 'absolute',
              top:      itemTop,
              bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
            });

          subNav.on('mouseleave', function() {
            toggleTouchItem($listItem);
            subNav.remove();
          });

          return subNav;
        }

        function removeFloatingNav() {
          $('.dropdown-backdrop').remove();
          $('.sidebar-subnav.nav-floating').remove();
          $('.sidebar li.open').removeClass('open');
        }
    }


})();


(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .service('SidebarLoader', SidebarLoader);

    SidebarLoader.$inject = ['$http'];
    function SidebarLoader($http) {
        this.getMenu = getMenu;

        ////////////////

        function getMenu(onReady, onError) {
          var menuJson = 'server/sidebar-menu.json',
              menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
            
          onError = onError || function() { alert('Failure loading menu'); };

          $http
            .get(menuURL)
            .success(onReady)
            .error(onError);
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('UserBlockController', UserBlockController);

    UserBlockController.$inject = ['$rootScope', '$scope'];
    function UserBlockController($rootScope, $scope) {

        activate();

        ////////////////

        function activate() {
          $rootScope.user = {
            name:     'John',
            job:      'ng-developer',
            picture:  'app/img/user/02.jpg'
          };

          // Hides/show user avatar on sidebar
          $rootScope.toggleUserBlock = function(){
            $rootScope.$broadcast('toggleUserBlock');
          };

          $rootScope.userBlockVisible = true;

          var detach = $rootScope.$on('toggleUserBlock', function(/*event, args*/) {

            $rootScope.userBlockVisible = ! $rootScope.userBlockVisible;

          });

          $scope.$on('$destroy', detach);
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('custom', [
            // request the the entire framework
            'angle',
            // or just modules
            'app.core',
            'app.sidebar'
            /*...*/
        ]);
})();

// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('custom')
        .controller('Controller', Controller);

    Controller.$inject = ['$log'];
    function Controller($log) {
        // for controllerAs syntax
        // var vm = this;

        activate();

        ////////////////

        function activate() {
          $log.log('I\'m a line from custom.js');
        }
    }
})();
