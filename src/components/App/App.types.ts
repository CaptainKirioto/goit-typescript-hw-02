export type Image = {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  description: string;
  user: {
    name: string;
    profile_image: {
      small: string;
    };
  };
};
