import { Link } from "react-router-dom";
import { AddToList } from "../../Buttons/addToList";

interface ButtonsCardProps {
  color?: string;
  movieId: number;
  handleListChange?: () => void;
  setNoChanges?: (value: boolean) => void;
}

export const ButtonsCard = ({
  color = "white",
  movieId,
  handleListChange,
  setNoChanges = (value: boolean) => {},
}: ButtonsCardProps) => {
  return (
    <div className="flex flex-col">
      <Link
        to={`/movie/${movieId}`}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold p-2 border-gray-400 rounded-lg shadow mb-2"
      >
        Detalhes
      </Link>
      <AddToList
        className="text-xs font-semibold p-2"
        currentItemId={movieId}
        handleListChange={handleListChange}
        setNoChanges={(value: boolean) => setNoChanges(value)}
      />
    </div>
  );
};
