import modal from 'f7k/modal';
import { html, text } from 'f7k/base';

export default function eventDetails(event) {
    modal('modal', close => {
        let body = [
            html('header.header', {
                child: [
                    html('button.icon-button.material-icons', {
                        child: text('close'),
                        onclick: close,
                    }),
                    html('h2', { child: text(event.summary) }),
                ],
            }),
        ];

        if (event.description) {
            body.push(detail('subject', text(event.description)));
        }

        if (event.location) {
            let msg = text(event.location);
            let geo = event.component.getFirstPropertyValue('geo');

            if (Array.isArray(geo) && geo.length == 2) {
                msg = html('a', {
                    child: msg,
                    href: 'https://www.google.com/maps/search/?api=1&query=' + geo.map(encodeURIComponent).join(','),
                    target: '_blank',
                });
            }

            body.push(detail('place', msg));
        }

        let parent = event.component.parent;
        if (parent) {
            let calname = parent.getFirstPropertyValue('x-wr-calname');
            if (calname) body.push(detail('today', text(calname)));
        }

        return body;
    });
}

function detail(icon, msg) {
    return html('div.event-details-detail', {
        child: [
            html('span.material-icons', { child: text(icon) }),
            msg,
        ],
    });
}
