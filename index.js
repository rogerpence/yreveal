
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

const getHeight = function (elem) {
    elem.style.display = 'block'; // Make it visible
    return elem.scrollHeight + 'px'; // Get it's height
};
 
 // Show an element
const show = function (elem) {
    const anchor = document.getElementById('clicker');
    anchor.href = '';

    addAndRemoveHandler(elem, 'transitionend', (elem) => {
        elem.style.height = 'auto';
        // console.log(elem.style.height);
        // console.log('transition for show method');
        
        const anchor = document.getElementById('clicker');
        anchor.href = anchor.getAttribute('data-href');
    }, 500)

     // Get the natural height of the element
    const height = getHeight(elem);   
    elem.classList.add('block', 'h-auto');    
    elem.style.height = height; 
 
    // Once the transition is complete, remove the inline max-height so the content can scale responsively
    // window.setTimeout(function () {
    //     elem.style.height = 'auto';
    // }, 350); 
 };
 
 // Hide an element
 const hide = function (elem) {
    const anchor = document.getElementById('clicker');
    anchor.href = '';

    elem.style.height = 'auto';

    addAndRemoveHandler(elem, 'transitionend', (elem) => {
        elem.classList.remove('block', 'h-auto');
        console.log('transition for hide method');
        
        const anchor = document.getElementById('clicker');
        anchor.href = anchor.getAttribute('data-href');
    }, 500)

    const height = getHeight(elem); // Get the natural height
    // Give the element a height to change from
    elem.style.height = height; 
  
    // Set the height back to 0
    window.setTimeout(function () {
        elem.style.height = '0';
    }, 100);
 
    // When the transition is complete, hide it
    // window.setTimeout(function () {
    //     elem.classList.remove('is-visible');
    // }, 350); 
 };
 
 // Toggle element visibility
 const toggle = function (elem, timing) { 
    // If the element is visible, hide it
    if (elem.classList.contains('block')) {
        hide(elem);
        return;
    }
 
    // Otherwise, show it
    show(elem);     
 };
 
 // Listen for click events
document.addEventListener('click', function (event) { 
    // Make sure clicked element is our toggle
    if (!event.target.classList.contains('toggle')) return;

    // Prevent default link behavior
    event.preventDefault();
 
    // Get the content
    //var content = document.querySelector(event.target.hash);
    var content = document.getElementById('example');
    if (!content) return;

    event.target.setAttribute('data-href', event.target.href);
    
    // content.addEventListener('transitionend', (args) => {        
    //     console.log('transition ended');
    // });
    
    // Toggle the content
    toggle(content);
 
}, false);