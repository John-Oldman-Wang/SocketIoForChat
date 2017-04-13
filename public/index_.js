$(function(){
	var $nameinput=$(".usernameInput")
	var $window=$(window)
	var $usernameInput = $('.usernameInput');
	function socketio(){
		this.io=new WebSocket("ws://"+window.location.host+":8080")
		this.on=function(type,cb){}
		this.login=function(username){
			if(this.io.readyState!=1){
				console.log("socket is not on connect")
				return "socket is not on connect"
			}else{
				var obj={
					type:"login",
					data:username
				}
				this.io.send(JSON.stringify(obj))
			}
		}
		this.sendMes=function(message){
			if(this.io.readyState!=1){
				console.log("socket is not on connect")
				return "socket is not on connect"
			}else{
				var obj={
					type:"message",
					data:message
				}
				this.io.send(JSON.stringify(obj))
			}
		}
		this.on=(function(){
			var obj={}
			this.io.onmessage=function(e){
				var json=JSON.parse(e.data)
				obj[json.type]&&obj[json.type]()
			}
			return function(type,cb){
				if(typeof cb=="function"){
					obj[type]=cb
				}else{
					console.error("it is not function")
				}
			}
		})()
	}
	$window.keydown(function (event) {
		// Auto-focus the current input when a key is typed
		//console.log(event)
		if(!(event.ctrlKey || event.metaKey || event.altKey)){
			$usernameInput.focus();
			console.log(event)
		}
	    // When the client hits ENTER on their keyboard
	    if(event.which === 13){
	    	
	    }
	});

})