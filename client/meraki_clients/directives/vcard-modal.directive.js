angular.module('conapps').directive('vcardModal', [
	function(){
		return {
			template: [
				'<div class="ui modal">',
					'<i class="close icon"></i>',
					'<div class="header">',
						'vCard',
					'</div>',
					'<div class="content">',
						'<div class="ui secondary menu">',
							'<div class="item">',
								'<div class="ui primary button" ng-click="clients.downloadVCard()">',
									'<i class="download icon"></i>',
									'Descargar vCard',
								'</div>',
							'</div>',
							'<div class="right item">',
								'<div id="qrcode"></div>',
							'</div>',
						'</div>',
						'<div ng-include src="\'client/meraki_clients/views/clients-form.ng.html\'"></div>',
					'</div>',
				'</div>',
			].join(''),
			controller: 'MerakiClientsCtrl',
			controllerAs: 'clients',
		}
	}
]);