import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Calendar, User, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const BLOG_IMG = "https://media.base44.com/images/public/6a3dce71c9e933d4c38e8c9c/a412bea8e_generated_93325863.png";

const categories = ["Todos", "Prevenção", "Alimentação", "Novidades Médicas", "Campanhas"];

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Todos");

  useEffect(() => {
    base44.entities.BlogPost.list("-published_date", 50)
      .then(setPosts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const featured = posts.find((p) => p.is_featured);
  const filteredPosts = posts.filter(
    (p) => activeCategory === "Todos" || p.category === activeCategory
  );

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#F9FBFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Blog Clínica Meta"
          title="Saúde e Bem-Estar"
          subtitle="Informação de qualidade para cuidar da sua saúde. Artigos escritos pela nossa equipe médica."
        />

        {/* Featured post */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-14"
          >
            <Link to={`/blog/${featured.slug}`} className="group block">
              <div className="grid lg:grid-cols-2 gap-8 bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-[#735AAA]/5 transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={featured.cover_image || BLOG_IMG}
                    alt={featured.title}
                    className="w-full h-72 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-[#46BEE6] to-[#735AAA] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                      Destaque
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-[#735AAA] text-sm font-medium mb-3">{featured.category}</span>
                  <h2 className="font-heading font-bold text-2xl text-[#1E293B] group-hover:text-[#735AAA] transition-colors mb-4">
                    {featured.title}
                  </h2>
                  <p className="text-[#1E293B]/60 leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-[#1E293B]/40">
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4" />
                      {featured.author}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {featured.published_date}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-[#46BEE6] to-[#735AAA] text-white"
                  : "bg-white text-[#1E293B]/60 border border-gray-200 hover:border-[#46BEE6]/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-72 rounded-2xl bg-white animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:shadow-[#46BEE6]/10 transition-all duration-300 h-full"
                >
                  <div className="p-6">
                    <span className="text-[#735AAA] text-xs font-semibold uppercase tracking-wide">
                      {post.category}
                    </span>
                    <h3 className="font-heading font-bold text-lg text-[#1E293B] mt-3 mb-3 group-hover:text-[#735AAA] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[#1E293B]/50 leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-xs text-[#1E293B]/40">{post.published_date}</span>
                      <span className="inline-flex items-center gap-1 text-[#46BEE6] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Ler <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#1E293B]/50 text-lg">Nenhum artigo encontrado nesta categoria.</p>
          </div>
        )}
      </div>
    </div>
  );
}