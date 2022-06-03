import { io } from "socket.io-client";

var socket = io("//localhost:3001");

export default socket;