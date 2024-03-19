export type MenuItem = {
  name: string;
  title: string;
  icon?: boolean;
  features?: [
    { name: string; title: string },
    { name: string; title: string },
    { name: string; title: string },
    { name: string; title: string }
  ];
  desktop: boolean;
  mobile: boolean;
};
export type ActionItem = {
  name: string;
  title: string;
  type?: "button";
  desktop: boolean;
  mobile: boolean;
};

export type Feature = {
  id: string;
  title: string;
  content: string;
  links: { id: number; icon: string; text: string }[];
  capabilities: string[];
  image: {
    src: string;
    text: string;
  };
};

export type PageContent = {
  logo: {
    src: string;
  };
  menuItems: MenuItem[];
  actionItems: ActionItem[];
  content: Record<string, Feature>;
};
