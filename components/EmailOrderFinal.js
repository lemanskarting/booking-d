import {
  Body,
  Container,
  Html,
  Img,
  Tailwind,
  Text,
  // Preview,
  Row,
  Column,
  Heading,
  Head,
  Preview,
  Link,
} from "@react-email/components";

const baseUrl = "https://lemans.cartcrafter.ru/api/downloadFile?fileQuery=";

export const EmailOrderFinal = ({
  data,
  name,
  message,
  email,
  phone,
  link,
}) => {
  return (
    <Tailwind>
      <Html lang="ru">
        <Preview>{`${data.preview}`}</Preview>
        <Head></Head>
        <Body className="bg-[#f7f7f7]">
          <Container
            // style={font}
            className="bg-white my-auto mx-auto font-sans px-[20px] md:px-[40px] py-[20px] text-black"
          >
            <Container className="mx-auto w-full max-w-[512px] pb-[20px]">
              <Img
                src={`${baseUrl}${data.imageOne}`}
                alt="logo"
                className="object-contain rounded-[8px] w-full h-auto mx-auto my-0"
              />
            </Container>
            <Container className="max-w-[512px]">
              <Heading
                as="h1"
                className="font-semibold my-0 italic m-0 text-[18px] pb-[10px]"
              >
                {data.heading}
              </Heading>
              <Text className="text-[16px] my-0 pb-[20px] whitespace-pre-line font-medium">
                {data.textOne}{" "}
              </Text>
              <Text className="text-[16px] my-0  whitespace-pre-line">
                {name}
              </Text>
              <Link
                href={`tel:${phone}`}
                className="text-[16px] !block text-[#DD2B1C] my-0  whitespace-pre-line"
              >
                {phone}
              </Link>
              <Link
                href={`mailto:${email}`}
                className="text-[16px] !block text-[#DD2B1C] my-0  pb-[20px] whitespace-pre-line"
              >
                {email}
              </Link>
              {message && (
                <Text className="text-[16px] !block my-0  pb-[20px] whitespace-pre-line">
                  {message}
                </Text>
              )}
              <Container className="bg-[#F7F7F7] mx-0 rounded-[8px] py-[10px] px-[14px] md:px-[24px] w-full mb-[40px]">
                <Row>
                  <Column align="left">
                    <Img
                      src={`${baseUrl}${data.imageTwo}`}
                      alt="logo"
                      className="w-[22px] h-[22px] my-0 object-contain mr-[16px] inline-block"
                    />
                  </Column>
                  <Column className="w-full" align="left">
                    <Link
                      href={link}
                      className="text-[14px] text-black underline text-left w-full my-0 !leading-snug whitespace-pre-line inline-block font-semibold"
                    >
                      {data.order} {name}
                    </Link>
                  </Column>
                </Row>
              </Container>
            </Container>
            <Container className="max-w-[512px]">
              <Row>
                <Column
                  align="left"
                  className="text-[16px] leading-snug my-0 !inline-block w-auto"
                >
                  <Text className=" my-0 whitespace-pre-line !leading-snug">
                    {data.textTwo}
                  </Text>
                </Column>
                <Column align="right">
                  <Img
                    src={`${baseUrl}${data.logo}`}
                    alt="logo"
                    className="w-[62px] h-[29px] my-0 object-contain"
                  />
                </Column>
              </Row>
            </Container>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};
