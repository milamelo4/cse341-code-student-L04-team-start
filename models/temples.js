module.exports = (mongoose) => {
  const Temple = mongoose.model(
    'temples',
    mongoose.Schema(
      {
        temple_id: { type: Number, required: true, unique: true }, // To make sure temple_id is unique  
        name: String,
        location: String,
        dedicated: String,
        additionalInfo: Boolean,
      },
      { timestamps: true }
    )
  );

  return Temple;
};
