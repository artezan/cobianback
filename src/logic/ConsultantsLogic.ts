import Consultant, { IConsultant } from "../models/Consultant";
import { Types } from "mongoose";
import { ObjectId } from "mongodb";
import Ticket, { ITicket } from "../models/Ticket";
import * as base64  from "base-64";


export class ConsultantsLogic {
  public static Instance = function(): ConsultantsLogic {
    if (this._instance) {
      return this._instance;
    } else {
      return (this._instance = new this());
    }
  };
  // base64 nombre:pass
  public async checkConsultant(base64Input): Promise<boolean> {
    const strDecode: string = base64.decode(base64Input);
    const name = strDecode.substring(0, strDecode.indexOf(":"));
    const password = strDecode.substring(
      strDecode.indexOf(":") + 1,
      strDecode.length,
    );
    // crea promise con respuesta si encuentra o no
    const promise = new Promise<boolean>((resolve, reject) => {
      // busca la info
      try {
        Consultant.find({ password: password, name: name })
          .then(data => {
            if (data.length > 0) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch(error => {});
      } catch (error) {
        // error
      }
    });
    const result = await promise;
    return result;
  }
  public addTicketToConsultant(ticket: ITicket, consultantId): void {
    Consultant.findById(consultantId)
      .populate("tickets")
      .then((consultant: IConsultant) => {
        const indexFind = consultant.tickets.findIndex(
          t =>
            new ObjectId(t._id).toString() ===
            new ObjectId(ticket._id).toString(),
        );
        if (indexFind === -1) {
          consultant.tickets.push(ticket);
        } else {
          consultant.tickets.splice(indexFind, 1);
          consultant.tickets.push(ticket);
        }
        consultant.save().then(() => {
          this.calculateAvgRating(consultant._id);
        });
      })
      .catch();
  }
  public changeTicketToConsultant(
    ticket: ITicket,
    newConsultantId,
    oldConsultantId,
  ): void {
    // eliminar del viejo
    Consultant.findById(oldConsultantId)
      .populate("tickets")
      .then((oldConsultant: IConsultant) => {
        const indexFind = oldConsultant.tickets.findIndex(
          t =>
            new ObjectId(t._id).toString() ===
            new ObjectId(ticket._id).toString(),
        );
        if (indexFind !== -1) {
          oldConsultant.tickets.splice(indexFind, 1);
          oldConsultant.save().then(() => {
            this.calculateAvgRating(oldConsultant._id);
          });
        }
      })
      .catch();
    // add al nuevo
    Consultant.findById(newConsultantId)
      .populate("tickets")
      .then((newConsultant: IConsultant) => {
        const indexFind = newConsultant.tickets.findIndex(
          t =>
            new ObjectId(t._id).toString() ===
            new ObjectId(ticket._id).toString(),
        );
        if (indexFind === -1) {
          newConsultant.tickets.push(ticket);
          newConsultant.save().then(() => {
            this.calculateAvgRating(newConsultant._id);
          });
        }
      })
      .catch();
  }
  public removeTicket(ticketId) {
    Consultant.find()
      .populate("tickets")
      .then(consultants => {
        consultants.forEach(consultant => {
          const indexFind = consultant.tickets.findIndex(
            t => new ObjectId(t._id).toString() === ticketId,
          );
          if (indexFind !== -1) {
            consultant.tickets.splice(indexFind, 1);
            consultant.save().then(() => {
              this.calculateAvgRating(consultant._id);
            });
          }
        });
      });
  }
  private calculateAvgRating(consultantId): void {
    Consultant.findById(consultantId)
      .populate("tickets")
      .then(consultant => {
        let sumTotalRanking = 0;
        if (consultant.tickets.length > 0) {
          consultant.tickets.forEach(t => {
            sumTotalRanking += t.ranking;
          });
          if (sumTotalRanking > 0) {
            consultant.rankingAverage =
              sumTotalRanking / consultant.tickets.length;
          } else {
          }
          consultant.save();
        } else if (consultant.tickets.length === 0) {
          consultant.rankingAverage = 0;
          consultant.save();
        }
      });
  }
  public calculateAvgRatingById(ticketId) {
    Consultant.find()
      .populate("tickets")
      .then(consultants => {
        consultants.forEach(consultant => {
          const indexFind = consultant.tickets.findIndex(
            t => new ObjectId(t._id).toString() === ticketId,
          );
          if (indexFind !== -1) {
            this.calculateAvgRating(consultant._id);
          }
        });
      });
  }
}
