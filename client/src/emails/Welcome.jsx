import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from "@react-email/components";

const baseUrl = "http://localhost:5173/";

export const Welcome = ({ loginCode }) => (
  <Html>
    <Head />
    <Preview>Welcome to Chesed</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome to Chesed</Heading>

        <Text style={{ ...text, marginBottom: "14px" }}>
          Thabk you for joining Chesed where you get to learn and grow with
          other learners.
        </Text>

        <Img
          src={`${baseUrl}/chesed-logo.png`}
          width="32"
          height="32"
          alt="Chesed's Logo"
        />
        <Text style={footer}>
          <Link
            href="http://localhost:5173/"
            target="_blank"
            style={{ ...link, color: "#898989" }}
          >
            Chesed.so
          </Link>
          , the all-in-one-tutoring platform
          <br />
        </Text>
      </Container>
    </Body>
  </Html>
);

export default Welcome;

const main = {
  backgroundColor: "#ffffff",
};

const container = {
  paddingLeft: "12px",
  paddingRight: "12px",
  margin: "0 auto",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
};

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const footer = {
  color: "#898989",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "12px",
  lineHeight: "22px",
  marginTop: "12px",
  marginBottom: "24px",
};

const code = {
  display: "inline-block",
  padding: "16px 4.5%",
  width: "90.5%",
  backgroundColor: "#f4f4f4",
  borderRadius: "5px",
  border: "1px solid #eee",
  color: "#333",
};
