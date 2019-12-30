// Generated by CoffeeScript 2.4.1
//#
// Cookie Consent

// This file provides a framework for executing Javascripts on the page ONLY if the user
// has consented to the use of cookies on their browser. This is handy for non-essential
// services such as Google Analytics and Facebook Pixels.

// There are corresponding Rails helpers in CookiesHelper.

// Examples

//   <!-- This HTML tag won't be executed on the page. See both type and data attrs. -->
//   <script type="application/template" data-require-consent>
//     alert("I'm only executed if consent is given!");
//   </script>

var ASK_EVENT_NAME, COOKIE_NAME, Cookies, EXPIRE_AFTER, MATCHER, REASK_AFTER, askCookies, cookiesAsked, cookiesConsented, cookiesRejected, executeConditionalScripts, init, onAccept, onReject, setCookiesConsented, start;

Cookies = require("js.cookie");

// =============
// = Constants =
// =============

//#
// The name of the cookie we use to track consent
COOKIE_NAME = "cookies_consented";

//#
// CSS matcher for template tags (see above)
MATCHER = "script[type='application/template'][data-require-consent]";

//#
// If user as refused consent, ask again later
REASK_AFTER = 30; // days


//#
// If user has given consent, expire in a year
EXPIRE_AFTER = 365; // days

ASK_EVENT_NAME = "cs.modal.show";

// =============
// = Functions =
// =============

// Initial method, called to setup
init = function() {
  var acceptButton, rejectButton;
  acceptButton = document.querySelector('.js-cookie-consent-accept');
  if (acceptButton) {
    acceptButton.addEventListener("click", onAccept);
  }
  rejectButton = document.querySelector('.js-cookie-consent-reject');
  if (rejectButton) {
    rejectButton.addEventListener("click", onReject);
  }
  if (!cookiesAsked()) {
    return askCookies();
  }
  if (cookiesConsented()) {
    return executeConditionalScripts();
  }
};

// Set the cookie to the given value.

// value     - A String with the value to set in the cookie
// expiresIn - Integer of number of days after which to expire the cookie
//             (defaults: EXPIRE_AFTER).

setCookiesConsented = function(value, expiresIn = EXPIRE_AFTER) {
  return Cookies.set(COOKIE_NAME, String(value), {
    expires: parseInt(expiresIn)
  });
};

// Has the visitor already been asked their cookie preference?

// Returns Boolean
cookiesAsked = function() {
  return Cookies.get(COOKIE_NAME) !== void 0;
};

// Has the visitor already given consent for use of cookies?

// Returns Boolean
cookiesConsented = function() {
  return Cookies.get(COOKIE_NAME) === "true";
};

// Has the visitor already rejected consent for use of cookies?

// Returns Boolean
cookiesRejected = function() {
  return Cookies.get(COOKIE_NAME) === "false";
};

// Execute the conditional scripts on the page, asssuming consent has been given.

// Returns Boolean
executeConditionalScripts = function() {
  var body, i, len, newScript, results, scriptTag, scriptTags;
  body = document.querySelector("body");
  scriptTags = document.querySelectorAll(MATCHER);
  results = [];
  for (i = 0, len = scriptTags.length; i < len; i++) {
    scriptTag = scriptTags[i];
    newScript = document.createElement("script");
    newScript.type = "text/javascript";
    newScript.innerHTML = scriptTag.innerHTML;
    if (scriptTag.dataset["src"]) {
      newScript.src = scriptTag.dataset['src'];
    }
    results.push(body.appendChild(newScript));
  }
  return results;
};

// Show the cookie preferences dialog
askCookies = function() {
  var event;
  event = new Event(ASK_EVENT_NAME);
  return document.dispatchEvent(event);
};

onAccept = function(e) {
  e.preventDefault();
  return setCookiesConsented("true");
};

// Callback when the cookies have been rejecte.
onReject = function(e) {
  e.preventDefault();
  return setCookiesConsented("false", REASK_AFTER);
};

start = function() {
  return init();
};

export {
  init,
  start
};
