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
                const otherIcon = otherGroup.querySelector(i);

                otherGroupBody.classList.remove('open');
                otherIcon.classList.remove('fa-minus');
                otherIcon.classList.add('fa-plus');
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

// cafe reviews

const cafes = [
    {
        id: 1,
        name: "STC Starbucks",
        image: "images/stc-starbucks.jpeg",
        address: "200 University Ave W, Waterloo, ON",
        lat: 43.470913,
        lng: -80.543496,
        drink: "Matcha sub Oat Milk",
        status: "visited",
        rating: 4, // drink rating
        notes: "",
    },

    {
        id: 2,
        name: "Sweet Dreams Teashop",
        image: "images/sweet-dreams-teashop.jpeg",
        address: "170 University Ave W #14, Waterloo, ON",
        lat: 43.472393,
        lng: -80.539226,
        drink: "Iced Matcha with Bobba",
        status: "visited",
        rating: 4,
        notes: "Notes: got with 75% sugar, bit too sweet for me",
    },

    {
        id: 3,
        name: "heytea",
        address: "250 Phillip St Unit D, Waterloo, ON",
        lat: 43.473201,
        lng: -80.536739,
        drink: "",
        status: "wishlist",
        rating: 0,
        notes: "",
    },
]



document.addEventListener('DOMContentLoaded', ()=>{
    const listEl = document.getElementById('cafe-list');
    if (!listEl) return;

    function starsHTML(rating){
        if (rating == 0) return '<span class="no-rating">Not rated yet</span>';    
        let stars = '';
        for (let i = 1; i<=5; i++){
            if (i<=rating){
                stars += '<i class="fa-solid fa-star"></i>';            }
            else {
                stars+= '<i class="fa-regular fa-star"></i>';
            }
        }
        return stars;
    }

    function renderCafes(){
        listEl.innerHTML='';

        cafes.forEach((cafe)=>{
            const card = document.createElement('article');
            card.className = 'card cafe-card bg-primary';

            card.innerHTML = `
            <div class="cafe-info">
                <div class="cafe-header">
                    <h3 class="text-md">${cafe.name}</h3>
                    <span class="badge ${cafe.status}">${cafe.status}</span>
                </div>
                <p><i class="fas fa-mug-hot"></i>${cafe.drink|| 'No drink yet'}</p>
                <div class="stars">${starsHTML(cafe.rating)}</div>
                <p class="notes">${cafe.notes||''}</p> 
            </div>
            <img src="${cafe.image || 'images/ccclogo.png'}" alt="${cafe.name}" class="cafe-photo">
            `;

            listEl.appendChild(card);
        });
    }

    renderCafes();

});

// map page
document.addEventListener('DOMContentLoaded', ()=>{
    const mapEl = document.getElementById('map');
    if (!mapEl) return; 

    const map = L.map('map').setView([43.47, -80.55], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    cafes.forEach((cafe) => {
        const logoIcon = L.icon({
            iconUrl: 'images/ccclogo.png',
            iconSize: [40,40],
            iconAnchor: [20, 20], // where does the image sit 
            popupAnchor: [0, -20], // relative point for popup
            className: cafe.status, // do i want this?
        })
        const marker = L.marker([cafe.lat, cafe.lng], {icon:logoIcon}).addTo(map);
    });

    
    marker.bindPopup(`
        <div class="map-popup">
            <img src="images/ccclogo.png" alt="logo" class ="popup-logo">
            <div>
                <strong>${cafe.name}</strong>
                <p>${cafe.status==='visited' ? 'Visited' : 'On my wishlist'}</p>
            </div>
        </div>
    `);
});