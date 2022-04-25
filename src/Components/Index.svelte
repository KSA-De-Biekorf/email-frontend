<script>
  import NewEmail from "./contents/NewEmail.svelte"
  import Profile from "./contents/Profile.svelte"

  import { onMount } from "svelte/internal"
  import { fade } from "svelte/transition"

  let activeElem = "new-email"

  onMount(() => {
    let liElems = document.getElementsByTagName("li")
    Array.prototype.slice.call(liElems).forEach((elem) => {
      elem.style.setProperty('--button-width', elem.clientWidth + "px")
    })
  })
</script>

<div class="index {activeElem === "new-email" ? "new-email-view" : ""}">
  <nav>
    <ul>
      <li id="new-email" class={activeElem === "new-email" ? "active" : ""}>
        <button on:click={() => {activeElem = "new-email"}}>Nieuwe email</button>
      </li>
      <li 
        id="profile" 
        class={activeElem === "profile" ? "active" : ""}>
        <button on:click={() => {activeElem = "profile"}}>Profiel</button>
      </li>
    </ul>
  </nav>

  <main transition:fade>
    {#if activeElem === "new-email"}
      <NewEmail/>
    {:else if activeElem === "profile"}
      <Profile/>
    {/if} 
  </main>
</div>

<style>
  :root {
    --border-width: 1.5px;
    --margin-top-main: 1em;
    --button-text-height: 1em;
    --button-text-width: 1em;
    --button-padding: 15px;
  }
  .index {
    text-align: center;
    /*styling*/
    padding: 0px 0px 25px 0px;
    background: white;
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0,0,0,.6);
    border-radius: 10px;
    margin-bottom: 25px;
  }
  .index.new-email-view {
    padding: 0;
  }
  ul {
    list-style-type: none;
    font-weight: 500;
    display: flex;
    margin: 0px;
    padding: 0;
    height: calc(var(--button-text-height) + 2 * var(--button-padding));
  }
  li {
    color: var(--secondary);
    border: 1.5px solid var(--secondary);
    border-style: solid hidden solid solid;
    margin: 0px;
    border-radius: 0 0 0 0;
    line-height: var(--button-text-height);
    width: calc(12 * var(--button-text-width));
    height: calc(var(--button-text-height) + 2 * var(--button-padding));
  }
  button {
    width: 100%;
    height: 100%;
  }
  li:nth-child(1) {
    border-radius: 10px 0 0 0;
  }
  li:nth-last-child(1) {
    border-radius: 0 10px 0 0;
    border-style: solid;
  }
  li.active {
    color: var(--accent);
    border-color: var(--accent);
  }
  /*fix border for first elements, but not the last, bc last child has all its borders*/
  li.active:not(:nth-last-child(1))::after {
    pointer-events: none;
    display: block;
    content: "";

    border-left: var(--border-width) solid var(--accent);

    position: relative;
    top: calc(-1 * (var(--button-text-height) + 2 * var(--button-padding)) - 0.5px);
    left: var(--button-width); /*set in js*/
    height: calc(var(--button-text-height) + 2 * var(--button-padding) + 1.5px);
  }
  /*bottom line*/
  ul::after {
    pointer-events: none;
    display: block;
    content: "";

    border-bottom: var(--border-width) solid var(--secondary);

    position: relative;
    width: 50%;
    bottom: 0;
    top: 2px;
  }
</style>
