const mongoose = require('mongoose');

const ratesSchema = new mongoose.Schema({
    Date: { type: String, required: true, unique: false },
    AUDCAD: { type: Number, required: true, unique: false },
    AUDJPY: { type: Number, required: true, unique: false },
    AUDNZD: { type: Number, required: true, unique: false },
    AUDUSD: { type: Number, required: true, unique: false },
    CADJPY: { type: Number, required: true, unique: false },
    EURAUD: { type: Number, required: true, unique: false },
    EURCAD: { type: Number, required: true, unique: false },
    EURGBP: { type: Number, required: true, unique: false },
    EURNZD: { type: Number, required: true, unique: false },
    EURUSD: { type: Number, required: true, unique: false },
    GBPAUD: { type: Number, required: true, unique: false },
    GBPCAD: { type: Number, required: true, unique: false },
    GBPJPY: { type: Number, required: true, unique: false },
    GBPNZD: { type: Number, required: true, unique: false },
    GBPUSD: { type: Number, required: true, unique: false },
    NZDCAD: { type: Number, required: true, unique: false },
    NZDJPY: { type: Number, required: true, unique: false },
    NZDUSD: { type: Number, required: true, unique: false },
    USDCAD: { type: Number, required: true, unique: false },
    USDCHF: { type: Number, required: true, unique: false },
    USDJPY: { type: Number, required: true, unique: false }
});

module.exports = mongoose.model('Rates', ratesSchema, 'rates');