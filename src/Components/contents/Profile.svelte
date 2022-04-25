<script>
import { onDestroy } from "svelte";

  import currentUser from "../../../scripts/firebase/stores/currentUser"

  let name
  let email
  const unsubUsr = currentUser.subscribe((updated) => {
    name = updated.name
    email = updated.email
  })
  onDestroy(() => {
    unsubUsr()
  })
</script>

<div class="profile">
  <h2>{name == null ? "?" : name}</h2>
  <p>{email}</p>
</div>

<style>

</style>