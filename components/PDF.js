import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { numberWithCommas } from "./utils/NumberWithCommas";
import {
  correctPrice,
  getItemPrice,
  getTotalPrice,
  getTotalPriceByType,
} from "../lib/helperFunctions";
import { convertBookingToFormattedString } from "../lib/formatTimeObject";

// const URL = "";
const URL = "https://lemans.cartcrafter.ru/api/downloadFile?fileQuery=";

Font.register({
  family: "Rubik",
  fonts: [
    {
      src: URL + "/Proxima-Nova-Semibold-Italic.ttf",
      fontWeight: 700,
      fontStyle: "italic",
    },
    {
      src: URL + "/Proxima-Nova-Regular.ttf",
      fontWeight: 400,
    },
    {
      src: URL + "/Proxima-Nova-Semibold.ttf",
      fontWeight: 600,
    },
  ],
});
const styles = StyleSheet.create({
  page: {
    paddingTop: "6vw",
    paddingBottom: "6vw",
    paddingHorizontal: "9vw",
    backgroundColor: "#0E0C17",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Rubik",
  },
  heading: {
    fontWeight: 600,
    fontStyle: "italic",
    textAlign: "center",
    fontSize: "4.3vw",
    textTransform: "uppercase",
    paddingBottom: "7vw",
    paddingTop: "3.6vw",
  },
  image: {
    width: "15vw",
    marginHorizontal: "auto",
    objectFit: "contain",
  },
  section: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "start",
    width: "100%",
    height: "auto",
    // paddingBottom: "5vw",
  },
  sectionEnd: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  summaryTop: {
    padding: "3.6vw",
    paddingBottom: "2.4vw",
    borderTopLeftRadius: "0.48vw",
    borderTopRightRadius: "0.48vw",
    // borderBottom: "0.12vw solid #D9D9D9",
  },
  summaryMiddle: {
    marginHorizontal: "1.4vw",
    backgroundColor: "#F7F7F7",
    borderRadius: "0.48vw",
  },
  summaryBottom: {
    padding: "1.8vw",
    borderBottomLeftRadius: "0.48vw",
    borderBottomRightRadius: "0.48vw",
    // border: "0.12vw solid #D9D9D9",
  },
  summaryTotal: {
    marginTop: "4.6vw",
    padding: "1.8vw",
    borderRadius: "0.48vw",
    // border: "0.12vw solid #D50201",
  },
  summaryExtra: {
    padding: "1.8vw",
    // border: "0.12vw solid #D9D9D9",
    borderBottom: "none",
  },
});

export default function PDF({ config, total, discounts, guests, data }) {
  const date = total.filter((item) => item.type === "date")[0];
  const menu = total.filter((item) => item.type === "menu" && item.amount > 0);
  const options = total.filter(
    (item) => item.type === "options" && item.amount > 0
  );

  return (
    <Document>
      <Page wrap={false} size="A4" style={styles.page}>
        <View style={styles.section}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image style={styles.image} src={URL + data.pdfData.logo} />
        </View>
        <Text style={styles.heading}>
          {config ? data.pdfData.headingOneFinal : data.pdfData.headingOne}
        </Text>
        <View
          style={{
            fontSize: "3vw",
            paddingBottom: "3vw",
            textAlign: "center",
          }}
        >
          <Text style={{ paddingBottom: "1vw" }}>
            {config ? data.pdfData.soon : data.pdfData.soonConf}
          </Text>
          <Text>
            {config ? data.pdfData.textOneFinal : data.pdfData.textOne}
          </Text>
          <Text
            style={{
              color: "#DD2B1C",
              fontWeight: "600",
              paddingVertical: "1vw",
            }}
          >
            {data.pdfData.phone}
          </Text>
          <Text>{data.pdfData.mailUs}</Text>
          <Text
            style={{ color: "#DD2B1C", fontWeight: "600", paddingTop: "1vw" }}
          >
            {data.pdfData.mail}
          </Text>
          <Text
            style={{
              paddingBottom: "6vw",
              paddingTop: "3.6vw",
              fontSize: "2vw",
            }}
          >
            {config ? data.pdfData.headingTwoFinal : data.pdfData.headingTwo}
          </Text>
        </View>

        {getTotalPrice(total) > 0 && (
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "0.48vw",
              color: "#08070E",
            }}
          >
            <View style={styles.summaryTop}>
              <View style={[styles.flexContainer, { fontSize: "2.2vw" }]}>
                <Text
                  style={{
                    fontWeight: "600",
                  }}
                >
                  {data.pdfData.choice}
                </Text>
                <Text
                  style={{
                    fontWeight: "600",
                  }}
                >
                  {data.pdfData.price}
                </Text>
              </View>
            </View>
            <View style={styles.summaryMiddle}>
              <View style={{ paddingVertical: "0vw" }}>
                {date && (
                  <View
                    style={{
                      borderBottom:
                        getTotalPrice(options) || getTotalPrice(menu)
                          ? "0.06vw solid #C6C5CB"
                          : "",

                      paddingHorizontal: "2.2vw",
                      paddingTop: "2.4vw",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "1.8vw",
                        fontWeight: "600",
                        paddingBottom: "1.2vw",
                      }}
                    >
                      {data.calendar.headingOne}
                    </Text>
                    <View
                      style={[styles.flexContainer, { paddingBottom: "2.4vw" }]}
                    >
                      <Text
                        style={{
                          fontSize: "1.8vw",
                          color: "#08070E99",
                        }}
                      >
                        {convertBookingToFormattedString(date)}
                      </Text>
                      <Text
                        style={{
                          fontSize: "1.8vw",
                          color: "#08070E99",
                        }}
                      >
                        {`${numberWithCommas(getItemPrice(date, false))} руб.`}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: "1.8vw",
                        fontWeight: "600",
                        paddingBottom: "1.2vw",
                      }}
                    >
                      {data.configText.people}
                    </Text>
                    <View style={[styles.flexContainer]}>
                      <Text
                        style={{
                          fontSize: "1.8vw",
                          color: "#08070E99",
                        }}
                      >
                        {`${date.amount} ${data.configText.person}`}
                      </Text>
                    </View>
                    {discounts.date > 0 && (
                      <View
                        style={[styles.flexContainer, { paddingTop: "2.4vw" }]}
                      >
                        <Text
                          style={{
                            fontSize: "1.8vw",
                            color: "#08070E99",
                            fontWeight: "600",
                          }}
                        >
                          {data.configText.discount}
                        </Text>
                        <Text
                          style={{
                            fontSize: "1.8vw",
                            color: "#DD2B1C",
                            fontWeight: "600",
                          }}
                        >
                          {`${discounts.date}%`}
                        </Text>
                      </View>
                    )}
                    <View>
                      <View
                        style={[
                          styles.flexContainer,
                          {
                            paddingBottom: "2.4vw",
                            paddingTop: discounts.date > 0 ? "1.2vw" : "2.4vw",
                          },
                        ]}
                      >
                        <Text
                          style={{
                            fontSize: "1.8vw",
                            fontWeight: "600",
                          }}
                        >
                          {data.configText.total}
                        </Text>
                        <Text
                          style={{
                            fontSize: "1.8vw",
                            fontWeight: "600",
                          }}
                        >
                          {`${numberWithCommas(
                            getItemPrice(date, false, discounts.date)
                          )} руб.`}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
                {options.length > 0 && (
                  <View
                    style={{
                      borderBottom: getTotalPrice(menu)
                        ? "0.06vw solid #C6C5CB"
                        : "",
                      // marginoBottom: getTotalPrice(menu) ? "2.4vw" : "",
                      paddingTop: "2.4vw",
                      paddingHorizontal: "2.2vw",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "1.8vw",
                        fontWeight: "600",
                        paddingBottom: "1.2vw",
                      }}
                    >
                      {data.allItems[0].heading}
                    </Text>
                    {options.map((item, i) => (
                      <View
                        key={i}
                        style={[styles.flexContainer, { paddingBottom: "1vw" }]}
                      >
                        <Text
                          style={{
                            fontSize: "1.8vw",
                            color: "#08070E99",
                          }}
                        >
                          {item.heading.replace(/\n/gim, " ")}
                          <Text
                            style={{
                              fontSize: "1.8vw",
                              fontWeight: "600",
                            }}
                          >
                            {item.amount > 1 && ` x${item.amount}`}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            fontSize: "1.8vw",
                            color: "#08070E99",
                          }}
                        >
                          {item.from === "true" && "От "}
                          {`${numberWithCommas(item.price * item.amount)} руб.`}
                        </Text>
                      </View>
                    ))}
                    {discounts.options > 0 && (
                      <View
                        style={[styles.flexContainer, { paddingTop: "1.4vw" }]}
                      >
                        <Text
                          style={{
                            fontSize: "1.8vw",
                            color: "#08070E99",
                            fontWeight: "600",
                          }}
                        >
                          {data.configText.discount}
                        </Text>
                        <Text
                          style={{
                            fontSize: "1.8vw",
                            color: "#DD2B1C",
                            fontWeight: "600",
                          }}
                        >
                          {`${discounts.options}%`}
                        </Text>
                      </View>
                    )}
                    <View>
                      <View
                        style={[
                          styles.flexContainer,
                          {
                            paddingTop:
                              discounts.options > 0 ? "1.2vw" : "1.4vw",
                            paddingBottom: "2.4vw",
                          },
                        ]}
                      >
                        <Text
                          style={{
                            fontSize: "1.8vw",
                            fontWeight: "600",
                          }}
                        >
                          {data.configText.total}
                        </Text>
                        <Text
                          style={{
                            fontSize: "1.8vw",
                            fontWeight: "600",
                          }}
                        >
                          {`${numberWithCommas(
                            getTotalPrice(options, discounts)
                          )} руб.`}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
                {menu.length > 0 && (
                  <View
                    style={{
                      paddingHorizontal: "2.2vw",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: "1.8vw",
                        fontWeight: "600",
                        paddingTop: "2.4vw",
                        paddingBottom: "1.2vw",
                      }}
                    >
                      {data.configText.headingTwo}
                    </Text>
                    {menu.map((item, i) => (
                      <View
                        key={i}
                        style={[styles.flexContainer, { paddingBottom: "1vw" }]}
                      >
                        <Text
                          style={{
                            fontSize: "1.8vw",
                            color: "#08070E99",
                            maxWidth: "80%",
                          }}
                        >
                          {item.heading.replace(/\n/gim, " ")}
                          <Text
                            style={{
                              fontSize: "1.8vw",
                              fontWeight: "600",
                            }}
                          >
                            {item.amount > 1 && ` x${item.amount}`}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            fontSize: "1.8vw",
                            color: "#08070E99",
                          }}
                        >
                          {item.from === "true" && "От "}
                          {`${getItemPrice(item, false)} руб.`}
                        </Text>
                      </View>
                    ))}
                    <View
                      style={[styles.flexContainer, { paddingBottom: "1vw" }]}
                    >
                      <Text
                        style={{
                          fontSize: "1.8vw",
                          color: "#08070E99",
                          maxWidth: "80%",
                        }}
                      >
                        {data.configText.serviceTip}
                      </Text>
                      <Text
                        style={{
                          fontSize: "1.8vw",
                          color: "#08070E99",
                        }}
                      >
                        {`${numberWithCommas(
                          correctPrice(getTotalPriceByType(menu, "menu") / 10)
                        )} руб.`}
                      </Text>
                    </View>

                    <Text
                      style={{
                        fontSize: "1.8vw",
                        fontWeight: "600",
                        paddingBottom: "1.2vw",
                        paddingTop: "1.4vw",
                      }}
                    >
                      {data.configText.people}
                    </Text>
                    <View style={[styles.flexContainer]}>
                      <Text
                        style={{
                          fontSize: "1.8vw",
                          color: "#08070E99",
                        }}
                      >
                        {`${guests} ${data.configText.person}`}
                      </Text>
                    </View>
                    {discounts.menu > 0 && (
                      <View
                        style={[styles.flexContainer, { paddingTop: "1.4vw" }]}
                      >
                        <Text
                          style={{
                            fontSize: "1.8vw",
                            color: "#08070E99",
                            fontWeight: "600",
                          }}
                        >
                          {data.configText.discount}
                        </Text>
                        <Text
                          style={{
                            fontSize: "1.8vw",
                            color: "#DD2B1C",
                            fontWeight: "600",
                          }}
                        >
                          {`${discounts.menu}%`}
                        </Text>
                      </View>
                    )}
                    <View>
                      <View
                        style={[
                          styles.flexContainer,
                          {
                            paddingTop:
                              discounts.options > 0 ? "1.2vw" : "2.4vw",
                            paddingBottom: "2.4vw",
                          },
                        ]}
                      >
                        <Text
                          style={{
                            fontSize: "1.8vw",
                            fontWeight: "600",
                          }}
                        >
                          {data.configText.total}
                        </Text>
                        <Text
                          style={{
                            fontSize: "1.8vw",
                            fontWeight: "600",
                          }}
                        >
                          {`${numberWithCommas(
                            getTotalPrice(menu, discounts)
                          )} руб.`}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.summaryBottom}>
              <View style={styles.flexContainer}>
                <Text
                  style={{
                    fontSize: "2.2vw",
                    fontWeight: "600",
                  }}
                >
                  {data.pdfData.total}
                </Text>
                <Text
                  style={{
                    fontSize: "2.2vw",
                    fontWeight: "600",
                  }}
                >
                  {`${numberWithCommas(getTotalPrice(total, discounts))} руб.`}
                </Text>
              </View>
            </View>
          </View>
        )}

        <View
          style={{
            paddingTop: "2.4vw",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              fontSize: "1.2vw",
            }}
          >
            <Text style={{ paddingBottom: "0.5vw" }}>
              {data.pdfData.contacts[0]}
            </Text>
            <Text>{data.pdfData.contacts[1]}</Text>
          </View>
          <View
            style={{
              paddingHorizontal: "3.6vw",
              fontSize: "1.2vw",
            }}
          >
            <Text style={{ paddingBottom: "0.5vw" }}>
              {data.pdfData.contacts[2]}
            </Text>
            <Text>{data.pdfData.contacts[3]}</Text>
          </View>
          <View
            style={{
              fontSize: "1.2vw",
            }}
          >
            <Text style={{ paddingBottom: "0.5vw" }}>
              {data.pdfData.address}
            </Text>
          </View>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            style={{
              width: "7.2vw",
              marginLeft: "auto",
              objectFit: "contain",
            }}
            src={URL + data.pdfData.logo}
          />
        </View>
      </Page>
    </Document>
  );
}
