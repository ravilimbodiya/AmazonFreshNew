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
		if(secPosition === '2'){
			$scope.ccSection = true;
			$scope.addSection = false;
			$scope.personalInfoSection = true;
		} else if(secPosition === '3'){
			$scope.ccSection = false;
			$scope.addSection = true;
			$scope.personalInfoSection = true;
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
