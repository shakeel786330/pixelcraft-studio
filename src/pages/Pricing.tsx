import { Check, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePricingPackages } from '@/hooks'
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

export function Pricing() {
  const { packages, loading } = usePricingPackages()

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
              Simple, <span className="text-gradient">Transparent</span> Pricing
            </h1>
            <p className="text-xl text-gray-400">
              Choose the perfect package for your project needs. All packages include ongoing support and updates.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container-custom">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-96 bg-dark-secondary/50 rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  variants={itemVariants}
                  className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                    index === 1
                      ? 'md:scale-105 card-gradient border-2 border-primary shadow-glow'
                      : 'card-gradient hover:border-primary/50'
                  }`}
                >
                  {index === 1 && (
                    <div className="bg-gradient-to-r from-primary to-secondary px-6 py-2 text-center">
                      <span className="text-white font-bold text-sm">MOST POPULAR</span>
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="text-white font-bold text-2xl mb-2">{pkg.name}</h3>
                    <p className="text-gray-400 text-sm mb-6">{pkg.description}</p>
                    <div className="mb-8">
                      <span className="text-5xl font-bold text-white">${pkg.price}</span>
                      <span className="text-gray-400 text-sm ml-2">one-time</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check size={20} className="text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/project-request"
                      className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 text-center block ${
                        index === 1
                          ? 'bg-primary hover:bg-primary-dark text-white'
                          : 'bg-primary/10 text-primary hover:bg-primary/20'
                      }`}
                    >
                      Get Started
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: 'Do you offer custom pricing?',
                  a: 'Yes! If you need a custom solution tailored to your specific needs, we\'d love to discuss it. Contact us for a consultation.',
                },
                {
                  q: 'What\'s included in the package?',
                  a: 'Each package includes design, development, testing, and deployment. We also provide ongoing support for 30 days after launch.',
                },
                {
                  q: 'Can I upgrade or downgrade?',
                  a: 'Absolutely! You can upgrade to a higher package at any time, or we can customize the features to match your evolving needs.',
                },
                {
                  q: 'Do you provide maintenance?',
                  a: 'Yes, we offer optional maintenance packages to keep your website updated, secure, and running smoothly.',
                },
              ].map((item, i) => (
                <div key={i} className="card-gradient p-6 rounded-xl">
                  <h4 className="text-white font-semibold text-lg mb-2">{item.q}</h4>
                  <p className="text-gray-400">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-custom">
          <div className="card-gradient p-12 rounded-2xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
            <p className="text-gray-400 mb-8">
              Our team is ready to help. Reach out and let's discuss your project requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2 justify-center">
                Contact Us
                <ArrowRight size={20} />
              </Link>
              <Link to="/project-request" className="btn-secondary inline-flex items-center gap-2 justify-center">
                Request Quote
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
