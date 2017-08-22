	(function(){

		'use strict';

		angular.module('app.canva')
		.factory('canvasModel', ['$q',function($q){
			return function (layerObject, config){
				var self = this;
				this.ctx = null;
				this.layerList = [];
				this.config    = config;
				this.layerObject = layerObject;
				
				if(layerObject){
					this.ctx = layerObject.getContext("2d");
				}

				this.open = function(){
					var data = self.layerObject.toDataURL('image/png');
					console.log(data)
					window.open(data,'proyecto.png');
				}

				this.writeLine = function(x1, x2, y1, y2){
					self.ctx.moveTo(x1 || 0, y1 || 0);
					self.ctx.lineTo(x2 || 0, y2 || 0);
					self.ctx.stroke();
				}

				this.addLayer = function(layer){
					layer['_id'] = self.layerList.length;
					self.layerList.push(layer);
				}

				this.clearLayers = function(){
					self.layerList = [];
				}

				this.drawLayers = function(){
					self.ctx.clearRect(0,0,self.config.width,self.config.height);
					self.ctx.beginPath();
					self.drawLayer(0);
				}

				this.drawLayer =function( i ){
					return $q(function(resolve){
						if(self.layerList[i]){
							self.layerList[i]._setCtx(self.ctx);
							self.layerList[i]._draw()
							.then(function(){
								self.drawLayer(i + 1)
								.then(
									function(){
										resolve(true);
									}
								)
							});
						}else{
							resolve(true);
						}
					});
				}

				this.update = function(i, nmap){
					self.layerList = self.layerList.map(function(it, index){
						if(i != undefined && nmap != undefined)
							if(i == index)
								return nmap(it, index);
							else
								return it;
						else
							return it;
					});
					self.drawLayers();
				}

				this.pop = function(layer){
					self.layerList = self.layerList.filter(function(it){ return it['_id'] != layer['_id'];});
					self.drawLayers();
					self.scheme.layers = self.layerList;
				}



				this.scheme =  {
					layers:     self.layerList,
					open:       self.open,
					push:       self.addLayer,
					getConfig:  function(){ return self.config;},
					clear:      self.clearLayers,
					draw:       self.drawLayers,
					update:     self.update,
					pop:        self.pop
				}
				return this.scheme;
			};
		}]);
		

	})();