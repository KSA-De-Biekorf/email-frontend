<script>
  import { onMount } from "svelte";
  import rive from "@rive-app/canvas"

  onMount(() => {
    new rive.Rive({
      src: 'res/animation/loading.riv',
      canvas: document.getElementById('canvas'),
      autoplay: true
    });
  });
</script>

<div class="center">
  <canvas id="canvas" width="400" height="300"></canvas>
</div>

<style></style>
