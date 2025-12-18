const CoursCompleteButon = ({ matiere, cours }: any) => {
  const onClick = async () => {
    console.log(1);
  };

  return (
    <>
      <div>
        <button
          onClick={onClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Complete
        </button>
      </div>
    </>
  );
};

export default CoursCompleteButon;
