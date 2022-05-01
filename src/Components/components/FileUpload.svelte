<script>
  import { onMount } from 'svelte'
  
  export let onderwerpWidth;
  export let defaultWidth;
  export let selectedFiles = []

  function selectFiles() {
    selectedFiles.push(...document.getElementById("file-upload").files)
    onResize()
  }
  onMount(() => {
    onResize()
  })

  function onResize() {
    onderwerpWidth = defaultWidth;
    if (window.innerWidth >= 790) {
      if (selectedFiles.length == 0) {
        document.getElementById("file-status").innerText = "Geen bestand geselecteerd"
      } else {
        document.getElementById("file-status").innerText = `${selectedFiles.length} bestanden geselecteerd`
      }
    } else if (window.innerWidth < 790 && window.innerWidth >= 725) {
      if (selectedFiles.length == 0) {
        document.getElementById("file-status").innerText = "Geen bestand"
      } else {
        document.getElementById("file-status").innerText = `${selectedFiles.length} bestanden`
      }
    } else if (window.innerWidth < 725 && window.innerWidth >= 700) {
      if (selectedFiles.length == 0) {
        document.getElementById("file-status").innerText = "0 bestand"
      } else {
        document.getElementById("file-status").innerText = `${selectedFiles.length} bestand`
      }
    } else if (window.innerWidth < 700 && window.innerWidth >= 490) {
      if (selectedFiles.length == 0) {
        document.getElementById("file-status").innerText = "0"
      } else {
        document.getElementById("file-status").innerText = selectedFiles.length
      }
    } else if (window.innerWidth < 490) {
      if (selectedFiles.length == 0) {
        document.getElementById("file-status").innerText = "0"
      } else {
        document.getElementById("file-status").innerText = selectedFiles.length
      }
      onderwerpWidth = 150;
    }
  }
</script>

<svelte:window on:resize={onResize}></svelte:window>

<div class="file-input">
  <input type="file" name="Bestanden-uploaden" id="file-upload" multiple on:change={selectFiles}>
  <span class="button"><img alt="upload" src="res/img/upload.svg"></span>
  <span class="label" id="file-status">Geen bestand geselecteerd</span>
</div>

<style type="scss">
  :root {
    --upload-btn-width: 44px;
  }

  .file-input {
    display: inline-block;
    text-align: left;
    background: rgb(207, 207, 207);
    padding: 8px;
    position: relative;
    border-radius: 3px;
  }

  .file-input > [type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 99;
    cursor: pointer;
  }

  .file-input > .button {
    display: inline-block;
    cursor: pointer;
    background: #eee;
    border-radius: 2px;
    margin-right: 8px;
    width: fit-content;
    height: fit-content;
    padding-top: 6px;
    padding-left: 6px;
    padding-right: 6px;
    transition: all 0.2s;
  }

  .file-input:hover > .button {
    background: var(--secondary-accent);
    color: white;
  }

  .file-input:hover img {
    filter: invert(100%);
  }

  .file-input .label {
    color: #333;
    white-space: nowrap;
  }

  img {
    margin-top: 0px;
  }
</style>
