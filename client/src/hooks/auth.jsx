import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState({});

  async function signIn({ email, password }) {
    try {
      const response = await api.post("/sessions", { email, password });
      const { user, token } = response.data;

      localStorage.setItem("@noted:user", JSON.stringify(user));
      localStorage.setItem("@noted:token", token);

      api.defaults.headers.common[`Authorization`] = `Bearer ${token}`;

      setData({ user, token });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Not able to login");
      }
    }
  }

  async function updatedProfile({ user, avatarFile }) {
    try {
      if (avatarFile) {
        const fileUploadForm = new FormData();
        fileUploadForm.append("avatar", avatarFile);

        const response = await api.patch("/users/avatar", fileUploadForm);
        user.avatar = response.data.avatar;
      }

      await api.put("/users", user);

      localStorage.setItem("@noted:user", JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });

      alert("Perfil atualizado!");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível atualizar o perfil.");
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@noted:token");
    localStorage.removeItem("@noted:user");

    setData({});
  }

  useEffect(() => {
    const token = localStorage.getItem("@noted:token");
    const user = localStorage.getItem("@noted:user");

    if (token && user) {
      api.defaults.headers.common[`Authorization`] = `Bearer ${token}`;

      setData({
        token,
        user: JSON.parse(user),
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ signIn, updatedProfile, signOut, user: data.user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
