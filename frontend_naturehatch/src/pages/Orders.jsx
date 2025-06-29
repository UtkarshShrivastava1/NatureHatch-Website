// import React, { useContext } from "react";
// import { ShopContext } from "../context/ShopContext";
// import Title from "../components/Title";

// const Orders = () => {
//   const { products, currency, cartItem, updateQuantity, navigate } =
//     useContext(ShopContext);
//   return (
//     <div className="border-t pt-16 mb-52">
//       <div className="text-2xl mb-3">
//         <Title text1={"YOUR"} text2={"ORDERS"} />
//       </div>

//       <div>
//         {products.slice(1, 4).map((item, index) => (
//           <div
//             key={index}
//             className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 shadow-lg mt-4"
//           >
//             <div className="flex items-start gap-6 text-sm">
//               <img
//                 className="w-16 sm:w-20 rounded-b-lg"
//                 src={item.image[0]}
//                 alt={item.name}
//               />

//               <div>
//                 <p className="font-medium sm:text-base">{item.name}</p>
//                 <div className="flex items-center gap-6  mt-2 text-base">
//                   <p className="text-gray-500 text-lg">
//                     {currency}
//                     {item.price}
//                   </p>
//                   <p className="text-gray-500 text-lg">Quantity : 1</p>
//                   <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 max-w-20 rounded-sm">
//                     size : M{" "}
//                   </p>
//                   <p className="mt-2">
//                     Date :<span className="text-gray-500">2023-10-01</span>{" "}
//                   </p>
//                 </div>
//               </div>
//               <div className="md:w-1/2 flex justify-between ">
//                 <div className=" flex items-center gap-2">
//                   <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
//                   <p className="md:text-base text-lg">Delivered</p>
//                 </div>
//                 <button className="text-gray-500 text-sm border px-2 py-1 rounded-md hover:bg-gray-200 ">
//                   Track Order
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;
import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="border-t pt-16 mb-52">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"ORDERS"} />
      </div>

      <div>
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-lg mt-4"
          >
            {/* Left section: Product details */}
            <div className="flex items-start gap-4 text-sm">
              <img
                className="w-16 sm:w-20 rounded-b-lg"
                src={item.imageURL}
                alt={item.name}
              />

              <div>
                <p className="font-medium sm:text-base">{item.productname}</p>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-base">
                  <p className="text-gray-500 text-lg">
                    {currency}
                    {item.price}
                  </p>
                  <p className="text-gray-500 text-lg">Quantity: {item.quantity}</p>
                  <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 max-w-20 rounded-sm">
                    Size: M
                  </p>
                  <p>
                    Date: <span className="text-gray-500">{new Date(item.date).toDateString}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right section: Status and action */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <p className="text-lg sm:text-base">Delivered</p>
              </div>
              <button className="text-gray-500 text-sm border px-3 py-1 rounded-md hover:bg-gray-200">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
