"use client"
import { getCart, ProductData } from "@/library/api-calls";
import { axiosInstance } from "@/library/helper";
import { descQuantity, emptyCart, incQuantity, removeFromCart } from "@/redux/slices/CartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Cart = () => {
  const cart = useSelector(store => store.cart)
  const user = useSelector(store => store.user)
  const router = useRouter()
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])
  const getData = async () => {
    const data = await ProductData()
    setProducts(data)
  }

  useEffect(
    () => {
      getData()
    }, []
  )

  const decsHandler = (index) => {
    const item = cart.item[index];
    const product = products.find(p => p._id == item.product_id);
    axiosInstance.put("/cart/dec", { user_id: user.data._id, product_id: item.product_id, color_id: item.color_id })
      .then((response) => {
        if (response.data.flag == 1) {
          toast.success(response.data.message);
          dispatch(descQuantity({
            index,
            discount_price: product.discount_price,
            orignal_price: product.orignal_price
          }));
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      });
  };

  const incHandler = (index) => {
    const item = cart.item[index];
    const product = products.find(p => p._id == item.product_id);
    axiosInstance.put("/cart/inc", { user_id: user.data._id, product_id: item.product_id, color_id: item.color_id })
      .then((response) => {
        if (response.data.flag == 1) {
          toast.success(response.data.message);
          dispatch(incQuantity({
            index,
            discount_price: product.discount_price,
            orignal_price: product.orignal_price
          }));
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      })
  }

  const removeHandler = (index) => {
    const item = cart.item[index];
    if (!item) return; // Safety check

    axiosInstance.delete("/cart/remove", { data: { user_id: user.data._id, product_id: item.product_id, color_id: item.color_id } })
      .then((response) => {
        if (response.data.flag === 1) {
          toast.success(response.data.message);
          const product = products.find(p => p._id == item.product_id);
          dispatch(removeFromCart({ index, product, quantity: item.quantity }));
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      });
  };

  const removeAllHandler = () => {
    axiosInstance.delete("/cart/removeall", { data: { user_id: user.data._id } })
      .then((response) => {
        if (response.data.flag === 1) {
          toast.success(response.data.message);
          dispatch(emptyCart())
          router.refresh()
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <div>
      <h1 className="text-center text-md font-semibold p-2 bg-gray-200">Cart</h1>

      <div className="max-w-[1250px] mx-auto p-6">
        <div className="text-end mb-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={removeAllHandler}
          >
            Remove All
          </button>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="grid grid-cols-7 font-semibold border-b pb-2">
            <p>S.No</p>
            <p className="col-span-3">PRODUCT</p>
            <p>PRICE</p>
            <p>QTY</p>
            <p>UNIT PRICE</p>
          </div>
          {
            cart.item.length != 0 && products.length != 0
            &&
            cart.item.map(
              (item, index) => {
                const product = products.find(p => p._id == item.product_id)
                const color = product.color.find(c => c._id == item.color_id)
                return (
                  <div key={index} className="grid grid-cols-7 items-center py-4 border-b mb-4">
                    <div className="p-2">{index + 1}</div>
                    <div className="flex items-center col-span-3">
                      <img src={`${process.env.NEXT_PUBLIC_BASE_URL_IMG}/product/${product.main_image}`} alt={product.name} className="w-16 h-16 object-cover" />
                      <div className="w-[30px] h-[30px] rounded-full ml-3" style={{ backgroundColor: color.color_code }}></div>
                      <p className="ml-3">{color.name} {product.name}</p>
                    </div>
                    <p>₹{product.discount_price}</p>
                    <div className="flex items-center gap-2">
                      <button className="p-2 bg-gray-200 rounded" onClick={() => decsHandler(index)}>
                        <FaMinus />
                      </button>
                      <p>{item.quantity}</p>
                      <button className="p-2 bg-gray-200 rounded" onClick={() => incHandler(index)}>
                        <FaPlus />
                      </button>
                    </div>
                    <div className="flex justify-between">
                      <p>₹ {product.discount_price * item.quantity}</p>
                      <button className="text-red-500 mr-3" onClick={() => removeHandler(index)}>
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                )
              })}
          <div className="text-start space-y-2 mt-4">
            <p>Price Total: ₹{cart.original_total}</p>
            <p>Discount: ₹{cart.original_total - cart.final_total}</p>
            <h2 className="text-lg font-bold">TOTAL: ₹{cart.final_total}</h2>
            <div className="flex justify-between">
              <Link href={"/checkout"} className="bg-blue-500 text-white px-6 py-2 rounded mt-2">Check out</Link>
              <Link href={"/store"} className="bg-gray-500 text-white px-6 py-2 rounded mt-2">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
