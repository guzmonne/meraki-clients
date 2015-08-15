angular.module('conapps').controller('MerakiClientsCtrl', ['$scope', '$stateParams', '$state', '$meteor', 
	function($scope, $stateParams, $state, $meteor){
		// Store 'this' into a new variable to simplify the code
		var self        = this;
		// Hardcode the title here for testing purposes
		self.title      = "Meraki Clients"
		// Initialize the 'clients' list to show a loading screen while 
		// the clients are being loaded.
		self.list       = null;
		// Object to store the sorting object for the clients list collection
		self.sort  = {};
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
		// Subscription to the clients list inside an autorun
		$meteor.autorun($scope, function(){
			$meteor.subscribe('clients-list', {
				sort: $scope.getReactively('clients.sort')
			}).then(function($handle){
				// When the subscribe call is run we modify this variable to get rid
				// of the spinner and show the clients. 
				// We have to use the 'getReactively' method to react to changes on 
				// the sort variable.
				$scope.$watch('clients.sort', function(){
					setClientsList();
				}, true);
			});
		});

		function setClientsList(){
			self.list = $meteor.collection(function(){
				return Clients.find({}, {sort: $scope.getReactively('clients.sort')});
			});
		}

/*
		$meteor.autorun($scope, function(){
		});
*/
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

		self.all      = false;
		self.selected = [];
		self.select   = select;

		self.cleanForm = cleanForm

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
		/*
		 * PRIVATE METHODS
		 */
		/**
		 * Returns a default client object
		 * @return {Object} Default client object
		 */
		function defaults(){
			return {
				// Testing Purposes
				name     : 'Guzman',
				lastName : 'Monne',
				company  : 'CONATEL',
				position : 'Consultor',
				// ----------------
				phones    : [],
				emails    : [],
				addresses : [],
			}
		}
		/**
		 * Sets the activeTab name to activate the appropiate tab.
		 * Sets the activeClient to a default one [TODO]
		 * @param  {[type]} tabName [description]
		 * @return {[type]}         [description]
		 */
		function activateTab(tabName){
			if(!tabName && !angular.isString(tabName)) return;
			self.activeTab    = tabName;
			self.activeClient = defaults();
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
		 * Cleans the form to allow the creation of a new client
		 * @return {Void} 
		 */
		function cleanForm(){
			self.activeClient = defaults();
		}
		/**
		 * Add function call to simplify the code.
		 * @param {Array} target  Array to push the new element.
		 * @param {Any} element Any element to push into the target array
		 */
		function add(target, element){
			if (!element) return;
			if (!angular.isArray(target)) target = [];
			target.push(element);
		}
		/**
		 * Remove function call to simplify the code
		 * @param  {Array} target Array from where to remove the indexed element
		 * @param  {Integer} index  Index of the to-be removed element
		 * @return {Void}
		 */
		function remove(target, index){
			if (!angular.isArray(target) || !angular.isNumber(index)) return;
			target.splice(index, 1);
		}
		/**
		 * Function call to add a new 'phone' to the 'phones' array
		 */
		function addPhone(){
			if (self.newPhone === '') return
			add(self.activeClient.phones, self.newPhone);
			self.newPhone = '';
		}
		/**
		 * Function call to add a new 'email' to the 'emails' array
		 */
		function addEmail(){
			if (self.newEmail === '') return;
			add(self.activeClient.emails, self.newEmail);
			self.newEmail = '';
		}
		/**
		 * Function call to add a new 'address' to the 'addresses' array
		 */
		function addAddress(){
			if (self.newAddress.street === '') return;
			add(self.activeClient.addresses, {
				street: self.newAddress.street,
				city  : self.newAddress.city,
				dep   : self.newAddress.dep
			});
			self.newAddress = defaultAddress();
			angular.element('[name=street]').trigger('focus');
			console.log(self.activeClient);
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
			console.log(client);
			self.list.push(self.activeClient);
			self.activeClient = defaults();
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
			console.log(self.clientContext.validateOne(_.compactCloneObject(self.activeClient), key));
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
			console.log(self.sort);
		}
	}
]);