import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { TOKEN } from "./token";
import { createUploadLink } from 'apollo-upload-client';
//import { offsetLimitPagination } from "@apollo/client/utilities";

const uploadLink = createUploadLink({
	uri: 'http://localhost:4000/graphql'
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem(TOKEN);
	return {
		headers: {
			...headers,
			token
		}
	}
});


export const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				comments: {
					// Don't cache separate results based on
					// any of this field's arguments.
					keyArgs: ['photoId'],

					// Concatenate the incoming list items with
					// the existing list items.
					merge(existing, incoming, { args }) {
						if (!existing) {
							return incoming;
						}

						return [...incoming, ...existing]

					},
				}
			}
		}
	}
});

export const client = new ApolloClient({
	link: authLink.concat(uploadLink),
	cache
});