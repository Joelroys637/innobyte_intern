document.addEventListener('DOMContentLoaded', () => {

    /* --- INNOVATIVE NAVBAR LOGIC --- */
    const header = document.querySelector('.header');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll Effect for Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.add('scrolled'); // Optional: force it to shrink always, or remove
            header.classList.remove('scrolled');
        }
    });
    // Trigger scroll check on load
    if (window.scrollY > 50) header.classList.add('scrolled');

    // Hamburger Menu Mobile Toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Set Active State on Nav Link Based on current HTML file
    const currentPage = window.location.pathname.split("/").pop() || 'index.html';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });


    /* --- SCROLL REVEAL INITIALIZATION --- */
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            distance: '60px',
            duration: 1200,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            reset: false,
            mobile: true
        });

        sr.reveal('.reveal-up', { origin: 'bottom', delay: 200 });
        sr.reveal('.reveal-left', { origin: 'left', delay: 200 });
        sr.reveal('.reveal-right', { origin: 'right', delay: 200 });
        sr.reveal('.reveal-scale', { scale: 0.8, delay: 200 });
        sr.reveal('.reveal', { origin: 'bottom', interval: 150 });
    }


    /* --- CREATIVE TEXT REVEAL ANIMATION --- */
    const animatedHeading = document.getElementById('animated-heading');
    if (animatedHeading) {
        const text = animatedHeading.innerText;
        animatedHeading.innerHTML = ''; // clear original text
        
        // Split text by spaces to wrap words
        const words = text.split(' ');
        
        words.forEach((word, index) => {
            // Create wrapper
            const wordWrapper = document.createElement('div');
            wordWrapper.className = 'split-word';
            
            // Create inner span which animates
            const wordSpan = document.createElement('span');
            wordSpan.innerText = word + (index !== words.length - 1 ? '\u00A0' : ''); // add non-breaking space
            
            // Stagger delay
            wordSpan.style.animationDelay = `${(index * 0.1) + 0.2}s`;
            
            wordWrapper.appendChild(wordSpan);
            animatedHeading.appendChild(wordWrapper);
        });
    }


    /* --- PARALLAX BACKGROUNDS & SCROLL EFFECTS --- */
    window.addEventListener('scroll', () => {
        const parallaxBg = document.querySelector('.page-header .bg-img');
        if (parallaxBg) {
            let offset = window.scrollY;
            if (offset < window.innerHeight) {
                 parallaxBg.style.transform = `translateY(${offset * 0.4}px)`;
            }
        }
        
        // Parallax for specific custom elements
        const parallaxEls = document.querySelectorAll('.parallax-bg');
        parallaxEls.forEach(el => {
            let offset = window.scrollY;
            el.style.backgroundPositionY = (offset * 0.4) + 'px';
        });
    });


    /* JSON Fetch Block Removed (Using Hardcoded HTML Images now) */


    /* --- VANILLA JS: LIGHTBOX FOR GALLERY --- */
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        // Inject Lightbox HTML into DOM
        const lightboxHTML = `
            <div class="lightbox" id="lightbox">
                <button class="lightbox-close" id="lightbox-close"><i class="fas fa-times"></i></button>
                <img src="" alt="View" class="lightbox-content" id="lightbox-img">
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
        
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.getElementById('lightbox-close');

        // Open Lightbox Event
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgUrl = item.getAttribute('data-src');
                lightboxImg.setAttribute('src', imgUrl);
                lightbox.classList.add('active');
            });
        });

        // Close Lightbox Event
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            setTimeout(() => { lightboxImg.setAttribute('src', ''); }, 400); // clear after fade out
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            // Close if clicked outside image
            if(e.target === lightbox) {
                closeLightbox();
            }
        });
    }

});