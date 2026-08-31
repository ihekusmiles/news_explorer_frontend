const apiKey = "0b96891b74f04ac3b3428877d08e8a9a";
const baseURL = "https://newsapi.org/v2/everything";

// format date publishedAt
const formatDate = (date) => date.toISOString().split("T")[0];

export const getNewsArticles = (searchQuery) => {
  const currentDate = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  const to = formatDate(currentDate);
  const from = formatDate(sevenDaysAgo);

  // Query parameters into an object using URLSearchParams
  const params = new URLSearchParams({
    q: searchQuery,
    apiKey: apiKey,
    from: from,
    to: to,
    pageSize: "10",
  });

  return fetch(`${baseURL}?${params.toString()}`).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Error: ${res.status}");
  });
};
