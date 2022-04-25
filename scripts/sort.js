/// Sort strings based on a score ([str, int])
export function sortMap(list) {
    list.sort((elem, other) => {
        return (elem[1] < other[1])
    })
}
