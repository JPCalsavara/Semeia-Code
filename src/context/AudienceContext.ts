import { createContext, useContext } from "react";
import type { Audience } from "../model/data";

export type { Audience };

export type AudienceContextValue = {
  audience: Audience;
  isVolunteer: boolean;
  toggleAudience: () => void;
  setAudience: (audience: Audience) => void;
};

export const AudienceContext = createContext<AudienceContextValue | undefined>(
  undefined,
);

export function useAudience(): AudienceContextValue {
  const context = useContext(AudienceContext);
  if (!context) {
    throw new Error(
      "useAudience deve ser utilizado dentro de um AudienceProvider",
    );
  }
  return context;
}
