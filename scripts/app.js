var vid = document.getElementById("vid");
var quizTypeArr = [$(".complete-quiz"), $(".mcq-quiz")]
var compArrayObj = [
    {
        quiz: "ما الحرف الدي سنتكلم عنه؟",
        ans: "حرف",
        correctAns: "الفاء",
    }
];

var mcqArrayObj = [
    {
        quiz: "ما المكان المتبقي لحرف الفاء؟",
        ans1: "حرف الفاء أول الكلمة",
        ans2: "حرف الفاء أخر الكلمة",
        ans3: "حرف الفاء وسط الكلمة",
        choicesNum: 3,
        correctAns: "ans2"
    }
];
var score = 0,
    currentCompQuiz = 0,
    currentMcqQuiz = 0;
var seekVar,
    quizInterval;

$(".quiz-part").hide();

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
        $(".quiz").text(compArrayObj[currentCompQuiz].quiz);
        $(".ans-span").text(compArrayObj[currentCompQuiz].ans);
        showQuizDiv();
        quizTypeArr[currentCompQuiz + currentMcqQuiz].show();
    } else if (vid.currentTime >= 15.4 && vid.currentTime <= 15.5) {
        $(".quiz").text(mcqArrayObj[currentMcqQuiz].quiz);
        for (var i = 1; i <= mcqArrayObj[currentMcqQuiz].choicesNum; i++) {
            $(".ans-span" + i).text(mcqArrayObj[currentMcqQuiz]["ans" + i]);
        }
        $("input[name=ans-radio" + (currentMcqQuiz+1)  + "]").each(function(index){
            $(this).val(mcqArrayObj[currentMcqQuiz]["ans" + (index+1)]);
        });
        showQuizDiv();
        quizTypeArr[currentCompQuiz + currentMcqQuiz].show();
    }
}

$(".comp-check").click(function () {
    $(this).hide();
    if ($(".entered-ans").val().replace(/\s/g, '') == compArrayObj[currentCompQuiz].correctAns) {
       
        score++;
        $(".score-span").text(score);
        $(".entered-ans").css("color", "#019b01");
        $(".feedback").addClass("correct-ans");
        $(".feedback").show();
    } else {
        $(".entered-ans").css("color", "red");
        $(".feedback").addClass("wrong-ans");
        $(".feedback").show();
    }
    currentCompQuiz++;

    setTimeout(hideQuizDiv, 500);
});

$(".mcq-check").click(function () {
    $(this).hide();
    if ($('input[name=ans-radio'+ (currentMcqQuiz+1) +']:checked').val() ==  mcqArrayObj[currentMcqQuiz][mcqArrayObj[currentMcqQuiz].correctAns]) {
        score++;
        $(".score-span").text(score);
        $('input[name=ans-radio'+ (currentMcqQuiz+1) +']:checked').prev().css("color", "#019b01");
        $(".feedback").addClass("correct-ans");
        $(".feedback").show();
    } else {
        $('input[name=ans-radio'+ (currentMcqQuiz+1) +']:checked').prev().css("color", "red");
        $(".feedback").addClass("wrong-ans");
        $(".feedback").show();
    }
    currentMcqQuiz++;

    setTimeout(hideQuizDiv, 1000);
});

function hideQuizDiv() {
    setTimeout(function () {
        $(".quiz-div").css({
            "width": "0",
            "height": "0",
            "padding": "0"
        });
        $(".feedback").removeClass(".correct-ans");
        $(".feedback").removeClass(".wrong-ans");
        $(".feedback").hide();
        $(".complete-quiz").hide();
        $(".mcq-quiz").hide();
        vid.play();
        setTimeout(function () {
            seekVar = setInterval(seekFun, 200);
            quizInterval = setInterval(quizFun, 10);
        }, 500);
    }, 300);
}

function showQuizDiv() {
    $(".comp-check").show();
    $(".mcq-check").show();
    vid.pause();
    clearInterval(seekVar);
    clearInterval(quizInterval);

    $(".quiz-div").animate({
        width: "500px",
        height: "300px",
        padding: "100px 50px"
    }, 200);
}
