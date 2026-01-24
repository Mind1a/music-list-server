import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "სიმღერის სათაური აუცილებელია"],
  },
  artist: {
    type: String,
    required: [true, "შემსრულებლის სახელი აუცილებელია"],
  },
  genre: {
    type: String,
    enum: {
      values: ["pop", "rock", "other"],
      message: "ჟანრი უნდა იყოს: pop, rock ან other",
    },
    required: [true, "ჟანრი აუცილებელია"],
  },
  duration: {
    type: Number,
    required: [true, "სიმღერის ხანგრძლივობა აუცილებელია"],
    min: [1, "მინიმუმ 1 წამი"],
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
});

const Music = mongoose.model("Music", musicSchema);

export default Music;
