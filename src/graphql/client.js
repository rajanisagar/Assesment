import { ApolloClient, gql,InMemoryCache } from '@apollo/client'; 
import { GET_CUSTOMERS } from './queries';


const client = new ApolloClient({
    uri: "https://delicate-cod-89.hasura.app/v1/graphql",
    cache: new InMemoryCache({ addTypename: false }),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "X-Hasura-Admin-Secret":
        "2Jrapx6fFh36W86at4Ufmqbs9Yd4tSkXJpKP6iw6qhYfMxa3MiMU7XJhEdHV20Q4",
    },
  });


  client.query({
    query: GET_CUSTOMERS
  }).then(data => console.log(data))

export default client