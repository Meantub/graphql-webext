import { graphql, GraphQLSchema, Source } from "graphql";

export const sendQuery = (query: string | Source) => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(query, (response) => {
      resolve(response);
    });
  });
};

export const registerGraphqlListener = (schema: GraphQLSchema, root: any) => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    graphql(schema, message, root).then((result) => {
      sendResponse(result);
    });
  });
};
