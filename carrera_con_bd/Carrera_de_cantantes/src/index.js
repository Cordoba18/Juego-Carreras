import app from "./app";
import { Server as websocketServer} from "socket.io";
import http from "http";
import {connectDB} from "./db";
import sockets from './sockets'

connectDB();
const server = http.createServer(app);
const httpserver = server.listen(3000);
const io = new websocketServer(httpserver);

console.log("Server listening on");
sockets(io)