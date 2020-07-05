# Bypassing Same-origin policy without CORS

For loading decks from external files it is necessary to bypass SOP.
It's not guarenteed that all sites can send CORS headers.
Thus we need another way which works by adjusting the content / file format and not by configuring the server.

## Proxy

Obviously one could setup a server that receives a file URL, reads the corresponding data, adds CORS headers and returns the data.
But the disadvantage is that this requires deploying a server which can handle enough requests.
That would also make our app vulnerable to (D)DoS attacks in some way.

Of course one could also use existing services but then you have to rely on others which should be avoided as much as possible.

## JSONP

One shortly evaluated way of circumventing SOP was to use JSONP.
That means that a `script`-tag is added dynamically that invokes an external JavaScript file.
This JavaScript file could then call a function and pass the JSON data.
It worked to send data from an external site but it also leads to a critical security vulnerability since any code could be injected and not only the desired function call which passes some JSON data.

## iframe and Window.postMessage()

**TODO**: some general introduction

External site which offers decks:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
    </head>
    <body>
        <!-- e.g. some content to promote the file which is served from this website -->
        <script>
            const data = { "meta": "...", "decks": "..." };
            function receiveMessage(event)
            {
                window.parent.postMessage(JSON.stringify(data), event.origin);
            }
            window.addEventListener("message", receiveMessage, false);
        </script>
    </body>
</html>
```

Loading data:
```js
const EXTERNAL_URL = "https://nikolockenvitz.de/ffc/postmessagetest.html";

const iframe = document.createElement("iframe");
iframe.style.display = "none";
iframe.src = EXTERNAL_URL;
iframe.sandbox = "allow-scripts allow-same-origin";
document.body.appendChild(iframe);

function receiveMessage(event) {
    // event.origin needs to be checked
    // event.data contains the data, e.g. stringified JSON
    console.log(event);
}
window.addEventListener("message", receiveMessage, false);

iframe.contentWindow.postMessage("get fancy decks", EXTERNAL_URL)
```

The security of this approach should be investigated further but at the first look it seems ok.

## Sources

* https://stackoverflow.com/questions/3076414/ways-to-circumvent-the-same-origin-policy
* https://www.w3schools.com/js/js_json_jsonp.asp
* https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
