import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Project } from '../../lib/supabase';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { ImageUpload } from '../../components/dashboard/ImageUpload';
import { Plus, Edit, Trash2, Save, X, FolderKanban, Loader2 } from 'lucide-react';

export const ProjectsManagement: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    project_id: 0,
    category: 'web',
    img: '',
    link: '',
    name: '',
    description: '',
    technologies: [] as Array<{ label: string; color: string; width: string }>,
    button: 'View Project',
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setProjects(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setFormData({
      project_id: projects.length > 0 ? Math.max(...projects.map(p => p.project_id)) + 1 : 1,
      category: 'web',
      img: '',
      link: '',
      name: '',
      description: '',
      technologies: [],
      button: 'View Project',
      display_order: projects.length,
      is_active: true,
    });
    setShowAddForm(true);
    setEditingId(null);
  };

  const handleEdit = (project: Project) => {
    setFormData({
      project_id: project.project_id,
      category: project.category,
      img: project.img,
      link: project.link,
      name: project.name,
      description: project.description,
      technologies: project.technologies,
      button: project.button,
      display_order: project.display_order,
      is_active: project.is_active,
    });
    setEditingId(project.id);
    setShowAddForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editingId) {
        const { error } = await supabase
          .from('projects')
          .update(formData)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('projects').insert([formData]);
        if (error) throw error;
      }
      await fetchProjects();
      setShowAddForm(false);
      setEditingId(null);
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    setDeleting(id);
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      await fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Error deleting project. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  const addTechnology = () => {
    setFormData({
      ...formData,
      technologies: [...formData.technologies, { label: '', color: '#000000', width: '100%' }],
    });
  };

  const updateTechnology = (index: number, field: string, value: string) => {
    const updated = [...formData.technologies];
    updated[index] = { ...updated[index], [field]: value };
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
        <h2 className="text-2xl font-bold">Projects Management</h2>
        <Button 
          onClick={handleAdd} 
          className="cursor-pointer"
          glowColor="#3b82f6"
        >
          <Plus size={18} className="mr-2" />
          Add Project
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
            {editingId ? 'Edit Project' : 'Add New Project'}
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Project ID</label>
                <input
                  type="number"
                  value={formData.project_id}
                  onChange={(e) => setFormData({ ...formData, project_id: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
            <div>
              <ImageUpload
                bucket="projects"
                currentImageUrl={formData.img}
                onImageUploaded={(url) => setFormData({ ...formData, img: url })}
                onImageRemoved={() => setFormData({ ...formData, img: '' })}
                folder="projects"
                label="Project Image"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Link</label>
              <input
                type="text"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
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
                    placeholder="Label"
                    value={tech.label}
                    onChange={(e) => updateTechnology(index, 'label', e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                  <input
                    type="color"
                    value={tech.color}
                    onChange={(e) => updateTechnology(index, 'color', e.target.value)}
                    className="w-20 h-10 bg-gray-700 border border-gray-600 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Width"
                    value={tech.width}
                    onChange={(e) => updateTechnology(index, 'width', e.target.value)}
                    className="w-24 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                  <Button onClick={() => removeTechnology(index)} size="sm" variant="destructive">
                    <X size={14} />
                  </Button>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Button Text</label>
                <input
                  type="text"
                  value={formData.button}
                  onChange={(e) => setFormData({ ...formData, button: e.target.value })}
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

      {projects.length === 0 ? (
        <Card 
          className="p-12 bg-gray-800 border-gray-700 text-center"
          hoverScale={false}
          hoverLift={false}
          glowColor="transparent"
          gradientColors={[]}
        >
          <div className="text-gray-400 mb-4">
            <FolderKanban size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">No projects found</p>
            <p className="text-sm mt-2">Click "Add Project" to create your first project</p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {projects.map((project) => (
            <Card 
              key={project.id} 
              className="p-4 bg-gray-800 border-gray-700"
              hoverScale={false}
              hoverLift={false}
              glowColor="transparent"
              gradientColors={[]}
            >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                <p className="text-gray-400 text-sm mb-2">{project.category}</p>
                <p className="text-gray-300 text-sm line-clamp-2">{project.description}</p>
                <div className="mt-2 flex gap-2">
                  <span className="text-xs px-2 py-1 bg-gray-700 rounded">
                    Order: {project.display_order}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      project.is_active
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {project.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleEdit(project)}
                  size="sm"
                  variant="outline"
                  className="cursor-pointer"
                >
                  <Edit size={16} />
                </Button>
                <Button
                  onClick={() => handleDelete(project.id)}
                  size="sm"
                  variant="destructive"
                  className="cursor-pointer"
                  disabled={deleting === project.id}
                  glowColor="#ef4444"
                >
                  {deleting === project.id ? (
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
