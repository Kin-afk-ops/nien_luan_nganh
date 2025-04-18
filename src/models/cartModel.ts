import mongoose, { Schema, Document } from "mongoose";

// Định nghĩa interface cho Cart
export interface ICart extends Document {
  buyerId: string;
  productId: mongoose.Types.ObjectId;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

// Tạo Schema cho Cart
const CartSchema: Schema = new Schema(
  {
    buyerId: { type: String, required: true }, // ID của người mua
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // ID của sản phẩm (liên kết tới Product)
    quantity: { type: Number, required: true, min: 1, default: 1 }, // Số lượng sản phẩm
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt
);

// Xuất model
export default mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);
