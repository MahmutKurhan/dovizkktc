const publicRoutes = {
  id: "public",
  children: [
    {
      path: "index",
      lazy: async () => ({
        Component: (await import("app/pages/home")).default,
      }),
    },
  ],
};

export { publicRoutes };
