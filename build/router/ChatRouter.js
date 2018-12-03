"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Chat_1 = require("../models/Chat");
const app_1 = require("../app");
const mongodb_1 = require("mongodb");
/**
 * @apiDefine AdviserResponseParams
 * @apiSuccess {Date} timestamp
 * @apiSuccess {ISchedule[]} schedule Calendario
 * @apiSuccess {number} hourStart Hora inicio servicio
 * @apiSuccess {number} hourEnd Hora fin de servicio
 * @apiSuccess {IBuyer[]} buyer Compradores asignados
 * @apiSuccess {IGoal[]} goal Objetivos planteados
 * @apiSuccess {INotification[]} notification Historial notificaciones
 * @apiSuccess {boolean} isRenter Si renta o vende
 * @apiSuccess {string} name
 * @apiSuccess {string} lastName
 * @apiSuccess {string} password
 * @apiSuccess {string} email
 * @apiSuccess {ObjectId} companyId
 */
class ChatRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    all(req, res) {
        Chat_1.default.find()
            .sort({ timestamp: -1 })
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    oneById(req, res) {
        const id = req.params.id;
        Chat_1.default.findById(id)
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    oneByProperty(req, res) {
        const id = req.params.id;
        Chat_1.default.findOne({ property: id })
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    byCity(req, res) {
        const city = req.params.city;
        Chat_1.default.find({ city: city })
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    byDefault(req, res) {
        const property = req.body.property;
        const buyer = req.body.buyer;
        Chat_1.default.findOne({ property: property, buyer })
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    create(req, res) {
        const buyer = req.body.buyer;
        const property = req.body.property;
        const city = req.body.city;
        const messages = req.body.messages;
        const chat = new Chat_1.default({
            buyer,
            property,
            city,
            messages,
        });
        chat
            .save()
            .then(data => {
            res.status(201).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    addMessage(req, res) {
        const _id = req.body._id;
        const newMessages = req.body.newMessages;
        Chat_1.default.findById({ _id: _id })
            .then(chat => {
            if (newMessages) {
                chat.messages.push(newMessages);
            }
            chat.save().then(data => {
                app_1.IO.emit("NEW_MESSAGE", { _id });
                res.status(200).json({ data });
            });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    addRead(req, res) {
        const _id = req.body._id;
        const messagesId = req.body.messagesId;
        const uid = req.body.uid;
        Chat_1.default.findById({ _id: _id })
            .then(chat => {
            messagesId.forEach(messageId => {
                chat.messages
                    .find((m) => new mongodb_1.ObjectId(m._id).toString() ===
                    new mongodb_1.ObjectId(messageId).toString())
                    .readBy.push(uid);
            });
            chat.save().then(data => {
                res.status(200).json({ data });
            });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    delete(req, res) {
        const _id = req.params.id;
        Chat_1.default.findByIdAndRemove({ _id: _id })
            .then(() => {
            res.status(200).json({ data: true });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    // Borrar cuando sea muy grande
    deleteAfter(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = req.body._id;
            const chat = yield Chat_1.default.findById(_id);
            const maxLen = 50;
            const msgLen = chat.messages.length;
            const charLen = JSON.stringify(chat).length;
            console.log("mensajes", msgLen);
            // borrar mensajes antiguos
            if (charLen >= 10000 || msgLen >= maxLen) {
                console.log("mensajes borrados", msgLen);
                console.log("mensajes borrados ch", charLen);
                chat.messages.splice(0, msgLen - maxLen);
                chat.save();
            }
            next();
        });
    }
    // set up our routes
    routes() {
        this.router.get("/", this.all);
        this.router.get("/bychatid/:id", this.oneById);
        this.router.get("/bypropertyid/:id", this.oneByProperty);
        this.router.post("/byDefault/", this.byDefault);
        this.router.get("/bychatcity/:city", this.byCity);
        this.router.post("/", this.create);
        this.router.post("/addmessage/", this.deleteAfter, this.addMessage);
        this.router.post("/addread/", this.addRead);
        this.router.delete("/:id", this.delete);
    }
}
exports.ChatRouter = ChatRouter;
//# sourceMappingURL=ChatRouter.js.map