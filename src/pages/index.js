import MarketList from "../components/MarketList";

export default function Home(props) {
  // console.log(props);

  return <MarketList />;
}

export async function getStaticProps(context) {
  return {
    props: { text: "hello world" }, // will be passed to the page component as props
  };
}
