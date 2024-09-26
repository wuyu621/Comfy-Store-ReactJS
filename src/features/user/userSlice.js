import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

//also need to add the new theme value to the tailwind.config.cjs if want to change theme value
const themes = {
  light: "winter",
  dark: "sunset",
};

const getThemeFromLocalStorage = () => {
  const themeMode = localStorage.getItem("themeMode") || "light";
  document.documentElement.setAttribute("data-theme", themes[themeMode]);

  return themeMode;
};

const getUserFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  return user;
};

const initialState = {
  user: getUserFromLocalStorage(),
  themeMode: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginUser: (state, action) => {
      //   console.log(action.payload);
      const user = { ...action.payload.user, token: action.payload.jwt };

      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.success("Logged out successfully");
      //   console.log("login user");
    },
    toggleTheme: (state) => {
      state.themeMode = state.themeMode === "light" ? "dark" : "light";

      document.documentElement.setAttribute(
        "data-theme",
        themes[state.themeMode]
      );
      localStorage.setItem("themeMode", state.themeMode);
    },
  },
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;

export default userSlice.reducer;
