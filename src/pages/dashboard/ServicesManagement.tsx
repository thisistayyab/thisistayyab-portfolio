import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Service } from '../../lib/supabase';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { IconSelector } from '../../components/dashboard/IconSelector';
import { Plus, Edit, Trash2, Save, X, Settings, Loader2 } from 'lucide-react';

export const ServicesManagement: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    service_id: 0,
    title: '',
    icon_name: '',
    icon_size: 32,
    color: '#3b82f6',
    description: '',
    features: [] as string[],
    keywords: [] as string[],
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setServices(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setFormData({
      service_id: services.length > 0 ? Math.max(...services.map(s => s.service_id)) + 1 : 1,
      title: '',
      icon_name: '',
      icon_size: 32,
      color: '#3b82f6',
      description: '',
      features: [],
      keywords: [],
      display_order: services.length,
      is_active: true,
    });
    setShowAddForm(true);
    setEditingId(null);
  };

  const handleEdit = (service: Service) => {
    setFormData({
      service_id: service.service_id,
      title: service.title,
      icon_name: service.icon_name,
      icon_size: service.icon_size,
      color: service.color,
      description: service.description,
      features: service.features,
      keywords: service.keywords,
      display_order: service.display_order,
      is_active: service.is_active,
    });
    setEditingId(service.id);
    setShowAddForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editingId) {
        const { error } = await supabase
          .from('services')
          .update(formData)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('services').insert([formData]);
        if (error) throw error;
      }
      await fetchServices();
      setShowAddForm(false);
      setEditingId(null);
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Error saving service. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    setDeleting(id);
    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
      await fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Error deleting service. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const updateFeature = (index: number, value: string) => {
    const updated = [...formData.features];
    updated[index] = value;
    setFormData({ ...formData, features: updated });
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const addKeyword = () => {
    setFormData({ ...formData, keywords: [...formData.keywords, ''] });
  };

  const updateKeyword = (index: number, value: string) => {
    const updated = [...formData.keywords];
    updated[index] = value;
    setFormData({ ...formData, keywords: updated });
  };

  const removeKeyword = (index: number) => {
    setFormData({
      ...formData,
      keywords: formData.keywords.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Services Management</h2>
        <Button 
          onClick={handleAdd} 
          className="cursor-pointer"
          glowColor="#3b82f6"
        >
          <Plus size={18} className="mr-2" />
          Add Service
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
            {editingId ? 'Edit Service' : 'Add New Service'}
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Service ID</label>
                <input
                  type="number"
                  value={formData.service_id}
                  onChange={(e) => setFormData({ ...formData, service_id: parseInt(e.target.value) })}
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
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
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
                <label className="block text-sm font-medium">Features</label>
                <Button onClick={addFeature} size="sm" variant="outline">
                  <Plus size={14} className="mr-1" />
                  Add
                </Button>
              </div>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                  <Button onClick={() => removeFeature(index)} size="sm" variant="destructive">
                    <X size={14} />
                  </Button>
                </div>
              ))}
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">Keywords</label>
                <Button onClick={addKeyword} size="sm" variant="outline">
                  <Plus size={14} className="mr-1" />
                  Add
                </Button>
              </div>
              {formData.keywords.map((keyword, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => updateKeyword(index, e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                  <Button onClick={() => removeKeyword(index)} size="sm" variant="destructive">
                    <X size={14} />
                  </Button>
                </div>
              ))}
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

      {services.length === 0 ? (
        <Card 
          className="p-12 bg-gray-800 border-gray-700 text-center"
          hoverScale={false}
          hoverLift={false}
          glowColor="transparent"
          gradientColors={[]}
        >
          <div className="text-gray-400 mb-4">
            <Settings size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">No services found</p>
            <p className="text-sm mt-2">Click "Add Service" to create your first service</p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {services.map((service) => (
            <Card 
              key={service.id} 
              className="p-4 bg-gray-800 border-gray-700"
              hoverScale={false}
              hoverLift={false}
              glowColor="transparent"
              gradientColors={[]}
            >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-300 text-sm line-clamp-2">{service.description}</p>
                <div className="mt-2 flex gap-2 flex-wrap">
                  <span className="text-xs px-2 py-1 bg-gray-700 rounded">
                    Order: {service.display_order}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      service.is_active
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {service.is_active ? 'Active' : 'Inactive'}
                  </span>
                  <span className="text-xs px-2 py-1 bg-gray-700 rounded">
                    Features: {service.features.length}
                  </span>
                  <span className="text-xs px-2 py-1 bg-gray-700 rounded">
                    Keywords: {service.keywords.length}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleEdit(service)} 
                  size="sm" 
                  variant="outline"
                  className="cursor-pointer"
                >
                  <Edit size={16} />
                </Button>
                <Button 
                  onClick={() => handleDelete(service.id)} 
                  size="sm" 
                  variant="destructive"
                  className="cursor-pointer"
                  disabled={deleting === service.id}
                  glowColor="#ef4444"
                >
                  {deleting === service.id ? (
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
