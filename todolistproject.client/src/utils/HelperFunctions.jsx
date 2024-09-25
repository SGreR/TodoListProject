

function descendingComparator(a, b, orderBy) {
    const aValue = a[orderBy];
    const bValue = b[orderBy];

    const isDate = !isNaN(Date.parse(aValue)) && !isNaN(Date.parse(bValue));

    if (isDate) {
        return new Date(bValue) - new Date(aValue);
    }

    if (bValue < aValue) {
        return -1;
    }
    if (bValue > aValue) {
        return 1;
    }
    return 0;
}

export const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}