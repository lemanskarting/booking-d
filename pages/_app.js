import { ProgressiveImageSupportProvider } from "@components/image/ProgressiveImageSupportContext";
import SmartOutline from "@components/utils/SmartOutline";
import SEO from "@components/seo";
import "../styles/style.css";
import localFont from "next/font/local";
import Header from "@components/Header";
import Footer from "@components/Footer";

const fontIcons = localFont({
  src: [
    {
      path: "../public/lm-icons.woff2",
      weight: "400",
    },
  ],
});
const fontDisplay = localFont({
  src: [
    {
      path: "../public/Bicubik.woff2",
      weight: "400",
    },
  ],
});
const fontMain = localFont({
  src: [
    {
      path: "../public/ProximaNova-Bold.woff2",
      weight: "700",
    },
    {
      path: "../public/ProximaNova-BoldIt.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/ProximaNova-Semibold.woff2",
      weight: "600",
    },
    {
      path: "../public/ProximaNova-SemiboldIt.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/Proxima-Nova-Medium.woff2",
      weight: "500",
    },
    {
      path: "../public/ProximaNova-Regular.woff2",
      weight: "400",
    },
    {
      path: "../public/Proxima Nova Light Italic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/ProximaNova-Light.woff2",
      weight: "300",
    },
  ],
  fallback: ["ui-sans-serif"],
});

function App({ Component, pageProps }) {
  return (
    <ProgressiveImageSupportProvider>
      <style jsx global>{`
        :root {
          --font-main: ${fontMain.style.fontFamily};
          --font-display: ${fontDisplay.style.fontFamily};
          --font-icons: ${fontIcons.style.fontFamily};
        }
      `}</style>
      <main>
        <SmartOutline />
        <SEO
          description={pageProps.data.description}
          title={pageProps.data.title}
          seo={pageProps.seo}
        />
        <Header data={pageProps.header} />
        <Component {...pageProps} />
        <Footer data={pageProps.footer} />
      </main>
    </ProgressiveImageSupportProvider>
  );
}

export default App;
