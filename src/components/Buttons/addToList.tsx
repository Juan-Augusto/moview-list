import { handleListUpdateCheck } from "../../hooks/handleListUpdateCheck";

interface AddToListProps {
  className?: string;
  currentItemId: any;
  handleListChange?: () => void;
  setNoChanges?: (value: boolean) => void;
}

export const AddToList = ({
  className = "p-4 font-bold text-lg",
  currentItemId,
  handleListChange = () => {},
  setNoChanges = (value: boolean) => {},
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

  const handleRemoveFromList = () => {
    localStorage.setItem(
      "myList",
      JSON.stringify(
        JSON.parse(localStorage.getItem("myList") || "[]").filter(
          (item: any) => item !== currentItemId
        )
      )
    );
  };

  return (
    <button
      className={`featured--listbutton rounded-lg ${className}`}
      onClick={() => {
        if (localStorage.getItem("myList")?.includes(currentItemId)) {
          handleRemoveFromList();
        } else {
          handleAddToList();
        }
        handleListUpdateCheck((value: boolean) => setNoChanges(value));
        handleListChange();
      }}
    >
      {localStorage.getItem("myList")?.includes(currentItemId)
        ? "-Remover da lista"
        : "+Adicionar à lista"}
    </button>
  );
};
