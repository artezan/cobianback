import Customer, { ICustomer } from "../models/Customer";
import { ObjectId } from "mongodb";
import { ITicket } from "../models/Ticket";
import * as base64  from "base-64";


export class CustmersLogic {
  public static Instance = function(): CustmersLogic {
    if (this._instance) {
      return this._instance;
    } else {
      return (this._instance = new this());
    }
  };
  public async checkCustomer(base64Input): Promise<boolean> {
    const strDecode: string = base64.decode(base64Input);
    const name = strDecode.substring(0, strDecode.indexOf(":"));
    const password = strDecode.substring(
      strDecode.indexOf(":") + 1,
      strDecode.length,
    );
    const promise = new Promise<boolean>((resolve, reject) => {
      // busca la info
      try {
        Customer.find({ password: password, name: name })
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
  public addTicketToCustomer(ticket: ITicket, customertId): void {
    Customer.findById(customertId)
      .populate("tickets")
      .then((customer: ICustomer) => {
        const indexFind = customer.tickets.findIndex(
          t =>
            new ObjectId(t._id).toString() ===
            new ObjectId(ticket._id).toString(),
        );
        if (indexFind === -1) {
          customer.tickets.push(ticket);
        } else {
          customer.tickets.splice(indexFind, 1);
          customer.tickets.push(ticket);
        }
        customer.save().then(() => {
          this.calculateTotalHours(customer._id);
        });
      })
      .catch();
  }
  public changeTicketToCustomer(
    ticket: ITicket,
    newCustomerId,
    oldCustomerId,
  ): void {
    // eliminar del viejo
    Customer.findById(oldCustomerId)
      .populate("tickets")
      .then((oldCustomer: ICustomer) => {
        const indexFind = oldCustomer.tickets.findIndex(
          t =>
            new ObjectId(t._id).toString() ===
            new ObjectId(ticket._id).toString(),
        );
        if (indexFind !== -1) {
          oldCustomer.tickets.splice(indexFind, 1);
          oldCustomer.save().then(() => {
            this.calculateTotalHours(oldCustomer._id);
          });
        }
      })
      .catch();
    // add al neuvo
    Customer.findById(newCustomerId)
      .populate("tickets")
      .then((newCustomer: ICustomer) => {
        const indexFind = newCustomer.tickets.findIndex(
          t =>
            new ObjectId(t._id).toString() ===
            new ObjectId(ticket._id).toString(),
        );
        if (indexFind === -1) {
          newCustomer.tickets.push(ticket);
          newCustomer.save().then(() => {
            this.calculateTotalHours(newCustomer._id);
          });
        }
      })
      .catch();
  }
  public removeTicket(ticketId) {
    Customer.find()
      .populate("tickets")
      .then(customers => {
        customers.forEach(customer => {
          const indexFind = customer.tickets.findIndex(
            t => new ObjectId(t._id).toString() === ticketId,
          );
          if (indexFind !== -1) {
            customer.tickets.splice(indexFind, 1);
            customer.save().then(() => {
              this.calculateTotalHours(customer._id);
            });
          }
        });
      });
  }
  private calculateTotalHours(customerId) {
    Customer.findById(customerId)
      .populate("tickets")
      .then(customer => {
        let sumTotalHours = 0;
        if (customer.tickets.length > 0) {
          customer.tickets.forEach(t => {
            sumTotalHours += t.hours;
          });
          customer.totalHours = sumTotalHours;
        } else {
          customer.totalHours = 0;
        }
        customer.save();
      });
  }
}
