import axios from "axios";

/**
 * Общий api
 */
export const api = {
  getRooms: (roomId) => axios.get(`/rooms/${roomId}`),

  // params = { roomId, userName }
  createRoom: (params) => axios.post("/rooms", params),
};
