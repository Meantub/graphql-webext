import { graphql, GraphQLSchema, Source, ExecutionResult } from "graphql";

export const sendQuery = (query: string | Source) => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      query,
      (response: ExecutionResult<{ [key: string]: any }>) => {
        if (response.errors) reject(response);

        resolve(response);
      }
    );
  });
};

export const registerGraphqlListener = (schema: GraphQLSchema, root: any) => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    graphql(schema, message, root).then((result) => {
      sendResponse(result);
    });
  });
};
