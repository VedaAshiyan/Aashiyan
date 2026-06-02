import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { 
  Lock, 
  BookOpen, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Edit, 
  LogOut,
  X
} from 'lucide-react';
import { BlogPost } from './Blog';
import { GalleryPhoto } from './Gallery';

export default function Admin({ onExit }: { onExit: () => void }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'blogs' | 'gallery'>('blogs');
  
  // Data states
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(false);

  // Gallery Add Modal/Form
  const [showGalleryAdd, setShowGalleryAdd] = useState(false);
  const [newPhoto, setNewPhoto] = useState({ src: '', alt: '', caption: '', span: 'md:col-span-1' });

  const fetchData = useCallback(async () => {
    setLoading(true);
    if (activeTab === 'blogs') {
      const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
      if (data) setBlogs(data);
    } else {
      const { data } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
      if (data) setPhotos(data);
    }
    setLoading(false);
  }, [activeTab]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, fetchData]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // Simple password check using an environment variable or hardcoded for aashiyan
    if (password === 'aashiyan2024') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  }

  async function deleteBlog(id: string) {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (!error) fetchData();
  }

  async function deletePhoto(id: string) {
    if (!confirm('Are you sure you want to delete this photo from the gallery?')) return;
    const { error } = await supabase.from('gallery').delete().eq('id', id);
    if (!error) fetchData();
  }

  async function addPhoto(e: React.FormEvent) {
    e.preventDefault();
    if (!newPhoto.src) return;
    
    const { error } = await supabase.from('gallery').insert([newPhoto]);
    if (!error) {
      setShowGalleryAdd(false);
      setNewPhoto({ src: '', alt: '', caption: '', span: 'md:col-span-1' });
      fetchData();
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-5 font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-10">
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="text-amber-500" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-center text-slate-800 mb-2 font-display">Admin Access</h1>
          <p className="text-slate-500 text-center mb-8 text-sm">Enter password to manage Aashiyan content.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-slate-100 focus:border-amber-400 outline-none rounded-2xl px-5 py-4 transition-all"
              autoFocus
            />
            {error && <p className="text-rose-500 text-xs font-bold px-2">{error}</p>}
            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-slate-200"
            >
              Login to Dashboard
            </button>
          </form>
          
          <button 
            onClick={onExit}
            className="w-full mt-4 text-slate-400 hover:text-slate-600 text-sm font-semibold transition-colors"
          >
            Back to Website
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-8 border-bottom border-slate-100">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white font-bold">A</div>
            <span className="font-display font-bold text-slate-800 text-lg tracking-tight">Admin Nest</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold px-1">Management Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('blogs')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'blogs' ? 'bg-amber-50 text-amber-600 shadow-sm shadow-amber-100/50' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <BookOpen size={18} />
            Blogs
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'gallery' ? 'bg-amber-50 text-amber-600 shadow-sm shadow-amber-100/50' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <ImageIcon size={18} />
            Gallery
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={onExit}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-rose-50 hover:text-rose-500 transition-all"
          >
            <LogOut size={18} />
            Exit Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-display font-bold text-slate-800 tracking-tight">
              {activeTab === 'blogs' ? 'Blog Posts' : 'Photo Gallery'}
            </h2>
            <p className="text-slate-500 text-sm mt-1">Manage what visitors see on the Aashiyan website.</p>
          </div>
          
          <button 
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg transition-all active:scale-95"
            onClick={() => activeTab === 'gallery' ? setShowGalleryAdd(true) : alert('Click on Write a Blog on the homepage or use the future edit interface.')}
          >
            <Plus size={18} />
            {activeTab === 'blogs' ? 'New Blog' : 'Add Photo'}
          </button>
        </header>

        {loading ? (
          <div className="flex items-center justify-center h-64">
             <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-6">
            {activeTab === 'blogs' ? (
              <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Title</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Status</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Date</th>
                      <th className="px-8 py-5 text-right text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {blogs.map(blog => (
                      <tr key={blog.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="font-bold text-slate-800 text-sm group-hover:text-amber-600 transition-colors">{blog.title}</div>
                          <div className="text-[10px] text-slate-400 mt-1 font-mono">{blog.slug}</div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            blog.published ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {blog.published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-slate-500 text-sm">
                          {new Date(blog.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-slate-400 hover:text-sky-500 hover:bg-sky-50 rounded-lg transition-all"><Edit size={16} /></button>
                            <button 
                              onClick={() => deleteBlog(blog.id)}
                              className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {photos.map(photo => (
                  <div key={photo.id} className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <div className="aspect-square relative">
                      <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button 
                          onClick={() => deletePhoto(photo.id)}
                          className="w-10 h-10 bg-white text-rose-500 rounded-xl flex items-center justify-center shadow-lg hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="font-bold text-xs text-slate-800 truncate mb-1">{photo.caption}</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{photo.span || 'Default' }</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Gallery Add Modal */}
      {showGalleryAdd && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xl font-display font-bold text-slate-800">Add New Photo</h3>
              <button onClick={() => setShowGalleryAdd(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>
            
            <form onSubmit={addPhoto} className="p-8 space-y-6">
              <div>
                <label className="text-slate-500 text-[10px] font-bold uppercase tracking-widest block mb-2">Photo URL</label>
                <input
                  type="url"
                  placeholder="https://images.pexels.com/..."
                  className="w-full border-2 border-slate-100 focus:border-amber-400 outline-none rounded-2xl px-5 py-4 transition-all text-sm"
                  value={newPhoto.src}
                  onChange={e => setNewPhoto({...newPhoto, src: e.target.value})}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-500 text-[10px] font-bold uppercase tracking-widest block mb-2">Caption</label>
                  <input
                    type="text"
                    placeholder="Meal time"
                    className="w-full border-2 border-slate-100 focus:border-amber-400 outline-none rounded-2xl px-5 py-3 transition-all text-sm font-bold"
                    value={newPhoto.caption}
                    onChange={e => setNewPhoto({...newPhoto, caption: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-slate-500 text-[10px] font-bold uppercase tracking-widest block mb-2">Layout Size</label>
                  <select
                    className="w-full border-2 border-slate-100 focus:border-amber-400 outline-none rounded-2xl px-5 py-3 transition-all text-sm font-bold appearance-none bg-white"
                    value={newPhoto.span}
                    onChange={e => setNewPhoto({...newPhoto, span: e.target.value})}
                  >
                    <option value="md:col-span-1">Small (1x1)</option>
                    <option value="md:col-span-2">Wide (2x1)</option>
                    <option value="md:col-span-1 md:row-span-2">Tall (1x2)</option>
                  </select>
                </div>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-amber-100"
              >
                Add to Gallery
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
