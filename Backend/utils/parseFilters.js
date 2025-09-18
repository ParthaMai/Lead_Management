export const parseFilters = (query) => {
  const filters = {};

  if (query.status) {
    filters.status = query.status; // e.g. ?status=new
  }

  if (query.email) {
    filters.email = { $regex: query.email, $options: "i" }; // case-insensitive search
  }

  if (query.company) {
    filters.company = { $regex: query.company, $options: "i" };
  }

  if (query.city) {
    filters.city = { $regex: query.city, $options: "i" };
  }

  if (query.state) {
    filters.state = query.state;
  }

  // Example: ?is_qualified=true
  if (query.is_qualified !== undefined) {
    filters.is_qualified = query.is_qualified === "true";
  }

  return filters;
};
