// document.addEventListener("DOMContentLoaded",function(){const marquees=document.querySelectorAll(".movingtext h2"),speeds=[60,15,20,15];marquees.forEach((marquee,index)=>{const width=marquee.clientWidth;function animateMarquee(){marquee.style.transition="none",marquee.style.left="10%",setTimeout(()=>{marquee.style.transition=`left ${speeds[index]}s linear`,marquee.style.left=`-${width}px`},100),marquee.addEventListener("transitionend",animateMarquee)}animateMarquee()})});

document.addEventListener("DOMContentLoaded", function() {
    const marquees = document.querySelectorAll(".movingtext h2");
    const speeds = [50, 20, 20, 15]; // Define different speeds for each marquee
    
    marquees.forEach((marquee, index) => {
        const width = marquee.clientWidth;
        const speed = speeds[index]; // Get the speed for the current marquee
        
        function animateMarquee() {
            marquee.style.transition = "none";
            marquee.style.left = "10%";
            
            setTimeout(() => {
                marquee.style.transition = `left ${speed}s linear`;
                if(index === 0) {
                    marquee.style.left = "-1500px"; // Set left position to -1500px for the first marquee
                } else {
                    marquee.style.left = `-${width}px`; // For other marquees, set left position based on width
                }
            }, 100);
            
            marquee.addEventListener("transitionend", animateMarquee);
        }
        
        animateMarquee();
    });
});




