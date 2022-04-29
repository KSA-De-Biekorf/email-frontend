import currentUser from '../firebase/stores/currentUser'
import convertBanToDatabaseStandard from './convertBan'
import { retrieveAuthToken } from '../firebase/auth/authToken'

/**
 * Send an email through the email-api
 * @see `email-backend`
 * @returns responses from the server (`[string]`)
 */
export default function sendEmailApi(subject, parsedContent, selectedBannen) {
  return new Promise((resolve, reject) => {
    let responses = []
    let content = parsedContent.html
    let attachments = parsedContent.attachments

    if (subject == "") {
      alert("Je onderwerp is leeg")
      reject(new Error("Leeg onderwerp"))
    }

    if (content == "") {
      alert("Je email is leeg")
      reject(new Error("Email leeg"))
    }

    if (selectedBannen.length == 0) {
      alert("Geen bannen geselecteerd")
      reject(new Error("Geen bannen"))
    }
    
    // call API
    let currentUsrData = null
    let unsubFromCurrentUser = currentUser.subscribe((data) => {
      currentUsrData = data
    })

    if (currentUsrData == null) {
      alert("Niet ingelogd")
      reject(new Error("niet ingelogd"))
    }

    // send email (one ban at a time)
    let usrFirstName = currentUsrData.name.split(" ")[0]
    if (usrFirstName == "" || usrFirstName == null) {
      usrFirstName = "no_reply"
    }

    const bannenLength = selectedBannen.length;
    let i = 0
    selectedBannen.forEach(async (ban) => {
      const message = {
        FromName: currentUsrData.name,
        FromAddr: `${usrFirstName}@ksadebiekorf.be`,
        ReplyToName: currentUsrData.name,
        ReplyToAddr: currentUsrData.email,
        Ban: convertBanToDatabaseStandard(ban),
        Subject: subject,
        Content: content,
        Attachments: attachments
      }

      console.log("Sending email to", ban, `(${convertBanToDatabaseStandard(ban)})`)

      // Prepare api call
      // const endpoint = `https://email-api.ksadebiekorf.be/api/send_email_to_ban`
      const endpoint = "http://localhost:8000/api/send_email_to_ban"
      console.log("posting to", endpoint)

      const data = JSON.stringify(message)
      // try catch blocks are evil
      let token
      try {
        token = await retrieveAuthToken()
      } catch (e) {
        alert(`Kon niet authorizeren: ${err}`)
        reject(err)
      }
      
      const headers = {
        'Authorization': token
      }

      // Make the api request
      let response
      try {
        response = await fetch(endpoint, {
          method: 'POST',
          mode: 'cors', // !
          headers: headers,
          body: data
        })
      } catch (err) {
        console.log(err)
        alert(err)
        reject(err)
      }

      console.log(response)

      const status = response.status
      const statusText = response.statusText
      const respData = await response.text()

      console.log(`${status} ${statusText}. ${respData}`)

      if (status >= 200 && status < 300) {
        responses.push(`Email verzonden naar ${convertBanToDatabaseStandard(ban)}`)
      } else if (status < 200) {
        responses.push(`[i] ${status} ${statusText}. ${respData}`)
      } else {
        responses.push(`Error ${status}: ${statusText}. ${respData}`)
      }

      responses = responses

      i++
      if (i == bannenLength) {
        resolve(responses)
      }
    })
    
    unsubFromCurrentUser()
            
  })
}
