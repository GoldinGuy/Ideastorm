const toSlug = string => {
	string = string.toLowerCase().trim().replaceAll(" ", "-");
	return string;
};
export default toSlug;
