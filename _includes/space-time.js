  (function() {

    // Generate a random number between 1 and 1000
    function getRandomCloudDelay() {

      // KUDOS https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript#answer-4960020
      return Math.floor(Math.random() * 1000) + 1;
    }

    document.documentElement.style.setProperty('--cloud-delay-one',   getRandomCloudDelay() + 's');
    document.documentElement.style.setProperty('--cloud-delay-two',   getRandomCloudDelay() + 's');
    document.documentElement.style.setProperty('--cloud-delay-three', getRandomCloudDelay() + 's');
    document.documentElement.style.setProperty('--cloud-delay-four',  getRandomCloudDelay() + 's');
    document.documentElement.style.setProperty('--cloud-delay-five',  getRandomCloudDelay() + 's');

    function updateTime() {
      let now = new Date();
      let hours = now.getHours() + (now.getMinutes() / 60);

      if (hours >= 18 || hours < 6) {
        document.documentElement.classList.add('night');
      } else {
        document.documentElement.classList.remove('night');
      }

      if (hours < 6) {
        hours = hours + 6;
      } else {
        hours = hours - 6;
      }

      let sunPosition = (hours % 12) * 60 * 60; // The animation only supports 0-12 hours, at present
                                                // Adjust by six hours, so the sun will be half-way through
                                                // the animation (instead of at the very end) at noon.

      document.documentElement.style.setProperty('--sun-position', sunPosition);

      let sixHours = 6 * 60 * 60; // 21600 seconds
      let sunVerticalRange = 4.5; // The sun can move up or down, within the range from zero through 4.5em

      if (sunPosition >= sixHours) {
        document.documentElement.style.setProperty('--sun-position-vertical', ((sunPosition / sixHours * sunVerticalRange) - sunVerticalRange) + 'em');
      } else {
        document.documentElement.style.setProperty('--sun-position-vertical', (sunVerticalRange - (sunPosition / sixHours * sunVerticalRange)) + 'em');
      }
    }

    setInterval(updateTime, 60 * 1000); // Once per minute
    updateTime();

  })();

  (function() {

    function _onOrientationChange(e) {
      const ALPHA = e.alpha;
      const BETA  = e.beta;
      const GAMMA = e.gamma;

      // You can test this by holding your device above you and facing the screen toward you
      const DEVICE_UPSIDE_DOWN = (BETA > 90)

      // To help avoid changing the animation direction too often
      const THRESHOLD = 25

      // Device is in portrait orientation
      if (GAMMA > THRESHOLD) {
        document.documentElement.style.setProperty('--device-gamma', DEVICE_UPSIDE_DOWN ? -1 : 1);
      } else if (GAMMA < THRESHOLD * -1) {
        document.documentElement.style.setProperty('--device-gamma', DEVICE_UPSIDE_DOWN ? 1 : -1);
      } else {
        document.documentElement.style.setProperty('--device-gamma', 0);
      }

      // Device is in landscape orientation
      if (BETA > THRESHOLD) {
        document.documentElement.style.setProperty('--device-beta', -1);
      } else if (BETA < THRESHOLD * -1) {
        document.documentElement.style.setProperty('--device-beta', 1);
      } else {
        document.documentElement.style.setProperty('--device-beta', 0);
      }

      throttle = undefined;
    };
    
    // Wait for the orientation to be stable and then respond
    const WAIT_UNTIL_SECONDS = 1/10;
    let throttle = undefined;
    function onOrientationChange(e) {
      if (throttle !== undefined) return;
      throttle = setTimeout(function() {
        _onOrientationChange(e);
      }, WAIT_UNTIL_SECONDS * 1000);
    }

    window.addEventListener("deviceorientation", onOrientationChange, false);

    /* For debugging
    
    <p>alpha: <span id="alpha"></span></p>
    <p>beta: <span id="beta"></span></p>
    <p>gamma: <span id="gamma"></span></p>

    document.getElementById("alpha").innerHTML = Math.round(ALPHA);
    document.getElementById("beta").innerHTML  = Math.round(BETA);
    document.getElementById("gamma").innerHTML = Math.round(GAMMA);
    
    */
  })();
