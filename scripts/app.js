var vid = document.getElementById("vid");
var quizArrayObj = [
    {
        quiz: "ما الحرف الدي سنتكلم عنه؟",
        ans: "حرف",
        correctAns: "الفاء",
    }
];
var score = 0,
    currentQuiz = 0;
var seekVar,
    quizInterval;
vid.addEventListener("click", function (e) {
    e.target.pause();
    $(".play-btn").show();
    clearInterval(seekVar);
})

$(".play-btn").click("click", function () {
    $(this).hide();
    vid.play();
    seekVar = setInterval(seekFun, 200);
    quizInterval = setInterval(quizFun, 10);
});

function seekFun() {
    $(".inside-seekbar").animate({
        width: "+=10px"
    }, 200);

    if (parseInt($(".inside-seekbar").css("width")) >= 1140) {
        clearInterval(seekVar);
        clearInterval(quizInterval);
    }
}

function quizFun() {
    if (vid.currentTime >= 4.6 && vid.currentTime <= 4.7) {
        vid.pause();
        clearInterval(seekVar);
        clearInterval(quizInterval);
        $(".quiz").text(quizArrayObj[currentQuiz].quiz);
        $(".ans-span").text(quizArrayObj[currentQuiz].ans);
        $(".quiz-div").animate({
            width: "500px",
            height: "300px",
            padding: "100px 50px"
        }, 200);
    }
}

$(".check-ans-btn").click(function () {
    if ($(".entered-ans").val().replace(/\s/g, '') == quizArrayObj[currentQuiz].correctAns) {

        score++;
        $(".score-span").text(score);

    }
    setTimeout(function () {
        $(".quiz-div").css({
            "width": "0",
            "height": "0",
            "padding": "0"
        });
        vid.play();
        setTimeout(function () {
            seekVar = setInterval(seekFun, 200);
            quizInterval = setInterval(quizFun, 10);
        }, 500);
    }, 300);
});
