var events=require("events")
var http=require("http")
var crypto=require("crypto")
var util=require("util")
var opcodes={
	TEXT:1,
	BINARY:2,
	CLOSE:8,
	PING:9,
	PONG:10
}
var WebSocketConnection=function(req,socket,upgradeHead){
	var self=this
	var key=hashWebSocketKey(req,headers["sec-websocket-key"])
	socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n'+
		'Upgrade:WebSocket\r\n'+
		'Connection:Upgrade\r\n'+
		'sec-websocket-accept:'+key+'\r\n\r\n');
	socket.on('data',function(buf){
		self.buffer=Buffer.concat[self.buffer,buf]
		while(self._processBuffer()){

		}
	})
	socket.on("close",function(had_error){
		if(!self.closed){
			self.emit("close",1006)
			self.closed=true
		}
	})
	this.socket=socket
	this.buffer=new Buffer(0)
	this.closed=false
}
util.inherits(WebSocketConnection,events.EventEmitter)
WebSocketConnection.prototype.send=function(obj){
	var opcode
	var payload
	if(Buffer.isBuffer(obj)){
		opcode=opcodes.BINARY
		payload=obj
	}else if(typeof obj=="string"){
		opcode=opcodes.TEXT
		payload=new Buffer(obj,'utf8')
	}else{
		throw new Error("Cannot send object.Must be string or Buffer")
	}
	this._doSend(opcode,payload)
}
WebSocketConnection.prototype.close=function(code,reason){
	var opcode=opcodes.CLOSE
	var buffer
	if(code){
		buffer=new Buffer(Buffer.byteLength(reason)+2)
		buffer.writeUInt16BE(code,0)
		buffer.write(reason,2)
	}else{
		buffer=new Buffer(0)
	}
	this._doSend(opcode,buffer)
	this.closed=true
}
WebSocketConnection.prototype._processBuffer = function(){ 
	var buf = this.buffer;
	if (buf.length < 2) {
	// insufficient data read
		return;   
	} 
	var idx = 2;
	var b1 = buf.readUInt8(0); 
	var fin = b1 & 0x80;
	var opcode = b1 & 0x0f;
	// low four bits var b2 = buf.readUInt8(1);
	var mask = b2 & 0x80;
	var length = b2 & 0x7f; // low 7 bits
	if (length > 125) {
	   if (buf.length < 8) {
	   // insufficient data read
	   return;
	}
	if (length == 126) {
	   length = buf.readUInt16BE(2);
	   idx += 2;
	} else if (length == 127) {
	// discard high 4 bits because this server cannot handle huge lengths
		var highBits = buf.readUInt32BE(2);
		if (highBits != 0) {
			this.close(1009, "");
		}
		length = buf.readUInt32BE(6);
		idx+=8;
	}
}

//未完成 来自微信读书