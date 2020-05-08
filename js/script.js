function jQuery(selection, context = document) {
    this.element = Array.from(context.querySelectorAll(selection));
    return this
};

jQuery.prototype.each = function (fn) {
    this.element.forEach((element, index) => fn.call(element, element, index));
    return this
};

jQuery.prototype.click = function (fn) {
    this.each(element => element.addEventListener("click", fn));
    return this
};
jQuery.prototype.addReport = function (text) {
    this.each(element => element.innerText = text);
    return this
};

function grabValue(id, timestamp) {
    let element = document.querySelector(id).value;
    if (element <= 60 && element >= 0) {
        $("#report").addReport("");
        element *= timestamp;
        return element;
    } else {
        $("#report").addReport("Вводимое вами значение должно содержать цыфры от 0 до 60");
        return element-element
    }
}

const checkLength = (value, interval) => {
    if (value.length < interval)
        return 0 + value;
    return value;
};

function timestampConverter(sum){

    let hours = String(Math.floor((sum / (1000 * 60 * 60)) % 60));
    let minutes = String(Math.floor((sum / (1000 * 60)) % 60));
    let seconds = String(Math.floor((sum / 1000 ) % 60));


    dictionary = {
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds,

    };

    clock.innerText = checkLength(dictionary.hours, 2) + ":" + checkLength(dictionary.minutes, 2) + ":" + checkLength(dictionary.seconds, 2);


    return dictionary

};


function timer() {
    if (countDown > 0) {
        countDown -= 1000;
    } else {
        alert("Спасибо за внимание :)");
        clearInterval(time);
        hideAndShow("#pause", "#start")
        countDown = 0;
    }

    timestampConverter(countDown);

};

function hideAndShow (hide, show) {
    let hider = document.querySelector(hide);
    let showr = document.querySelector(show);
    hider.style.display = "none";
    showr.style.display = "inline-block";

};

let $ = (e) => new jQuery(e);

let dictionary = {};
let countDown = 0;



$("#btn1").click(element => countDown += grabValue("#inp1", 3600000)).click(element => timestampConverter(countDown));
$("#btn2").click(element => countDown += grabValue("#inp2", 60000)).click(element => timestampConverter(countDown));
$("#btn3").click(element => countDown += grabValue("#inp3", 1000)).click(element => timestampConverter(countDown));

$("#btn1min").click(element => countDown -= grabValue("#inp1", 3600000)).click(element => timestampConverter(countDown));
$("#btn2min").click(element => countDown -= grabValue("#inp2", 60000)).click(element => timestampConverter(countDown));
$("#btn3min").click(element => countDown -= grabValue("#inp3", 1000)).click(element => timestampConverter(countDown));


$("#start").click(element => time = window.setInterval(timer, 1000)).click(element => hideAndShow("#start", "#pause"));
$("#stop").click(element => countDown = -1).click(element => timestampConverter(0)).click(element => clearInterval(time)).click(element => hideAndShow("#pause", "#start"));
$("#pause").click(element => clearInterval(time)).click(element => hideAndShow("#pause", "#start"));






