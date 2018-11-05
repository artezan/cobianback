"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StatusBuyerPropertyLogic {
    /**
     *
     * @param statusInput new status
     * @param currentStatus current status
     */
    isUpgradeStatus(statusInput, currentStatus) {
        const posibleStatus = [
            {
                color: "gris",
                level: 1
            },
            {
                color: "verde",
                level: 2
            },
            {
                color: "amarillo",
                level: 3
            },
            {
                color: "rojo",
                level: 4
            },
            {
                color: "azul",
                level: 5
            }
        ];
        const newLevel = posibleStatus.find(p => p.color === statusInput);
        const currentLevel = posibleStatus.find(p => p.color === currentStatus);
        if (newLevel.level > currentLevel.level) {
            return true;
        }
        else {
            return false;
        }
    }
}
StatusBuyerPropertyLogic.Instance = function () {
    if (this._instance) {
        return this._instance;
    }
    else {
        return (this._instance = new this());
    }
};
exports.StatusBuyerPropertyLogic = StatusBuyerPropertyLogic;
//# sourceMappingURL=StatusBuyerProperty.js.map