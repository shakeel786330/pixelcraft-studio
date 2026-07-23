import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Code, Palette, Zap, Users, TrendingUp } from 'lucide-react'
import { useServices, usePortfolioProjects, useTestimonials } from '@/hooks'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
}

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We understand your vision, goals, and target audience',
    icon: Sparkles,
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'We create a tailored strategy for your digital success',
    icon: TrendingUp,
  },
  {
    number: '03',
    title: 'Design',
    description: 'Beautiful, user-focused designs that convert',
    icon: Palette,
  },
  {
    number: '04',
    title: 'Development',
    description: 'Clean, scalable code built with modern technologies',
    icon: Code,
  },
]

const whyChooseUs = [
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: 'Quick turnaround without compromising quality',
  },
  {
    icon: Code,
    title: 'Modern Tech',
    description: 'Built with the latest technologies and best practices',
  },
  {
    icon: Palette,
    title: 'Creative Design',
    description: 'Stunning visuals that make your brand stand out',
  },
  {
    icon: Users,
    title: 'Client Focused',
    description: 'Your success is our priority, always',
  },
]

export function Home() {
  const { services } = useServices()
  const { projects } = usePortfolioProjects()
  const { testimonials } = useTestimonials()
  const [activeTab, setActiveTab] = useState('all')

  const featuredProjects = projects.filter(p => p.featured).slice(0, 3)
  const displayProjects = activeTab === 'all' ? projects.slice(0, 6) : projects.filter(p => p.category === activeTab).slice(0, 6)

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen pt-32 pb-20 flex items-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"></div>

        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <p className="text-primary text-sm font-semibold">✨ Welcome to PixelCraft Studio</p>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Design. Build. <span className="text-gradient">Grow.</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-xl">
                  PixelCraft Studio creates modern websites, powerful digital experiences, and creative designs that help businesses stand out and grow online.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/portfolio" className="btn-primary flex items-center gap-2 justify-center">
                  View Our Work
                  <ArrowRight size={20} />
                </Link>
                <Link to="/project-request" className="btn-secondary flex items-center gap-2 justify-center">
                  Start a Project
                  <ArrowRight size={20} />
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8">
                <div>
                  <p className="text-3xl font-bold text-primary">50+</p>
                  <p className="text-gray-400 text-sm">Projects Completed</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">40+</p>
                  <p className="text-gray-400 text-sm">Happy Clients</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">8+</p>
                  <p className="text-gray-400 text-sm">Years Experience</p>
                </div>
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-96 lg:h-full flex items-center justify-center"
            >
              <div className="relative w-full max-w-md aspect-square">
                {/* Floating Cards */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl backdrop-blur-md border border-primary/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-gradient mb-4">PC</div>
                    <p className="text-white font-semibold">PixelCraft Studio</p>
                    <p className="text-gray-400 text-sm mt-2">Digital Creative Agency</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5 rounded-xl border border-primary/10 backdrop-blur-md"></div>
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary/5 rounded-lg border border-secondary/10 backdrop-blur-md"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 relative">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.slice(0, 4).map((service) => {
              const IconComponent = getIcon(service.icon)
              return (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  className="card-gradient p-6 rounded-xl hover:border-primary/50 transition-all duration-300 group cursor-pointer"
                >
                  <div className="text-primary text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {IconComponent && <IconComponent size={32} />}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm">{service.description}</p>
                </motion.div>
              )
            })}
          </motion.div>

          <div className="text-center mt-12">
            <Link to="/services" className="btn-primary inline-flex items-center gap-2">
              View All Services
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Portfolio */}
      <section className="py-20 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Check out some of our recent work and case studies
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {(featuredProjects.length > 0 ? featuredProjects : displayProjects.slice(0, 3)).map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group card-gradient rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300"
              >
                <div className="h-48 bg-primary/10 overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-primary text-xs font-semibold uppercase">{project.category}</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 2).map((tech) => (
                      <span key={tech} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.project_url && (
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-secondary transition-colors text-sm font-semibold flex items-center gap-2"
                    >
                      View Project
                      <ArrowRight size={16} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center">
            <Link to="/portfolio" className="btn-primary inline-flex items-center gap-2">
              View All Projects
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose PixelCraft?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We combine creativity, technology, and strategy to deliver exceptional results
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {whyChooseUs.map((item) => {
              const IconComponent = item.icon
              return (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4 group hover:bg-primary/20 transition-colors">
                    <IconComponent size={32} className="text-primary" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 relative">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Process</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              How we transform your vision into reality
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <motion.div
                  key={step.number}
                  variants={itemVariants}
                  className="relative"
                >
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-16 -right-4 w-8 h-1 bg-gradient-to-r from-primary to-transparent"></div>
                  )}

                  <div className="card-gradient p-8 rounded-xl relative z-10">
                    <div className="text-5xl font-bold text-primary/20 mb-4">{step.number}</div>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                      <IconComponent size={24} className="text-primary" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Client Testimonials</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Hear what our clients have to say about working with us
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {testimonials.slice(0, 3).map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  variants={itemVariants}
                  className="card-gradient p-8 rounded-xl"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-secondary text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">\"{testimonial.content}\"</p>
                  <div className="flex items-center gap-4">
                    {testimonial.image_url && (
                      <img
                        src={testimonial.image_url}
                        alt={testimonial.client_name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="text-white font-semibold">{testimonial.client_name}</p>
                      <p className="text-gray-400 text-sm">{testimonial.client_company}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl -z-10"></div>
        <div className="container-custom">
          <div className="card-gradient p-12 rounded-2xl text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's work together to create something amazing. Tell us about your vision and let's make it happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/project-request" className="btn-primary flex items-center gap-2 justify-center">
                Start Your Project
                <ArrowRight size={20} />
              </Link>
              <Link to="/contact" className="btn-secondary flex items-center gap-2 justify-center">
                Get in Touch
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function getIcon(iconName: string) {
  const icons: { [key: string]: React.ComponentType<any> } = {
    'code': Code,
    'palette': Palette,
    'zap': Zap,
    'sparkles': Sparkles,
  }
  return icons[iconName] || Code
}
