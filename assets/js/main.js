/* ==========================================================================
   Iron & Oak Barbershop JavaScript Interactivity
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Mobile Navigation Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle-btn');
    const primaryNav = document.getElementById('primary-navigation');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && primaryNav) {
        mobileToggle.addEventListener('click', () => {
            const isOpened = mobileToggle.getAttribute('aria-expanded') === 'true';
            
            // Toggle menu state
            mobileToggle.setAttribute('aria-expanded', !isOpened);
            primaryNav.classList.toggle('open');
            
            // Toggle body scroll to prevent double scrollbars when menu is open
            document.body.style.overflow = !isOpened ? 'hidden' : '';
        });

        // Close mobile menu when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.setAttribute('aria-expanded', 'false');
                primaryNav.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // --- 2. Active Navigation Highlight on Scroll ---
    // Highlight the nav link corresponding to the section currently in view
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNav = () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            // 85px offset to match the sticky header + margin
            const sectionTop = current.offsetTop - 85; 
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-list a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    };

    window.addEventListener('scroll', highlightNav);
    // Trigger once on load to highlight correct link initially
    highlightNav();

    // --- 3. Dynamic Business Hours - Today's Day Highlight ---
    // Automatically highlight the current day of the week in the Hours table
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const todayIndex = new Date().getDay();
    const todayName = daysOfWeek[todayIndex];

    const todayRow = document.querySelector(`.day-row[data-day="${todayName}"]`);
    if (todayRow) {
        todayRow.classList.add('today');
        
        // Append a subtle label for "Today" next to the day name
        const dayNameCell = todayRow.querySelector('.day-name');
        if (dayNameCell) {
            const badge = document.createElement('span');
            badge.style.fontSize = '0.68rem';
            badge.style.fontWeight = '700';
            badge.style.textTransform = 'uppercase';
            badge.style.backgroundColor = 'var(--color-gold)';
            badge.style.color = '#111112';
            badge.style.padding = '0.15rem 0.4rem';
            badge.style.marginLeft = '0.75rem';
            badge.style.borderRadius = '2px';
            badge.style.letterSpacing = '0.05em';
            badge.textContent = 'Today';
            dayNameCell.appendChild(badge);
        }
    }

    // --- 4. Dynamic Sticky Header Shadow on Scroll ---
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.25)';
            } else {
                header.style.boxShadow = '';
            }
        });
    }
});
