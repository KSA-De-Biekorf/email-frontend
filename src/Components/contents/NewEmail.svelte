<script>
  import MultiInput from '../components/MultiInput.svelte'
  import Input from '../components/Input.svelte'
  import LabelWithIcon from '../components/LabelWithIcon.svelte'
  import currentUser from '../../../scripts/firebase/stores/currentUser'
  import convertBanToDatabaseStandard from '../../../scripts/ksa/convertBan'

  import { onMount, onDestroy } from 'svelte'
  import { retrieveAuthToken } from '../../../scripts/firebase/auth/authToken';

  const bannen = ["KAB", "PAG", "JKN", "KN", "JHN", "HN", "Leiding", "VWB", "Oud-Leiding"]
  // Hoe het in de database staat
  const bannen_alt = ["Kabouters", "Pagadders", "Jongknapn", "Knapen", "Jonghernieuwers", "Hernieuwers", "Leiding", "Vwb", "Oud-Leiding"]

  let parser

  onMount(() => {
    // Init editor
    tinymce.init({
      selector: "textarea#new-email-editor",
      plugins: ["autosave"],
      toolbar: "restoredraft | undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | outdent indent",
      menu: {
        file: { title: 'File', items: 'newdocument restoredraft | preview | export print | deleteallconversations' },
        edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace' },
        view: { title: 'View', items: 'code | visualchars visualblocks | spellchecker | preview fullscreen | showcomments' },
        insert: { title: 'Insert', items: 'image link media addcomment pageembed template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime' },
        format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat' },
        tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | a11ycheck code wordcount' },
        table: { title: 'Table', items: 'inserttable | cell row column | advtablesort | tableprops deletetable' },
        help: { title: 'Help', items: 'help' }
      }
    })

    parser = tinymce.html.DomParser({validate: true}, tinymce.activeEditor.schema)
  })

  onDestroy(() => {
    // Remove editor
    tinymce.remove("textarea#new-email-editor")
  })

  function parseHTML() {
    return tinymce.activeEditor.getContent()
  }

  let selectedBannen = []

  function selectBan(ban) {
    selectedBannen.push(ban)
    selectedBannen = selectedBannen // update svelte
  }

  function deselectBan(ban) {
    const index = selectedBannen.indexOf(ban)
    selectedBannen.splice(index, 1)
    selectedBannen = selectedBannen // update svelte
  }

  let subject = ""
  function subjectChanged(newSubject) {
    subject = newSubject
  }

  let responses = []
  function sendEmail() {
    responses = []
    if (subject == "") {
      alert("Je onderwerp is leeg")
      return
    }

    let content = parseHTML()
    if (content == "") {
      alert("Je email is leeg")
      return
    }

    if (selectedBannen.length == 0) {
      alert("Geen bannen geselecteerd")
      return
    }

    // call API
    let currentUsrData = null
    let unsubCurrentUser = currentUser.subscribe((data) => {
      currentUsrData = data
    })

    if (currentUsrData == null) {
      alert("Niet ingelogd")
      return
    }
    // send email (one ban at a time)
    selectedBannen.forEach(async (ban) => {
      const message = {
        FromName: currentUsrData.name,
        FromAddr: `${currentUsrData.name}@ksadebiekorf.be`,
        ReplyToName: currentUsrData.name,
        ReplyToAddr: currentUsrData.email,
        Ban: convertBanToDatabaseStandard(ban),
        Subject: subject,
        Content: content
      }

      console.log("Sending email to", ban, `(${convertBanToDatabaseStandard(ban)})`)

      // Prepare api call
      const endpoint = `https://email-api.ksadebiekorf.be/api/send_email_to_ban`

      const data = JSON.stringify(message)
      // try catch blocks are evil
      let token
      try {
        token = await retrieveAuthToken()
      } catch (e) {
        alert(`Kon niet authorizeren: ${err}`)
        return
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
        return
      }

      console.log(response)

      const status = response.status
      const statusText = response.statusText
      const respData = await response.text()

      console.log(`${status} ${statusText}. ${respData}`)

      if (status >= 200 && status < 300) {
        responses.push(`Email verzonden naar ${convertBanToDatabaseStandard(ban)}`)
      } else if (status < 200) {
        response.body.getReader
        responses.push(`[i] ${status} ${statusText}. ${respData}`)
      } else {
        responses.push(`Error ${status}: ${statusText}. ${respData}`)
      }

      responses = responses
    })
    
    unsubCurrentUser()
  }
</script>

<div class="new-email">
  <div class="input-container">
    <div class="ban-container">
      <MultiInput name="bannen" id="ban-inp" placeholder="ban(nen)" valueList="{bannen}" altList="{bannen_alt}" onSelect="{selectBan}" onDeselect="{deselectBan}" width=140 />
      <div class="selected-bannen-container">
        {#each selectedBannen as ban}
        <LabelWithIcon label="{ban}" onClick={deselectBan}/>
        {/each}
      </div>
    </div>
    <!--subject & send-->
    <div class="subject-container">
      <Input name="onderwerp" id="subject-inp" placeholder="onderwerp" onChange="{subjectChanged}" width=300/>
      <button class="btn" on:click={() => sendEmail()}>verzenden</button>
    </div>
  </div>
  <div class="status {responses.length == 0 ? "hidden" : ""}">
    {#each responses as response}
    <p>{response}</p>
    {/each}
  </div>
  <textarea name="nieuwe email" id="new-email-editor" cols="30" rows="10"></textarea>
</div>

<style>
  .new-email {
    padding-top: 15px;
  }

  button {
    margin-bottom: 15px;
  }
  .ban-container {
    display: flex;
    align-items: flex-end;
    align-content: flex-end;
  }
  /*TODO: wrap*/
  .selected-bannen-container {
    display: flex;
    margin-bottom: 10px;
    gap: 10px; /*margin between children*/
  }

  .subject-container {
    align-items: baseline;
    align-content: baseline;
    display: flex;
    gap: 10px;
  }

  .status {
    text-align: left;
    margin-left: 15px;
  }

  .status.hidden {
    display: none;
  }
</style>