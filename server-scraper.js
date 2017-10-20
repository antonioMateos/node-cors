var express = require('express');
var app     = express();
var path    = require('path');
var http    = require('http').Server(app);
var io      = require("socket.io")(http); // app or http
//var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');

app.use(express.static(__dirname + '/'));

app.get('/', function (request, response, next) {
  response.sendFile(path.join(__dirname+'/index.html'));
});

io.on('connection', function(socket){
//app.get('/scrape', function(req, res){

  socket.on('start',function(){

    console.log("READING URL - - - - - - - - - - - - - - - - - - - -");
    // URL TO SCRAPE
    url = 'http://www.aemet.es/es/eltiempo/prediccion/playas?p=15';

    request(url, function(error, response, html){

        var respArr = [];

        if(!error){

          var $ = cheerio.load(html);

          //PROVINCIA
          $('#provincia_selector option').filter(function(){

            var data = $(this);
            
            var provincia = data.html();
            var id = data.attr('value');
            /*
            json.provincia = provincia;
            json.id = id;
            */
            var obj = {};
            obj[provincia] = id;
            respArr.push(obj);
            console.log("DATA SCRPD:",data.html(),data.attr('value'));

          })

          // DEMO SELECTORS
          /*
          $('.title_wrapper').filter(function(){
            var data = $(this);
            title = data.children().first().text().trim();
            release = data.children().last().children().last().text().trim();

            json.title = title;
            json.release = release;
          })
          */
        }
        // WRITE FILE
        /*
        fs.writeFile(json.provincia+'.json', JSON.stringify(json, null, 4), function(err){
          console.log('File successfully written! - Check your project directory for the output.json file');
        })
        res.send('Check your console!')
        */
        socket.emit("response",respArr);
        
    });  
  })
//})
});
//END SOCKET IO

http.listen(process.env.PORT || 3000, function () {
  console.log('- START SERVER - - - - - -\n');
  console.log('Server Listening on http://localhost:' + (process.env.PORT || 3000))
});

/*
app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
*/