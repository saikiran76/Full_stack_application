import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Please provide a name of the furniture product"],
            trim: true,
            maxLength: [120, "Name of the product must be less than 120 characters"]
        },
        price:{
            type: Number,
            required: [true, "Please provide price of the product"],
            maxLength: [5, "Product price should not exceed 5 digits"]
        },
        description:{
            type: String,
            // usage of some editor 

        }, 
        photos:[ // ways of storing images as links or file type
            {
                secure_url:{
                    type: String,
                    required: true
                }
            }
    ],
    stock:{
        type: Number,
        default: 0
    },
    sold:{
        type: Number,
        default: 0
    },
    collectionId:{
        type: mongoose.Schema.Types.ObjectId, // like mimicing a foreign key 
        ref: "Collection"
    }

    },

    {
        timestamps: true
    }
)

export default mongoose.model("Product", productSchema);

