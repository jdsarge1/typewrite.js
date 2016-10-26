jQuery.fn.extend({
			typewrite: function (delay) {
				
				var $element = this.contents();

				//utility vars
				var elementArray = [], 	//multi-dimensional array containing strings chopped into arrays of chars
					totalDelay = 0; 	//Base delay, increased every iteration

				$element.each(function(){
					//build the array and fill it with the char arrays from all of the specified elements 
					elementArray.push($(this).text().split(''));
				});

				//clear the contents of all of the elements
				$element.empty();

				//cycle through all of the elements in the element array
				for(var i = 0; i < $element.length; i++) {

					//set the working element to the current element in the series
					var element = $($element[i]);

					//queue the delay between elements
					element.delay(totalDelay, 'app');
					//iterate through all of the chars in the specified element array
					$(elementArray[i]).each(function(i, e){
						//add a bit of randomness to the delay to make it feel like natural typing
						var delayIncrement = delay + Math.floor((Math.random() * 100) + 1); 
						//queue the delay between char prints
						element.delay(delayIncrement, 'app').queue('app', function(next){
							//add the next char to the string and ouput
							$(this).text($(this).text() + e);
							//next delay in the queue
							next();
						});
						//increment the delay value
						totalDelay += delayIncrement;
					});
					//dequeue any remaining delays
					element.dequeue('app');
				}
			}
		});
