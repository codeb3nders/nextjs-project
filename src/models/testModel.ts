import { Schema, model, models } from "mongoose";
const testSchema = new Schema({
  name: String,
  age: Number,
  email: {
    type: String,
    unique: true,
    required: true,
  },
});

const Test = models.Test || model("Test", testSchema);

export default Test;
