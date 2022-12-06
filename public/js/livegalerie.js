var index = 1;
var image = document.createElement("img");
var container = document.getElementById("container");

window.socket = io.connect();

function test() {
  const myImage = new Image();
  myImage.src = "https://ik.imagekit.io/YOURID/autoportrait3";
  document.body.appendChild(myImage);
}

socket.on("indexnum", (arg) => {
  if (!(index == arg)) {
    if (index == arg - 1) {
      const myImage = new Image();
      myImage.src = "https://ik.imagekit.io/YOURID/autoportrait" + arg;
      document.body.appendChild(myImage);
      index = arg;
    } else {
      var images = [];
      for (i = 1; i < arg + 1; i++) {
        images[i] = new Image();
        images[i].src = "https://ik.imagekit.io/YOURID/autoportrait" + i;
        document.body.appendChild(images[i]);
      }
      index = arg;
    }
  }
});
