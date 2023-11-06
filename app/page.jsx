import TextGenerator from '@components/TextGenerator';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Generate & Share
        <br className="max-md:hidden" />
        <span className="blue_gradient text-center">
          {' '}
          AI Powered Call highlights
        </span>
      </h1>
      <p className="desc text-center">
        Effortlessly distill insights from calls & audio in 180+ languages.
        Share & save key points with ease.
      </p>

      <TextGenerator />
    </section>
  );
};

export default Home;
