import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, User } from "lucide-react";

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.BlogPost.filter({ slug })
      .then((data) => setPost(data[0] || null))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-24 bg-[#F9FBFF]">
        <div className="max-w-3xl mx-auto px-4">
          <div className="h-8 w-64 bg-gray-100 animate-pulse rounded mb-6" />
          <div className="h-4 w-full bg-gray-100 animate-pulse rounded mb-3" />
          <div className="h-4 w-3/4 bg-gray-100 animate-pulse rounded" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-28 pb-24 flex items-center justify-center bg-[#F9FBFF]">
        <div className="text-center">
          <h2 className="font-heading font-bold text-2xl text-[#1E293B] mb-4">Artigo não encontrado</h2>
          <Link to="/blog" className="text-[#735AAA] font-medium hover:underline">← Voltar para o Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#F9FBFF]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-[#1E293B]/50 hover:text-[#735AAA] text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Blog
        </Link>

        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-[#735AAA] text-sm font-semibold uppercase tracking-wide">{post.category}</span>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-[#1E293B] mt-3 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-[#1E293B]/40 mb-10 pb-10 border-b border-gray-200">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {post.author}
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {post.published_date}
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-[#1E293B]/80 leading-relaxed">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </motion.article>
      </div>
    </div>
  );
}