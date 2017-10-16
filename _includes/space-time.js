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
      var now = new Date();
      var hours = now.getHours() + (now.getMinutes() / 60);

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

      var sunPosition = (hours % 12) * 60 * 60; // The animation only supports 0-12 hours, at present
                                                // Adjust by six hours, so the sun will be half-way through
                                                // the animation (instead of at the very end) at noon.

      document.documentElement.style.setProperty('--sun-position', sunPosition);

      var sixHours = 6 * 60 * 60; // 21600 seconds
      var sunVerticalRange = 4.5; // The sun can move up or down, within the range from zero through 4.5em

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
      var alpha = e.alpha;
      var beta  = e.beta;
      var gamma = e.gamma;

      /*
      <p>alpha: <span id="alpha"></span></p>
      <p>beta: <span id="beta"></span></p>
      <p>gamma: <span id="gamma"></span></p>

      document.getElementById("alpha").innerHTML = Math.round(alpha);
      document.getElementById("beta").innerHTML  = Math.round(beta);
      document.getElementById("gamma").innerHTML = Math.round(gamma);
      */

      if (gamma > 35) {
        document.documentElement.style.setProperty('--device-gamma', (beta > 90) ? -1 : 1);
      } else if (gamma < -35) {
        document.documentElement.style.setProperty('--device-gamma', (beta > 90) ? 1 : -1);
      } else {
        document.documentElement.style.setProperty('--device-gamma', 0);
      }

      if (beta > 35) {
        document.documentElement.style.setProperty('--device-beta', -1);
      } else if (beta < -35) {
        document.documentElement.style.setProperty('--device-beta', 1);
      } else {
        document.documentElement.style.setProperty('--device-beta', 0);
      }

      throttle = undefined;
    };

    var throttle = undefined;
    function onOrientationChange(e) {
      if (throttle !== undefined) return;
      throttle = setTimeout(function() {
        _onOrientationChange(e);
      }, 100);
    }

    window.addEventListener("deviceorientation", onOrientationChange, false);
  })();
