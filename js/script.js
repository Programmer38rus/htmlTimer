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

function grabValue(id) {
    const element = document.querySelector(id);
    return element
}

let $ = (e) => new jQuery(e);
let hour = 0;

// let a = $("#inp1");
// console.log(grabValue("#inp1"));
$("#btn1").click(element => hour = new grabValue("#inp1").value);
// $("#btn1").click(a = $("#inp1").value = console.log(a));zxcz
// $("#btn1").click(element => hour = $("#int1").value);