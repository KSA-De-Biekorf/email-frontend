<script>
	import Loading from "./Components/components/Loading.svelte"
	import Login from "./Components/Login.svelte"
	import Index from './Components/Index.svelte'
	import { initFirebase } from '../scripts/firebase/auth/setup'
	import { startAuthListener } from '../scripts/firebase/auth/stateChange'
	import currentUser from '../scripts/firebase/stores/currentUser'
	import { onDestroy } from "svelte/internal"

	let ready = false
	let loggedIn = false

	initFirebase(() => {
		startAuthListener(() => {
			ready = true
		})
	})

	// Listen to auth change for UI
	let unsubCurrentUsr = currentUser.subscribe((data) => {
		if (data == null) {
			loggedIn = false
		} else {
			loggedIn = true
		}
	})

	onDestroy(() => {
		unsubCurrentUsr()
	})
</script>

<div class="content">
	{#if !ready}
		<Loading/>
	{:else if !loggedIn}
		<Login/>
	{:else if loggedIn}
		<Index/>
	{:else}
		<p>Error</p>
	{/if}
</div>

<style>
	.content {
		padding: 1em;
		max-width: 800px;
		margin: 0 auto;
		width: 100%;
		height: 100%;
	}
</style>