function createArray(length) {
	var arr = new Array(length || 0), i = length;

	if (arguments.length > 1) {
		var args = Array.prototype.slice.call(arguments, 1);
		while(i--) arr[length-1 - i] = createArray.apply(this, args);
	}
	return arr;
}

function findSurr(arr, x, y, maxLen){
	count = 0;
	var set = [
		[x-1, y-1],
		[x, y-1],
		[x+1, y-1],
		[x-1, y],
		[x+1, y],
		[x-1, y+1],
		[x, y+1],
		[x+1, y+1]
	];
/*
	var set = [
		[x-1, y],
		[x, y-1],
		[x+1, y],
		[x, y+1]
	];*/

	for(var i=0 ; i<set.length ; i++){
		var t = set[i][0];
		var m = set[i][1];

		if((t>=0) && (m>=0) && t<maxLen && m<maxLen && typeof arr[t][m] != 'undefined' && arr[t][m] == 1)
			count++;
	}

	return count;
}

$( document ).ready(function() {

	/*Global vars within document ready*/
	var gameStats = createArray(dim, dim);
	var toTurnOn = [];
	var toTurnOff = [];
	var onBits = [];
	var task = null;
	var cycleCount = 0;
	var mouseMode = null;


	/*Fucntions within ready*/
	function removeFromArray(arr, element){
		for(var i=0 ; i<arr.length ; i++){
			if(arr[i] == element){
				arr.splice(i,1);
				break;
			}
		}
	}

	function setCycleCount(){
		$("#cycleCount").text("Cycle count: "+cycleCount);
	}

	function stopGame(){
		if(task !=null){
			clearInterval(task);
			task == null;
		}
	}

	function setBitDim(){
		var w = $("#gameContainer").width();
		var size = Math.floor((w/(1.2*dim)))+"px";
		$(".gameBit").width(size);
		$(".gameBit").height(size);
	}


	function makeID(x, y){
	  var id = "";

	  if(x < 10){
		id = id+"0";
	  }
	  id = id+x;

	  if(y < 10){
		id = id+"0";
	  }
	  id = id+y;

	  return id;
	}

	function notify(msg){
		$("#notifications").text(msg);
	}

	$(".gameBit").click(function(){
		if(task == null){
			var w_id = $(this).attr("id");
			var id = parseInt(w_id);

			var x = Math.round(id/100);
			var y = id%100;

			if(typeof gameStats[x][y] == 'undefined' || gameStats[x][y] == 0){
				mouseMode = 1;
				$(this).addClass("bitOn");
				gameStats[x][y] = 1;
				onBits.push(w_id);
			}
			else{
				mouseMode = 0;
				$(this).removeClass("bitOn");
				gameStats[x][y] = 0;
				removeFromArray(onBits, w_id);
			}
			console.log("Mouse mode set to: "+mouseMode);
		}
	});

	$("#clearGame").click(function(){
		if(task == null){
			$(".gameBit").removeClass("bitOn");
			onBits.length = 0;
			toTurnOn.length = 0;
			toTurnOff.length = 0;
			cycleCount = 0;
			setCycleCount();
		}
		else{
			notify("Stop game before clearing...!");
		}
	});

	$("#stopGame").click(function(){
		if(task != null){
			clearInterval(task);
			task = null;
			notify("Game stopped...!");
		}
	});

	$("#startGame").click(function(){
		if(task == null){
			if(onBits.length == 0){
				notify("None of the cells are alive...!");
				return false;
			}
			
			notify("Game started...!");
			cycleCount = 0;
			setCycleCount();

			task = setInterval(function(){
				var x_min = dim;
				var y_min = dim;
				var x_max = -1;
				var y_max = -1;

				for(var i=0 ; i<onBits.length ; i++){
					var xOn = Math.round(onBits[i]/100);
					var yOn = onBits[i]%100;

					if(xOn < x_min)
						x_min = xOn;
					if(yOn < y_min)
						y_min = yOn;

					if(xOn > x_max)
						x_max = xOn;
					if(yOn > y_max)
						y_max = yOn;
				}

				if(x_min > 0)
					x_min--;
				if(y_min > 0)
					y_min--;
				if(x_max < dim)
					x_max++;
				if(y_max < dim)
					y_max++;

				for(var i=x_min; i<=x_max ; i++){
					for(var j=y_min;  j<=y_max ; j++){
						var count = findSurr(gameStats, i ,j, dim);

						if(typeof gameStats[i][j] == 'undefined' || gameStats[i][j] == 0){
							//Dead
							if(count == 3){
								//Make alive
								var id = makeID(i,j);
								toTurnOn.push(id);
								//$("#"+id).toggleClass("bitOn");
								//gameStats[i][j] = 1;
							}

						}
						else{
							//Alive
							if(count == 0 || count == 1 || count >=4){
								//Make dead
								if(gameStats[i][j] == 1){
									var id = makeID(i,j);
									toTurnOff.push(id);
									//$("#"+id).toggleClass("bitOn");

									//gameStats[i][j] = 0;
								}

							}
						}
					}
				}
					//turnOn
				for (var i = 0; i < toTurnOn.length; i++) {
					var id = parseInt(toTurnOn[i]);
					$("#"+toTurnOn[i]).addClass("bitOn");
					var x = Math.round(id/100);
					var y = id%100;
					gameStats[x][y] = 1;
					onBits.push(toTurnOn[i]);
				}

				//turnOff
				for (var i = 0; i < toTurnOff.length; i++) {
					var id = parseInt(toTurnOff[i]);
					$("#"+toTurnOff[i]).removeClass("bitOn");
					var x = Math.round(id/100);
					var y = id%100;
					gameStats[x][y] = 0;
					removeFromArray(onBits, toTurnOff[i]);
				}

				if(toTurnOn.length == 0 && toTurnOff.length == 0){
					//Reached stable state
					notify("Reached a stable state. Game stopeed...!");
					clearInterval(task);
					task = null;
				}

				toTurnOn.length = 0;
				toTurnOff.length = 0;
				cycleCount++;
				setCycleCount();
			},250);
		}
	});

	notify("Ready...!");
	setCycleCount();
	setBitDim();

	$( window ).resize(function() {
		setBitDim();
	});

});