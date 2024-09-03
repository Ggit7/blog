import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {  
        type: String,
        required: true
    },
    category:{
            type:mongoose.Types.ObjectId,
            ref:"category"
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }
},{
    timestamps:true
});

const Blog = mongoose.models.blog || mongoose.model("blog", blogSchema);  // Corrected the model creation check

export default Blog;
