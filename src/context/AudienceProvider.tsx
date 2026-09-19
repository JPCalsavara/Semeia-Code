import { useState, type ReactNode } from "react";
import type { Audience } from "../model/data";
import { AudienceContext } from "./AudienceContext";

export type AudienceProviderProps = {
  children: ReactNode;
  initialAudience?: Audience;
};

export function AudienceProvider({
  children,
  initialAudience = "schools",
}: AudienceProviderProps) {
  const [audience, setAudience] = useState<Audience>(initialAudience);

  const toggleAudience = () => {
    setAudience((prev) => (prev === "schools" ? "volunteers" : "schools"));
  };

  const isVolunteer = audience === "volunteers";

  return (
    <AudienceContext.Provider
      value={{
        audience,
        isVolunteer,
        toggleAudience,
        setAudience,
      }}
    >
      {children}
    </AudienceContext.Provider>
  );
}
