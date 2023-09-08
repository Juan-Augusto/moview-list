interface AddToListProps {
  className?: string;
  currentItemId: any;
}

export const AddToList = ({
  className = "p-4 font-bold text-lg",
  currentItemId,
}: AddToListProps) => {
  const handleAddToList = () => {
    localStorage.setItem(
      "myList",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("myList") || "[]"),
        currentItemId,
      ])
    );
  };

  return (
    <button
      className={`featured--listbutton rounded-lg ${className}`}
      onClick={handleAddToList}
    >
      +Minha lista
    </button>
  );
};
