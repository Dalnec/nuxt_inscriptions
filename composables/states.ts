export const useListForms = () => useState("listforms", () => []);
export const useForms = () => useState("forms", () => {});
export const useLoading = () => useState<boolean>("loading", () => false);
