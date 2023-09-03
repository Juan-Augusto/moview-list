import { EyeIcon } from "../../../icons/eye";

export const MainTitle = () => {
  return (
    <div className="flex items-center">
      <h1 className="lg:text-4xl mb-4 text-base font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl dark:text-white flex items-end">
        M<EyeIcon className="w-6 h-6" />
        view
      </h1>
    </div>
  );
};
