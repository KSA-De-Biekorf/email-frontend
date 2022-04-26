/// e.g. `kab` -> `Kabouters`
// see also: `email-server/userDB/ban/enum.god`
export default function convertBanToDatabaseStandard(ban) {
    switch (ban.toUpperCase()) {
        case 'KAB':
            return "Kabouters"
        case 'PAG':
            return "Pagadders"
        case 'JKN':
            return "Jongknapen"
        case 'KN':
            return "Knapen"
        case 'JHN':
            return "Jonghernieuwers"
        case 'HN':
            return "Hernieuwers"
        case 'LEIDING':
            return "Leiding"
        case 'VWB':
            return "Vwb"
        case 'OUD_LEIDING':
        case 'OUD-LEIDING':
            return "Oud-Leiding"
        default:
            alert("Ongeldige ban (interne error)")
    }
}
