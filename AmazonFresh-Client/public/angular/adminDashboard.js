
var app = angular.module('adminApp', ['ngRoute', 'infinite-scroll']);
app.controller('adminMainController', function($scope, $http, $rootScope){	
$rootScope.test = 1000;


////////*********** farmer tab functionalities start  ************//////////////
    $scope.f1 =[]  // farmer list
    $scope.f2 =[]  // approval lits
    $scope.f3 =[]  // search list
    $scope.fc="farmerID"; // search dropdown
    var f1_startPosition = 0;    
    var f2_startPosition = 0;
    var f3_startPosition = 0;
    $scope.f1_stopLoading = false;
    $scope.f2_stopLoading = false;
    $scope.f3_stopLoading = false;

    $scope.adminLoginSubmit = function() {
		$http({
			method : "POST",
			url : '/adminLogin',
			data : {
				"email" : $scope.email,
				"password" : $scope.password,
				"adminKey": $scope.adminKey
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode === 401) {
				$scope.invalidCredentials= false;
				$scope.errMsg = data.msg;
				
			}
			else {
				//Making a get call to the '/redirectToHomepage' API
				window.location.assign("/adminDashboard"); 
			}
				
		}).error(function(error) {
			
		});
	};
	
	
    $scope.getFarmerList = function () {
        $scope.f1 = [];
    	f1_startPosition = 0;
    	$http({
            method: "GET",
            url: '/adminGetFarmerList',
            params: {
                startPosition: 0
            }
        }).success(function (response) {
            if (response.Status == 200) {
                $scope.f1 = response.farmerList;
          		$scope.f1_count = response.count;
          		f1_startPosition = $scope.f1.length;
            }
            else {
                $scope.f1 = [];
            }
        });
    };

    $scope.loadMoreF1 = function (){
        console.log("F1 startPosition::::::::" + f1_startPosition);
        if (f1_startPosition > 0  ){    
        $http({
            method: "GET",
            url: '/adminGetFarmerList',
            params: {
                "startPosition": f1_startPosition
            }
        }).success(function (response) {
            console.log("received count"+response.count);
            if(response.count === undefined || response.count === 0 || response.count === null){
                f1_startPosition = 0;
                $scope.f1_stopLoading = true;
            }
            else{
                if ($scope.f1_stopLoading === false){
                    for (i = 0; i < response.count; i++) {
                        $scope.f1.push(response.farmerList[i]);
                    }
                }
            f1_startPosition = f1_startPosition + response.count;
            $scope.f1_count =  $scope.f1_count  + response.count;
            }

        }).error(function (err) {
            $scope.f1 = [];
            f1_startPosition = 0;
            $scope.f1_stopLoading = true;
        });
    }
    }// end loadMoreF1 


    //getFarmerApprovalPendingList
    $scope.getFarmerApprovalPendingList = function () {
        $scope.f2 = [];
    	f2_startPosition = 0;
    	$http({
            method: "GET",
            url: '/adminGetFarmerApprovalPendingList',
            params: {
                startPosition: 0
            }
        }).success(function (response) {
            if (response.Status == 200) {
                $scope.f2 = response.farmerList;
          		$scope.f2_count = response.count;
                f2_startPosition = $scope.f2.length;
            }
            else {
                $scope.f2 = [];
            }
        });
    };

    $scope.loadMoreF2 = function () {
        console.log("F2 startPosition:" + f2_startPosition);
        if (f2_startPosition > 0 ){	
        $http({
            method: "GET",
            url: '/adminGetFarmerApprovalPendingList',
            params: {
                "startPosition": f2_startPosition
            }
        }).success(function (response) {
            console.log("received count"+response.count);
            if(response.count === undefined || response.count === 0 || response.count === null){
                f2_startPosition = 0;
                $scope.f2_stopLoading = true;
            }
            else{
            	
            		for (i = 0; i < response.count; i++) {
                		$scope.f2.push(response.farmerList[i]);
            		}
                    f2_startPosition = f2_startPosition + response.count;
                    $scope.f2_count =  $scope.f2_count  + response.count;
            	
            }
        }).error(function (err) {
            $scope.f2 = [];
            f2_startPosition = 0;
            $scope.f2_stopLoading = true;
        });
    }
    };
	
	$scope.approveFarmer = function (f) {
        alert(f.far_id);
        $http({
            method: "GET",
            url: '/adminApproveFarmer',
            params: {
             "farmer": f.far_id
            }
        }).success(function (response) {
            //alert(JSON.stringify(response));
            if (response.Status == 202) {
                alert(response.Message);
                f.approve =true;
            }
            else {
                alert("Error: Unable to add farmer to the system.");
            }
        });
    };
    $scope.disApproveFarmer = function (f) {
        alert(f.far_id);
        $http({
            method: "GET",
            url: '/adminDisapproveFarmer',
            params: {
             "farmer": f.far_id
            }
        }).success(function (response) {
            //alert(JSON.stringify(response));
            if (response.Status == 202) {
                alert(response.Message);
                f.dispprove =true;
            }
            else {
                alert("Error");
            }
        });
    };

	$scope.searchFarmer = function () {
        alert($scope.fc + ":" +$scope.fq);
        $scope.f3 = [];
    	f3_startPosition = 0;
        $scope.fq = $scope.fq.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
        alert("Search Term: " +$scope.fq);
    	$http({
            method: "GET",
            url: '/adminGetFarmerSearchList',
            params: {
                startPosition: f3_startPosition,
                criteria: $scope.fc,
                q: $scope.fq
            }
        }).success(function (response) {
            if (response.Status == 200) {
                $scope.f3 = response.farmerList;
          		$scope.f3_count = response.count;
            }
            else if (response.Status == 400)
                alert(response.Message);
            else {
                $scope.f3 = [];
            }
            f3_startPosition = $scope.f3.length;
            console.log("showFarmerList startPosition:" + f3_startPosition);
        });
    };

    $scope.loadMoreF3 = function () {
        console.log("F3 startPosition:" + f3_startPosition);
        if (f3_startPosition > 0 ){	
        $http({
            method: "GET",
            url: '/adminGetFarmerSearchList',
            params: {
                startPosition: f3_startPosition,
                criteria: $scope.fc,
                q: $scope.fq
            }
        }).success(function (response) {
            console.log("received count"+response.count);
            if(response.count === undefined || response.count === 0 || response.count === null){
                f3_startPosition = 0;
                $scope.f3_stopLoading = true;
            }
            else{           	
            	for (i = 0; i < response.count; i++) {
                	$scope.f3.push(response.farmerList[i]);
            	}
            f3_startPosition = f3_startPosition + response.count;
            $scope.f3_count =  $scope.f3_count  + response.count;
        	}
        }).error(function (err) {
            $scope.f3 = [];
            f3_startPosition = 0;
            $scope.f3_stopLoading = true;
        });
    }
    };

////////*********** farmer tab functionalities end  ************//////////////

////////*********** Customer tab functionalities start  ************//////////////
    $scope.c1 =[]  // customer list
    $scope.c2 =[]  // customer approval lits
    $scope.c3 =[]  // customer search list
    $scope.cc="customer_id"; // search customer criteria dropdown
    var c1_startPosition = 0;    
    var c2_startPosition = 0;
    var c3_startPosition = 0;
    $scope.c1_stopLoading = false;
    $scope.c2_stopLoading = false;
    $scope.c3_stopLoading = false;

    $scope.getCustomerList = function () {
        $scope.c1 = [];
        c1_startPosition = 0;
        $http({
            method: "GET",
            url: '/adminGetCustomerList',
            params: {
                startPosition: 0
            }
        }).success(function (response) {
            if (response.Status == 200) {
                $scope.c1 = response.customerList;
                $scope.c1_count = response.count;
                c1_startPosition = $scope.c1.length;
            }
            else {
                $scope.c1 = [];
            }
        });
    };

    $scope.loadMoreC1 = function (){
        console.log("C1 startPosition::::::::" + c1_startPosition);
        if (c1_startPosition > 0  ){    
        $http({
            method: "GET",
            url: '/adminGetCustomerList',
            params: {
                "startPosition": c1_startPosition
            }
        }).success(function (response) {
            console.log("received count"+response.count);
            if(response.count === undefined || response.count === 0 || response.count === null){
                c1_startPosition = 0;
                $scope.c1_stopLoading = true;
            }
            else{
                if ($scope.c1_stopLoading === false){
                    for (i = 0; i < response.count; i++) {
                        $scope.c1.push(response.customerList[i]);
                    }
                }
            c1_startPosition = c1_startPosition + response.count;
            $scope.c1_count =  $scope.c1_count  + response.count;
            }

        }).error(function (err) {
            $scope.c1 = [];
            c1_startPosition = 0;
            $scope.c1_stopLoading = true;
        });
    }
    }// end loadMoreC1 

    $scope.getCustomerApprovalPendingList = function () {
        $scope.c2 = [];
        c2_startPosition = 0;
        $http({
            method: "GET",
            url: '/adminGetCustomerApprovalPendingList',
            params: {
                startPosition: 0
            }
        }).success(function (response) {
            if (response.Status == 200) {
                $scope.c2 = response.customerList;
                $scope.c2_count = response.count;
                c2_startPosition = $scope.c2.length;
            }
            else {
                $scope.c2 = [];
            }
        });
    };

    $scope.loadMoreC2 = function () {
        console.log("C2 startPosition:" + c2_startPosition);
        if (c2_startPosition > 0 ){ 
        $http({
            method: "GET",
            url: '/adminGetCustomerApprovalPendingList',
            params: {
                "startPosition": c2_startPosition
            }
        }).success(function (response) {
            console.log("received count"+response.count);
            if(response.count === undefined || response.count === 0 || response.count === null){
                c2_startPosition = 0;
                $scope.c2_stopLoading = true;
            }
            else{
                
                    for (i = 0; i < response.count; i++) {
                        $scope.c2.push(response.customerList[i]);
                    }
                    c2_startPosition = c2_startPosition + response.count;
                    $scope.c2_count =  $scope.c2_count  + response.count;
                
            }
        }).error(function (err) {
            $scope.c2 = [];
            c2_startPosition = 0;
            $scope.c2_stopLoading = true;
        });
    }
    };
    
    $scope.approveCustomer = function (c) {
        alert(c.cust_id);
        $http({
            method: "GET",
            url: '/adminApproveCustomer',
            params: {
             "customer": c.cust_id
            }
        }).success(function (response) {
            //alert(JSON.stringify(response));
            if (response.Status == 202) {
                alert(response.Message);
                c.disabled =true;
            }
            else {
                alert("Error: Unable to add customer to the system.");
            }
        });
    };
    $scope.disApproveCustomer = function (c) {
        alert(c.cust_id);
        $http({
            method: "GET",
            url: '/adminDisapproveCustomer',
            params: {
             "customer": c.cust_id
            }
        }).success(function (response) {
            //alert(JSON.stringify(response));
            if (response.Status == 202) {
                alert(response.Message);
                c.disabled =true;
            }
            else {
                alert("Error");
            }
        });
    };

    $scope.searchCustomer = function () {
        alert($scope.cc + ":" +$scope.cq);
        $scope.c = [];
        c3_startPosition = 0;
        $scope.cq = $scope.cq.replace(/[^a-z0-9A-Z@_+-]/g, "");
        alert("refine:" +$scope.cq);
        $http({
            method: "GET",
            url: '/adminGetCustomerSearchList',
            params: {
                startPosition: c3_startPosition,
                criteria: $scope.cc,
                q: $scope.cq
            }
        }).success(function (response) {
            if (response.Status == 200) {
                $scope.c3 = response.customerList;
                $scope.c3_count = response.count;
            }
            else {
                $scope.c3 = [];
            }
            c3_startPosition = $scope.c3.length;
            console.log("showFarmerList startPosition:" + c3_startPosition);
        });
    };

    $scope.loadMoreC3 = function () {
        console.log("C3 startPosition:" + c3_startPosition);
        if (c3_startPosition > 0 ){ 
        $http({
            method: "GET",
            url: '/adminGetCustomerSearchList',
            params: {
                startPosition: c3_startPosition,
                criteria: $scope.cc,
                q: $scope.cq
            }
        }).success(function (response) {
            console.log("received count"+response.count);
            if(response.count === undefined || response.count === 0 || response.count === null){
                c3_startPosition = 0;
                $scope.c3_stopLoading = true;
            }
            else{               
                for (i = 0; i < response.count; i++) {
                    $scope.c3.push(response.farmerList[i]);
                }
            c3_startPosition = c3_startPosition + response.count;
            $scope.c3_count =  $scope.c3_count  + response.count;
            }
        }).error(function (err) {
            $scope.c3 = [];
            c3_startPosition = 0;
            $scope.c3_stopLoading = true;
        });
    }
    };
    
////////*********** Customer tab functionalities end  ************//////////////

 $scope.dmax =new Date().toJSON().slice(0,10);

});

