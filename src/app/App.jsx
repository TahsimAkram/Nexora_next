import { useState } from "react";

import AppLayout from "../components/layouts/AppLayout";
import SmoothScrollProvider from "../components/motion/SmoothScrollProvider";
import AppRoutes from "./routes";
import ContactModal from "../components/Modal/ContactModal";

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactResponse, setContactResponse] = useState(null);

  const openContactModal = () => {
    console.log("OPEN CONTACT MODAL");

    setContactResponse(null);
    setIsContactOpen(true);
  };

  const closeContactModal = () => {
    setIsContactOpen(false);
  };

  const handleContactSuccess = (response) => {
    setContactResponse(response);
  };

  return (
    <SmoothScrollProvider>
      <AppLayout onOpenContact={openContactModal}>
        <AppRoutes onOpenContact={openContactModal} />
      </AppLayout>

      <ContactModal
        isOpen={isContactOpen}
        onClose={closeContactModal}
        onSuccess={handleContactSuccess}
        response={contactResponse}
      />
    </SmoothScrollProvider>
  );
}
