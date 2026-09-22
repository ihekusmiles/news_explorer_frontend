const apiKey = "0b96891b74f04ac3b3428877d08e8a9a";

// Using a ternary operator to handle bypass restriction when in production mode;
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

// Formatting date publishedAt
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
    pageSize: "6",
  });

  return fetch(`${baseURL}?${params.toString()}`).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Error: ${res.status}");
  });
};

// Simulating getting articles with hard-coded data
export function getItems() {
  return new Promise((resolve, reject) =>
    resolve([
      {
        _id: "65f7371e7bce9e7d331b11a01",
        source: "Gizmodo.com",
        url: "https://gizmodo.com/big-tech-destroyed-the-bookshop-but-never-fear-big-tech-is-reinventing-the-bookshop-2000809822",
        title:
          "Big Tech Destroyed the Bookshop. But Never Fear, Big Tech Is Reinventing the Bookshop!",
        urlToImage:
          "https://gizmodo.com/app/uploads/2026/09/open-book-1-1200x675.jpg",
        content:
          "Gather round, people. Im going to tell you a story. Once upon a time, long, long ago, in the 20th century, there was a magical world called the world. In this world, many people had occupations calle… [+4294 chars]",
        publishedAt: "2026-09-08T18:13:25Z",
        keyword: "book",
      },
      {
        _id: "65f7371e7bce9e7d331b11a02",
        source: "Gizmodo.com",
        url: "https://gizmodo.com/a-diablo-series-is-dungeon-crawling-to-netflix-2000810957",
        title: "A Diablo Series Is Dungeon Crawling to Netflix",
        urlToImage:
          "https://gizmodo.com/app/uploads/2026/09/diablo-iv-hed-1200x675.jpg",
        content:
          "At BlizzCon on Saturday, Blizzard Entertainment announced it was partnering with Netflix to develop an animated Diablo series. Some may recall this show, along with ones for fellow Blizzard IPs Overw… [+1564 chars]",
        publishedAt: "2026-09-12T18:09:02Z",
        keyword: "fantasy",
      },
      {
        _id: "65f7371e7bce9e7d331b11a03",
        source: "The Verge",
        url: "https://www.theverge.com/policy/993308/computer-science-ai-education-coding-kids",
        title: "Schools are catching on to Big Techs playbook",
        urlToImage:
          "https://platform.theverge.com/wp-content/uploads/sites/2/2025/09/STK483_EDUCATION_D.jpg?quality=90&strip=all&crop=0%2C9.9676601489831%2C100%2C80.064679702034&w=1200",
        content:
          "Educators were quick to adopt tech-backed coding curricula, but AI appears to face more scrutiny. Educators were quick to adopt tech-backed coding curricula, bu… [+7405 chars]",
        publishedAt: "2026-09-10T19:49:38Z",
        keyword: "coding",
      },
      {
        _id: "65f7371e7bce9e7d331b11a04",
        source: "Android Central",
        url: "https://www.androidcentral.com/gaming/virtual-reality/rokid-wants-anyone-to-build-ai-agents-for-its-smart-glasses",
        title: "Rokid wants anyone to build AI agents for its smart glasses",
        urlToImage:
          "https://cdn.mos.cms.futurecdn.net/a9PcLbsPjDoNnjkvF6xtGn-2560-80.jpg",
        content:
          "<ul><li>Rokid's AIUI Studio is a browser-based platform that lets anyone build spatial AI apps for Rokid Glasses, with no coding experience or dev kit required.</li><li>Developers can describe an ide… [+2050 chars]",
        publishedAt: "2026-09-10T10:22:28Z",
        keyword: "coding",
      },
      {
        _id: "65f7371e7bce9e7d331b11a05",
        source: "Gizmodo.com",
        url: "https://gizmodo.com/wit-studio-anime-the-one-piece-ai-crunch-awards-show-2000809456",
        title:
          "Why Wit Studios President Thinks Japan Should Host Its Own Anime Awards Show",
        urlToImage:
          "https://gizmodo.com/app/uploads/2026/09/Lona-The-One-Piece-Wit-Studio-1200x675.jpg",
        content:
          "Wit Studio has earned itself a place as a household name among anime fans. Since its founding in 2012, the studio has produced genre gems including Spy x Family and the early seasons of Attack on Tit… [+5522 chars]",
        publishedAt: "2026-09-09T21:30:50Z",
        keyword: "japan",
      },
      {
        _id: "65f7371e7bce9e7d331b11a06",
        source: "Kotaku",
        url: "https://kotaku.com/japan-expo-cosplay-gallery-one-piece-resident-evil-cyberpunk-naruto-2000732810",
        title: "19 Of The Sharpest Cosplay Fits From Paris Japan Expo",
        urlToImage: "https://kotaku.com/app/uploads/2026/09/japan-main-2.jpeg",
        content:
          "We all, of course, know where the Japan Expo takes place. Say it with me now: In Ja- Paris. Yup, the French convention takes place every year in the capital city, and claims to be the largest such ga… [+1671 chars]",
        publishedAt: "2026-09-10T11:00:57Z",
        keyword: "japan",
      },
    ]),
  );
}
// Simulating deleting items
export function removeArticle(article) {
  return new Promise((resolve, reject) => resolve([{}]));
}

// Simulating saving articles
export function saveArticle(article) {
  // article is a search result from the NewsAPI
  return new Promise((resolve, reject) => {
    resolve({
      _id: "65f7371e7bce9e7d331b11a000",
      source: article.source?.name || article.source,
      url: article.url,
      title: article.title,
      urlToImage: article.urlToImage,
      content: article.content,
      publishedAt: article.publishedAt,
      keyword: article.keyword,
    });
  });
}
