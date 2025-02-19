"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfigFile = loadConfigFile;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const core_1 = require("@actions/core");
function loadConfigFile(configPath) {
    try {
        const absoluePath = path_1.default.resolve(configPath);
        const fileContents = fs_1.default.readFileSync(absoluePath, "utf8");
        const result = JSON.parse(fileContents);
        return result;
    }
    catch (error) {
        (0, core_1.setFailed)(`❌ Erreur lors du chargement du fichier JSON (${configPath}) : ${error}`);
    }
}
