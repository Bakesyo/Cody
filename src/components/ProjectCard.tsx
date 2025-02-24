import { motion } from 'framer-motion';
import { Project } from '../types/project';

interface ProjectCardProps {
  project: Project;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      className="project"
      variants={cardVariants}
      data-project={project.slug}
    >
      <div className="project-preview">
        <img src={project.previewImage} alt={project.title} />
        <div className="project-overlay">
          <div className="project-content">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <button className="btn btn-view">View Details</button>
          </div>
        </div>
      </div>
      <div className="project-tags">
        {project.technologies.map(tech => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
    </motion.article>
  );
} 