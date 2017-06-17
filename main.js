$("#submit").click(scoreSubmit);
$("#time-select").click(scoreType);
$("#name-sort").click(rearrange.bind(this, "name"));
$("#game-sort").click(rearrange.bind(this, "game"));
$("#date-sort").click(rearrange.bind(this, "date"));
$("#score-sort").click(rearrange.bind(this, "score"));

function scoreType() {
    if ($("#time-select").prop("checked") === true) {
        $("#score-type").html('<input type="number" size="2" class="time" id="score-min" placeholder="M">:<input type="number" size="2" class="time" id="score-sec" placeholder="S">')
    } else {
        $("#score-type").html('<input type="number" id="score" placeholder="Score here">')
    }
}


var sorty = [];

function scoreSubmit() {
    var scoreRow = {};
    scoreRow.name = $("#player").val();
    scoreRow.game = $("#game").val();
    scoreRow.date = $("#date").val();
    if ($("#time-select").prop("checked") === true) {
        scoreRow.score = $("#score-min").val() + ":" + $("#score-sec").val()
    } else {
        scoreRow.score = $("#score").val();
    };
    var trash = ["Blink twice if your skill is being held hostage.", "Could you imagine what it would have been like if you had more oxygen at birth", "Don't worry guys, I'm a garbage collector. I'm used to carrying trash.", "You're the human equivalent of a participation award.", "You know all those times your parents said video games would get you nowhere? They were right.", "Perhaps your strategy should include trying.", "You must really like that respawn timer.", "I hope one day you regain the use of your hands.", "You're as useful as a white crayon.", "You would make a perfect stormtrooper."]
    scoreRow.talk = ""
    if (scoreRow.name === "") {
        alert("Please enter a player name");
        return
    }
    if (scoreRow.game === "") {
        alert("Please enter a game name");
        return
    }
    if (scoreRow.date === "") {
        alert("Please enter a date");
        return
    }
    if (scoreRow.score === "" || scoreRow.score === "0" || ($("#score-min").val() === "" && $("#score-sec").val() === "") || ($("#score-min").val() === "0" && $("#score-sec").val() === "0")) {
        alert("Please enter a score");
        return
    }

    var num = Math.floor(Math.random() * 10);
    if ($("#trash").prop("checked") === true) {
        for (var i = 0; i <= num; i++) {
            scoreRow.talk = trash[i];
        }
    }
    if ($("#time-select").prop("checked") === true) {
        var min = $("#score-min").val()
        var sec = $("#score-sec").val();
                $("#score-list").append(`       
                <tr class="info">
                         <td>Jordan</td>
                        <td>` +
                    scoreRow.game + `</td>
                        <td>` +
                    scoreRow.date + `</td>
                        <td>` +
                    min + ":" + (parseInt(sec) + num) + `</td>
                        <td class ="red" >You'll never beat my score!</td>
                </tr>`);
    } else {
        $("#score-list").append(`       
        <tr class="info">
                 <td>Jordan</td>
                <td>` +
            scoreRow.game + `</td>
                <td>` +
            scoreRow.date + `</td>
                <td>` +
            (parseInt(scoreRow.score) + (num * 100 + num)) + `</td>
                <td class ="red" >You'll never beat my score!</td>
        </tr>`);
    };
        $("#score-list").append(`       
            <tr class="info">
                     <td class="name">` +
            scoreRow.name + `</td>
                    <td class="game">` +
            scoreRow.game + `</td>
                    <td class="date">` +
            scoreRow.date + `</td>
                    <td class="score">` +
            scoreRow.score + `</td>
                    <td class="talk">` +
            scoreRow.talk + `</td>
            </tr>`);
    sorty.push(scoreRow);
    localStorage.setItem("sorty", JSON.stringify(sorty));
}

function rearrange(type) {
    function compare(a, b) {
        if (a[type] < b[type]) {
            return -1;
        } else if (a[type] > b[type]) {
            return 1;
        } else {
            return 0;
        }
    }
    sorty.sort(compare);
    $("#score-list").empty();
    for (var i = 0; i < sorty.length; i++) {
        $("#score-list").append(`       
        <tr class="info">
                 <td class="name">` +
            sorty[i].name + `</td>
                <td class="game">` +
            sorty[i].game + `</td>
                <td class="date">` +
            sorty[i].date + `</td>
                <td class="score">` +
            sorty[i].score + `</td>
                <td class="talk">` +
            sorty[i].talk + `</td>
        </tr>`)
    }
}

function displayList() {
    if (localStorage.getItem("sorty") !== null) {
        sorty = JSON.parse(localStorage.getItem("sorty"));
        $("#score-list").empty();
        for (var i = 0; i < sorty.length; i++) {
            $("#score-list").append(`       
        <tr class="info">
                 <td class="name">` +
                sorty[i].name + `</td>
                <td class="game">` +
                sorty[i].game + `</td>
                <td class="date">` +
                sorty[i].date + `</td>
                <td class="score">` +
                sorty[i].score + `</td>
                <td class="talk">` +
                sorty[i].talk + `</td>
        </tr>`)
        }
    }
}
