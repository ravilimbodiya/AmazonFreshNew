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
	
	$scope.getShoppingCart = function() {
		$http({
			method : "POST",
			url : '/getShoppingCart'
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
});