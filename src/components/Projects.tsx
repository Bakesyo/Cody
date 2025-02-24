import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ProjectCard } from './ProjectCard';
import { useProjects } from '../hooks/useProjects';

export default function Projects() {
  const { projects, isLoading, error } = useProjects();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  if (isLoading) return <div>Loading projects...</div>;
  if (error) return <div>Error loading projects</div>;

  return (
    <section id="work" className="projects-section">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Featured Projects
        </motion.h2>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="projects-grid"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
} 