
const addAndRemoveHandler = function(target, eventName, fn, delay = 250) {
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

const getElementHeight = function (elem) {
    elem.style.display = 'block'; // Make it visible
    return elem.scrollHeight + 'px'; // Get it's height
};
 
 // Show an element
const show = function (elem) {
    // const anchor = document.getElementById('clicker');
    // anchor.href = '';

    addAndRemoveHandler(elem, 'transitionend', (elem) => {
        elem.style.height = 'auto';

        // const anchor = document.getElementById('clicker');
        // anchor.href = anchor.getAttribute('data-href');
    }, 500)

     // Get the natural height of the element
    const height = getElementHeight(elem);   
    elem.classList.add('block', 'h-auto');    
    elem.style.height = height;  
 };
 
 // Hide an element
 const hide = function (elem) {
    // const anchor = document.getElementById('clicker');
    // anchor.href = '';

    elem.style.height = 'auto';

    addAndRemoveHandler(elem, 'transitionend', (elem) => {
        elem.classList.remove('block', 'h-auto');
       
        // const anchor = document.getElementById('clicker');
        // anchor.href = anchor.getAttribute('data-href');
    }, 500)

    const height = getElementHeight(elem); 
    // Give the element a height to change from
    elem.style.height = height; 
  
    // Set the height back to 0
    window.setTimeout(function () {
        elem.style.height = '0';
    }, 100);
 };
 
 // Toggle element visibility
 const toggle = function (elem, timing) { 
    if (elem.classList.contains('block')) {
        hide(elem);
        return;
    }
    else {
        show(elem);     
    } 
 };
 
 // Listen for click events
const clicker = document.querySelector('#clicker.toggle-menu');
clicker.addEventListener('click', function (event) { 
    // Prevent default link behavior
    event.preventDefault();
 
    // Get the content
    var content = document.getElementById('example');
    if (!content) return;
   
    // Toggle the content
    toggle(content); 
}, false);