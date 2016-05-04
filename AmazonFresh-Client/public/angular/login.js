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
	
	//Validation
	$scope.firstNameRegex = '\\w+.*';
	$scope.lastNameRegex = '\\w+.*';
	$scope.emailRegex = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';
	$scope.ssnRegex = '[0-9]{3}-[0-9]{2}-[0-9]{4}$';
	$scope.nameOnCardRegex = '\\w+.*';
	$scope.ccnoRegex = '[0-9]{16}$';
	$scope.cvvRegex = '[0-9]{3}$';
	$scope.zipcodeRegex = '[0-9]{5}$';
	
	$scope.getCityState = function(zip) {
		if(!$scope.form.zipcode.$valid){
			$scope.ziperror = true;
		} else {
			$scope.ziperror = false;
			$http({
				method : "GET",
				url : 'http://maps.googleapis.com/maps/api/geocode/json?address='+zip
			
			}).success(function(data) {
				$scope.city = data.results[0].address_components[1].long_name;
				$scope.state = data.results[0].address_components[3].short_name;
			}).error(function(error) {
				$scope.ziperror = true;
			});
		}
		
	};
	
	$scope.login = function(userType) {
		var allValidFlag = true;
		
		if(!$scope.form.email.$valid || $scope.email === undefined || $scope.email === ""){
			$scope.emailerror = true;
			allValidFlag = false;
		} else {
			$scope.emailerror = false;
		}
		
		if($scope.password === undefined || $scope.password === ""){
			$scope.pwderror = true;
			allValidFlag = false;
		} else {
			$scope.pwderror = false;
		}
		
		if(userType === undefined || userType === ""){
			$scope.uterror = true;
			allValidFlag = false;
		} else {
			$scope.uterror = false;
		}
		if(allValidFlag){
			$http({
				method : "POST",
				url : '/checkLogin',
				data : {
					"email" : $scope.email,
					"password" : $scope.password,
					"userType": userType
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
		}
	};
	
	$scope.showNext = function(secPosition) {
		
		if(secPosition === '2'){
			
				$scope.ccSection = true;
				$scope.addSection = false;
				$scope.personalInfoSection = true;
				$scope.addBtnSection = false;
		} else if(secPosition === '3'){
				$scope.ccSection = false;
				$scope.addSection = false;
				$scope.personalInfoSection = true;
				$scope.addBtnSection = true;
		}
		
	};
	
	$scope.register = function() {
		var allValidFlag = true;
		if(!$scope.form.firstName.$valid || $scope.firstName === undefined || $scope.firstName === ""){
			$scope.fnerror = true;
			allValidFlag = false;
		} else {
			$scope.fnerror = false;
		}
		
		if(!$scope.form.lastName.$valid || $scope.lastName === undefined || $scope.lastName === ""){
			$scope.lnerror = true;
			allValidFlag = false;
		} else {
			$scope.lnerror = false;
		}
		
		if(!$scope.form.email.$valid || $scope.email === undefined || $scope.email === ""){
			$scope.emailerror = true;
			allValidFlag = false;
		} else {
			$scope.emailerror = false;
		}
		
		if($scope.password === undefined || $scope.password === ""){
			$scope.pwderror = true;
			allValidFlag = false;
		} else {
			$scope.pwderror = false;
		}
		
		if($scope.password !== $scope.cpassword || $scope.cpassword === undefined || $scope.cpassword === ""){
			$scope.cnfpasserror = true;
			allValidFlag = false;
		} else {
			$scope.cnfpasserror = false;
		}
		
		if(!$scope.form.ssn.$valid || $scope.ssn === undefined || $scope.ssn === ""){
			$scope.ssnerror = true;
			allValidFlag = false;
		} else {
			$scope.ssnerror = false;
		}
		
		if($scope.userType === undefined || $scope.userType === ""){
			$scope.uterror = true;
			allValidFlag = false;
		} else {
			$scope.uterror = false;
		}
		
		if($scope.address === undefined || $scope.address === ""){
			$scope.adderror = true;
			allValidFlag = false;
		} else {
			$scope.adderror = false;
		}
		
		if($scope.city === undefined || $scope.city === ""){
			$scope.cityerror = true;
			allValidFlag = false;
		} else {
			$scope.cityerror = false;
		}
		
		if($scope.state === undefined || $scope.state === ""){
			$scope.stateerror = true;
			allValidFlag = false;
		} else {
			$scope.stateerror = false;
		}
		
		if(!$scope.form.zipcode.$valid || $scope.zipcode === undefined || $scope.zipcode === ""){
			$scope.ziperror = true;
			allValidFlag = false;
		} else {
			$scope.ziperror = false;
		}
		
		if(!$scope.form.cardNumber.$valid || $scope.cardNumber === undefined || $scope.cardNumber === ""){
			$scope.ccnoerror = true;
			allValidFlag = false;
		} else {
			$scope.ccnoerror = false;
		}
		
		if(!$scope.form.nameOnCard.$valid || $scope.nameOnCard === undefined || $scope.nameOnCard === ""){
			$scope.nocerror = true;
			allValidFlag = false;
		} else {
			$scope.nocerror = false;
		}
		
		if(!$scope.form.cvv.$valid || $scope.cvv === undefined || $scope.cvv === ""){
			$scope.cvverror = true;
			allValidFlag = false;
		} else {
			$scope.cvverror = false;
		}
		
		if(allValidFlag){
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
				else if (data.statusCode == 402) {
					$scope.message = data.msg;
					$scope.personalInfoSection1 = true;
					$scope.personalInfoSection = true;
					$scope.ccSection = true;
					$scope.addSection = true;
					$scope.notifySection = false;
				} 
				else {
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
		}
	};
});
