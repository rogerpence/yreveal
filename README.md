## YReveal: A JavaScript object that enables CSS height transitions

> See this code in action [in this CodePen](https://codepen.io/rogerpence/pen/RmMYzZ)

I've tried every hack there is to apply CSS transitions to an element's 'height' property. The problem is that elements that ['auto' values are intentionally excluded from CSS transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions#Which_CSS_properties_can_be_transitioned).
    
The [max-height hack is faulty](https://css-tricks.com/using-css-transitions-auto-dimensions/) because the transition applies to the max-height property and that value won't match the height property (you have to guess a good max-height value--and you often can't!).

[Chris Ferdinandi's technique came close](https://gomakethings.com/how-to-add-transition-animations-to-vanilla-javascript-show-and-hide-methods/), but it had issues on FireFox when the hide/show code was called too quickly repeatedly--like might be the case if the user clicked or tapped too quickly on the element invoking the hide/show.

After more time than I care to admit spending, I gave up and decided to go old school and manually show/hide the element a pixel at a time  with a for loop. 

The CSS needed is shown below. The element you want to show/hide with a transition should be marked inititially `display:block` and `height: 0`. Set the transition on the `height` property with whatever duration and timing function you want. 

### The CSS

    .toggle-content {
        display: block;
        height: 0;
        overflow: hidden;
        transition: height 400ms ease; 
    }

    .block {
        display: block;
    }

### The JavaScript 

The first pass at the JavaScript loop I used to show an element started out like this:

    const elementHeight = elem.scrollHeight;
    elem.style.height = 0;

    elem.classList.add('block');  

    for (let i = 0; i <= elementHeight; i++) {
        elem.style.height = `${i}px`;        
        setTimeout(()) => {
        }, 50);
    }            

Assuming that CSS transitions wouldn't work I thought the `setTimeout` would cause the loop to behave like a manual transition. Success came quickly as the element displayed, with a gentle "roll down" effect. However, I quickly realized that the `setTimeout` wasn't doing a damned thing! I had left the transition in the CSS and it was doing the transition for me--because (I think) the loop ensures the element's height is always explicitly set (taking `auto` for the element's height out of the picture). 

The `show` loop ends up being very simple: 

    const elementHeight = elem.scrollHeight;
    elem.style.height = 0;

    elem.classList.add('block');  

    for (let i = 0; i <= elementHeight; i++) {
        elem.style.height = `${i}px`;        
    }            

and the `hide` loop is similar:

   const elementHeight = elem.scrollHeight;

    for (let i = elementHeight; i !== -1; i--) {
        elem.style.height = `${i}px`;        
    }        
    elem.classList.remove('block');

The result feels a little little hacky to me, but no more so than any other hack I've found--and hack works for me. 
   
### To use YReveal
    
Instance the rp.YReveal object with two arguments:
    * The selector for the button/anchor tag to which you want a click event bound. Clicking this element causes the height transition.
    * The selector of the element for which you want the height transition applied.       

For example:           

    new rp.YReveal('#clicker.toggle-menu', '#example');