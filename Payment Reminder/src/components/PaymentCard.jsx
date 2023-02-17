export const PaymentCard = ({ props }) => {
  const { title, description, dueDate, isDeleted, paymentStatus } = props;
  const transformedDate = new Date(dueDate.seconds).toString().split(" GMT")[0];
  return (
    <div className="max-sm:w-full max-md:w-5/12 max-lg:w-2/6 max-xl:w-2/6 max-2xl:w-3/12 2xl:w-3/12 flex flex-col border-2 border-black rounded p-4 gap-2">
      <h3 className="text-2xl font-bold">{title}</h3>
      <h4 className="text-lg font-semibold">{description}</h4>
      <p>{transformedDate}</p>
      <div className="w-full flex justify-between mt-2">
        <button className="bg-green-600 border-black border-2 py-1 px-6 rounded">
          Edit
        </button>
        <button className="bg-red-500 border-black border-2 py-1 px-6 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};
