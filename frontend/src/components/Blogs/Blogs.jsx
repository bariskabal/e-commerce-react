import "./Blogs.css";
import BlogItem from "./BlogItem";

export default function Blogs() {
  return (
    <section className="blogs blog-page">
      <div className="container">
        <div className="section-title">
          <h2>From Our Blog</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <ul className="blog-list">
          <BlogItem />
          <BlogItem />
          <BlogItem />
          <BlogItem />
          <BlogItem />
          <BlogItem />
        </ul>
      </div>
    </section>
  );
}
