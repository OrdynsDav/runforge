import Container from "../../atoms/Container/Container";
import { Text } from "../../atoms/Text/Text";
import "./Header.css"

export default function Header() {
  return (
    <header className="header">
      <Container>
        <div className="header__breadcrumbs">
          <Text>Project / web-platform</Text>
        </div>
        <Text variant="display">Runs</Text>
      </Container>
    </header>
  );
}
