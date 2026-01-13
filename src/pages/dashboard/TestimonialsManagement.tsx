import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Testimonial } from '../../lib/supabase';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { ImageUpload } from '../../components/dashboard/ImageUpload';
import { Plus, Edit, Trash2, Save, X, MessageSquare, Loader2 } from 'lucide-react';

export const TestimonialsManagement: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    testimonial_id: '',
    client_name: '',
    client_role: '',
    client_company: '',
    client_image: '',
    platform: '',
    platform_url: '',
    rating: 5,
    testimonial: '',
    date: '',
    project_type: '',
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setTestimonials(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setFormData({
      testimonial_id: `testimonial-${Date.now()}`,
      client_name: '',
      client_role: '',
      client_company: '',
      client_image: '',
      platform: '',
      platform_url: '',
      rating: 5,
      testimonial: '',
      date: new Date().getFullYear().toString(),
      project_type: '',
      display_order: testimonials.length,
      is_active: true,
    });
    setShowAddForm(true);
    setEditingId(null);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setFormData({
      testimonial_id: testimonial.testimonial_id,
      client_name: testimonial.client_name,
      client_role: testimonial.client_role,
      client_company: testimonial.client_company || '',
      client_image: testimonial.client_image || '',
      platform: testimonial.platform || '',
      platform_url: testimonial.platform_url || '',
      rating: testimonial.rating,
      testimonial: testimonial.testimonial,
      date: testimonial.date || '',
      project_type: testimonial.project_type || '',
      display_order: testimonial.display_order,
      is_active: testimonial.is_active,
    });
    setEditingId(testimonial.id);
    setShowAddForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editingId) {
        const { error } = await supabase
          .from('testimonials')
          .update(formData)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('testimonials').insert([formData]);
        if (error) throw error;
      }
      await fetchTestimonials();
      setShowAddForm(false);
      setEditingId(null);
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Error saving testimonial. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    setDeleting(id);
    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw error;
      await fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert('Error deleting testimonial. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Testimonials Management</h2>
        <Button 
          onClick={handleAdd} 
          className="cursor-pointer"
          glowColor="#3b82f6"
        >
          <Plus size={18} className="mr-2" />
          Add Testimonial
        </Button>
      </div>

      {showAddForm && (
        <Card 
          className="p-6 mb-6 bg-gray-800 border-gray-700"
          hoverScale={false}
          hoverLift={false}
          glowColor="transparent"
          gradientColors={[]}
        >
          <h3 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Testimonial ID</label>
                <input
                  type="text"
                  value={formData.testimonial_id}
                  onChange={(e) => setFormData({ ...formData, testimonial_id: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Display Order</label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Client Name</label>
                <input
                  type="text"
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Client Role</label>
                <input
                  type="text"
                  value={formData.client_role}
                  onChange={(e) => setFormData({ ...formData, client_role: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Client Company</label>
                <input
                  type="text"
                  value={formData.client_company}
                  onChange={(e) => setFormData({ ...formData, client_company: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
              <div>
                <ImageUpload
                  bucket="testimonials"
                  currentImageUrl={formData.client_image}
                  onImageUploaded={(url) => setFormData({ ...formData, client_image: url })}
                  onImageRemoved={() => setFormData({ ...formData, client_image: '' })}
                  folder="testimonials"
                  label="Client Image"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Platform</label>
                <input
                  type="text"
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Platform URL</label>
                <input
                  type="text"
                  value={formData.platform_url}
                  onChange={(e) => setFormData({ ...formData, platform_url: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Rating (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Testimonial</label>
              <textarea
                value={formData.testimonial}
                onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Project Type</label>
                <input
                  type="text"
                  value={formData.project_type}
                  onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="is_active" className="text-sm">
                Active
              </label>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleSave} 
                className="cursor-pointer"
                disabled={saving}
                glowColor="#10b981"
              >
                {saving ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} className="mr-2" />
                    Save
                  </>
                )}
              </Button>
              <Button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingId(null);
                }}
                variant="outline"
              >
                <X size={18} className="mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {testimonials.length === 0 ? (
        <Card 
          className="p-12 bg-gray-800 border-gray-700 text-center"
          hoverScale={false}
          hoverLift={false}
          glowColor="transparent"
          gradientColors={[]}
        >
          <div className="text-gray-400 mb-4">
            <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">No testimonials found</p>
            <p className="text-sm mt-2">Click "Add Testimonial" to create your first testimonial</p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="p-4 bg-gray-800 border-gray-700"
              hoverScale={false}
              hoverLift={false}
              glowColor="transparent"
              gradientColors={[]}
            >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{testimonial.client_name}</h3>
                <p className="text-gray-400 text-sm mb-2">
                  {testimonial.client_role} {testimonial.client_company && `at ${testimonial.client_company}`}
                </p>
                <p className="text-gray-300 text-sm line-clamp-2 mb-2">{testimonial.testimonial}</p>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 bg-gray-700 rounded">
                    Rating: {testimonial.rating}/5
                  </span>
                  <span className="text-xs px-2 py-1 bg-gray-700 rounded">
                    Order: {testimonial.display_order}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      testimonial.is_active
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {testimonial.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleEdit(testimonial)} 
                  size="sm" 
                  variant="outline"
                  className="cursor-pointer"
                >
                  <Edit size={16} />
                </Button>
                <Button 
                  onClick={() => handleDelete(testimonial.id)} 
                  size="sm" 
                  variant="destructive"
                  className="cursor-pointer"
                  disabled={deleting === testimonial.id}
                  glowColor="#ef4444"
                >
                  {deleting === testimonial.id ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Trash2 size={16} />
                  )}
                </Button>
              </div>
            </div>
          </Card>
        ))}
        </div>
      )}
    </div>
  );
};
