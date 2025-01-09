import { PDFViewer } from "@react-pdf/renderer";
import PDF from "./PDF";
import { useStore } from "./Store";

export default function PDFRender({ data }) {
  // const configTotal = useConfigStore.getState().total;
  // const catalogTotal = useCatalogStore.getState().total;
  const { total, guests, discounts } = useStore();

  return (
    <>
      {typeof window !== "undefined" && (
        <PDFViewer className="w-full h-screen mt-20">
          <PDF
            conf={true}
            key={total}
            total={total}
            guests={guests}
            discounts={discounts}
            data={data}
          />
        </PDFViewer>
      )}
    </>
  );
}
