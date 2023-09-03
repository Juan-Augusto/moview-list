export const TitleText = ({ title = "", fontSize = "lg:text-4xl" }) => {
  return (
    <h2
      className={`
     ${fontSize}
     mb-4 text-base font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl dark:text-white`}
    >
      {title}
    </h2>
  );
};
