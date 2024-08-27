import { Button, Td, Tr } from "@chakra-ui/react";

const User = ({ user, handleUserState }) => {
  return (
    <Tr>
      <Td>{user?.id}</Td>
      <Td>{user?.name}</Td>
      <Td>{new Date(user?.created_at).toLocaleDateString()}</Td>
      <Td>
        <Button
          colorScheme={user.deleted_at ? "green" : "red"}
          onClick={() =>
            handleUserState(user?.id, user.deleted_at ? false : true)
          }
        >
          {user?.deleted_at ? "Habilitar" : "Deshabilitar"}
        </Button>
      </Td>
    </Tr>
  );
};
export default User;
