export class TicketsLogic {
    public static Instance = function(): TicketsLogic {
        if (this._instance) {
          return this._instance;
        } else {
          return (this._instance = new this());
        }
      };
}