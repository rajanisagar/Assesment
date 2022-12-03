import React, { useState } from 'react';
import { Button, Flex, FormControl, FormLabel, Heading, Input, MenuGroup, MenuItemOption, Select, Spinner, Stack,Text, useDisclosure } from '@chakra-ui/react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CITIES, GET_CUSTOMERS } from './graphql/queries';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { ADD_CUSTOMER, DELETE_CUSTOMER } from './graphql/mutations';
import { queries } from '@testing-library/react';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [city, setCity] = useState('')

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  async function handleDelete(id:any){
      const isConfirmed =  window.confirm("Are you sure yo want to delete ")
      if(isConfirmed){
        const variables = {
          id
        }
        await deleteCustomer({variables, refetchQueries:[{query:GET_CUSTOMERS}]})
      }
  }

   async function handleClick(e: any){
    e.preventDefault();
    const variables = {
      name:name,
      email:email,
      role:role,
      cilty_id:city
    }
    await addCustomer({variables, refetchQueries:[{query:GET_CUSTOMERS}]})
    onClose()
    // console.log(name)
    }
  const {data, loading, error} = useQuery(GET_CUSTOMERS)
  const [addCustomer] = useMutation(ADD_CUSTOMER)
  
  const {data:cities, loading:citiesLoading, error:citiesError} = useQuery(GET_CITIES)

  const [deleteCustomer] = useMutation(DELETE_CUSTOMER)
  if(loading){
    return<Flex align={"center"} justify="center" w={"100vw"} h="100vh">
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
  </Flex>
  }

  if(error){
    return <div>something went wrong...</div>
  }
  if(citiesLoading){
    return<Flex align={"center"} justify="center" w={"100vw"} h="100vh">
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
  </Flex>
  }
  if(citiesError){
    return<Flex align={"center"} justify="center" w={"100vw"} h="100vh">
<div>something went wrong...</div>
  </Flex>
  }


  return (




    <div>


      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input ref={initialRef} placeholder='Name' onChange={(e) => setName(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input  placeholder='Email'  onChange={(e) => setEmail(e.target.value)}/>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Role</FormLabel>
              <Input placeholder='Role'  onChange={(e) => setRole(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>City</FormLabel>
              <Select placeholder='Select option'  onChange={(e) => setCity(e.target.value)}>
               
                {
                 
                  cities.test_cities.map((c:any) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))
                }

             </Select>
            </FormControl>

            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}  onClick = {(e) => handleClick(e)} >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  



    <Flex align={"center"} justify="center" w={"100vw"} h="100vh">
    
<TableContainer>
  <Table variant='simple'>
    <TableCaption> 
        <Button colorScheme={'blue'} onClick={onOpen}>Add Customer</Button>
    </TableCaption>
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>Email</Th>
        <Th >Role</Th>
        <Th >City</Th>
        <Th >Action</Th>
      </Tr>
    </Thead>
    <Tbody>
    {
        data.test_customers.map((customer: any) => (
          <Tr key={customer.id}>
            <Td>{customer.name}</Td>
            <Td>{customer.email}</Td>
            <Td>{customer.role}</Td>
            <Td>{cities.test_cities.find((element:any) => 
     element.id === customer.city_id
  ).name}</Td>
            <Td> <Button colorScheme='red' onClick={()  => handleDelete(customer.id)}>Delete</Button></Td>

        </Tr>
        ))

      }

     
    </Tbody>
    <Tfoot>
      <Tr>
        <Th></Th>
        
      </Tr>
    </Tfoot>
  </Table>
</TableContainer>
      
    </Flex>

    </div>



  );
}

export default App;
