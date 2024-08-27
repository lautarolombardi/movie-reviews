import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import User from "./User";

const UsersList = ({ users, handleUserState }) => {
  return (
    <Box mb={12}>
      <Heading mb={8}>Lista de usuarios</Heading>
      <VStack spacing={6} alignItems={"start"}>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Nombre</Th>
                <Th>Fecha de registro</Th>
                <Th>Habilitar/Deshabilitar</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users?.map((user) => (
                <User
                  key={user.id}
                  user={user}
                  handleUserState={handleUserState}
                />
              ))}
              {users.message}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Box>
  );
};
export default UsersList;
