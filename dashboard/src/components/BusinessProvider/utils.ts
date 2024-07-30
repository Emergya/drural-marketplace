export const removeBusinessFromLocalStorage = () => {
  localStorage.removeItem("businessList");
  localStorage.removeItem("activeBusiness");
};
