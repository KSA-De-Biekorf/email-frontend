<script>
import { onDestroy } from "svelte";

  import currentUser from "../../../scripts/firebase/stores/currentUser"
  import { changePwd } from "../../../scripts/firebase/auth/changePwd"
  import { signOut } from "firebase/auth"
  import { auth } from "../../../scripts/firebase/auth/setup"

  let name
  let email
  const unsubUsr = currentUser.subscribe((updated) => {
    name = updated.name
    email = updated.email
  })
  onDestroy(() => {
    unsubUsr()
  })

  function logOut() {
    signOut(auth)
  }

  // TODO
  function changePass(newPass) {
    // TODO: reauthenticate
    changePwd(newPass)
  }
</script>

<div class="profile">
  <h2>{name == null ? "?" : name}</h2>
  <p>{email}</p>
  <button id="log-out-btn" class="btn" on:click={logOut}>uitloggen</button>
</div>

<style>
  #log-out-btn {
    margin-top: 6px;
  }
</style>