import React from "react";
import NyanCat from "@/components/portfolio/NyanCat";
import DancingBanana from "@/components/portfolio/DancingBanana";
import SpinningDogeHead from "@/components/portfolio/SpinningDogeHead";
import TrollFace from "@/components/portfolio/TrollFace";

export default function FunZoneWindow() {
  return (
    <div className="p-4 h-full overflow-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">Fun Zone</h2>
      <p className="text-sm text-gray-500 mb-4">
        Do you remember?
      </p>
      <div className="grid sm:grid-cols-2 gap-6 place-items-center">
        <NyanCat />
        <DancingBanana />
        <SpinningDogeHead />
        <TrollFace />
      </div>
    </div>
  );
}
