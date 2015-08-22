angular.module('conapps').controller('MerakiClientsCtrl', 
	['$scope', '$state', '$meteor', 'TitleService', 
	function($scope, $state, $meteor, title){
		// Store 'this' into a new variable to simplify the code
		var self     = this;
		var editing  = false;
		// Readonly variable
		self.readOnly = false;
		// Hardcode the title here for testing purposes
		self.title      = "Meraki Clients"
		// Sets the title of the app on the header
		title.set(self.title);
		// Initialize the 'clients' list to show a loading screen while 
		// the clients are being loaded.
		self.list       = null;
		// Object to store the sorting object for the clients list collection
		self.sort       = {};
		// String to store the 'searchString' with which to fiter the clients list
		// There is also a private variable that will take the value of this one
		// every 500ms to avoid repeated calls to the db.
		self.searchString  = '';
		self._searchString = '';
		// Variable that shows or hides the selection boxes of the clients.
		self.multipleSelection;
		// Variable that stores the current active tab.
		// This is only updated once, when the template is first shown.
		// We must manage the changes to this variable manually to make
		// sure the appropiate active tab is represented on the UX.
		self.activeTab  = $state.current.data.activeTab;
		// TODO
		// If we are creating a new client, we want to start with an empty one.
		self.newClient  = defaults();
		// Helper scope variables to hold some input information
		self.newEmail   = '';
		self.newPhone   = '';
		self.newAddress = defaultAddress();
		// Instantiation of a ClientSchema context to validate the to-be saved
		// objects, to avoid schema problems. 
		self.clientContext = Schemas.ClientSchema.newContext();
		// Subscription to the clients list inside an autorun to be able to react 
		// to changes in the collection reactively
		$meteor.autorun($scope, function(){
			$meteor.subscribe('clients-list', {
				sort: $scope.getReactively('clients.sort')
			}, $scope.getReactively('clients._searchString'))
				.then(function($handle){
					// When the subscribe call is run we modify this variable to get rid
					// of the spinner and show the clients. 
					// We have to use the 'getReactively' method to react to changes on 
					// the sort variable.
					$scope.$watch('clients.sort', function(){
						self.list = $meteor.collection(function(){
							return Clients.find({}, {sort: $scope.getReactively('clients.sort')});
						});
					}, true);
					// If we are on the edit tab, we setup the appropiate client. Because we 
					// are instantiating the controller on an 'abstract' ui-state the 
					// $stateParams object does not provides us with the correct ID, even
					// though it is on the URL. That is how ui-route works and ther is 
					// nothing we can do. So, we have to use this hack.
					if (self.activeTab === 'edit'){
						var id = $state.$current.locals.globals.$stateParams.id;
						setUpActiveClient(id);
					}
				}
			);
		});
		// This is necessary for the first render of the template.
		// This was a first attempt to change the activeClient object, depending
		// on the selected tab. If we are on the 'new' form, activeClient should
		// be a default client. If not, it should be the to-be editted one.
		if (self.activeTab === 'new') {
			self.activeClient = self.newClient;
		}
		/*
		 * Public Methods
		 */
		self.activateTab = activateTab;

		self.all                = false;
		self.selected           = [];
		self.select             = select;
		self.selectSingleClient = selectSingleClient;
		self.isSelectedClass    = isSelectedClass;

		self.cleanForm = cleanForm

		self.throttledSearchString = _.throttle(throttledSearchString, 100);

		self.addPhone   = addPhone;
		self.addEmail   = addEmail;
		self.addAddress = addAddress;

		self.removePhone   = removePhone;
		self.removeEmail   = removeEmail;
		self.removeAddress = removeAddress;

		self.fieldHasError = fieldHasError;
		self.validateKey   = validateKey;

		self.sortBy = sortBy;
		self.desBy  = desBy;
		self.ascBy  = ascBy;

		self.save   = save;
		self.remove = removeClients;

		self.openModal     = openModal;
		self.downloadVCard = downloadVCard;
		/*
		 * WATCHERS
		 */
		/**
		 * Every time the multipleSelection is toggled we will restart
		 * the 'selected' array.
		 * @return {Void}  
		 */
		$scope.$watch('clients.multipleSelection', function(){
			self.selected = [];
		});
		/*
		 * PRIVATE METHODS
		 */
		/**
		 * Returns a default client object
		 * @return {Object} Default client object
		 */
		function defaults(){
			return {
				/* Testing Purposes
				name     : 'Guzman',
				lastName : 'Monne',
				company  : 'CONATEL',
				position : 'Consultor',
				---------------- */
				phones    : [],
				emails    : [],
				addresses : [],
			}
		}
		/**
		 * Sets the activeTab name to activate the appropiate tab.
		 * Sets the activeClient to a default one [TODO]
		 * @param  {String} tabName We must set up different things depending on the 
		 * tab param
		 * @return {Void}
		 */
		function activateTab(tabName){
			if(!tabName && !angular.isString(tabName)) return;
			self.readOnly  = false;
			self.activeTab = tabName;
			if (self.activeTab === 'new'){
				editing = false;
				self.activeClient = defaults();
				return;
			}
			if (self.activeTab === 'edit'){
				editing = true;
				self.activeClient = $scope.$meteorObject(Clients, self.selected[0], false);
				return;
			}
			// TODO
			// This hides a bug that appears when someone selects a clients, goes to a 
			// new a tab and then returns to the list. On return the checkbox loses its
			// checkmark. So now when you move to another tab we reset the selected 
			// array.
			if (self.activeTab === 'list')
				self.multipleSelection = false;
		}
		/**
		 * Pushes or removes an ID from a 'selected' array
		 * @param  {Mongo._id} id Client _id
		 * @return {Void}    
		 */
		function select(id){
			var index;
			if ( ( index = self.selected.indexOf(id) ) > -1)
				self.selected.splice(index, 1);
			else
				self.selected.push(id);
		}
		/**
		 * Removes all the selected clients from the collection.
		 * It takes the stored '_ids' from the selected clients
		 * and removes them from the list.
		 * @return {Void}
		 */
		function removeClients(){
			if (self.selected.length === 0) return;
			self.list.remove(self.selected);
			self.selected = [];
 		}
 		/**
 		 * Returns a default address object
 		 * @return {[type]} [description]
 		 */
		function defaultAddress(){
			return { street: '', city: '', dep: '' };
		}
		/**
		 * Cleans the form to allow the creation of a new client.
		 * If we are creating a new one, we instantiate a default client object.
		 * If we are editing a new one, we select the appropiate client from the 
		 * Clients collection.
		 * @return {Void} 
		 */
		function cleanForm(e){
			e.preventDefault();
			if (editing === false)
				self.activeClient = defaults();
			if (editing === true)
				self.activeClient.reset();
			if (self.readOnly)
				makeCode();
			self.newPhone   = '';
			self.newEmail   = '';
			self.newAddress = defaultAddress();
			self.form.$setPristine();
		}
		/**
		 * Add function call to simplify the code.
		 * @param {Array} target  Array to push the new element.
		 * @param {Any} element Any element to push into the target array
		 */
		function add(object, target, element){
			if (!object || !target || !element) return;
			if (!angular.isArray(object[target])) object[target] = [];
			object[target].push(element);
		}
		/**
		 * Remove function call to simplify the code
		 * We must put $dirty to 'true' to let the form know we have modified it. 
		 * @param  {Array} target Array from where to remove the indexed element
		 * @param  {Integer} index  Index of the to-be removed element
		 * @return {Void}
		 */
		function remove(target, index){
			if (!angular.isArray(target) || !angular.isNumber(index)) return;
			if (self.readOnly)
				makeCode();
			self.form.$dirty    = true;
			self.form.$pristine = false;
			target.splice(index, 1);
		}
		/**
		 * Function call to add a new 'phone' to the 'phones' array
		 */
		function addPhone(){
			if (self.newPhone === '') return
			add(self.activeClient, 'phones', self.newPhone);
			self.newPhone = '';
		}
		/**
		 * Function call to add a new 'email' to the 'emails' array
		 */
		function addEmail(){
			if (self.newEmail === '') return;
			add(self.activeClient, 'emails', self.newEmail);
			self.newEmail = '';
		}
		/**
		 * Function call to add a new 'address' to the 'addresses' array
		 */
		function addAddress(){
			if (self.newAddress.street === '') return;
			add(self.activeClient, 'addresses', {
				street: self.newAddress.street,
				city  : self.newAddress.city,
				dep   : self.newAddress.dep
			});
			self.newAddress = defaultAddress();
			angular.element('[name=street]').trigger('focus');
		}
		/**
		 * Function call to remove a 'phone' from the phones array
		 * @param  {Integer} index Index reference of the to-be removed phone
		 * @return {Void}       
		 */
		function removePhone(index){
			remove(self.activeClient.phones, index);
		}
		/**
		 * Same as removePhone() but with the emails array.
		 * @param  {Integer} index Index reference of the to-be removed email
		 * @return {Void}       
		 */
		function removeEmail(index){
			remove(self.activeClient.emails, index);
		}
		/**
		 * Same as removePhone() but with the addresses array.
		 * @param  {Integer} index Index reference of the to-be removed address
		 * @return {Void}       
		 */
		function removeAddress(index){
			remove(self.activeClient.addresses, index);
		}
		/**
		 * Calls the appropiate method depending on wether it has to create a new.
		 * client, or if it only has to update it.
		 * @return {Void} 
		 */
		function save(){
			// Check that no unsaved inputs are left behind
			registerInputs();
			if (self.activeClient._id) {
				update();
			} else {
				create();
			}
		}
		/**
		 * Creates a new client if the activeClient object is valid
		 * @return {[type]} [description]
		 */
		function create(){
			var client = _.compactCloneObject(self.activeClient);
			if ( !self.clientContext.validate(client) )
				return handleErrors();
			else
				noErrors();
			self.list.push(self.activeClient);
			self.activeClient = defaults();
			toastr['success']("Se ha creado el cliente con exito.");
		}
		/**
		 * Updates the activeClient object on the server.
		 * To check for errors we get the client raw data and we eliminate the 
		 * dates and the _id which are not recognize by the ClientSchema validate
		 * method.
		 * @return {[type]} [description]
		 */
		function update(){
			var client = _.omit(
				_.compactCloneObject(self.activeClient.getRawObject()),
				'_id',
				'createdAt',
				'updatedAt'
			);
			if (!self.clientContext.validate(client)){
				return handleErrors();
			}
			else
				noErrors();
			self.activeClient.save()
				.then(function(result){
					toastr['success']("Se ha actualizado el cliente con exito.");
				})
				.catch(function(err){
					toastr['error']("Se ha producido un error al intentar actualizar el cliente.");
					console.log(err);
				});
		}
		/**
		 * Checks that no unsaved inputs are left behind
		 * @return {[type]} [description]
		 */
		function registerInputs(){
			addPhone();
			addEmail();
			addAddress();
		}
		/**
		 * Returns the errors array to an empty one
		 * @return {Void} 
		 */
		function noErrors(){
			self.errors = [];
		}
		/**
		 * Runs a validation for a single key against the ClientsSchema context.
		 * @param  {String} key The name of the field to be tested
		 * @return {Void} 
		 */
		function validateKey(key){
			self.clientContext.validateOne(_.compactCloneObject(self.activeClient), key);
		}
		/**
		 * If any errors where found, create an object that has its error messages.
		 * The errors are stored in the 'errors' variable.
		 * @return {Void} 
		 */
		function handleErrors(){
			self.errors = _.map(self.clientContext.invalidKeys(), function(o){
				return _.extend({ msg: self.clientContext.keyErrorMessage(o.name) }, o);
			});
			toastr['error']("Se han encontrado errores en el formulario.");
		}
		/**
		 * Checks if the checked field has any errors related to it.
		 * Used to change the UI to represent that an error was found.
		 * The changes on the UI will not be updated until the form is
		 * re-submitted.
		 * @param  {[type]} field [description]
		 * @return {[type]}       [description]
		 */
		function fieldHasError(field){
			if (!self.errors || !angular.isArray(self.errors)) return false;
			return !!_.find(self.errors, function(error){ return error.name === field; });
		}
		/**
		 * Checks to see if the collection is sorted ascendingly by this field
		 * @param  {String} field Name of the field to test
		 * @return {Boolean}       
		 */
		function ascBy(field){
			if (!angular.isString(field)) return;
			return self.sort.hasOwnProperty(field) && (self.sort[field] === 1) 
		}
		/**
		 * Checks to see if the collection is sorted descendingly by this field
		 * @param  {String} field Name of the field to test
		 * @return {Boolean}       
		 */
		function desBy(field){
			if (!angular.isString(field)) return;
			return self.sort.hasOwnProperty(field) && (self.sort[field] === -1) 
		}
		/**
		 * Function that updates the sort object to trigger the sorting of the
		 * clients list. For now we'll only sort by one column, and the direction
		 * will change depending on the times the function is called.
		 * @param  {String} field Field to sort by
		 * @return {[type]}       [description]
		 */
		function sortBy(field){
			if (self.sort.hasOwnProperty(field)) {
				if (self.sort[field] === 1) 
					self.sort[field] = -1;
				else if (self.sort[field] === -1)
					delete self.sort[field];
			} else {
				self.sort        = {};
				self.sort[field] = 1;
			}
		}
		/**
		 * Function to add only one client to the 'selected' array. Multiple
		 * calls with the same clients will toggle the inclusion of it on 
		 * the array.
		 * We return nothing if 'multipleSelection' is true
		 * @param  {Client} client The selected client
		 * @return {Void}
		 */
		function selectSingleClient(client){
			if (self.multipleSelection) return;
			var currentClientId = self.selected[0];
			if (!client || !client._id) return;
			if (currentClientId && client._id === currentClientId) {
				self.selected = [];
				return; 
			}
			self.selected = [client._id];
			return;
		}
		/**
		 * ---
		 * TODO
		 * Fix this, it's messy. I had to do it this way because I wanted to call
		 * a function inside the ngClass directive and I couldn't find a way to
		 * do it. 
		 * ---
		 * Function that checks to see if the passed client, referenced by its
		 * '_id' is currently selected. Which would mean that the client is the
		 * only element on the 'selected' array.
		 * We return nothing if 'multipleSelection' is true
		 * @param  {Mongo._id}  clientId ID of the client
		 * @return {String}          Returns the class to be added to the row
		 */
		function isSelectedClass(clientId){
			if (self.multipleSelection) return "";
			var currentClientId = self.selected[0];
			if (currentClientId && currentClientId === clientId ){
				return "selected";
			}
			return "";
		};
		/**
		 * Funtction that setups the correct client on the 'activeClient' object.
		 * @param {Mongo.Id} id ID of the to-be edited client
		 */
		function setUpActiveClient(id){
			self.activeClient = $scope.$meteorObject(Clients, id, false);
			self.selected     = [self.activeClient._id];
		}
		/**
		 * Function to update the _serachString with the value of searchString.
		 * The reason of not using it ngModel directly is to be able to throttle
		 * the functtion call to avoid filtering the collection so much.
		 * @return {Void}
		 */
		function throttledSearchString(){
			self.selected      = [];
			self._searchString = self.searchString;
		}
		function openModal(){
			var clientId      = self.selected[0];
			editing           = true;
			self.readOnly     = true;
			self.activeClient = $meteor.object(Clients, clientId, false);
			$('.ui.modal')
				.modal({
					onVisible: function(){
						makeCode();
					}
				})
				.modal('show');
		}
		function downloadVCard(){
			var blob = new Blob([vCard(self.activeClient)], { type: 'text/vcard' });
			saveAs(blob, self.activeClient.name + ' ' + self.activeClient.lastName + '.vcf');
		}
		function makeCode(){
			if (self.qrcode)
				self.qrcode.clear();
			else
				self.qrcode = new QRcode('qrcode', {width: 300, height: 300});
			self.qrcode.makeCode(vCard(self.activeClient));
			console.log(self.qrcode);
		}
	}
]);