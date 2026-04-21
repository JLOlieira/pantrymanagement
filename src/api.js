import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const getItems = async () => {
  try {
    const response = await axios.get(`${apiUrl}/products`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar itens:", error);
    return;
  }
};

export const addItem = async (item, { group }) => {
  try {
    const response = await axios.post(`${apiUrl}/products`, { ...item, group });
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar item:", error);
    return;
  }
};

export const updateItem = async (item) => {
  try {
    const response = await axios.put(
      `${apiUrl}/products/${item.id || item._id}`,
      item,
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar item:", error);
    return;
  }
};

export const deleteItem = async (item) => {
  try {
    const response = await axios.delete(
      `${apiUrl}/products/${item._id || item.id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir item:", error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao logar:", error);
    throw error;
  }
};

export const register = async (email, password, name) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/register`, {
      email,
      password,
      name,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao registrar:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${apiUrl}/auth/logout`);
    return response.data;
  } catch (error) {
    console.error("Erro ao logar:", error);
    throw error;
  }
};

export const getUserGroups = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/groups/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar grupos:", error);
    throw error;
  }
};

export const createGroup = async (name, userId) => {
  try {
    const response = await axios.post(`${apiUrl}/groups`, {
      name,
      userId,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar grupo:", error);
    throw error;
  }
};

export const deleteGroup = async (groupId) => {
  try {
    const response = await axios.delete(`${apiUrl}/groups/${groupId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir grupo:", error);
    throw error;
  }
};
