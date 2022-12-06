var index = 1;
var image = document.createElement("img");
var countdef = 0;

function getindex() {
  var count = 1;
  function getindexinc() {
    $.ajax({
      url: "https://ik.imagekit.io/YOURID/autoportrait" + count,
      method: "GET",
      async: true,
      cache: false,
      success: function () {
        ++count;
        getindexinc();
      },
      error: function (data) {
        countdef = count;
        display();
      },
    });
  }
  getindexinc();
}

function display() {
  if (!(index == countdef)) {
    if (index == countdef - 1) {
      const myImage = new Image();
      myImage.src = "https://ik.imagekit.io/YOURID/autoportrait" + countdef;
      document.getElementById("blocportraits").appendChild(myImage);
      index = countdef;
    } else {
      var images = [];
      for (i = 1; i < countdef + 1; i++) {
        images[i] = new Image();
        images[i].src = "https://ik.imagekit.io/YOURID/autoportrait" + i;
        document.getElementById("blocportraits").appendChild(images[i]);
      }
      index = countdef;
    }
  }
}
