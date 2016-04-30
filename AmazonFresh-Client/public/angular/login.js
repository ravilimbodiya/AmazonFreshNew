//loading the 'login' angularJS module
var login = angular.module('amazonFreshApp', []);
//defining the login controller
login.controller('login', function($scope, $http) {
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false
	$scope.invalidEmail = true;
	$scope.invalidPassword = true;
	$scope.invalidCredentials= true;
	$scope.unexpected_error = true;
	$scope.personalInfoSection = false;
	$scope.ccSection = true;
	$scope.addSection = true;
	$scope.notifySection = true;
	
	$scope.message = "";
	
	/*$scope.firstNameRegex = '\\w+.*';
	$scope.lastNameRegex = '\\w+.*';
	$scope.emailRegex = '\\w+.*';
	$scope.ssnRegex = '\\w+.*';
	$scope.firstNameRegex = '\\w+.*';
	$scope.firstNameRegex = '\\w+.*';
	$scope.firstNameRegex = '\\w+.*';*/	
	$scope.getCityState = function(zip) {
		$http({
			method : "GET",
			url : 'http://maps.googleapis.com/maps/api/geocode/json?address='+zip
		
		}).success(function(data) {
			$scope.city = data.results[0].address_components[1].long_name;
			$scope.state = data.results[0].address_components[3].short_name;
		}).error(function(error) {
			$scope.ziperror = true;
		});
	};
	
	$scope.login = function() {
		$http({
			method : "POST",
			url : '/checkLogin',
			data : {
				"email" : $scope.email,
				"password" : $scope.password,
				"userType": $scope.userType
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode === 401) {
				$scope.invalidCredentials= false;
				$scope.errMsg = data.msg;
				
			}
			else {
				//Making a get call to the '/redirectToHomepage' API
				window.location.assign("/homepage"); 
			}
				
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
			$scope.errLogin = data.msg;
			$scope.errUnexp = data.msg;
		});
	};
	
	$scope.showNext = function(secPosition) {
		var allValidFlag = true;
		if(!$scope.form.firstName.$valid){
			$scope.fnerror = true;
			allValidFlag = false;
		} else {
			$scope.fnerror = false;
		}
		if(!$scope.form.firstName.$valid){
			$scope.fnerror = true;
			allValidFlag = false;
		} else {
			$scope.fnerror = false;
		}
		if(!$scope.form.firstName.$valid){
			$scope.fnerror = true;
			allValidFlag = false;
		} else {
			$scope.fnerror = false;
		}
		
		if(secPosition === '2'){
			if(allValidFlag){
				$scope.ccSection = true;
				$scope.addSection = false;
				$scope.personalInfoSection = true;
				$scope.addBtnSection = false;
			}
		} else if(secPosition === '3'){
			if(allValidFlag){
				$scope.ccSection = false;
				$scope.addSection = false;
				$scope.personalInfoSection = true;
				$scope.addBtnSection = true;
			}
		}
		
	};
	
	$scope.register = function() {
		$http({
			method : "POST",
			url : '/register',
			data : {
				"firstName" : $scope.firstName,
				"lastName" : $scope.lastName,
				"email" : $scope.email,
				"password" : $scope.password,
				"ssn": $scope.ssn,
				"userType": $scope.userType,
				"address" : $scope.address,
				"city" : $scope.city,
				"state": $scope.state,
				"zipcode": $scope.zipcode,
				"cardNumber" : $scope.cardNumber,
				"nameOnCard" : $scope.nameOnCard,
				"expiry": $scope.expiry,
				"cvv": $scope.cvv
				
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				$scope.invalid_login = false;
				$scope.unexpected_error = true;
				$scope.errLogin = data.msg;
				$scope.errUnexp = data.msg;
			}
			else{
				//Making a get call to the '/redirectToHomepage' API
				$scope.message = "Congratulations! Your account is created successfully. Please login. ";
				$scope.personalInfoSection = true;
				$scope.ccSection = true;
				$scope.addSection = true;
				$scope.notifySection = false;
			}
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
			$scope.errLogin = data.msg;
			$scope.errUnexp = data.msg;
		});
	};
});
