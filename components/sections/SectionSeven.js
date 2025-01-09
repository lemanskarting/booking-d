import ContactForm from "@components/Contact Form date";

export default function SectionSeven({ data }) {
  return (
    <section className="py-10 bg-primary-gray md:py-16">
      <div className="page-container-simple">
        <ContactForm data={data} />
      </div>
    </section>
  );
}
