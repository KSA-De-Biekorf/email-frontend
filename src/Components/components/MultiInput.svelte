<!--Autocomlete input-->

<script>
  export let name
  export let id
  export let placeholder
  export let valueList
  export let altList
  // Called when an item is selected
  export let onSelect
  export let onDeselect
  export let width

  let autocompletListShown = false
  const dropdownDefaultWidth = 40;
  let dropdownResized = false

  import { sortMap } from '../../../scripts/sort'
  import { onMount } from 'svelte'
  import stringSimilarity from 'string-similarity'

  onMount(() => {
    setDropdownPos()
  })

  const onResizeWindow = (e) => {
    setDropdownPos()
  }

  function setDropdownPos() {
    let container = document.querySelector(".dropdown-container")
    let inputBox = document.querySelector(`#${id}`)
    let inputBoxRect = inputBox.getBoundingClientRect();
    container.style.top = inputBoxRect.bottom + "px"
    container.style.left = inputBoxRect.left + "px"
  }

  let autocompleteList = valueList

  function onInputClick(e) {
    setDropdownPos()
    autocompletListShown = true
  }

  /**`e`: event*/
  function onInputChange(e) {
    const elem = document.getElementById(id)
    const text = elem.value

    // find most similar values in the list
    let similarityList = []
    valueList.forEach((val) => {
      let similarityScore = stringSimilarity.compareTwoStrings(val.toUpperCase(), text.toUpperCase())
      similarityList.push([val, similarityScore])
    })
    for (let i = 0; i < altList.length; i++) {
      let similarityScore = stringSimilarity.compareTwoStrings(altList[i].toUpperCase(), text.toUpperCase())
      if (similarityList[i][1] < similarityScore) {
        similarityList[i][1] = similarityScore
      }
    }

    // Sort the list based on similarity
    sortMap(similarityList)

    // add sorted items to the list
    autocompleteList = []
    similarityList.forEach((elem) => {
      autocompleteList.push(elem[0])
    })
  }

  let selectedList = []

  function select(item) {
    if (selectedList.includes(item)) {
      const index = selectedList.indexOf(item)
      selectedList.splice(index, 1)
      let elem = document.getElementById(item)
      elem.classList.remove("selected")
      onDeselect(item)
    } else {
      selectedList.push(item)
      let elem = document.getElementById(item)
      elem.classList.add("selected")
      onSelect(item)
    }
  }

  // Key pressed in input box
  function onKeyPressOnInput(e) {
    switch (e.key) {
      case "Enter":
        select(autocompleteList[0])
        break
      case "Escape":
        closeDropdown()
        break
    }
  }

  function closeDropdown() {
    autocompletListShown = false
  }
</script>

<svelte:window on:resize="{onResizeWindow}"></svelte:window>

<div class="input-group" style="width: {width}px;">
  <input type="input" class="input-field" placeholder="{placeholder}" name="{name}" id='{id}' on:input={onInputChange} on:keydown={onKeyPressOnInput} on:click={onInputClick} />
  <label for="{id}" class="input-label">{placeholder}</label>
</div>
<div class="dropdown-container" style="transform: {autocompletListShown ? "scale(100%)" : "scale(0)"}">
  <div class="close-container">
    <img src="https://img.icons8.com/ios-glyphs/30/000000/xbox-x.png" alt="sluiten" width="20px" height="20px" on:click={closeDropdown}/>
  </div>
  <ul class="dropdown-list">
    {#each autocompleteList as item}
    <li id="{item}" class="dropdown-item" on:click={() => {select(item)}}>
      {item}
    </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  $primary: var(--primary);
  $accent: var(--accent);
  $secondary: var(--secondary);

  $dropdown-item-padding: 10px;
  $dropdown-width: 110px;
  $full-dropdown-width: calc($dropdown-width + 2 * $dropdown-item-padding);

  .close-container {
    position: absolute;
    z-index: 99;
    left: calc($full-dropdown-width - 10px);
    top: -10px;
    
    img:hover {
      cursor: pointer;
    }
  }

  .dropdown-container {
    background: lightgray;
    position: absolute;
    z-index: 99;
    width: $full-dropdown-width;
    transition: all 0.25s;
  }

  .dropdown-list {
    /*remove default*/
    padding: 0;
    margin: 0;
    list-style: none;
    display: inline-block;

    width: $full-dropdown-width;
  }

  .dropdown-item {
    cursor: pointer;
    margin: 0;
    padding: 5px $dropdown-item-padding;
    width: $dropdown-width;

    &:hover, &:first-child  {
      background-color: $primary;
    }

    /* TODO: fix
    &:global(.selected) {
      background-color: $accent;
    }
    */
  }


  /*input box*/
  .input-group {
    position: relative;
    padding: 15px 0 0;
    // margin-top: 10px;
    margin: 10px;
  }

  .input-field {
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid $secondary;
    outline: 0;
    font-size: 1rem;
    color: $secondary;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;

    &::placeholder {
      color: transparent;
    }

    &:placeholder-shown ~ .input-label {
      font-size: 1rem;
      cursor: text;
      top: 20px;
    }
  }

  .input-label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: $secondary;
  }

  .input-field:focus {
    ~ .input-label {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 0.8rem;
      color: $primary;
      font-weight:700;    
    }
    padding-bottom: 6px;  
    font-weight: 700;
    border-width: 3px;
    border-color: $primary;
  }
  /* reset input */
  .input-field{
    &:required, &:invalid { box-shadow:none; }
  }
</style>