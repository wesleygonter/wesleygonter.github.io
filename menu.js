/* =========================================================
   MOBILE MENU
   ---------------------------------------------------------
   Builds the phone menu (a button + a small dropdown box)
   from the links already in each page's header, so the
   header HTML on every page can stay exactly as it is.

   Add ONE line to the <head> of every page, after the
   style.css link:

     Pages in the main folder:   <script src="menu.js" defer></script>
     Pages in /projects:         <script src="../menu.js" defer></script>

   The menu only shows on phones (600px and narrower); the
   styles live at the end of style.css.
   ========================================================= */

(function () {
    var header = document.querySelector('.site-header');
    if (!header) return;

    // Menu order. Any extra links you add later go at the end.
    var order = ['WORK', 'SHOP', 'CONTACT', 'ABOUT'];

    var links = Array.prototype.slice.call(
        header.querySelectorAll('.nav-left a, .nav-right a')
    );
    if (!links.length) return;

    function rank(link) {
        var i = order.indexOf(link.textContent.trim().toUpperCase());
        return i === -1 ? order.length : i;
    }

    links.sort(function (a, b) {
        return rank(a) - rank(b);
    });

    // Button
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'menu-button';
    button.setAttribute('aria-label', 'Open menu');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'mobile-menu');
    button.innerHTML = '<span></span><span></span><span></span>';

    // Dropdown box (links copied from the header, so paths stay correct)
    var menu = document.createElement('nav');
    menu.className = 'mobile-menu';
    menu.id = 'mobile-menu';
    menu.setAttribute('aria-label', 'Site menu');

    links.forEach(function (link) {
        var a = document.createElement('a');
        a.href = link.getAttribute('href');
        a.textContent = link.textContent.trim();
        menu.appendChild(a);
    });

    header.appendChild(button);
    header.appendChild(menu);
    header.classList.add('has-menu');

    function setOpen(open) {
        header.classList.toggle('menu-open', open);
        button.setAttribute('aria-expanded', open ? 'true' : 'false');
        button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    button.addEventListener('click', function (event) {
        event.stopPropagation();
        setOpen(!header.classList.contains('menu-open'));
    });

    // Close after choosing a link (needed for #work / #about on the home page)
    menu.addEventListener('click', function (event) {
        if (event.target.closest('a')) setOpen(false);
    });

    // Close when tapping anywhere else
    document.addEventListener('click', function (event) {
        if (!header.contains(event.target)) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && header.classList.contains('menu-open')) {
            setOpen(false);
            button.focus();
        }
    });

    // Reset if the window is resized up to desktop width
    window.addEventListener('resize', function () {
        if (window.innerWidth > 600) setOpen(false);
    });
})();
