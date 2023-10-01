import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        products:{
            type: [
                {
                    productId: {
                        type: mongoose.Schema.Types,
                        ref: "Product",
                        required: true
                    },
                    count: Number,
                    price: Number

                }
            ],
            required: true
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        address:{
            type: Number,
            required: true
        },
        phoneNumber:{
            type: Number,
            required: true
        },
        amount:{
            type: Number,
            required: true
        },

        coupon: String,
        transactionId: String,
        status: {
            type: String,
            enum: ["ORDERED", "SHIPPED", "DELIVERED", "CANCELLED" ],
            default: "ORDERED",
            // Can we improve this?
        }

    },
    {
        timestamps: true

    }
   
)

export default mongoose.model("Order", orderSchema)