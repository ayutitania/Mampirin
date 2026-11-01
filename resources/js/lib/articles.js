export function articleUrl(article) {
    return `/article/${article.slug}`;
}

export function categoryUrl(category) {
    return `/article/category/${category.slug}`;
}

export function formatDate(value) {
    if (!value) {
        return '';
    }

    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(value));
}

export function readingTime(body) {
    const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;

    return Math.max(1, Math.round(words / 200));
}
