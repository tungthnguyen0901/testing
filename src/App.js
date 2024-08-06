import { ChakraProvider } from "@chakra-ui/react";
import React, {useState} from "react";
import Header from "./components/Header";
import LandingSection from "./components/LandingSection";
import ProjectsSection from "./components/ProjectsSection";
import BookingSection from "./components/BookingSection";
import ContactMeSection from "./components/ContactMeSection";
import Footer from "./components/Footer";
import { AlertProvider } from "./context/alertContext";
import Alert from "./components/Alert";




function App() {


  return (
    <ChakraProvider>
      <AlertProvider>
        <main>
          <Header />
          <BookingSection />
          <LandingSection />
          <ProjectsSection />
          <ContactMeSection />

          <Footer />
          <Alert />
        </main>
      </AlertProvider>
    </ChakraProvider>
  );
}

export default App;
