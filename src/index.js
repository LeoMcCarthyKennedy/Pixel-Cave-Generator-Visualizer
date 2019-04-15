var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var framerate = 60;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

setInterval(smooth, 1);

var map = [];
var smoothCount = 0;

var w = 1;
var h = 1;

function start() {
    map = [];

    for (var y = 0; y < 128; y++) {
        map[y] = [];
        for (var x = 0; x < 128; x++) {

            ctx.fillStyle = "blue";

            if (x == 0 || y == 0) {
                map[y][x] = 1;
            } else if (x == 127 || y == 127) {
                map[y][x] = 1;
            } else if (Math.random() >= 0.5) {
                map[y][x] = 1;
            } else {
                map[y][x] = 0;
                ctx.fillStyle = "red";
            }

            ctx.fillRect(y * 5, x * 5, 5, 5);
        }
    }
}

function smooth() {
    if (smoothCount == 0) {
        start();
        smoothCount++;
    } else if (smoothCount < 8) {
        var count = 0;

        for (var a = -1; a < 2; a++) {
            for (var b = -1; b < 2; b++) {
                if (map[h + a][w + b] == 1) {
                    count++;
                }
            }
        }

        if (count > 4) {
            map[h][w] = 1;
            ctx.fillStyle = "blue";
        } else {
            map[h][w] = 0;
            ctx.fillStyle = "red";
        }

        ctx.fillRect(h * 5, w * 5, 5, 5);
        
        w++;

        if (w >= 127) {
            w = 1;
            h++;
        }

        if (h >= 127) {
            h = 1;
            w = 1;
            smoothCount++;
        }
    }
}
