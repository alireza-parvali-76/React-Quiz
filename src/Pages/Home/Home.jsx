   import React, { useState } from "react";
   import { useNavigate } from "react-router-dom";
   import Modal from "../../Components/Modal/Modal";
   import "./Home.css";

   export default function Home() {
     const [modalOpen, setModalOpen] = useState(false);
     const navigate = useNavigate();

     const handleConfirm = () => {
       setModalOpen(false);
       navigate("/quiz");
     };

     return (
       <div>
         <button className="button" onClick={() => setModalOpen(true)}>
           Start Game
         </button>

         {modalOpen && (
           <Modal
             open={modalOpen}
             onConfirm={handleConfirm}
             onCancel={() => setModalOpen(false)}
           />
         )}
       </div>
     );
   }




