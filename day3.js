let menuLinks = [
    { text: 'about', href: '/about' },
    {
        text: 'catalog', href: '#', subLinks: [
            { text: 'all', href: '/catalog/all' },
            { text: 'top selling', href: '/catalog/top' },
            { text: 'search', href: '/catalog/search' },
        ]
    },
    {
        text: 'orders', href: '#', subLinks: [
            { text: 'new', href: '/orders/new' },
            { text: 'pending', href: '/orders/pending' },
            { text: 'history', href: '/orders/history' },
        ]
    },
    {
        text: 'account', href: '#', subLinks: [
            { text: 'profile', href: '/account/profile' },
            { text: 'sign out', href: '/account/signout' },
        ]
    },
];

let mainEl = document.querySelector('main');
mainEl.style.backgroundColor = 'var(--main-bg)';

let h1 = document.createElement('h1');
h1.textContent = 'SEI Rocks!';


mainEl.appendChild(h1);
mainEl.classList = 'flex-ctr';

let topMenuEl = document.getElementById('top-menu');
topMenuEl.style.height = '100%';
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
topMenuEl.classList = 'flex-around';

let topMenuLinks = [];

menuLinks.forEach(element => {
    let a = document.createElement('a');
    a.setAttribute('href', element.href)
    a.textContent = element.text;
    topMenuEl.appendChild(a);
    topMenuLinks.push(a);
});

let subMenuEl = document.getElementById('sub-menu');
subMenuEl.style.height = '100%';
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
subMenuEl.classList = 'flex-around';
subMenuEl.style.position = 'absolute';
subMenuEl.style.top = '0';


let showingSubMenu = false;

topMenuEl.addEventListener('click', function (e) {

    if (topMenuLinks.includes(e.target)) {
        e.preventDefault();
    } else {
        return;
    }

    // *** why not use classList.toggle() ????***
    if (e.target.classList.contains('active')) {
        e.target.classList.remove('active');
        showingSubMenu = false;
        subMenuEl.style.top = '0';
        return;
    }

    topMenuLinks.forEach(element => {
        element.classList.remove('active');
    });

    e.target.classList.add('active');
    let subLink;

    menuLinks.forEach(element => {
        if (element.text === e.target.textContent) {
            let link = element;
            if (Object.hasOwn(link, 'subLinks')) {
                sublink = link.subLinks;
                showingSubMenu = true;
            }
            if (link.text == 'about') {
                h1.textContent = 'about';
            }
        }
    });

    const buildSubMenu = (sublink) => {
        subMenuEl.textContent = '';
        subMenuEl.style.top = '100%';
        sublink.forEach(obj => {
            let subAnchor = document.createElement('a');
            subAnchor.setAttribute('href', obj.href);
            subAnchor.textContent = obj.text;
            subMenuEl.appendChild(subAnchor);
        });
    };

    if (showingSubMenu) {
        buildSubMenu(sublink);
    } else {
        subMenuEl.style.top = '0';
    }
});

subMenuEl.addEventListener('click', function (e) {
    if (subMenuEl.contains(e.target)) {
        e.preventDefault();
        console.log(e.target);
    } else {
        console.log(false);
        return;
    }
    showingSubMenu = false;
    subMenuEl.style.top = '0';

    topMenuLinks.forEach(element => {
        element.classList.remove('active');
    });

    h1.textContent = e.target.textContent
  
});


