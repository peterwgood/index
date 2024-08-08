class Nav {
    constructor(container) {
        this.container = container;
        this.createNav();
    }

    createNav() {
        const nav = document.createElement('nav');
        nav.className = 'navbar bg-dark border-bottom border-body';
        nav.dataset.bsTheme = 'dark';

        const containerFluid = document.createElement('div');
        containerFluid.className = 'container-fluid';

        const brand = document.createElement('a');
        brand.className = 'navbar-brand';
        brand.href = 'index.html';
        brand.textContent = 'WT';

        const toggler = document.createElement('button');
        toggler.className = 'navbar-toggler';
        toggler.type = 'button';
        toggler.dataset.bsToggle = 'offcanvas';
        toggler.dataset.bsTarget = '#offcanvasNavbar';
        toggler.ariaControls = 'offcanvasNavbar';
        toggler.ariaLabel = 'Toggle navigation';

        const togglerIcon = document.createElement('span');
        togglerIcon.className = 'navbar-toggler-icon';
        toggler.appendChild(togglerIcon);

        const offcanvas = document.createElement('div');
        offcanvas.className = 'offcanvas offcanvas-end';
        offcanvas.tabIndex = '-1';
        offcanvas.id = 'offcanvasNavbar';

        const offcanvasHeader = document.createElement('div');
        offcanvasHeader.className = 'offcanvas-header';

        const offcanvasTitle = document.createElement('h5');
        offcanvasTitle.className = 'offcanvas-title';
        offcanvasTitle.id = 'offcanvasNavbarLabel';
        offcanvasTitle.textContent = 'WT';

        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'btn-close';
        closeBtn.dataset.bsDismiss = 'offcanvas';
        closeBtn.ariaLabel = 'Close';

        const offcanvasBody = document.createElement('div');
        offcanvasBody.className = 'offcanvas-body';

        const navList = document.createElement('ul');
        navList.className = 'navbar-nav justify-content-end flex-grow-1 pe-3';

        const navItems = [{
                text: 'Day',
                href: 'index.html'
            },
            {
                text: 'Week',
                href: 'week.html'
            },
            {
                text: 'Weekly Totals',
                href: 'yearly.html'
            },
            {
                text: 'Weight',
                href: 'weight.html'
            },
            {
                text: 'Energy',
                href: 'Boosters.html'
            },
            {
                text: 'To-do',
                href: 'list.html'
            },
            {
                text: 'Groceries',
                href: 'solver.html'
            },

        ];

        navItems.forEach((item) => {
            const navItem = document.createElement('li');
            navItem.className = 'nav-item';

            const navLink = document.createElement('a');
            navLink.className = 'nav-link';
            navLink.href = item.href;
            navLink.textContent = item.text;

            navItem.appendChild(navLink);
            navList.appendChild(navItem);
        });

        offcanvasHeader.appendChild(offcanvasTitle);
        offcanvasHeader.appendChild(closeBtn);

        offcanvasBody.appendChild(navList);

        offcanvas.appendChild(offcanvasHeader);
        offcanvas.appendChild(offcanvasBody);

        containerFluid.appendChild(brand);
        containerFluid.appendChild(toggler);
        containerFluid.appendChild(offcanvas);

        nav.appendChild(containerFluid);

        this.container.appendChild(nav);
    }
}

const navContainer = document.querySelector('.nav-container');
new Nav(navContainer);
