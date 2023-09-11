export const handleListUpdateCheck = (setHasNoChange: any) => {
  localStorage.setItem("hasNoChange", "false");
  setHasNoChange(false);
};
