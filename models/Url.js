import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true, unique: true },
  shortUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Url = mongoose.model('Url', urlSchema);