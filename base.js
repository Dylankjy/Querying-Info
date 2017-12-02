var http = require('http');
var url = require('url');
var event = require('./event');
var fs = require('fs');

console.log("[PROCESS] Starting webserver...")
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("<h2>Personal Data Recorder</h2><p><a href='?fname=___&&lname=___&&nationality=___'>Click</a> to append a query string into the address bar.</p><hr>");

  var q = url.parse(req.url, true).query;
  var undef = "undefined"
  var blank = "___"
  var empty = ""
  var data = "-----------------" + "\r\n" + "[" + event.DateTime() + "] " + "\r\n" + "Name: " + q.fname + " " + q.lname + "\r\n" + "Nationality: " + q.nationality + "\r\n";

  if (q.fname == undef || q.fname == blank || q.fname == empty){
    res.end("<strong>Data provided is not valid or is blank</strong>");
    console.log('[INFO] Rejecting invalid data');
  } else if (q.lname == undef || q.lname == blank || q.lname == empty) {
    res.end("<strong>Data provided is not valid or is blank</strong>");
    console.log('[INFO] Rejecting invalid data');
  } else if (q.nationality == undef || q.nationality == blank || q.nationality == empty) {
    res.end("<strong>Data provided is not valid or is blank</strong>");
    console.log('[INFO] Rejecting invalid data');
  } else {
  fs.appendFile('data.log', data, function (err) {
    if (err) throw err;
    console.log('[WRITE] Appended to data.log');
    res.end("Success: Data recorded.");
  })
}

}).listen(8080);
console.log("[INFO] Webserver started.")
