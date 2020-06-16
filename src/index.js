import { graphql } from "graphql";


export const sendQuery = (query) => {
    return chrome.runtime.sendMessage(query);
}

export const registerGraphqlListener = (schema, root) => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        graphql(schema, message, root).then((result) => {
            sendResponse(result);
        });
    });
}