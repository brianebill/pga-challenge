export default (a, b) => {
    let s1 = a.score
    let s2 = b.score

    var l1 = a.lastName.toLowerCase()
    var l2 = b.lastName.toLowerCase()

    var f1 = a.firstName.toLowerCase()
    var f2 = b.firstName.toLowerCase()

    if (s1 < s2) return 1
    if (s1 > s2) return -1
    if (l1 < l2) return -1
    if (l1 > l2) return 1
    if (f1 < f2) return -1
    if (f1 > f2) return 1
    return 0
}
