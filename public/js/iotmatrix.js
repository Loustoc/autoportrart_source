var pencil = document.getElementById("pencil");
var eraser = document.getElementById("eraser");

function gommer() {
  document.getElementById("eraser").classList.add("activetool");
  document.getElementById("pencil").classList.remove("activetool");
}
function dessiner() {
  document.getElementById("pencil").classList.add("activetool");
  document.getElementById("eraser").classList.remove("activetool");
}

function info() {
  document.getElementById("content").style.filter = "blur(2px)";
}

function unblur() {
  document.getElementById("content").style.filter = "blur(0px)";
}

function start() {
  var info = document.getElementById("info");
  info.parentNode.removeChild(info);
  unblur();
  getindex();
}

window.socket = io.connect();

socket.on("reponse", (arg) => {
  alert(arg); // world
  getindex();
});

function clearcanvas() {
  var canvas = document.getElementById("container");
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  getindex();
}

function envoi() {
  getindex();
  html2canvas($("#container"), {
    onrendered: function (canvas) {
      var message = canvas.toDataURL();
      socket.emit("new message", message);
    },
  });
}

window.addEventListener(
  "load",
  function () {
    // get the canvas element and its context
    var canvas = document.getElementById("container");
    var context = canvas.getContext("2d");
    var isIdle = true;

    function drawstart(event) {
      if (document.getElementById("pencil").classList.contains("activetool")) {
        context.strokeStyle = "#000000";
        context.lineWidth = 1;
      }
      if (document.getElementById("eraser").classList.contains("activetool")) {
        context.strokeStyle = "#FFFFFF";
        context.lineWidth = 15;
      }
      context.beginPath();
      context.moveTo(
        event.pageX - canvas.getBoundingClientRect().left,
        event.pageY - canvas.getBoundingClientRect().top
      );
      isIdle = false;
    }
    function drawmove(event) {
      if (document.getElementById("pencil").classList.contains("activetool")) {
        context.strokeStyle = "#000000";
        context.lineWidth = 1;
      }
      if (document.getElementById("eraser").classList.contains("activetool")) {
        context.strokeStyle = "#FFFFFF";
        context.lineWidth = 15;
      }
      if (isIdle) return;
      context.lineTo(
        event.pageX - canvas.getBoundingClientRect().left,
        event.pageY - canvas.getBoundingClientRect().top
      );
      context.stroke();
    }

    function drawend(event) {
      if (document.getElementById("pencil").classList.contains("activetool")) {
        context.strokeStyle = "#000000";
        context.lineWidth = 1;
      }
      if (document.getElementById("eraser").classList.contains("activetool")) {
        context.strokeStyle = "#FFFFFF";
        context.lineWidth = 15;
      }
      if (isIdle) return;
      drawmove(event);
      isIdle = true;
    }
    function touchstart(event) {
      drawstart(event.touches[0]);
    }
    function touchmove(event) {
      drawmove(event.touches[0]);
      event.preventDefault();
    }
    function touchend(event) {
      drawend(event.changedTouches[0]);
    }

    canvas.addEventListener("touchstart", touchstart, false);
    canvas.addEventListener("touchmove", touchmove, false);
    canvas.addEventListener("touchend", touchend, false);

    canvas.addEventListener("mousedown", drawstart, false);
    canvas.addEventListener("mousemove", drawmove, false);
    canvas.addEventListener("mouseup", drawend, false);
  },
  false
); // end window.onLoad

function getindex() {
  var count = 1;
  var countdef = 0;
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
        socket.emit("imgnumber", countdef);
      },
    });
  }
  getindexinc();
}
