// FAQ accordian
document.addEventListener('DOMContentLoaded', () =>{ // wait for page to load
    const faqContainer = document.querySelector('.faq-content'); // content wraps everything
    
    if (!faqContainer) return; // reviews page does not habe FAQ

    faqContainer.addEventListener('click', (e) => {
        const groupHeader = e.target.closest('.faq-group-header'); // closest header
        if(!groupHeader) return; // only does something if we click on header

        const group = groupHeader.parentElement; //each has a parent of faq group
        const groupBody = group.querySelector('.faq-group-body');
        const icon = groupHeader.querySelector('i');

        // toggle icon
        icon.classList.toggle('fa-minus');
        icon.classList.toggle('fa-plus');


        // toggle visibility of body text
        groupBody.classList.toggle('open'); // class of open

        // only one open at a time (close other faq bodies)
        const otherGroups = faqContainer.querySelectorAll('.faq-group');
        otherGroups.forEach((otherGroup)=>{
            if (otherGroup != group){
                const otherGroupBody = otherGroup.querySelector('.faq-group-body');
                const otherIcon = otherGroup.querySelector('.faq-group-header');

                otherGroupBody.classList.remove('open');
                otherIcon.classList.remove('fa-minus');
            }

        });

    });
});

// Mobile Menu
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.querySelector('.hamburger-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    hamburgerButton.addEventListener('click', () => 
        mobileMenu.classList.toggle('active')
    );
})