import { gql } from "@apollo/client";
//get cutomers
export const GET_CUSTOMERS =  gql`
query getCustomer {
    test_customers {
      name
      id
      email
      city_id
      role
    }
  }
`


//get cities
export const GET_CITIES =  gql`
query getCities {
    test_cities {
      name
      id
    }
  }
`



  