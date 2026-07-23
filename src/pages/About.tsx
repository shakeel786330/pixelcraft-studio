import { motion } from 'framer-motion'
import { CheckCircle, Users, Zap, Award } from 'lucide-react'

const values = [
  {
    icon: CheckCircle,
    title: 'Quality First',
    description: 'We never compromise on quality. Every project is built with precision and attention to detail.',
  },
  {
    icon: Users,
    title: 'Client Focused',
    description: 'Your success is our success. We work closely with you to ensure your vision is realized.',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'We stay ahead of the curve, using the latest technologies and best practices.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in every aspect of our work, from design to deployment.',
  },
]

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Creative Director',
    bio: 'With 8+ years of experience in digital design, Sarah leads our creative vision.',
  },
  {
    name: 'Mike Chen',
    role: 'Lead Developer',
    bio: 'Full-stack developer passionate about building scalable, performant web applications.',
  },
  {
    name: 'Emma Rodriguez',
    role: 'UI/UX Designer',
    bio: 'Specialized in creating intuitive and beautiful user experiences.',
  },
  {
    name: 'Alex Thompson',
    role: 'Project Manager',
    bio: 'Ensures every project runs smoothly and exceeds client expectations.',
  },
]

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

export function About() {
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
              About <span className="text-gradient">PixelCraft</span>
            </h1>
            <p className="text-xl text-gray-400">
              We're a creative agency dedicated to building beautiful, functional digital experiences that help businesses succeed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-white">Our Story</h2>
              <p className="text-gray-400 text-lg">
                PixelCraft Studio was founded with a simple mission: to create digital experiences that not only look beautiful but also drive real business results.
              </p>
              <p className="text-gray-400 text-lg">
                We believe that great design is more than aesthetics. It's about understanding your business goals, your customers' needs, and creating solutions that bridge the gap between the two.
              </p>
              <p className="text-gray-400 text-lg">
                Today, we work with businesses of all sizes, from startups to established companies, helping them navigate the digital landscape and achieve their goals.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card-gradient p-12 rounded-xl"
            >
              <div className="space-y-4 text-center">
                <p className="text-5xl font-bold text-primary">50+</p>
                <p className="text-gray-400">Projects Delivered</p>
                <div className="border-t border-primary/20 pt-4">
                  <p className="text-5xl font-bold text-primary">40+</p>
                  <p className="text-gray-400">Happy Clients</p>
                </div>
                <div className="border-t border-primary/20 pt-4">
                  <p className="text-5xl font-bold text-primary">8+</p>
                  <p className="text-gray-400">Years Experience</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              These principles guide everything we do
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value) => {
              const IconComponent = value.icon
              return (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  className="card-gradient p-6 rounded-xl"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                    <IconComponent size={24} className="text-primary" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-gray-400 text-sm">{value.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Our Team</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Meet the talented people behind PixelCraft Studio
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                className="card-gradient p-6 rounded-xl text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-white font-semibold text-lg">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
