import { attach, html, text } from 'f7k/base';
import { navlink, router } from 'f7k/router';
import toast from './components/toast';

import today from './pages/today';
import timetable from './pages/timetable';
import buses from './pages/buses';
import settings from './pages/settings';
import about from './pages/about';

const routes = {
    '/': today,
    '/timetable': timetable,
    '/buses': buses,
    '/settings': settings,
    '/about': about,
};

const fallback = () => text('Page not found.');

const menu = [
    ['/', 'Today', 'timer'],
    ['/timetable', 'Timetable', 'event_note'],
    ['/buses', 'Buses', 'directions_bus'],
    ['/settings', 'Settings', 'settings']
];

attach(document.body, [
    html('nav#navbar', {
        child: menu.map(([href, title, ic]) => navlink({
            active: { className: 'active' },
            title,
            href,
            child: [
                html('span.material-icons.nav-icon', { child: text(ic) }),
                html('span.nav-label', { child: text(title) }),
            ],
        })),
    }),
    html('main#main', {
        child: router(routes, fallback),
    }),
]);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(reg => {
        reg.addEventListener('updatefound', () => {
            let worker = reg.installing;
            if (!reg.active) {
                worker.addEventListener('statechange', () => {
                    if (worker.state == 'installed') {
                        toast.success('Ready for offline use!');
                    }
                });
            }
        });
    });
}
