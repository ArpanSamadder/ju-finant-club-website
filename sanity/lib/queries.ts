export const legacyEventsQuery = `*[_type == "legacyEvent" && isActive == true] | order(displayOrder asc, _createdAt desc) {
  _id,
  title,
  slug,
  year,
  shortDescription,
  mainImage,
  eventLogo,
  displayOrder,
  isFeatured,
  eventUrl
}`;
