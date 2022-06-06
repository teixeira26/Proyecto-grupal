import { io } from "socket.io-client";

var socket = io("http://localhost:3001/");

export default socket;