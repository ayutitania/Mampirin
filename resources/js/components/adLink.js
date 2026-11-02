/**
 * Build anchor props for an ad target.
 *
 * External URLs (http/https) open in a new tab; internal paths stay in place.
 */
export function adLinkProps(url) {
    if (!url) {
        return { href: '#' };
    }

    if (/^https?:\/\//i.test(url)) {
        return {
            href: url,
            target: '_blank',
            rel: 'noopener noreferrer',
        };
    }

    return { href: url };
}
