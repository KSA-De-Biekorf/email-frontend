<script>

</script>

<div class="login-container">
  <div class="login-box flex vstack">
    <h3>Login</h3>
    <div class="login-button-group">
      <input type="text" name="Email" id="eml" required="true">
      <span class="bar-fixed"></span>
      <span class="bar"></span>
      <label for="eml">Email</label>
    </div>
    <div class="login-button-group">
      <input type="password" name="Wachtwoord" id="pass" required="true">
      <span class="bar-fixed"></span>
      <span class="bar"></span>
      <label for="pass">Wachtwoord</label>
    </div>
  </div>
</div>

<style>
  :root {
    --input-width: 300px;
    --bar-color: var(--primary);
    --bar-color-inactive: var(--secondary);
  }
  /*Center contents*/
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
  .login-box {
    text-align: center;
    /*styling*/
    padding: 0px 25px 25px 25px;
    background: white;
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0,0,0,.6);
    border-radius: 10px;
  }
  .login-box h3 {
    font-size: 3rem;
  }

  .login-button-group {
    position: relative;
  }
  .login-button-group:nth-child(3) {
    margin-top: 30px;
  }
  input {
    padding-top: 10px;
    padding-bottom: 10px;
    display: block;
    width: var(--input-width);
    border: none;

    font-size: 1rem;
  }
  input:focus { outline: none; }

  label {
    position: absolute;
    font-size: 1rem;
    color: #999;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 0.2s ease all; 
    -moz-transition: 0.2s ease all; 
    -webkit-transition: 0.2s ease all;
  }

  /*color of label when input is selected, move it & make it smaller*/
  input:focus ~ label, input:valid ~ label {
    /*Move up*/
    top: -0.7rem;
    /*scale down*/
    font-size: 0.9rem;
    color: var(--bar-color);
  }

  /* Bottom bar */
  .bar-fixed {
    position: relative;
    display: block;
    width: var(--input-width);
    content: '';
    height: 2px;
    width: var(--input-width);
    bottom: 0.5px;
    position: absolute;
    background: var(--bar-color-inactive);
  }

  .bar {
    position: relative;
    display: block;
    width: var(--input-width);
  }
  .bar:before, .bar:after {
    content: '';
    height: 2px;
    width: 0;
    bottom: 0.5px;
    position: absolute;
    background: var(--bar-color);
    transition: 0.2s ease all; 
    -moz-transition: 0.2s ease all; 
    -webkit-transition: 0.2s ease all;
  }
  .bar:before {
    left: 50%;
  }
  .bar:after {
    right: 50%;
  }

  /*bar active*/
  input:focus ~ .bar:before,
  input:focus ~ .bar:after {
    width: calc(var(--input-width) / 2);
  }
</style>
