/** Sort strings based on a score ([str, int])
 * @param list: [[string, int]]
 * @returns `sortedList`: [[string, int]] (based on int)
 */
export function sortMap(list) {
    list.sort((elem, other) => {
        return (elem[1] < other[1])
    })
}
