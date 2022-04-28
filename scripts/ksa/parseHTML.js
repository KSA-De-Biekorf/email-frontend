/**
 * Parse HTML from the text editor to an email compatible format
 * 
 * @throws
 * When file size is too big
 * 
 * @returns a javascript object
 * 
 * @example
 * ```javascript
 * // Return object
 * {
 *   html: string
 *   attachments: [
 *     {
 *       Name: string,
 *       Type: string,
 *       Base64: string
 *     }
 *   ]
 * }
 * ```
 */
export function parseHTMLForEmail(html) {
    const srcRegex = /src="data:(.*?)"/g
    const titleRegex = /img title="(.*?)"/

    let captures = srcRegex.exec(html)

    let titleCaptures = titleRegex.exec(html)

    // e.g. ["image/png;base64,orkezokrzk", "..."]
    let attachmentsString = []
    let titleStrings = []
    if (captures != null) {
        for (let i = 1; i < captures.length; i++) {
            attachmentsString.push(captures[i])
            titleStrings.push(titleCaptures[i])
        }
    }

    let totalSize = 0
    let attachments = []
    // Check size
    for (let i = 0; i < attachmentsString.length; i++) {
        let split1 = attachmentsString[i].split(";", 2)
        let split2 = split1[1].split(",", 2)
        let type = split1[0]
        let base64 = split2[1]

        totalSize += base64.length

        attachments.push({
            Name: titleStrings[i],
            Type: type,
            Base64: base64
        })
        
        // replace in html string
        html = html.replace(`data:${attachmentsString[i]}`, titleStrings[i])
    }

    // this is 25 mb in base encoding, not actual file size
    if (totalSize > 25000000) {
        throw new Error("Max file size exceeded")
    }

    return {
        html: html,
        attachments: attachments
    }
}