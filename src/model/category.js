import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {  
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});

const Category = mongoose.models.category || mongoose.model("category", categorySchema);  // Corrected the model creation check

export default Category;
