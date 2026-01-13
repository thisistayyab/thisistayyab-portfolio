import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Experience } from '../../lib/supabase';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { IconSelector } from '../../components/dashboard/IconSelector';
import { Plus, Edit, Trash2, Save, X, Briefcase, Loader2 } from 'lucide-react';

export const ExperiencesManagement: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    experience_id: 0,
    type: 'work' as 'work' | 'education',
    icon_name: '',
    icon_size: 32,
    color: '#14a800',
    title: '',
    company: '',
    period: '',
    description: '',
    technologies: [] as string[],
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setExperiences(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setFormData({
      experience_id: experiences.length > 0 ? Math.max(...experiences.map(e => e.experience_id)) + 1 : 1,
      type: 'work',
      icon_name: '',
      icon_size: 32,
      color: '#14a800',
      title: '',
      company: '',
      period: '',
      description: '',
      technologies: [],
      display_order: experiences.length,
      is_active: true,
    });
    setShowAddForm(true);
    setEditingId(null);
  };

  const handleEdit = (experience: Experience) => {
    setFormData({
      experience_id: experience.experience_id,
      type: experience.type,
      icon_name: experience.icon_name,
      icon_size: experience.icon_size,
      color: experience.color,
      title: experience.title,
      company: experience.company,
      period: experience.period,
      description: experience.description,
      technologies: experience.technologies,
      display_order: experience.display_order,
      is_active: experience.is_active,
    });
    setEditingId(experience.id);
    setShowAddForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editingId) {
        const { error } = await supabase
          .from('experiences')
          .update(formData)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('experiences').insert([formData]);
        if (error) throw error;
      }
      await fetchExperiences();
      setShowAddForm(false);
      setEditingId(null);
    } catch (error) {
      console.error('Error saving experience:', error);
      alert('Error saving experience. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    setDeleting(id);
    try {
      const { error } = await supabase.from('experiences').delete().eq('id', id);
      if (error) throw error;
      await fetchExperiences();
    } catch (error) {
      console.error('Error deleting experience:', error);
      alert('Error deleting experience. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  const addTechnology = () => {
    setFormData({ ...formData, technologies: [...formData.technologies, ''] });
  };

  const updateTechnology = (index: number, value: string) => {
    const updated = [...formData.technologies];
    updated[index] = value;
    setFormData({ ...formData, technologies: updated });
  };

  const removeTechnology = (index: number) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Experiences Management</h2>
        <Button 
          onClick={handleAdd} 
          className="cursor-pointer"
          glowColor="#3b82f6"
        >
          <Plus size={18} className="mr-2" />
          Add Experience
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
            {editingId ? 'Edit Experience' : 'Add New Experience'}
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Experience ID</label>
                <input
                  type="number"
                  value={formData.experience_id}
                  onChange={(e) => setFormData({ ...formData, experience_id: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'work' | 'education' })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                >
                  <option value="work">Work</option>
                  <option value="education">Education</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3">
                <IconSelector
                  value={formData.icon_name}
                  onChange={(iconName) => setFormData({ ...formData, icon_name: iconName })}
                  label="Icon"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Icon Size</label>
                <input
                  type="number"
                  value={formData.icon_size}
                  onChange={(e) => setFormData({ ...formData, icon_size: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Color</label>
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full h-10 bg-gray-700 border border-gray-600 rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Period</label>
              <input
                type="text"
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                placeholder="Dec 9, 2025 - Present"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">Technologies</label>
                <Button onClick={addTechnology} size="sm" variant="outline">
                  <Plus size={14} className="mr-1" />
                  Add
                </Button>
              </div>
              {formData.technologies.map((tech, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tech}
                    onChange={(e) => updateTechnology(index, e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                  <Button onClick={() => removeTechnology(index)} size="sm" variant="destructive">
                    <X size={14} />
                  </Button>
                </div>
              ))}
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

      {experiences.length === 0 ? (
        <Card 
          className="p-12 bg-gray-800 border-gray-700 text-center"
          hoverScale={false}
          hoverLift={false}
          glowColor="transparent"
          gradientColors={[]}
        >
          <div className="text-gray-400 mb-4">
            <Briefcase size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">No experiences found</p>
            <p className="text-sm mt-2">Click "Add Experience" to create your first experience</p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {experiences.map((experience) => (
            <Card 
              key={experience.id} 
              className="p-4 bg-gray-800 border-gray-700"
              hoverScale={false}
              hoverLift={false}
              glowColor="transparent"
              gradientColors={[]}
            >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{experience.title}</h3>
                <p className="text-gray-400 text-sm mb-2">
                  {experience.company} • {experience.period}
                </p>
                <p className="text-gray-300 text-sm line-clamp-2 mb-2">{experience.description}</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs px-2 py-1 bg-gray-700 rounded capitalize">
                    {experience.type}
                  </span>
                  <span className="text-xs px-2 py-1 bg-gray-700 rounded">
                    Order: {experience.display_order}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      experience.is_active
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {experience.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleEdit(experience)} 
                  size="sm" 
                  variant="outline"
                  className="cursor-pointer"
                >
                  <Edit size={16} />
                </Button>
                <Button 
                  onClick={() => handleDelete(experience.id)} 
                  size="sm" 
                  variant="destructive"
                  className="cursor-pointer"
                  disabled={deleting === experience.id}
                  glowColor="#ef4444"
                >
                  {deleting === experience.id ? (
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
