##
# Cookie Consent
#
# This file provides a framework for executing Javascripts on the page ONLY if the user
# has consented to the use of cookies on their browser. This is handy for non-essential
# services such as Google Analytics and Facebook Pixels.
#
# There are corresponding Rails helpers in CookiesHelper.
#
# Examples
#
#   <!-- This HTML tag won't be executed on the page. See both type and data attrs. -->
#   <script type="application/template" data-require-consent>
#     alert("I'm only executed if consent is given!");
#   </script>
#
#

Cookies = require "js.cookie"

# =============
# = Constants =
# =============

##
# The name of the cookie we use to track consent
COOKIE_NAME = "cookies_consented"

##
# CSS matcher for template tags (see above)
MATCHER = "script[type='application/template'][data-require-consent]"

##
# If user as refused consent, ask again later
REASK_AFTER = 30 # days

##
# If user has given consent, expire in a year
EXPIRE_AFTER = 365 # days

##
# This event is triggered when the script is run if we don't have consent yet.
ASK_EVENT_NAME = "cs.ask"

##
# This event is triggered when the script is run if we don't have consent yet.
ACCEPTED_EVENT_NAME = "cs.accepted"

##
# This event is triggered when the script is run if we don't have consent yet.
REJECTED_EVENT_NAME = "cs.rejected"

# =============
# = Functions =
# =============

# Initial method, called to setup
init = ->
  document.addEventListener(ACCEPTED_EVENT_NAME, onAccept)
  document.addEventListener(REJECTED_EVENT_NAME, onReject)
  if !cookiesAsked()
    return askCookies()
  else if cookiesConsented()
    return executeConditionalScripts()
  else
    # In this case, the user has been asked to approve optional cookies and has
    # refused

# Set the cookie to the given value.
#
# value     - A String with the value to set in the cookie
# expiresIn - Integer of number of days after which to expire the cookie
#             (defaults: EXPIRE_AFTER).
#
setCookiesConsented = (value, expiresIn = EXPIRE_AFTER) ->
  Cookies.set(COOKIE_NAME, String(value), { expires: parseInt(expiresIn) })

# Has the visitor already been asked their cookie preference?
#
# Returns Boolean
cookiesAsked = ->
  !(Cookies.get(COOKIE_NAME) == undefined || Cookies.get(COOKIE_NAME) == null)

# Has the visitor already given consent for use of cookies?
#
# Returns Boolean
cookiesConsented = ->
  Cookies.get(COOKIE_NAME) == "true"

# Has the visitor already rejected consent for use of cookies?
#
# Returns Boolean
cookiesRejected = ->
  Cookies.get(COOKIE_NAME) == "false"

# Execute the conditional scripts on the page, asssuming consent has been given.
#
# Returns Boolean
executeConditionalScripts = ->
  body = document.querySelector("body")
  scriptTags = document.querySelectorAll(MATCHER)
  for scriptTag in scriptTags
    newScript = document.createElement("script")
    newScript.type = "text/javascript"
    newScript.innerHTML = scriptTag.innerHTML
    newScript.src = scriptTag.dataset['src'] if scriptTag.dataset["src"]
    body.appendChild(newScript)

# Show the cookie preferences dialog
askCookies = ->
  event = new Event(ASK_EVENT_NAME);
  document.dispatchEvent(event);


# Callback when the cookies have been acccepted.
onAccept = () ->
  setCookiesConsented("true")

# Callback when the cookies have been rejected.
onReject = () ->
  setCookiesConsented("false", REASK_AFTER)

export { init, ACCEPTED_EVENT_NAME, REJECTED_EVENT_NAME, ASK_EVENT_NAME }
