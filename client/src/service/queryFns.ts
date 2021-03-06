import axios from 'axios';
import Token from './token';

export const getSheets = async () => {
  const res = await axios(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sheet`);
  return res.data;
};

export const getSheet = async (id: number | string) => {
  if (id) {
    const res = await axios(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/sheet/${id}`
    );
    return res.data;
  }
};

export const getFavorites = async () => {
  if (Token.hasAuthToken() && !Token.isExpired()) {
    const token = Token.getAuthToken();

    const fetchConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/favorites`,
      fetchConfig
    );
    return res.data;
  }
};

export const addFavorites = async (favorites: string[]) => {
  if (Token.hasAuthToken() && !Token.isExpired()) {
    const token = Token.getAuthToken();

    const fetchConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/favorites`,
      {
        keybinds: favorites,
      },
      fetchConfig
    );
    return res.data;
  }
};

export const deleteFavorite = async (id: string) => {
  if (Token.hasAuthToken() && !Token.isExpired()) {
    const token = Token.getAuthToken();

    const fetchConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        keybind: {
          id,
        },
      },
    };

    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/favorites`,
      fetchConfig
    );
    return res.data;
  }
};
