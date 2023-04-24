"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const next_1 = __importDefault(require("next"));
const express = require('express');
const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = (0, next_1.default)({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {
    const server = express();
    server.all('/*', function (_req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With');
        next();
    });
    require('./config/api.ts')(server, handle);
    server.listen(port, err => {
        if (err) {
            throw err;
        }
        console.log(`> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`);
    });
});
