/*
    YReveal: A JavaScript object that enables CSS height transitions.

    This code is derived from Chris Ferdinandi's original work at: 
    https://gomakethings.com/how-to-add-transition-animations-to-vanilla-javascript-show-and-hide-methods/

    All of the parts that work well are thanks to Chris's work. What I mostly did to it 
    was repackage it as self-enclosed JavaScript object. 

    To use it:        
    
    Instance the rp.YReveal object with two arguments:
        * The selector for the button/anchor tag to which you want a click
          event bound. Clicking this element causes the height transition.
        * The selector of the element for which you want the height transition 
          applied.       

    For example:           
        new rp.YReveal('#clicker.toggle-menu', '#example');

    Reading Chris's code it seemed to me like he's using setTimeout 
    when he should be using the transitionend event. I thought I was smart 
    enough to make Chris's code better by doing that. Alas, the time I spent
    thinking I was smarter than Chris didn't last very long. The code worked
    fine relacing the setTimeout's with transitionend event handlers--until 
    you click the intiator element fast many times. This causes some 
    asynchronous weirdness (which mostly surfaced as transitions quit working)
    with the transitionend that doesn't occur with setTimeout. 

    Thanks for your great code, Chris. It works great! 
*/    

var rp = rp || {};

rp.YReveal = function(actionElemSelector, contentElemSelector) {
    const clicker = document.querySelector(actionElemSelector);
    if (!clicker) {
        console.log('No action element found.')
        return;
    }
    
    clicker.addEventListener('click', (e) => { 
        e.preventDefault();
        
        // Ensure there is content to show/hide.
        var content = document.querySelector(contentElemSelector)
        if (!content) {
            console.log('No content element to show/hide found.')
            return;
        }            
       
        this.toggle(content);        
    }, false);    
}

rp.YReveal.prototype.toggle = function(elem) {
    if (elem.classList.contains('block')) {
        this.hide(elem);
        return;
    }
    else {
        this.show(elem);     
    } 
}    

rp.YReveal.prototype.show = function(elem) {
    // Make element visible so scrollHeight reports correct height.
    elem.style.display = 'block'; 
    elem.style.height = elem.scrollHeight + 'px';   
    elem.style.display = '';

    // Show the element, which triggers CSS transition.
    elem.classList.add('block', 'h-auto');    

    // After transition, remove element height. 
    setTimeout(() =>{
        elem.style.height = 'auto';
    }, 400)
}

rp.YReveal.prototype.hide = function(elem) {
    // Give the element a height from which to transition.
    elem.style.height = elem.scrollHeight + 'px'; 
  
    // Give the DOM just a few milliseconds to catch up to the 
    // height having been set and then set height to zero. 
    // This triggers the elements CSS transition.
    window.setTimeout(function () {
        elem.style.height = '0';
    }, 10);

    // Give the transition time to run then hide the 
    // element. 
    window.setTimeout(function () {
        elem.classList.remove('block', 'h-auto');
    }, 400);
 };


 rp.YReveal2 = function(actionElemSelector, contentElemSelector) {
    const clicker = document.querySelector(actionElemSelector);
    if (!clicker) {
        console.log('No action element found.')
        return;
    }
    
    clicker.addEventListener('click', (e) => { 
        e.preventDefault();
        
        // Ensure there is content to show/hide.
        var content = document.querySelector(contentElemSelector)
        if (!content) {
            console.log('No content element to show/hide found.')
            return;
        }            
       
        this.toggle(content);        
    }, false);    
}

rp.YReveal2.prototype.toggle = function(elem) {
    console.log(elem.scrollHeight);
    if (elem.classList.contains('block')) {
        this.hide(elem);
    }
    else {
        this.show(elem);     
    } 
}    

rp.YReveal2.prototype.show = function(elem) {
    const elementHeight = elem.scrollHeight;
    elem.style.height = 0;

    elem.classList.add('block');

    for (let i = 0; i <= elementHeight; i++) {
        elem.style.height = `${i}px`;        
    }        
}    

rp.YReveal2.prototype.hide = function(elem) {
    const elementHeight = elem.scrollHeight;

    for (let i = elementHeight; i !== -1; i--) {
        elem.style.height = `${i}px`;        
    }        
    elem.classList.remove('block');
}    

