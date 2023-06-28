import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import Layout from "../layout";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");

  const { onSetUser } = useUser();

  const onSubmit = () => {
    if (name.length === 0) {
      alert("Enter your name");
      return;
    }

    onSetUser(name);

    if (location.state?.from) {
      navigate(location.state.from);
    }
  };

  return (
    <Layout>
      <Input
        mr="4"
        type="text"
        value={name}
        aria-label="Enter your name"
        placeholder="Enter your name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            onSubmit();
          }
        }}
      />
      <Button colorScheme="blue" onClick={onSubmit}>
        Enter
      </Button>
    </Layout>
  );
}
