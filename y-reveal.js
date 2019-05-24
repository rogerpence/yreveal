
var rp = rp || {};

 rp.YReveal = function(actionElemSelector, contentElemSelector) {
    const clicker = document.querySelector(actionElemSelector);
    const elem = document.querySelector(contentElemSelector);

    if (!clicker) {
        throw('No action element to toggle show/hide found.');
    }

    if (!elem) {
        throw('No content element to show/hide found.');
    }            

    clicker.addEventListener('click', (e) => { 
        e.preventDefault();
        this.toggle(elem);        
    }, false);    
}

rp.YReveal.prototype.toggle = function(elem) {
    if (elem.classList.contains('block')) {
        this.hide(elem);
    }
    else {
        this.show(elem);     
    } 
}    

rp.YReveal.prototype.show = function(elem) {
    const elementHeight = elem.scrollHeight;
    elem.style.height = 0;

    elem.classList.add('block');

    for (let i = 0; i <= elementHeight; i++) {
        elem.style.height = `${i}px`;        
    }        
}    

rp.YReveal.prototype.hide = function(elem) {
    const elementHeight = elem.scrollHeight;

    for (let i = elementHeight; i !== -1; i--) {
        elem.style.height = `${i}px`;        
    }        
    elem.classList.remove('block');
}    

