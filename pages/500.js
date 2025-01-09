export default function Index({ data }) {
  return (
    <>
      <section className="w-screen text-white bg-primary-dark">
        <div className="flex items-center justify-center h-screen text-center page-container">
          <article>
            <h1 className="!pb-2  text-[5.625rem] text-theme-red leading-none font-bold">
              {data.headingOne}
            </h1>
            <p className="text-xl whitespace-pre-line">{data.textOne}</p>
          </article>
        </div>
      </section>
    </>
  );
}
export async function getStaticProps() {
  const homepage = await import(`../cms/pages/homepage.json`);
  const data = await import(`../cms/pages/404.json`);
  const header = await import(`../cms/config/header.json`);
  const footer = await import(`../cms/config/footer.json`);
  const seo = await import(`../cms/config/seo.json`);

  return {
    props: {
      header: header.default,
      footer: footer.default,
      homepage: homepage.default,
      data: data.default,
      seo: seo.default,
    },
  };
}
