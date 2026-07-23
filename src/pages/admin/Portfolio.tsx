import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Edit2, Trash2, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import type { PortfolioProject } from '@/lib/types'

export function AdminPortfolio() {
  const [projects, setProjects] = useState<PortfolioProject[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'websites',
    image_url: '',
    technologies: [] as string[],
    project_url: '',
    featured: false,
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('order', { ascending: true })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      toast.error('Failed to fetch projects')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const { error } = await supabase
          .from('portfolio_projects')
          .delete()
          .eq('id', id)

        if (error) throw error
        toast.success('Project deleted')
        fetchProjects()
      } catch (error) {
        toast.error('Failed to delete project')
      }
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Portfolio Projects</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 btn-primary text-sm"
          >
            <Plus size={20} />
            Add Project
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-pulse text-gray-400">Loading projects...</div>
          </div>
        ) : (
          <div className="space-y-6">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-gradient p-6 rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-6 flex-1">
                  {project.image_url && (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <h3 className="text-white font-semibold text-lg">{project.title}</h3>
                    <p className="text-gray-400 text-sm">{project.category}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.slice(0, 2).map((tech) => (
                        <span key={tech} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-primary/20 rounded-lg transition-colors text-primary">
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
