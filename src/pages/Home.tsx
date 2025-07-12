import { useEffect, useState } from "react";
import type { Post } from "../types";
import { fetchPosts } from "../services/api";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";


const Home = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const POSTS_PER_PAGE = 12;

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      const data = await fetchPosts();
      setAllPosts(data);
      setVisiblePosts(data.slice(0, POSTS_PER_PAGE));
      setIsLoading(false);
    };
    loadPosts();
  }, []);

  useEffect(() => {
    const newPosts = filteredPosts.slice(0, POSTS_PER_PAGE);
    setVisiblePosts(newPosts);
    setHasMore(newPosts.length < filteredPosts.length);
  }, [searchQuery, allPosts]);

  // filter
  const filteredPosts = allPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // lazy loading
  const loadMorePosts = () => {
    const newLength = visiblePosts.length + POSTS_PER_PAGE;
    const newPosts = filteredPosts.slice(0, newLength);
    setVisiblePosts(newPosts);
    if (newPosts.length >= filteredPosts.length) {
      setHasMore(false);
    }
  };

  // scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 50 &&
        hasMore &&
        !isLoading
      ) {
        loadMorePosts();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visiblePosts, filteredPosts, hasMore, isLoading]);

  return (
    <div className=" max-w-screen-full mx-auto xl:p-8 md:p-6 p-2">
      <input
        type="text"
        placeholder="Поиск по заголовку..."
        className="xl:w-1/3 w-full p-2 mb-4 border text-white border-grey02 rounded-[10px]"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {isLoading ? (
        <Loader />
      ) : filteredPosts.length === 0 ? (
        <p className="text-white text-2xl">Ничего не найдено...</p>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4  pt-[100px]">
          {visiblePosts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
