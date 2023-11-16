import { Container, Profile, Logout } from "./styles";
import { RiShutDownLine } from "react-icons/ri";

export const Header = () => {
  return (
    <Container>
      <Profile to="/profile">
        <img
          src="https://github.com/isadfrn.png"
          alt="A white girl using a blue shirt, with short hair, using glasses, in a green background"
        />

        <div>
          <span>Welcome</span>
          <strong>Isabella Nunes</strong>
        </div>
      </Profile>

      <Logout>
        <RiShutDownLine />
      </Logout>
    </Container>
  );
};
