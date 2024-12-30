const Title = ({ title }) => {
  return (
    <div className="relative mb-10">
      <div className="flex items-center justify-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <h2 className="px-6 text-4xl font-extrabold text-gray-800">{title}</h2>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
    </div>
  );
};

export default Title;
