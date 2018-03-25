export function capitalise(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function truncateAddress(address) {
    const str = address
    return `...${ str.substring(str.length - 6, str.length)}`
}
