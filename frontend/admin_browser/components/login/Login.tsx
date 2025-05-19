// "use client";
// import React from "react";
// import { useLoginStore } from "@/store/login/LoginStore";

// const API_URL = process.env.NEXT_PUBLIC_API_URL!;

// const Loginpage = () => {
//   const { formData, handleChange, handleSubmit } = useLoginStore();

//   return (
//     <div
//       id="login"
//       className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-lg"
//     >
//       <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="email"
//           name="email"
//           placeholder="이메일"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="비밀번호"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//         />
//         <button
//           type="submit"
//           className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
//         >
//           로그인
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Loginpage;
