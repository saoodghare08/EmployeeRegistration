import React from "react";
import { toast, ToastContainer } from "react-toastify";

const Home = () => {

  const notify = () => toast("Wow so easy!");

  return (
    <>
      <div>Go to Employees page.</div>
    </>
  );
};

export default Home;
