import slugify from "slugify";
const formatSlug = (text: string): string => {
  const slug = slugify(text, {
    lower: true,
    locale: "vi",
    remove: /[*+~.()'"!:@,?]/g,
  });
  return slug;
};

export default formatSlug;
