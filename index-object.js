var rp = rp || {};

rp.VerticalReveal = function(actionElem) {
    const clicker = document.querySelector(actionElem);
    if (!clicker) {
        console.log('No action element found.')
        return;
    }

    // The self-less arrow function makes it 
    // possible for the click event handler to call the 
    // 'toggle' method. Otherwise 'this' would refer 
    // the 'click' handler itself.
    clicker.addEventListener('click', (e) => { 
        e.preventDefault();
     
        // Ensure there is content to show/hide.
        var content = document.getElementById('example');
        if (!content) {
            console.log('No content element to show/hide found.')
            return;
        }            
       
        this.toggle(content);        
    }, false);    
}

rp.VerticalReveal.prototype.assignOneTimeEventHandler = function(target, eventName, fn, delay = 0) {
    // A delay of 250ms or so may be necessary when working with dynamically-added
    // DOM elements. 
    const eventHandler = (event) => {
        if (fn && typeof fn === 'function') {
            setTimeout(() => {
                fn(target);
            }, delay)
        }
        target.removeEventListener(eventName, eventHandler);
    }

    target.addEventListener(eventName, eventHandler);
}

rp.VerticalReveal.prototype.getElementHeight = function (elem) {
    // The element needs to be visible for scrollHeight 
    // to correctly return the element's height. 
    elem.style.display = 'block'; 
    return elem.scrollHeight + 'px'; 
};

rp.VerticalReveal.prototype.toggle = function(elem) {
    if (elem.classList.contains('block')) {
        this.hide(elem);
        return;
    }
    else {
        this.show(elem);     
    } 
}    

rp.VerticalReveal.prototype.show = function(elem) {
    this.assignOneTimeEventHandler(elem, 'transitionend', (elem) => {
        elem.style.height = 'auto';

    }, 500)

    const height = this.getElementHeight(elem);   
    elem.classList.add('block', 'h-auto');    
    elem.style.height = height;  
}

rp.VerticalReveal.prototype.hide = function(elem) {
    elem.style.height = 'auto';

    this.assignOneTimeEventHandler(elem, 'transitionend', (elem) => {
        elem.classList.remove('block', 'h-auto');
    }, 500)

    const height = this.getElementHeight(elem); 
    // Give the element a height to change from.
    elem.style.height = height; 
  
    // Give the DOM just a few milliseconds to catch up to the 
    // height having been set and then set height to zero. 
    // This triggers the 'hide' transition.
    window.setTimeout(function () {
        elem.style.height = '0';
    }, 100);
 };
