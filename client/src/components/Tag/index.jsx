import { Container } from "./styles";

export const Tag = ({ title, ...rest }) => {
  return <Container {...rest}>{title}</Container>;
};
