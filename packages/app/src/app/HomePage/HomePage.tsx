import AddForm from './AddForm';

const HomePage = (): React.ReactElement => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-12 inline-block bg-gradient-to-b from-black to-white bg-clip-text text-6xl text-transparent">
        Disappearing Messages
      </h1>
      <AddForm />
    </div>
  );
};

export default HomePage;
