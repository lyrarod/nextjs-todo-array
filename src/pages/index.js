import Head from "next/head";

import TodoArray from "../components/TodoArray";

export default function Home(props) {
  // console.log(props);

  return (
    <>
      <Head>
        <title>NextJS Todo Array</title>
      </Head>
      <TodoArray />
    </>
  );
}

export async function getStaticProps(context) {
  return {
    props: { text: "hello world" }, // will be passed to the page component as props
  };
}
