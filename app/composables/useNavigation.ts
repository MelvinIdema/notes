export interface NavItem {
  title: string;
  url: string;
}

export interface NavSection {
  title: string;
  description?: string;
  url: string;
  items: NavItem[];
  hideInToC?: boolean;
}

export function useNavigation() {
  const navMain = ref<NavSection[]>([
    {
      title: "01. Introduction",
      description: "This home page",
      hideInToC: true,
      url: "#",
      items: [{ title: "Start", url: "/" }],
    },
    {
      title: "02. Data Fetching",
      description:
        "This section covers the different ways to fetch data in Nuxt.",
      url: "#",
      items: [
        { title: "01. Fetching", url: "/data-fetching/01.fetching" },
        { title: "02. Queries", url: "/data-fetching/02.queries" },
        { title: "03. Error", url: "/data-fetching/03.error" },
        { title: "04. Parallel", url: "/data-fetching/04.parallel" },
        {
          title: "06. Pick and Transform",
          url: "/data-fetching/06.pick-and-transform",
        },
        { title: "07. Configuration", url: "/data-fetching/07.configuration" },
        { title: "08. Repositories", url: "/data-fetching/08.repositories" },
      ],
    },
    {
      title: "03. Caching",
      description:
        "This section covers the different ways to cache data in Nuxt.",
      url: "#",
      items: [
        {
          title: "01. Navigation Caching",
          url: "/caching/01.navigation-caching",
        },
        {
          title: "02. Persistent Caching",
          url: "/caching/02.persistent-caching",
        },
        {
          title: "03. Placeholder Caching",
          url: "/caching/03.placeholder-caching",
        },
      ],
    },
    {
      title: "04. App Initialization",
      description:
        "This section covers the different ways to initialize a Nuxt app.",
      url: "#",
      items: [{ title: "01. App Initialization", url: "/app-initialization" }],
    },
  ]);

  return {
    navMain,
  };
}
