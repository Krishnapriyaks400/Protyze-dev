// function numberCounter() {       
//         var dataId = $('.number-counter').attr('data-section-id');  
//         $('.inview-' + dataId + '-initialized').bind('inview', function(event, visible) {
//             if (visible) {
//                 //$(this).stop().animate({ opacity: 1 });

//                 $('.number-counter-value').each(function() {
//                     var $this = $(this),
//                         max_value = $this.attr('data-value');
//                     $({
//                         counter_value: $this.text()
//                     }).animate({
//                         counter_value: max_value
//                     }, {
//                         step: function step() {
//                             $this.text(Math.floor(this.counter_value));
//                         },
//                         duration: 1500,
//                         easing: 'swing',
//                         complete: function complete() {
//                             $this.text(this.counter_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")); //For placing comma(,) after particular digit
//                         }
//                     });
//                 });
//             } else {
//                 //  $(this).stop().animate({ opacity: 0 });
//             }
//         });
//     }
//     $(document).ready(function(){
//     numberCounter();  
//     });


// Old code with jquery and inview js working start code

// function numberCounter() {
//     var dataId = $('.number-counter').attr('data-section-id');


//     $('.inview-' + dataId + '-initialized').bind('inview', function(event, visible) {
//         if (visible) {
       
//             $(this).find('.number-counter-value').each(function() {
//                 var $this = $(this),
//                     max_value = $this.attr('data-value');
                
    
//                 if (!$this.hasClass('animated')) {
//                     $this.addClass('animated'); 
                    
                
//                     $({
//                         counter_value: 0 
//                     }).animate({
//                         counter_value: max_value
//                     }, {
//                         step: function step() {
//                             $this.text(Math.floor(this.counter_value));
//                         },
//                         duration: 1500,
//                         easing: 'swing',
//                         complete: function complete() {
                          
//                             $this.text(this.counter_value.toString().replace(/\,/g, ''));
//                         }
//                     });
//                 }
//             });
//         } else {
         
//             $(this).find('.number-counter-value').removeClass('animated').text('0');
//         }
//     });
// }

// $(document).ready(function(){
//     numberCounter();  
// });

// Old code with jquery and inview js working end code



(() => {
  function animateNumber(el, to, duration = 1500) {
    const from = 0;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(from + (to - from) * progress);
      el.textContent = String(value);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // match your "complete" behavior (no commas anyway)
        el.textContent = String(to).replace(/,/g, "");
      }
    };

    requestAnimationFrame(step);
  }

  function initNumberCounters() {
    const sections = document.querySelectorAll(".number-counter");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wrapper = entry.target;

          if (entry.isIntersecting) {
            wrapper.querySelectorAll(".number-counter-value").forEach((el) => {
              const maxValue = Number(el.getAttribute("data-value")) || 0;

              if (!el.classList.contains("animated")) {
                el.classList.add("animated");
                animateNumber(el, maxValue, 1500);
              }
            });
          } else {
            // reset like your else block
            wrapper.querySelectorAll(".number-counter-value").forEach((el) => {
              el.classList.remove("animated");
              el.textContent = "0";
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe the wrapper you used for inview binding
    sections.forEach((section) => {
      const id = section.getAttribute("data-section-id");
      const wrapper = section.querySelector(".inview-" + id + "-initialized");
      if (wrapper) observer.observe(wrapper);
    });
  }

  document.addEventListener("DOMContentLoaded", initNumberCounters);
})();

