$(function() {
    PM25AlarmColor(10);

});

function PM25AlarmColor(PM25value) {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    var PM25color = '#99ff99';
    console.log('PM25value');
    console.log(PM25value.toString());



    if (PM25value <= 11) {
        PM25color = '#99ff99';
    } else if (PM25value > 11 && PM25value <= 23) {
        PM25color = '#66ff66';
    } else if (PM25value > 23 && PM25value <= 35) {
        PM25color = '#ffff66';
    } else if (PM25value > 35 && PM25value <= 41) {
        PM25color = '#ffcc00';
    } else if (PM25value > 41 && PM25value <= 47) {
        PM25color = '#ff9933';
    } else if (PM25value > 47 && PM25value <= 53) {
        PM25color = '#ff6666';
    } else if (PM25value > 53 && PM25value <= 64) {
        PM25color = '#ff3300';
    } else if (PM25value > 64 && PM25value <= 70) {
        PM25color = '#990000';
    } else { PM25color = '#cc00cc'; }


    ctx.fillStyle = PM25color;
    ctx.fillRect(0, 0, 300, 200);
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("PM25:", canvas.width / 2, canvas.height / 4);
    ctx.font = "72px Arial";
    ctx.fillText(PM25value.toString(), canvas.width / 2, canvas.height * 3 / 4);
}
