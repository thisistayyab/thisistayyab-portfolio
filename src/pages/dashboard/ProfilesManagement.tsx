import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Profile } from '../../lib/supabase';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { IconSelector } from '../../components/dashboard/IconSelector';
import { Plus, Edit, Trash2, Save, X, UserCircle, Loader2 } from 'lucide-react';

export const ProfilesManagement: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    profile_id: 0,
    name: '',
    icon_name: '',
    icon_size: 32,
    color: '#ffffff',
    description: '',
    link: '',
    button: 'View Profile',
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setProfiles(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setFormData({
      profile_id: profiles.length > 0 ? Math.max(...profiles.map(p => p.profile_id)) + 1 : 1,
      name: '',
      icon_name: '',
      icon_size: 32,
      color: '#ffffff',
      description: '',
      link: '',
      button: 'View Profile',
      display_order: profiles.length,
      is_active: true,
    });
    setShowAddForm(true);
    setEditingId(null);
  };

  const handleEdit = (profile: Profile) => {
    setFormData({
      profile_id: profile.profile_id,
      name: profile.name,
      icon_name: profile.icon_name,
      icon_size: profile.icon_size,
      color: profile.color,
      description: profile.description,
      link: profile.link,
      button: profile.button,
      display_order: profile.display_order,
      is_active: profile.is_active,
    });
    setEditingId(profile.id);
    setShowAddForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editingId) {
        const { error } = await supabase
          .from('profiles')
          .update(formData)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('profiles').insert([formData]);
        if (error) throw error;
      }
      await fetchProfiles();
      setShowAddForm(false);
      setEditingId(null);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this profile?')) return;
    setDeleting(id);
    try {
      const { error } = await supabase.from('profiles').delete().eq('id', id);
      if (error) throw error;
      await fetchProfiles();
    } catch (error) {
      console.error('Error deleting profile:', error);
      alert('Error deleting profile. Please try again.');
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
        <h2 className="text-2xl font-bold">Profiles Management</h2>
        <Button 
          onClick={handleAdd} 
          className="cursor-pointer"
          glowColor="#3b82f6"
        >
          <Plus size={18} className="mr-2" />
          Add Profile
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
            {editingId ? 'Edit Profile' : 'Add New Profile'}
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Profile ID</label>
                <input
                  type="number"
                  value={formData.profile_id}
                  onChange={(e) => setFormData({ ...formData, profile_id: parseInt(e.target.value) })}
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
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                rows={3}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
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
              <label className="block text-sm font-medium mb-2">Button Text</label>
              <input
                type="text"
                value={formData.button}
                onChange={(e) => setFormData({ ...formData, button: e.target.value })}
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

      {profiles.length === 0 ? (
        <Card 
          className="p-12 bg-gray-800 border-gray-700 text-center"
          hoverScale={false}
          hoverLift={false}
          glowColor="transparent"
          gradientColors={[]}
        >
          <div className="text-gray-400 mb-4">
            <UserCircle size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">No profiles found</p>
            <p className="text-sm mt-2">Click "Add Profile" to create your first profile</p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {profiles.map((profile) => (
            <Card 
              key={profile.id} 
              className="p-4 bg-gray-800 border-gray-700"
              hoverScale={false}
              hoverLift={false}
              glowColor="transparent"
              gradientColors={[]}
            >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{profile.name}</h3>
                <p className="text-gray-300 text-sm line-clamp-2">{profile.description}</p>
                <div className="mt-2 flex gap-2">
                  <span className="text-xs px-2 py-1 bg-gray-700 rounded">
                    Order: {profile.display_order}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      profile.is_active
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {profile.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleEdit(profile)} 
                  size="sm" 
                  variant="outline"
                  className="cursor-pointer"
                >
                  <Edit size={16} />
                </Button>
                <Button 
                  onClick={() => handleDelete(profile.id)} 
                  size="sm" 
                  variant="destructive"
                  className="cursor-pointer"
                  disabled={deleting === profile.id}
                  glowColor="#ef4444"
                >
                  {deleting === profile.id ? (
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
