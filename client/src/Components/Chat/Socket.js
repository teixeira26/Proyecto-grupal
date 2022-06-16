import { io } from "socket.io-client";

var socket = io("https://proyecto-grupal.herokuapp.com/");

export default socket;