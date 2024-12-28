const Title = ({ title }) => {
  return (
    <div className="relative mb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-left text-gray-500">
        {title}
      </h1>
      <div className="relative mt-2">
        <hr className="w-1/4 border-t-[1.5px] border-green-400/50 transition-all duration-500 ease-in-out hover:w-1/3" />
      </div>
    </div>
  );
};

export default Title;
