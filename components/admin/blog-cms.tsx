"use client"

import { Edit, Eye, Plus, Save, Search, Trash2, X } from "lucide-react"
import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { POST_SELECT } from "@/lib/blog/map"
import type { BlogAuthorRecord, BlogCategory } from "@/lib/blog/types"
import { pingSearchEnginesForSitemap, revalidateBlogPaths, slugifyTitle } from "@/lib/blog/utils"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { hasSupabaseEnv } from "@/lib/supabase/env"
import { cn } from "@/lib/utils"

type AdminPostRow = {
  id: string
  slug: string
  title: string
  excerpt: string | null
  content: string | null
  cover_image: string | null
  author_id: string | null
  published: boolean
  published_at: string | null
  seo_title: string | null
  seo_description: string | null
  seo_keywords: string | null
  read_time: string | null
  view_count: number | null
  created_at: string
  author?: { id: string; name: string; avatar_url: string | null } | null
  categories?: { category: BlogCategory | null }[] | null
}

type Tab = "posts" | "authors" | "categories"

const inputClass =
  "w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"

export function BlogCms() {
  const [tab, setTab] = useState<Tab>("posts")

  if (!hasSupabaseEnv()) {
    return (
      <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-6 text-sm text-amber-100">
        Add <code className="text-amber-50">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
        <code className="text-amber-50">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to{" "}
        <code className="text-amber-50">.env.local</code>, then restart the dev server.
      </p>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {(
          [
            ["posts", "Articles"],
            ["authors", "Authors"],
            ["categories", "Categories"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              tab === key
                ? "bg-blue-600/20 text-white ring-1 ring-blue-500/40"
                : "text-slate-400 hover:bg-white/5 hover:text-white",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "posts" ? <PostsPanel /> : null}
      {tab === "authors" ? <AuthorsPanel /> : null}
      {tab === "categories" ? <CategoriesPanel /> : null}
    </div>
  )
}

function PostsPanel() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])
  const [posts, setPosts] = useState<AdminPostRow[]>([])
  const [authors, setAuthors] = useState<BlogAuthorRecord[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [search, setSearch] = useState("")
  const [editing, setEditing] = useState(false)
  const [current, setCurrent] = useState<Partial<AdminPostRow>>({})
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const load = useCallback(async () => {
    const [postsRes, authorsRes, categoriesRes] = await Promise.all([
      supabase.from("posts").select(POST_SELECT).order("created_at", { ascending: false }),
      supabase.from("authors").select("*").order("created_at", { ascending: false }),
      supabase.from("categories").select("*").order("name", { ascending: true }),
    ])

    if (postsRes.data) setPosts(postsRes.data as AdminPostRow[])
    if (authorsRes.data) setAuthors(authorsRes.data as BlogAuthorRecord[])
    if (categoriesRes.data) setCategories(categoriesRes.data as BlogCategory[])
  }, [supabase])

  useEffect(() => {
    let cancelled = false

    void Promise.all([
      supabase.from("posts").select(POST_SELECT).order("created_at", { ascending: false }),
      supabase.from("authors").select("*").order("created_at", { ascending: false }),
      supabase.from("categories").select("*").order("name", { ascending: true }),
    ]).then(([postsRes, authorsRes, categoriesRes]) => {
      if (cancelled) return
      if (postsRes.data) setPosts(postsRes.data as AdminPostRow[])
      if (authorsRes.data) setAuthors(authorsRes.data as BlogAuthorRecord[])
      if (categoriesRes.data) setCategories(categoriesRes.data as BlogCategory[])
    })

    return () => {
      cancelled = true
    }
  }, [supabase])

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()),
  )

  const save = async () => {
    if (!current.title || !current.slug || !current.author_id) {
      alert("Title, slug, and author are required.")
      return
    }

    const postData = {
      title: current.title,
      slug: current.slug,
      excerpt: current.excerpt ?? "",
      content: current.content ?? "",
      cover_image: current.cover_image,
      author_id: current.author_id,
      published: Boolean(current.published),
      published_at: current.published
        ? current.published_at || new Date().toISOString()
        : null,
      seo_title: current.seo_title,
      seo_description: current.seo_description,
      seo_keywords: current.seo_keywords,
      read_time: current.read_time,
    }

    let postId = current.id

    if (postId) {
      const { error } = await supabase.from("posts").update(postData).eq("id", postId)
      if (error) {
        alert(error.message)
        return
      }
    } else {
      const { data, error } = await supabase.from("posts").insert([postData]).select("id").single()
      if (error) {
        alert(error.message)
        return
      }
      postId = data.id
    }

    if (postId) {
      await supabase.from("post_categories").delete().eq("post_id", postId)
      if (selectedCategories.length) {
        await supabase.from("post_categories").insert(
          selectedCategories.map((category_id) => ({ post_id: postId, category_id })),
        )
      }
    }

    if (postData.published) {
      void pingSearchEnginesForSitemap()
    }
    await revalidateBlogPaths(postData.slug)

    setEditing(false)
    setCurrent({})
    setSelectedCategories([])
    await load()
  }

  const remove = async (id: string, slug: string) => {
    if (!confirm("Delete this article permanently?")) return
    const { error } = await supabase.from("posts").delete().eq("id", id)
    if (error) {
      alert(error.message)
      return
    }
    await revalidateBlogPaths(slug)
    await load()
  }

  if (editing) {
    return (
      <div className="space-y-6 rounded-2xl border border-white/10 bg-zinc-900/60 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">
              {current.id ? "Edit article" : "New article"}
            </h2>
            <p className="mt-1 text-sm text-slate-400">HTML content is supported in the body field.</p>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={() => setEditing(false)}>
            <X className="size-5" />
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <div>
              <label className="mb-1 block text-sm text-slate-300">Title</label>
              <input
                className={inputClass}
                value={current.title || ""}
                onChange={(e) => {
                  const title = e.target.value
                  if (!current.id) {
                    setCurrent((p) => ({ ...p, title, slug: slugifyTitle(title) }))
                  } else {
                    setCurrent((p) => ({ ...p, title }))
                  }
                }}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-300">Slug</label>
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-slate-400">
                <span>/blog/</span>
                <input
                  className="flex-1 bg-transparent text-white outline-none"
                  value={current.slug || ""}
                  onChange={(e) => setCurrent((p) => ({ ...p, slug: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-300">Excerpt</label>
              <textarea
                className={cn(inputClass, "min-h-24")}
                value={current.excerpt || ""}
                onChange={(e) => setCurrent((p) => ({ ...p, excerpt: e.target.value }))}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-300">Content (HTML)</label>
              <textarea
                className={cn(inputClass, "min-h-[420px] font-mono text-xs leading-relaxed")}
                value={current.content || ""}
                onChange={(e) => setCurrent((p) => ({ ...p, content: e.target.value }))}
              />
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
              <h3 className="text-sm font-semibold text-white">SEO</h3>
              <input
                className={inputClass}
                placeholder="SEO title (optional)"
                value={current.seo_title || ""}
                onChange={(e) => setCurrent((p) => ({ ...p, seo_title: e.target.value }))}
              />
              <textarea
                className={cn(inputClass, "min-h-20")}
                placeholder="Meta description"
                value={current.seo_description || ""}
                onChange={(e) => setCurrent((p) => ({ ...p, seo_description: e.target.value }))}
              />
              <input
                className={inputClass}
                placeholder="Keywords (comma-separated)"
                value={current.seo_keywords || ""}
                onChange={(e) => setCurrent((p) => ({ ...p, seo_keywords: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
              <h3 className="text-sm font-semibold text-white">Publishing</h3>
              <label className="flex items-center justify-between text-sm text-slate-300">
                Published
                <input
                  type="checkbox"
                  checked={Boolean(current.published)}
                  onChange={(e) => setCurrent((p) => ({ ...p, published: e.target.checked }))}
                  className="size-4 rounded"
                />
              </label>
              <Button type="button" className="w-full" onClick={() => void save()}>
                <Save className="mr-2 size-4" />
                Save article
              </Button>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
              <label className="block text-sm text-slate-300">Author</label>
              <select
                className={inputClass}
                value={current.author_id || ""}
                onChange={(e) => setCurrent((p) => ({ ...p, author_id: e.target.value }))}
              >
                <option value="">Select author</option>
                {authors.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
              <label className="block text-sm text-slate-300">Cover image URL</label>
              <input
                className={inputClass}
                value={current.cover_image || ""}
                onChange={(e) => setCurrent((p) => ({ ...p, cover_image: e.target.value }))}
              />
              <label className="block text-sm text-slate-300">Categories</label>
              <div className="max-h-40 space-y-1 overflow-y-auto rounded-lg border border-white/5 p-2">
                {categories.map((cat) => (
                  <label key={cat.id} className="flex cursor-pointer items-center gap-2 p-1 text-sm text-slate-300">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() =>
                        setSelectedCategories((prev) =>
                          prev.includes(cat.id)
                            ? prev.filter((id) => id !== cat.id)
                            : [...prev, cat.id],
                        )
                      }
                    />
                    {cat.name}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-500" />
          <input
            className={cn(inputClass, "pl-10")}
            placeholder="Search articles…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button
          type="button"
          onClick={() => {
            setCurrent({ published: false })
            setSelectedCategories([])
            setEditing(true)
          }}
        >
          <Plus className="mr-2 size-4" />
          New article
        </Button>
      </div>

      <ul className="space-y-3">
        {filtered.map((post) => (
          <li
            key={post.id}
            className="flex flex-col gap-4 rounded-xl border border-white/10 bg-zinc-900/50 p-4 sm:flex-row sm:items-center"
          >
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold text-white">{post.title}</h3>
              <p className="text-xs text-slate-500">/blog/{post.slug}</p>
            </div>
            <span
              className={cn(
                "text-xs font-semibold uppercase",
                post.published ? "text-emerald-400" : "text-amber-400",
              )}
            >
              {post.published ? "Published" : "Draft"}
            </span>
            <div className="flex items-center gap-1">
              <Button type="button" variant="ghost" size="icon" asChild>
                <Link href={`/blog/${post.slug}`} target="_blank">
                  <Eye className="size-4" />
                </Link>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  setCurrent(post)
                  setSelectedCategories(
                    post.categories?.map((c) => c.category?.id).filter(Boolean) as string[],
                  )
                  setEditing(true)
                }}
              >
                <Edit className="size-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon" onClick={() => void remove(post.id, post.slug)}>
                <Trash2 className="size-4 text-red-400" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function AuthorsPanel() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])
  const [authors, setAuthors] = useState<BlogAuthorRecord[]>([])
  const [editing, setEditing] = useState(false)
  const [current, setCurrent] = useState<Partial<BlogAuthorRecord>>({})

  const load = useCallback(async () => {
    const { data } = await supabase.from("authors").select("*").order("created_at", { ascending: false })
    setAuthors((data as BlogAuthorRecord[]) || [])
  }, [supabase])

  useEffect(() => {
    let cancelled = false

    void supabase
      .from("authors")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (cancelled) return
        setAuthors((data as BlogAuthorRecord[]) || [])
      })

    return () => {
      cancelled = true
    }
  }, [supabase])

  const save = async () => {
    if (!current.name) return
    const payload = {
      name: current.name,
      avatar_url: current.avatar_url,
      bio: current.bio,
    }
    if (current.id) {
      await supabase.from("authors").update(payload).eq("id", current.id)
    } else {
      await supabase.from("authors").insert([payload])
    }
    setEditing(false)
    setCurrent({})
    await load()
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold text-white">Authors</h2>
        <Button type="button" onClick={() => { setCurrent({}); setEditing(true) }}>
          <Plus className="mr-2 size-4" />
          Add author
        </Button>
      </div>
      {editing ? (
        <div className="space-y-3 rounded-xl border border-white/10 p-4">
          <input
            className={inputClass}
            placeholder="Name"
            value={current.name || ""}
            onChange={(e) => setCurrent((p) => ({ ...p, name: e.target.value }))}
          />
          <input
            className={inputClass}
            placeholder="Avatar URL"
            value={current.avatar_url || ""}
            onChange={(e) => setCurrent((p) => ({ ...p, avatar_url: e.target.value }))}
          />
          <textarea
            className={cn(inputClass, "min-h-20")}
            placeholder="Bio"
            value={current.bio || ""}
            onChange={(e) => setCurrent((p) => ({ ...p, bio: e.target.value }))}
          />
          <div className="flex gap-2">
            <Button type="button" onClick={() => void save()}>
              Save
            </Button>
            <Button type="button" variant="ghost" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : null}
      <ul className="space-y-2">
        {authors.map((author) => (
          <li
            key={author.id}
            className="flex items-center justify-between rounded-lg border border-white/10 px-4 py-3"
          >
            <span className="text-white">{author.name}</span>
            <div className="flex gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  setCurrent(author)
                  setEditing(true)
                }}
              >
                <Edit className="size-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={async () => {
                  if (!confirm("Delete author?")) return
                  await supabase.from("authors").delete().eq("id", author.id)
                  await load()
                }}
              >
                <Trash2 className="size-4 text-red-400" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function CategoriesPanel() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [editing, setEditing] = useState(false)
  const [current, setCurrent] = useState<Partial<BlogCategory>>({})

  const load = useCallback(async () => {
    const { data } = await supabase.from("categories").select("*").order("name", { ascending: true })
    setCategories((data as BlogCategory[]) || [])
  }, [supabase])

  useEffect(() => {
    let cancelled = false

    void supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true })
      .then(({ data }) => {
        if (cancelled) return
        setCategories((data as BlogCategory[]) || [])
      })

    return () => {
      cancelled = true
    }
  }, [supabase])

  const save = async () => {
    if (!current.name || !current.slug) return
    const payload = { name: current.name, slug: current.slug }
    if (current.id) {
      await supabase.from("categories").update(payload).eq("id", current.id)
    } else {
      await supabase.from("categories").insert([payload])
    }
    setEditing(false)
    setCurrent({})
    await load()
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold text-white">Categories</h2>
        <Button type="button" onClick={() => { setCurrent({}); setEditing(true) }}>
          <Plus className="mr-2 size-4" />
          Add category
        </Button>
      </div>
      {editing ? (
        <div className="space-y-3 rounded-xl border border-white/10 p-4">
          <input
            className={inputClass}
            placeholder="Name"
            value={current.name || ""}
            onChange={(e) => {
              const name = e.target.value
              setCurrent((p) => ({
                ...p,
                name,
                slug: p.slug || slugifyTitle(name),
              }))
            }}
          />
          <input
            className={inputClass}
            placeholder="Slug"
            value={current.slug || ""}
            onChange={(e) => setCurrent((p) => ({ ...p, slug: e.target.value }))}
          />
          <div className="flex gap-2">
            <Button type="button" onClick={() => void save()}>
              Save
            </Button>
            <Button type="button" variant="ghost" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : null}
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="flex items-center justify-between rounded-lg border border-white/10 px-4 py-3"
          >
            <span className="text-white">
              {cat.name} <span className="text-slate-500">({cat.slug})</span>
            </span>
            <div className="flex gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  setCurrent(cat)
                  setEditing(true)
                }}
              >
                <Edit className="size-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={async () => {
                  if (!confirm("Delete category?")) return
                  await supabase.from("categories").delete().eq("id", cat.id)
                  await load()
                }}
              >
                <Trash2 className="size-4 text-red-400" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
