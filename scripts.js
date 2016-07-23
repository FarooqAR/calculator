$(document).ready(function() {
    var history = $("#history");
    var resultScreen = $("#result");
    var operator = "";
    var result;
    $(document).on("keydown", function(event) {
        if (event.keyCode == 13) {//print result on enter 
            $('button[value="="]').click();
        } 
        //events triggered by numpad keys
        else if (event.keyCode >= 96 && event.keyCode <= 105) {//add number when a number key is pressed
            num(parseInt(String.fromCharCode(event.keyCode - 48)));
        } else if (event.keyCode == 8) {//delete number when backspace is pressed
            deleteNum();
            return false;//prevents page from going back to history
        } else if (event.keyCode == 110) {//add decimal when decimal key (only numpad) is pressed 
            addDecimal();
        } else if (event.keyCode == 109) {//add subtract sign/operator when subtract key (only numpad) is pressed
            addOperator("-");
        } else if (event.keyCode == 111) {//add divide sign/operator when divide key (only numpad) is pressed
            addOperator("/");
        } else if (event.keyCode == 106) {//add multiply sign/operator when multiply key (only numpad) is pressed
            addOperator("x");
        } else if (event.keyCode == 107) {//add plus sign/operator when plus key (only numpad) is pressed
            addOperator("+");
        }
    });

    //button click events
    $("button").click(function() {
        var value = $(this).val();

        //if the value is a number
        if (value.charCodeAt(0) >= 48 && value.charCodeAt(0) <= 57) {
            num(parseInt(value));
        } 
        //if del key is pressed
        else if (value === "del") {
            deleteNum();//delete last number
        } else if (value === "ce") {
            clearResult();//clear result variable as well as history and result screen
        } else if (value === "√") {
            squareRoot();//perform square root and print result on result screen
        } else if (value === ".") {
            addDecimal();//add decimal point at the last of resultScreen
        } else if (value !== "=") {
            addOperator(value);//add dmas operator
        }
    });
    $('button[value="="]').click(equals);//print result when = key is pressed



    //functions

    function equals() {
        var resultText = isNaN(parseInt(resultScreen.text())) ? 0 : parseFloat(resultScreen.text()); //empty or non number result = 0 otherwise the number
        if (history.text() != "") {
            setResult(resultText);
        } else if (history.text().indexOf('√') != -1) {
            resultScreen.text("" + result);
        }
        if (result !== undefined) {
            resultScreen.text("" + result);
        }
        history.text("");
    }

    function num(value) {//add the given number at the end of result screen
        resultScreen.text(resultScreen.text() + value);
    }

    function deleteNum() {
        var text = resultScreen.text();
        text = text.substr(0, text.length - 1);//remove last digit or decimal from resultscreen
        resultScreen.text(text);
        result = parseFloat(text);
    }

    function clearResult() {
        result = 0;
        resultScreen.text('');
        history.text('');
    }

    function squareRoot() {
        var val = parseInt(resultScreen.text()) ? resultScreen.text() : "";
        if (val !== "") {
            var historyText = history.text();
            result = Math.sqrt(val);
            history.text("√" + val);
            resultScreen.text(result);
        }
    }

    function addDecimal() {
        //add decimal point if it is not present
        if (!(/\./.test(resultScreen.text()))) {
            resultScreen.text(resultScreen.text() + ".");
        }
    }

    function changeOperator(opr) {
        operator = (opr == "/") ? "divide" : (opr == "x") ? "multiply" : (opr == "+") ? "add" : "subtract";
    }

    function addOperator(opr) {
        var resultText = resultScreen.text();
        var historyText = history.text();

        // If resultScreen is empty then change sign at the end of history
        if (resultText == "") {
            history.text(history.text().replace(/[^0-9]+$/, " " + opr + " "));
        }
        
        else if (historyText == "" || resultText.indexOf('√') != -1) {
            result = parseFloat(resultText);
            resultScreen.text('');
            history.text(result + " " + opr + " ");

        } else if ((result == 0 || result == Infinity) && parseInt(resultText) == 0) {
            result = 0;
            resultScreen.text('');
            history.text(result + " " + opr + " ");
        } else {
            resultText = parseFloat(resultText);
            setResult(resultText);
            history.text(result + " " + opr + " ");
            resultScreen.text("");
        }
        changeOperator(opr);

    }

    function setResult(resultText) {
        switch (operator) {
            case "divide":
                result = result / resultText;
                break;
            case "multiply":
                result = result * resultText;
                break;
            case "add":
                result = result + resultText;
                break;
            case "subtract":
                result = result - resultText;
                break;
        }
    }
});