	(function(){

		'use strict';

		angular.module('app.canva')
		.factory('imageLayer', ['layerModel','$q', function(layerModel,$q){
			return function (url, x1, y1){
				var self = this;
					this.img = document.createElement('IMG');



				this.writeImage = function(ctx){
					return $q(function(resolve){
						self.img = new Image();
						self.img.crossOrigin = "Anonymous";
						self.img.src = self.layer.cords.url;
						self.img.onload = function(){
							ctx.drawImage(self.img, self.layer.cords.x1 || 0, self.layer.cords.y1 || 0);
							resolve(true);
						}
					});
				}
				//http://static.tvtropes.org/pmwiki/pub/images/logo_autobot.png

				this.layer = new layerModel({
					name:      'Image layer',
					type:      'imageLayer',
					imageSize: function(){ return { width: self.img.width, height: self.img.height };},
					cords:{
						url: url,
						x1:  x1,
						y1:  y1
					}
				},self.writeImage);


				return this.layer;
			};
		}]);
		

	})();	