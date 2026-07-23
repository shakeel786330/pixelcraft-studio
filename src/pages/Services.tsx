import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useServices } from '@/hooks'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export function Services() {
  const { services, loading } = useServices()

  return (
    <div>
      {/* Hero */}
      <section className="min-h-screen pt-32 pb-20 flex items-center relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto space-y-6"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-white">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-xl text-gray-400">
              Comprehensive digital solutions for your business growth. From web development to graphic design, we've got you covered.
            </p>
            <Link to="/project-request" className="inline-block btn-primary">
              Start a Project
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container-custom">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-dark-secondary/50 rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  className="card-gradient p-8 rounded-xl hover:border-primary/50 transition-all duration-300 group cursor-pointer h-full"
                >
                  <div className="text-5xl mb-6">
                    {getServiceIcon(service.icon)}
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{service.title}</h3>
                  <p className="text-gray-400 mb-6">{service.description}</p>
                  <Link
                    to="/project-request"
                    className="text-primary hover:text-secondary transition-colors font-semibold flex items-center gap-2 group-hover:gap-3"
                  >
                    Learn More
                    <ArrowRight size={18} />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-custom">
          <div className="card-gradient p-12 rounded-2xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-gray-400 mb-8">
              Choose the service that fits your needs and let's create something amazing together.
            </p>
            <Link to="/project-request" className="btn-primary inline-flex items-center gap-2">
              Request a Quote
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function getServiceIcon(iconName: string): string {
  const icons: { [key: string]: string } = {
    'web': '🌐',
    'wordpress': '📝',
    'ecommerce': '🛒',
    'design': '🎨',
    'logo': '✨',
    'social': '📱',
    'branding': '🎯',
    'mobile': '📲',
    'seo': '🔍',
    'code': '💻',
    'palette': '🎭',
    'zap': '⚡',
  }
  return icons[iconName] || '🚀'
}
