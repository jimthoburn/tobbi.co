  (function() {

    // Generate a random number between 1 and 1000
    function getRandomDelay() {

      // KUDOS https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript#answer-4960020
      return Math.floor(Math.random() * 1000) + 1;
    }

    document.documentElement.style.setProperty('--cloud-delay-one',   getRandomDelay() + 's');
    document.documentElement.style.setProperty('--cloud-delay-two',   getRandomDelay() + 's');
    document.documentElement.style.setProperty('--cloud-delay-three', getRandomDelay() + 's');
    document.documentElement.style.setProperty('--cloud-delay-four',  getRandomDelay() + 's');
    document.documentElement.style.setProperty('--cloud-delay-five',  getRandomDelay() + 's');
    
    document.documentElement.style.setProperty('--sun-delay',  getRandomDelay() + 's');

    function updateTheme() {

      // KUDOS: https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
      if (matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('night');
      } else if (matchMedia('(prefers-color-scheme: light)').matches) {
        document.documentElement.classList.remove('night');
      }
    }

    function updateTime() {
      let now = new Date();
      let hours = now.getHours() + (now.getMinutes() / 60);

      let hasNoColorSchemePreference = true;

      // If dark mode is supported
      // https://web.dev/prefers-color-scheme/
      if (matchMedia('(prefers-color-scheme)').media !== 'not all') {

        // If the user has selected light or dark
        if (matchMedia('(prefers-color-scheme: light)').matches ||
            matchMedia('(prefers-color-scheme: dark)').matches) {
          hasNoColorSchemePreference = false;
        }
      }

      // If the user hasn’t chosen dark or light mode
      if (hasNoColorSchemePreference) {

        // Choose a theme based on the time of day
        if (hours >= 18 || hours < 6) {
          document.documentElement.classList.add('night');
        } else {
          document.documentElement.classList.remove('night');
        }
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
    
    matchMedia('(prefers-color-scheme: dark)').addListener(updateTheme);
    updateTheme();
  })();

  (function() {

    // EXPERIMENTAL: These properties have only been tested in WebKit on iOS

    function _onOrientationChange(e) {
      const ALPHA = e.alpha;
      const BETA  = e.beta;
      const GAMMA = e.gamma;

      // To avoid changing the animation direction too often
      const THRESHOLD = 25

      // You can test these properties by holding your device
      // above you and facing the screen toward you
      const PORTRAIT_FACING_DOWN  = (BETA > 90);
      // const LANDSCAPE_FACING_DOWN = (GAMMA < 0);

      // You can test this property tilting your device until it’s in landscape
      // mode, positioning the top of the device so it’s on the right–
      // and then repositioning the top of the device so it’s on the left
      // const DEVICE_IS_LANDSCAPE_AND_RESTING_ON_SIDE_A = (ALPHA > 180);

      function getGamma(value) {
        if (PORTRAIT_FACING_DOWN) value = value * -1;
        return value;
      }
      // function getBeta(value) {
      //   if (DEVICE_IS_LANDSCAPE_AND_RESTING_ON_SIDE_A && LANDSCAPE_FACING_DOWN) value = value * -1;
      //   return value;
      // }

      // Portrait orientation
      
      // Tilted right
      if (GAMMA > THRESHOLD) {
        document.documentElement.style.setProperty('--device-gamma', getGamma(1));
        
      // Tilted left
      } else if (GAMMA < THRESHOLD * -1) {
        document.documentElement.style.setProperty('--device-gamma', getGamma(-1));

      // Neutral
      } else {
        document.documentElement.style.setProperty('--device-gamma', 0);
      }

      /*
      // Landscape orientation
      
      // Tilted right
      if (BETA > THRESHOLD) {
        document.documentElement.style.setProperty('--device-beta', getBeta(1));
      
      // Tilted left
      } else if (BETA < THRESHOLD * -1) {
        document.documentElement.style.setProperty('--device-beta', getBeta(-1));
      
      // Neutral
      } else {
        document.documentElement.style.setProperty('--device-beta', 0);
      }
      */

      throttle = undefined;


      // document.getElementById("alpha").innerHTML = Math.round(ALPHA);
      // document.getElementById("beta").innerHTML  = Math.round(BETA);
      // document.getElementById("gamma").innerHTML = Math.round(GAMMA);
      /* For debugging
      
      <p>alpha: <span id="alpha"></span></p>
      <p>beta: <span id="beta"></span></p>
      <p>gamma: <span id="gamma"></span></p>

      document.getElementById("alpha").innerHTML = Math.round(ALPHA);
      document.getElementById("beta").innerHTML  = Math.round(BETA);
      document.getElementById("gamma").innerHTML = Math.round(GAMMA);
      
      */
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
    
  })();
