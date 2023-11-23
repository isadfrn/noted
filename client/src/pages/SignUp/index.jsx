import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Container, Form, Background } from "./styles";
import { useState } from "react";
import { api } from "../../services/api";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSignUp() {
    if (!name || !email || !password) {
      return alert("Type all fields");
    }

    await api
      .post("/users", { name, email, password })
      .then(() => {
        alert("User successfully registered");
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Not able to register");
        }
      });
  }

  return (
    <Container>
      <Background />

      <Form>
        <h1>Noted</h1>
        <p>Application to save and manage your useful links</p>

        <h2>Register</h2>

        <Input
          placeholder="Name"
          type="text"
          icon={FiUser}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Password"
          type="password"
          icon={FiLock}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button title="Register" onClick={handleSignUp} />

        <Link to="/">Back to login page</Link>
      </Form>
    </Container>
  );
}
