const ImageKit = require("imagekit");
var express = require("express");
var app = express();
var request = require("request"); // include request module
var path = require("path");
const { lookup } = require("dns");
var server = require("http").createServer(app);
var port = process.env.PORT || 3000;
var io = require("socket.io")(server);
//Initialize application with route
app.use(express.static("public/"));
// app.use('/public',express.static('public/stack'));

var imagekit = new ImageKit({
  publicKey: "YOUR_IMAGEKIT_PUBLIC_KEY",
  privateKey: "YOUR_IMAGEKIT_PRIVATE_KEY",
  urlEndpoint: "https://ik.imagekit.io/YOURID/",
});

//Register events on socket connection
io.on("connection", function (socket) {
  var count = 0;
  socket.on("imgnumber", (data) => {
    count = data;
    console.log(count);
  });
  console.log("a user connected");
  socket.on("new message", (data) => {
    console.log(data);
    var base64Img = data;
    imagekit.upload(
      {
        file: base64Img, //required
        useUniqueFileName: false,
        fileName: "autoportrait" + count, //required
        tags: ["autoportrait"],
      },
      function (error, result) {
        if (error) {
          console.log(error);
          socket.emit("reponse", "erreur !");
        } else {
          console.log(result);
          socket.emit("reponse", "envoyé !");
          io.emit("indexnum", count);
        }
      }
    );
  });
});

app.get("/", function (req, res) {
  res.send("hein ?", 404);
});

server.listen(port, function () {
  console.log("Server Running in port 3000");
});
