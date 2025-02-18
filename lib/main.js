"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = (0, core_1.getInput)("GITHUB_TOKEN", { required: true });
            const repository = (0, core_1.getInput)("GITHUB_REPOSITORY", { required: true });
            console.log("token", token);
            console.log("repository", repository);
            const PRNumber = (0, core_1.getInput)("pr_number", { required: true });
            console.log("PRNumber", PRNumber);
            (0, core_1.setOutput)("pr_updated", "blablabla");
        }
        catch (error) {
            if (error instanceof Error) {
                (0, core_1.setFailed)(error.message);
            }
        }
    });
}
run();
