	(function(){

		'use strict';

		angular.module('app.canva')
		.factory('layerModel', ['$q',function($q){
			return function (params, write){
				var self = this;
					this.ctx = null;

				this.setContext = function(ctx){
					self.ctx = ctx;
				};

				this.actionWrite = write || function(){};

				this.write = function(){
					return $q(function(resolve, reject){
						if(self.ctx != null && self.ctx != undefined)
							self.actionWrite(self.ctx)
							.then(function(){
								resolve(true);
							});
					})
				}

				this.scheme            = params || {};
				this.scheme['type']    = !this.scheme['type']?'layer':this.scheme['type'];
				this.scheme['_setCtx'] = this.setContext;
				this.scheme['_draw']   = this.write;


				return this.scheme;
			};
		}]);
		

	})();