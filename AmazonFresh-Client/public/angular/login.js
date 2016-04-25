//loading the 'login' angularJS module
var login = angular.module('amazonFreshApp', []);
//defining the login controller
login.controller('login', function($scope, $http) {
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false
	$scope.invalid_login = true;
	$scope.unexpected_error = true;
	$scope.personalInfoSection = false;
	$scope.ccSection = true;
	
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
			if (data.statusCode == 401) {
				$scope.invalid_login = false;
				$scope.unexpected_error = true;
				$scope.errLogin = data.msg;
				$scope.errUnexp = data.msg;
			}
			else
				//Making a get call to the '/redirectToHomepage' API
				window.location.assign("/homepage"); 
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
			$scope.errLogin = data.msg;
			$scope.errUnexp = data.msg;
		});
	};
	
	$scope.showNext = function() {
		$scope.ccSection = false;
		$scope.personalInfoSection = true;
	};
});
