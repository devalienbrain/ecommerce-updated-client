const Title = ({ title }) => {
  return (
    <div className="relative mb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-left">{title}</h1>
      <div className="relative mt-2">
        <hr className="w-1/4 border-t-2 border-blue-500" />
      </div>
    </div>
  );
};

export default Title;
