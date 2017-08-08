
var seekVar,
    quizInterval;

function seekFun() {
    $(".inside-seekbar").animate({
        width: "+=10px"
    }, 200);

    if(parseInt($(".inside-seekbar").css("width")) >= 1140){
        clearInterval(seekVar);
        clearInterval(quizInterval);
    }
}
