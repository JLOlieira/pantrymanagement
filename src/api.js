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

export const addItem = async (item) => {
  try {
    const response = await axios.post(`${apiUrl}/products`, item);
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
