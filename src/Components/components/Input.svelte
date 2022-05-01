<script>
  export let name
  export let id
  export let placeholder
  export let width
  export let onChange

  function onInput(e) {
    onChange(document.getElementById(id).value)
  }
</script>

<div class="input-group" style="width: {width}px;">
  <input type="input" class="input-field" placeholder="{placeholder}" name="{name}" id='{id}' on:input={onInput} />
  <label for="{id}" class="input-label">{placeholder}</label>
</div>

<style lang="scss">
  $primary: var(--primary);
  $accent: var(--accent);
  $secondary: var(--secondary);

  /*input box*/
  .input-group {
    position: relative;
    padding: 15px 0 0;
    margin: 10px;
    min-width: 100px;
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