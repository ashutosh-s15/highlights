import mongoose, { Schema, model, models } from "mongoose";

const HighLightSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  keyPoints: {
    type: [String],
    required: [true, 'Key points are required']
  }
});

const Highlight = models.Highlight || model('Highlight',
  HighLightSchema);

export default Highlight;