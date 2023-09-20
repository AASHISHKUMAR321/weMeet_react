import React from "react";
import { Route, Routes } from "react-router-dom";
import { MainScreen } from "../components/mainScreen/MainScreen";
import { MeetingScreen } from "../components/MeetingScreen/MeetingScreen";
import { Singin } from "../components/auth/Singin";
import { Private } from "../components/auth/Private";

export const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<MainScreen />} />
      <Route
        path="/:id"
        element={
          <Private>
            {" "}
            <MeetingScreen />
          </Private>
        }
      />
      <Route path="/signin" element={<Singin />} />
    </Routes>
  );
};
