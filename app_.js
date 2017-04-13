const WebSocket = require('ws');
 
const wss = new WebSocket.Server({ port: 8080 });
 
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send("kk","you say:"+message)
    console.log(wss.send)
  });
});
var express=require("express")
var app=express(0)
app.get("/",function(req,res){
	res.render("index_.ejs")
})
app.use(express.static(__dirname + '/public'));
app.listen(80)
