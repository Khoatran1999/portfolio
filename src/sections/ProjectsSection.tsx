import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { projects } from "@/data";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const isFeatured = project.type === "featured";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`card card-hover group flex flex-col ${
        isFeatured
          ? "border-blue-200/80 dark:border-blue-800/60 ring-1 ring-blue-500/10"
          : ""
      }`}
    >
      {isFeatured && (
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Featured Project
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-display font-bold text-base text-slate-900 dark:text-white leading-snug flex-1">
          {project.title}
        </h3>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Github size={16} />
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live site"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ExternalLink size={16} />
            </a>
          )}
          {!project.github && !project.link && (
            <ArrowUpRight
              size={16}
              className="text-slate-300 dark:text-slate-700 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
            />
          )}
        </div>
      </div>

      <Badge variant="outline" className="w-fit mb-3">
        {project.category}
      </Badge>

      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1 mb-5">
        {project.description}
      </p>

      {project.metrics && (
        <div className="px-3 py-2 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200/60 dark:border-green-800/60 text-green-700 dark:text-green-400 text-xs font-semibold mb-4">
          {project.metrics}
        </div>
      )}

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tech.map((t) => (
          <Badge key={t} variant="blue">
            {t}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const featured = projects.filter((p) => p.type === "featured");
  const regular = projects.filter((p) => p.type === "regular");

  return (
    <section id="projects" className="section-padding">
      <div className="container-max">
        <SectionHeader
          eyebrow="Portfolio"
          title="Selected Projects"
          subtitle="Real-world solutions spanning e-commerce, tooling, and AI integrations."
        />

        {/* Featured */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {featured.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Regular */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {regular.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={featured.length + i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
