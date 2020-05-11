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
    /**
     * Принимает данные из input полей на странице, в случае ошибок
     * выводит репорт в DOC
     * */
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
    /**
     * Прежде чем поместить в DOM добавляет 0 в случе если
     * меньше заданного интервала
     * */
    if (value.length < interval)
        return 0 + value;
    return value;
};

function timestampConverter(sum){

    /**
     * функция конвертирует таймстап в часы, минуты и секунды, после чего
     * размещает их в словарь, после чего обновляет док clock отображаемый
     * на странице
     * */

    if (countDown >= 0) {
        let hours = String(Math.floor((sum / (1000 * 60 * 60)) % 60));
        let minutes = String(Math.floor((sum / (1000 * 60)) % 60));
        let seconds = String(Math.floor((sum / 1000) % 60));


        dictionary = {
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds,

        };

        clock.innerText = checkLength(dictionary.hours, 2) + ":" + checkLength(dictionary.minutes, 2) + ":" + checkLength(dictionary.seconds, 2);


        return dictionary
    } else {
        countDown = 0
    }

};


function timer() {

    /**
     * обновляет таймер через заданные интервал
     * и останавливает его при достижении countDown = 0
     * */

    if (countDown > 0) {
        countDown -= 10;
    } else {
        alert("Спасибо за внимание :)");
        clearInterval(time);
        hideAndShow("#pause", "#start");
        countDown = 0;
    }

    timestampConverter(countDown);

};

function hideAndShow (hide, show) {

    /**
     * прячет одну кнопку и показывает другую
     * */

    let hider = document.querySelector(hide);
    let shower = document.querySelector(show);
    hider.style.display = "none";
    shower.style.display = "inline-block";

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


$("#start").click(element => time = window.setInterval(timer, 10)).click(element => hideAndShow("#start", "#pause"));
$("#stop").click(element => countDown = 0).click(element => timestampConverter(0)).click(element => clearInterval(time)).click(element => hideAndShow("#pause", "#start"));
$("#pause").click(element => clearInterval(time)).click(element => hideAndShow("#pause", "#start"));






