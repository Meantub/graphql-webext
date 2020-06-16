# GraphQL Web Extensions
Extensions have a separation between the popup, content-script, and background scripts. The background script is always running whereas the popup and content-script are not so being able to store data in the background script would be helpful. And while you can do this, there is no standard way to do it.

Example of the current way it's done:
```js
/// popup.js
chrome.runtime.sendMessage('ping', (response) => {
    console.log(response); // prints 'pong'
});


/// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message); // prints 'ping'
    sendResponse('pong');
});
```

This led me to believe that there should be a GraphQL setup here.

```js
/// popup.js
sendQuery('{ ping }').then((response) => {
    console.log(response); // prints pong
})

/// background.js
const schema = buildSchema(`
    type Query {
        ping: String
    }
`);

const root = { ping: () => 'pong' };

registerGraphqlListener(schema, root);

```