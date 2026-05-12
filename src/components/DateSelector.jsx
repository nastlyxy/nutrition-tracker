export default function DateSelector({ currentDay, onChangeDate }) {
  const handlePrev = () => {
    const dateObj = new Date(currentDay);
    dateObj.setDate(dateObj.getDate() - 1);
    onChangeDate(dateObj.toISOString().split("T")[0]);
  };
  const handleNext = () => {
    const dateObj = new Date(currentDay);
    dateObj.setDate(dateObj.getDate() + 1);
    onChangeDate(dateObj.toISOString().split("T")[0]);
  };
  return (
    <div className="flex items-center justify-center gap-4 my-4">
      <span
        className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-sky-50 text-slate-500 font-bold transition-colors"
        onClick={handlePrev}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </span>
      <p className="bg-white px-6 py-2 rounded-xl shadow-sm font-semibold text-slate-700">
        {currentDay}
      </p>
      <span
        className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-sky-50 text-slate-500 font-bold transition-colors"
        onClick={handleNext}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </span>
    </div>
  );
}
