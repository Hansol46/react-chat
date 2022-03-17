import axios from "axios";

/**
 * Общий api
 */
export const api = {
  getRooms: (roomId) => axios.get(`/rooms/${roomId}`),
};
