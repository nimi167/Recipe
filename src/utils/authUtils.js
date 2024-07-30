export const handleLogout = (setIsLoggedIn) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("chefId");
    setIsLoggedIn(false);
  };
  