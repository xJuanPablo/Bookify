// gsap.registerEffect({
//     name: "fade",
//     defaults: { duration: 10 }, //defaults get applied to the "config" object passed to the effect below
//     effect: (targets, config) => {
//         return gsap.to(targets, { duration: config.duration, opacity: 0 });
//     }
// });

// //now we can use it like this:
// //gsap.effects.fade("#myElement");

// document.querySelectorAll("#myElement").forEach(function (element) {
//     element.addEventListener("mouseenter", function () {
//         gsap.effects.fade(this);
//     });
// });


// Get the container
const items = document.querySelectorAll('.content');
const text = "Bookify";
const element = document.getElementById("myElement");

// Split the text into individual characters
const chars = text.split("");

// Set initial position of items outside the screen on the left
gsap.set(items, { x: '-100%' });

// Animate the items into view
gsap.to(items, {
    duration: 4,
    x: '50%',
    y: '25%',
    opacity: 1,
    stagger: 0.1,
    ease: 'power2.out',
    onComplete: function() {
        console.log('Animation Completed!');

        // Animate each character
        chars.forEach((char, index) => {
            const charSpan = document.createElement("span");
            charSpan.textContent = char;
            charSpan.style.opacity = 0;
            element.appendChild(charSpan);
        
            gsap.to(charSpan, {
                duration: 0.5,
                opacity: 1,
                delay: index * 0.1,
            });
        });
    }
});

