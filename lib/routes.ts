export const ROUTES = {
  home: "/",
  signin: "/signin",
  dashboard: "/dashboard",
  howItWorksSection: "/#how_it_works",
  featuresSection: "/#features",
  attendance: ({ sessionId }: { sessionId: string }) =>
    `/attendance/${sessionId}`,
};
