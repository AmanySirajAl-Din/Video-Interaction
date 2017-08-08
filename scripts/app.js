var vid = document.getElementById("vid");
var quizArrayObj = [
    {
        quiz: "ما الحرف الدي سنتكلم عنه؟",
        ans: "حرف",
        correctAns: "الفاء",
    }
]
var seekVar,
    quizInterval;
vid.addEventListener("click", function(e){
    e.target.pause();
    $(".play-btn").show();
    clearInterval(seekVar);
})

$(".play-btn").click("click", function(){
    $(this).hide();
    vid.play();
    seekVar = setInterval(seekFun, 200);
    quizInterval = setInterval(quizFun, 10);
});

function seekFun() {
    $(".inside-seekbar").animate({
        width: "+=10px"
    }, 200);

    if(parseInt($(".inside-seekbar").css("width")) >= 1140){
        clearInterval(seekVar);
        clearInterval(quizInterval);
        $(".quiz").text(quizArrayObj[0].quiz);
        $(".quiz-div").css("transform", "scale(1)");
        
    }
}

function quizFun(){
    if(vid.currentTime >= 4.6 && vid.currentTime <= 4.7){
        vid.pause();
        clearInterval(seekVar);
        clearInterval(quizInterval);
        
    }
}
