var vid = document.getElementById("vid");
var seekVar;
vid.addEventListener("click", function (e) {
    e.target.pause();
    $(".play-btn").show();
    clearInterval(seekVar);
});

$(".play-btn").click("click", function () {
    $(this).hide();
    vid.play();
    seekVar = setInterval(seekFun, 200);
});

function seekFun() {
    $(".inside-seekbar").animate({
        width: "+=10px"
    }, 200);

    if (parseInt($(".inside-seekbar").css("width")) >= 1140) {
        clearInterval(seekVar);
    }
}
