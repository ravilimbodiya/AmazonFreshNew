var amazon = angular.module('amazonFreshApp', []);
amazon.controller('amazonCntrl', function($scope, $http) {
	$scope.quantity = 1;
	
	$scope.listAllProducts = function() {
		$http({
			method : "POST",
			url : '/listAllProducts'
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode === 200) {
				$scope.allCatSection = true;
				$scope.oneCatSection = false;
				$scope.allProducts = data.result;
				//$scope.itemsInCart = data.shoppingCart.items.length;
			}
			else {
				$scope.invalid_login = false;
				$scope.unexpected_error = true;
				$scope.errLogin = data.msg;
				$scope.errUnexp = data.msg;
			}
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
			$scope.errLogin = data.msg;
			$scope.errUnexp = data.msg;
		});
	};
	
	$scope.getProductReviewsByProductId = function(prodId) {
		$http({
			method : "POST",
			url : '/getProductReviewsByProductId',
			data : {
				"prodId": prodId
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode === 200) {
				var rat = 0.0;
				$scope.reviews = data.reviews.feedback;
				for(var i = 0; i < $scope.reviews.length; i++){
					rat += $scope.reviews[i].ratings;
				}
				$scope.avgRating = rat;
			}
			else {
				$scope.invalid_login = false;
				$scope.unexpected_error = true;
				$scope.errLogin = data.msg;
				$scope.errUnexp = data.msg;
			}
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
		});
	};
	
	$scope.postReviewRating = function(rating, farmerId, prodId) {
		$http({
			method : "POST",
			url : '/postReviewRating',
			data : {
				"rating": rating,
				"reviewComment": $scope.reviewComment,
				"farmerId": farmerId,
				"prodId": prodId
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode === 200) {
				
			}
			else {
				$scope.invalid_login = false;
				$scope.unexpected_error = true;
				$scope.errLogin = data.msg;
				$scope.errUnexp = data.msg;
			}
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
		});
	};
	
	$scope.listAllProductsByCategory = function(category) {
		var oneCatProducts = [];
		for(var i = 0; i < $scope.allProducts.length; i++){
			if($scope.allProducts[i].product_type === category){
				oneCatProducts.push($scope.allProducts[i]);
			}
		}
		$scope.oneCatProducts = oneCatProducts;
		$scope.category = category;
		$scope.allCatSection = false;
		$scope.oneCatSection = true;
	};
	
	
	$scope.searchProductByAttribute = function(key) {
		$http({
			method : "POST",
			url : '/searchProductByAttribute',
			data:	{
				'key': key
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode === 200) {
				$scope.searchResSection = true;
				//$scope.oneCatSection = false;
				$scope.allProducts = data.result;
				//$scope.itemsInCart = data.shoppingCart.items.length;
			}
			else {
				$scope.invalid_login = false;
				$scope.unexpected_error = true;
				$scope.errLogin = data.msg;
				$scope.errUnexp = data.msg;
			}
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
			//$scope.errLogin = data.msg;
			//$scope.errUnexp = data.msg;
		});
	};
	
	$scope.addToCart = function(product, quantity, imageId) {
		//alert(product.name);
		$http({
			method : "POST",
			url : '/addToCart',
			data : {
				"product": product,
				"quantity":quantity
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode === 200) {
				$scope.itemsInCart = data.shoppingCart.items.length;
			}
			else {
				
			}
		}).error(function(error) {
			
		});
		
		
        var cart = $('.glyphicon-shopping-cart');
        var imgId = '#'+imageId;
        var imgtodrag = $(imgId);
        if (imgtodrag) {
            var imgclone = imgtodrag.clone()
                .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left
            })
                .css({
                'opacity': '0.5',
                    'position': 'absolute',
                    'height': '150px',
                    'width': '150px',
                    'z-index': '100'
            })
                .appendTo($('body'))
                .animate({
                'top': cart.offset().top + 10,
                    'left': cart.offset().left + 10,
                    'width': 75,
                    'height': 75
            }, 1000, 'easeInOutExpo');
            
            setTimeout(function () {
                cart.effect("shake", {
                    times: 2
                }, 200);
            }, 1500);

            imgclone.animate({
                'width': 0,
                    'height': 0
            }, function () {
                $(this).detach()
            });
        }
	};
	
	$scope.showShoppingCart = function() {
		window.location.assign = "/shoppingCart";
	};

	$scope.makePayment = function() {
		window.location.assign = "/makePayment";
	};
	
	$scope.getShoppingCart = function() {
		$http({
			method : "POST",
			url : '/getShoppingCart'
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode === 200) {
				$scope.emptyShoppingCart = false;
				$scope.shoppingCart = data.shoppingCart;
				$scope.allItems = data.shoppingCart.items;
				$scope.sum = data.sum;
				$scope.itemsInCart = data.shoppingCart.items.length;
				$scope.checkoutSection = true;
				$scope.receiptSection = false;
				$scope.paymentMethodFlag = true;
			}
			else {
				$scope.emptyShoppingCart = true;
				$scope.itemsInCart = 0;
				$scope.allItems = [];
				$scope.sum = 0.0;
				$scope.msg = data.msg;
				$scope.checkoutSection = true;
				$scope.receiptSection = false;
				$scope.paymentMethodFlag = true;
			}
		}).error(function(error) {
			
		});
	};
	
	$scope.getExistingAddress  = function() {
		if($scope.addressType === 'existing'){
			$http({
				method : "POST",
				url : '/getExistingAddress'
			}).success(function(data) {
				//checking the response data for statusCode
				if (data.statusCode === 200) {
					$scope.address = data.address;
					$scope.zipcode = data.zipcode;
					document.getElementById('address').disabled = true;
					document.getElementById('zipcode').disabled = true;
				}
				else {
					
				}
			}).error(function(error) {
				
			});
		} else {
			document.getElementById('address').disabled = false;
			document.getElementById('zipcode').disabled = false;
		}
		
	};
	
	
	$scope.showPaymentMethod  = function() {
		if($scope.paymentMethod === 'card'){
			$scope.paymentMethodFlag = false;
		} else {
			$scope.paymentMethodFlag = true;
		}
		
	};
	
	$scope.removeItemFromCart = function(index) {
		$http({
			method : "POST",
			url : '/removeItemFromCart',
			data : {
				"index" : index
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode === 200) {
				$scope.shoppingCart = data.shoppingCart;
				$scope.allItems = data.shoppingCart.items;
				$scope.sum = data.sum;
				$scope.itemsInCart = data.shoppingCart.items.length;
			}
			else {
				
			}
		}).error(function(error) {
			
		});
	};
	
	$scope.placeOrder = function() {
	
		$http({
			method : "POST",
			url : '/placeOrder',
			data : {
				"address" : $scope.address,
				"zipcode" : $scope.zipcode,
				"deliveryDate" : $scope.deliveryDate,
				"deliveryTime" : $scope.deliveryTime,
				"paymentMethod" : $scope.paymentMethod,
				"nameOnCard" : $scope.nameOnCard,
				"cardNumber" : $scope.cardNumber1 + $scope.cardNumber2 + $scope.cardNumber3 + $scope.cardNumber4,
				"expiryMonth" : $scope.expiryMonth,
				"expiryYear" : $scope.expiryYear,
				"cvv" : $scope.cvv
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode === 200) {
				$scope.itemsInCart = 0;
				$scope.order = data.order;
				$scope.items = data.order.shoppingCart.items;
				$scope.checkoutSection = false;
				$scope.receiptSection = true;
			}
			else {
				window.location.assign('/');
			}
		}).error(function(error) {
			
		});
	};
	
	
	$scope.getAllOrders = function() {
		
		$http({
			method : "POST",
			url : '/getAllOrders'
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode === 200) {
				//$scope.itemsInCart = 0;
				$scope.orders = data.orders;
			}
			else {
				window.location.assign('/');
			}
		}).error(function(error) {
			
		});
	};
	
	$scope.getAllOrdersByCustId = function() {
		
		$http({
			method : "POST",
			url : '/getAllOrdersByCustId'
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode === 200) {
				//$scope.itemsInCart = 0;
				$scope.orders = data.orders;
			}
			else {
				window.location.assign('/');
			}
		}).error(function(error) {
			
		});
	};
	
	$scope.showMap = function(order) {
		var farmerLat;
		var farmerLong;
		var custLat;
		var custLong;
		
		document.getElementById('map').style = "height: 600px;";
		var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 37.3456227, lng: -121.8847222},
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.TERRAIN
          });
		var lineSymbol = {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scale: 5,
                strokeColor: '#393'
              };
		
		
		for(var i = 0; i < order.shoppingCart.items.length; i++){
			$http({
				method : "GET",
				url : 'http://maps.googleapis.com/maps/api/geocode/json?address='+order.shoppingCart.items[i].farmer.zipcode
			
			}).success(function(data) {
				farmerLat = Number(data.results[0].geometry.location.lat);
				farmerLong = Number(data.results[0].geometry.location.lng);
				
				$http({
					method : "GET",
					url : 'http://maps.googleapis.com/maps/api/geocode/json?address='+order.customer_zipcode
				
				}).success(function(data) {
					custLat = Number(data.results[0].geometry.location.lat);
					custLong = Number(data.results[0].geometry.location.lng);
					
					var line = new google.maps.Polyline({
			            path: [{lat: farmerLat, lng: farmerLong}, {lat: custLat, lng: custLong}],
			            icons: [{
			              icon: lineSymbol,
			              offset: '100%'
			            }],
			            map: map
			          });
					var count = 0;
			        window.setInterval(function() {
				          count = (count + 1) % 200;
				
				          var icons = line.get('icons');
				          icons[0].offset = (count / 2) + '%';
				          line.set('icons', icons);
				      }, 300);
				}).error(function(error) {
				});
			}).error(function(error) {
			});
			
			
			
			
			
			
		}
		
		
		
        
	};
	
	//Start Add Product
	$scope.renderAddProduct = function(type) {
		
		$http({
			method : "POST",
			url : '/renderAddProduct',
			data : {
					"type":type
				}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 200) {				
				window.location.assign("/addProduct");
			}
			else {
				window.location.assign("/farmerDashboard");
			}
		}).error(function(error) {
				window.location.assign("/farmerDashboard");
		});
	};
	//End Add Product

	//Start Submit Add Product
	$scope.submitAddProduct = function(type) {
		
		var filePath = document.getElementById("imgFile").value + "";		
		var temp = filePath.split("\\");
		var fileName = temp[temp.length-1];
		
		//alert("File Path: " + filePath);
		$http({
			method : "POST",
			url : '/submitAddProduct',
			data : {
					"prodType" 		: $scope.prodType,
					"prodName" 		: $scope.prodName,
					"price" 		: $scope.price,
					"description" 	: $scope.description,
					"imgFile" 		: fileName,
					"quantity"		: $scope.quantity
				}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 200) {				
				window.location.assign("/farmerDashboard");
			}
			else {
				window.location.assign("/addProduct");
			}
		}).error(function(error) {
				window.location.assign("/farmerDashboard");
		});
	};
	//End Submit Add Product
	
	//Start Load Product
	$scope.loadProducts = function loadProducts() {
		var allProducts = [];

		$http({
			method : "GET",
			url    : '/loadProducts'
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 200) {			
			console.log("Data: " + JSON.stringify(data));	

			for(var i=0; i<data.rows.length; i++){
				allProducts.push(data.rows[i]);		
			}//end for i

			$scope.allProducts = allProducts;	
			
			$scope.earnings = data.chartDataR[0].totalEarnings;
			$scope.orders = data.chartDataR[0].countOrder;
			$scope.products = data.rows.length;
			
			
			//Start for making the AM chart
		    
		    var chart = AmCharts.makeChart("chartdiv", {
		        "theme": "light",
		        "type": "serial",
		    	"startDuration": 2,
		        "dataProvider": [{
		            "col": "Earnings",
		            "value": data.chartDataR[0].totalEarnings,
		            "color": "#FF0F00"
		        }, {
		            "col": "Orders",
		            "value": data.chartDataR[0].countOrder,
		            "color": "#FF6600"
		        }, {
		            "col": "Products",
		            "value": data.rows.length,
		            "color": "FF9E01"
		        }],
		        "valueAxes": [{
		            "position": "left",
		            "axisAlpha":0,
		            "gridAlpha":0         
		        }],
		        "graphs": [{
		            "balloonText": "[[category]]: <b>[[value]]</b>",
		            "colorField": "color",
		            "fillAlphas": 0.85,
		            "lineAlpha": 0.1,
		            "type": "column",
		            "topRadius":1,
		            "valueField": "value"
		        }],
		        "depth3D": 40,
		    	"angle": 30,
		        "chartCursor": {
		            "categoryBalloonEnabled": false,
		            "cursorAlpha": 0,
		            "zoomable": false
		        },    
		        "categoryField": "col",
		        "categoryAxis": {
		            "gridPosition": "start",
		            "axisAlpha":0,
		            "gridAlpha":0
		            
		        },
		        "export": {
		        	"enabled": true
		         }

		    },0);

		    jQuery('.chart-input').off().on('input change',function() {
		    	var property	= jQuery(this).data('property');
		    	var target		= chart;
		    	chart.startDuration = 0;

		    	if ( property == 'topRadius') {
		    		target = chart.graphs[0];
		    	}

		    	target[property] = this.value;
		    	chart.validateNow();
		    });
		    
		    //For tool tip
		    $(document).ready(function(){
		        $('[data-toggle="tooltip"]').tooltip();   
		    });
		    
		    //For multilevel drop down
		    $(function(){
		    	$(".dropdown-menu > li > a.trigger").on("click",function(e){
		    		var current=$(this).next();
		    		var grandparent=$(this).parent().parent();
		    		if($(this).hasClass('left-caret')||$(this).hasClass('right-caret'))
		    			$(this).toggleClass('right-caret left-caret');
		    		grandparent.find('.left-caret').not(this).toggleClass('right-caret left-caret');
		    		grandparent.find(".sub-menu:visible").not(current).hide();
		    		current.toggle();
		    		e.stopPropagation();
		    	});
		    	$(".dropdown-menu > li > a:not(.trigger)").on("click",function(){
		    		var root=$(this).closest('.dropdown');
		    		root.find('.left-caret').toggleClass('right-caret left-caret');
		    		root.find('.sub-menu:visible').hide();
		    	});
		    });	
		    
		    //End for making the AM chart 
			
			
			}
			else {

				window.location.assign("/farmerDashboard");
			}
		}).error(function(error) {

				window.location.assign("/farmerDashboard");
		});
	};
	//End Load Product
	
	var prodName;
	
	//Start Add Product
	$scope.viewFeedback = function(pid) {
		//alert("Inside view feedback" + pid);
		var prodDetails = pid.split("-");
		var prid = prodDetails[0];
		prodName = prodDetails[1];
		var allFeedbacks = [];
		
		$http({
			method : "POST",
			url    : '/viewFeedback',
			data   : {prodId : prid}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 200) {			
			console.log("Data: " + JSON.stringify(data));	

			$scope.prod = prodName;
			for(var i=0; i<data.feedback.length; i++){
				allFeedbacks.push(data.feedback[i]);		
			}//end for i

			$scope.allFeedbacks = allFeedbacks;							
			}
			else {

				window.location.assign("/farmerDashboard");
			}
		}).error(function(error) {

				window.location.assign("/farmerDashboard");
		});
	};
	//End Add Product

	
	//Start Render Edit Product
	$scope.renderEditProduct = function(prodObj) {
		
		console.log("Inside Render Edit Project");
		
		$http({
			method : "POST",
			url    : '/renderEditProduct',
			data   : {prodObj : prodObj}
		}).success(function(data) {
			
			if (data.statusCode == 200) {			
				window.location.assign("/farmerEditProduct");
			}
			else {
				window.location.assign("/farmerDashboard");
			}
		}).error(function(error) {
				window.location.assign("/farmerDashboard");
		});
	};
	//End Render Edit Product
	
	//Start Submit Update Product
	$scope.submitUpdateProduct = function(updateForProdId) {
		
		console.log("Inside submit update Edit Project");
		
		var filePath = document.getElementById("updateImgFile").value + "";		
		var temp = filePath.split("\\");
		var fileName = temp[temp.length-1];
		
		$http({
			method : "POST",
			url    : '/submitUpdateProduct',
			data   : {"prodId"			: updateForProdId,
					  "prodType" 		: $scope.updateProdType,
					  "prodName" 		: document.getElementById("updateProdName").value,
					  "price" 			: document.getElementById("updatePrice").value,
					  "description" 	: document.getElementById("updateDescription").value,
					  "imgFile" 		: fileName,
					  "quantity"		: document.getElementById("updateQuantity").value							
					}
		}).success(function(data) {
			
			if (data.statusCode == 200) {			
				window.location.assign("/farmerDashboard");
			}
			else {
				window.location.assign("/farmerDashboard");
			}
		}).error(function(error) {
				window.location.assign("/farmerDashboard");
		});
	};
	//End Submit Update Product	
	
	
});

var editProfile = angular.module('editProfile', []);

editProfile.controller('editProfileCntrl', function($scope, $http) {

	$scope.user=[];
	$scope.editprofile = function(){

		//alert('reached edit profile controller');
		$http({
			url: '/editProfilefarmer',
			method:'POST',
			data:{
				user: $scope.user
			}
		}).success(function () {

				//alert('edit profile success final');
		}).error(function(error){
			//alert('edit profile success');
		});
	};

	$scope.getcurrentfarmer = function(){

		$http({
			url: '/getcurrentfarmer',
			method:'POST',
			data:{}
		}).success(function (user) {

			//alert('edit profile success');
			//alert(user.first_name);
			$scope.user = user.user;
		}).error(function(error){

			//alert("Unexpected Error: " + error);
		});
	};

	var prodName;
	
	//Start Add Product
	$scope.viewFeedback = function(pid) {
		//alert("Inside view feedback" + pid);
		var prodDetails = pid.split("-");
		var prid = prodDetails[0];
		prodName = prodDetails[1];
		var allFeedbacks = [];
		
		$http({
			method : "POST",
			url    : '/viewFeedback',
			data   : {prodId : prid}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 200) {			
			console.log("Data: " + JSON.stringify(data));	

			$scope.prod = prodName;
			for(var i=0; i<data.feedback.length; i++){
				allFeedbacks.push(data.feedback[i]);		
			}//end for i

			$scope.allFeedbacks = allFeedbacks;							
			}
			else {

				window.location.assign("/farmerDashboard");
			}
		}).error(function(error) {

				window.location.assign("/farmerDashboard");
		});
	};
	//End Add Product
});


var editProfileCustomer = angular.module('editProfilecustomer', []);

editProfileCustomer.controller('editProfilecustomerCntrl', function($scope, $http) {

	$scope.user=[];
	$scope.editprofile = function(){

		//alert('reached edit profile controller');
		$http({
			url: '/editProfilecustomer2',
			method:'POST',
			data:{
				user: $scope.user
			}
		}).success(function () {

			//alert('edit profile success final');
		}).error(function(error){
			//alert('edit profile success');
		});
	};

	$scope.getcurrentcustomer = function(){

		$http({
			url: '/getcurrentcustomer',
			method:'POST',
			data:{}
		}).success(function (user) {

			//alert('edit profile success');
			//alert(user.first_name);
			$scope.user = user.user;
		}).error(function(error){

			//alert("Unexpected Error: " + error);
		});
	};

});