const publicRoutes = {
  id: "public",
  children: [
    {
      index: true, // index route kullanımı
      lazy: async () => ({
        Component: (await import("app/pages/home")).default,
      }),
    },
    {
      path: "/", // açık bir şekilde tanımlanmış path
      lazy: async () => ({
        Component: (await import("app/pages/home")).default,
      }),
    },
    {
      path: "index",
      lazy: async () => ({
        Component: (await import("app/pages/home")).default,
      }),
    },
  ],
};

export { publicRoutes };