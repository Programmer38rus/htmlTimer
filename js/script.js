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

    if (element <= 59 && element >= 0) {
        $("#report").addReport("");
        element *= timestamp
        return element;
    } else {
        $("#report").addReport("Вводимое вами значение должно содержать цыфры от 0 до 59");
    }
}

const checkLength = (value, interval) => {
    if (value.length < interval)
        return 0 + value;
    return value;
};

function timestampConverter(sum){

    let hours = Math.floor((sum / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((sum / (1000 * 60)) % 60);
    let seconds = Math.floor((sum / 1000 ) % 60);

    dictionary = {
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds,
    };


    return dictionary

};

// jQuery.prototype.add

let $ = (e) => new jQuery(e);

let dictionary = {};
let countDown = 0;

// let hour, minute, second = 0;
// let gg = {};
// let count = 0;

$("#btn1").click(element => countDown += grabValue("#inp1", 3600000), timestampConverter(countDown));
$("#btn2").click(element => countDown += grabValue("#inp2", 60000));
$("#btn3").click(element => countDown += grabValue("#inp3", 1000));
$("#start").click(element => console.log(timestampConverter(countDown)));
$("#stop").click(element => countDown = 0);



function timer() {

    clock.innerText = checkLength(dictionary.hours, 2) + ":" + checkLength(dictionary.minutes, 2) + ":" + checkLength(dictionary.seconds, 2);
    timestampConverter(countDown);
    countDown -= 1000;
    const time = window.setInterval(timer, 1000);

};




