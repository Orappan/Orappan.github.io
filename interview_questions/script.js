// Responsive Hamburger menu on navbar

document.getElementById('hamburger').addEventListener('click', function () {
    document.getElementById('navbar-menu').classList.toggle('active');
});

// Closing dropdowns one by one

// document.addEventListener("DOMContentLoaded", function() {
//     const accordionHeaders = document.querySelectorAll('.question-topic');
  
//     accordionHeaders.forEach(header => {
//       header.addEventListener('click', function() {
//         const accordionItem = header.parentElement;
//         const isOpen = header.nextElementSibling.style.display === 'block';
  
//         // Close all accordion items
//         document.querySelectorAll('.answer-topic').forEach(content => {
//           content.style.display = 'none';
//         });
  
//         // If the clicked item is not open, open it
//         if (!isOpen) {
//           header.nextElementSibling.style.display = 'block';
//         }
//       });
//     });
//   });


// Closing first dropdown when opening third

document.addEventListener("DOMContentLoaded", function() {
    const accordionHeaders = document.querySelectorAll('.question-topic');
    let openAccordions = [];

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionContent = header.nextElementSibling;
            const accordionItem = header.parentElement;
            const isOpen = accordionContent.style.display === 'block';

            // Close all accordion items
            if (!isOpen) {
                if (openAccordions.length >= 2) {
                    // Close the oldest opened accordion
                    openAccordions[0].nextElementSibling.style.display = 'none';
                    openAccordions.shift();
                }

                // Open the clicked item
                accordionContent.style.display = 'block';
                openAccordions.push(header);
            } else {
                // Close the clicked item
                accordionContent.style.display = 'none';
                openAccordions = openAccordions.filter(item => item !== header);
            }
        });
    });
});
