require('dotenv/config');
 const app = require('http').createServer(index)
 const io = require('socket.io')(app,{
    cors: {
      origin: "http://localhost:3000/",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
      credentials: false
    }
  });
 const fs = require('fs')

const Twitter = require('node-tweet-stream')
const t = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET ,
    token: process.env.TOKEN,
    token_secret: process.env.TOKEN_SCRETE
  })

  
  app.listen(2525, function() {
      console.log("Servidor rodando!");
    });
    
    function index(req:any, res:any) {
        fs.readFile(__dirname + '/index.html', function(err:any, data:any){
            res.writeHead(200);
            res.end(data);
        });
    };
    io.on('connection', function(socket:any){
    const { track } = socket.handshake.query;
    console.log('user',track)
    t.track(track)
    t.on('tweet', function (tweet:any) {
        let tweetJS = {
            username: tweet.user.name,
            tweet:tweet.text
           }
        console.log(tweetJS)
        socket.emit('tweet', tweetJS);
       
   })
 })

