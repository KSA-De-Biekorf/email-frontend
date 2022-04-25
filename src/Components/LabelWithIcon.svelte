<script>
  export let label
  export let color = "000000"
  export let onClick

</script>

<span>{label}&nbsp;
  <div class="img-container center">
    <img src="https://img.icons8.com/ios-glyphs/30/{color}/xbox-x.png" alt="sluiten" width="20px" height="20px" on:click="{() => {onClick(label)}}"/>
  </div>
</span>

<style>
  span {
    display: flex;
    background-color: lightgray;
    border-radius: 999999px;
    padding: 5px 10px;
    width: fit-content;
    height: fit-content;
  }
  .img-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: inherit;
  }
  img:hover {
    cursor: pointer;
  }
</style>