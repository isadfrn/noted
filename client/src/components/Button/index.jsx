import { Container } from "./styles";

export const Button = ({ title, loading = false, ...rest }) => {
  return (
    <Container type="button" disabled={loading} {...rest}>
      {loading ? "Loading..." : title}
    </Container>
  );
};
