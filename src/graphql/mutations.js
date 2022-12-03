import { gql } from "@apollo/client";


//add customer
export const ADD_CUSTOMER = gql`
mutation addCustomer($name: String!,$email: String!, $role: String!,$cilty_id: uuid) {

    insert_test_customers(objects: {email: $email, name:$name , role: $role, city_id: $cilty_id}) {
      returning {
        city_id
        email
        role
        name
        id
      }
    }
  }
  
`

// delete customer
export const DELETE_CUSTOMER = gql`
mutation deleteCustomer($id: uuid!) {
    delete_test_customers(where: {id: {_eq:$id}}) {
      returning {
        email
        id
        name
        role
        city_id
      }
    }
  }
  
  
`




