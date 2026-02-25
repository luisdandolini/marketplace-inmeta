import { api } from "../../../shared/lib/api";
import type { Me } from "../types";

export const meService = {
  me: async (): Promise<Me> => {
    const response = await api.get<Me>("/me");
    return response.data;
  },
};
